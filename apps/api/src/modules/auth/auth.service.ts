import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { config } from '../../config';
import { User, IUser } from '../../models/user.model';
import { RefreshToken } from '../../models/refresh-token.model';
import { Role } from '@vyom/constants';
import { AuthTokenPayload, UserStatus } from '@vyom/types';
import {
  ConflictError,
  AuthenticationError,
  NotFoundError,
  AppError,
} from '../../shared/errors';
import { emailService } from '../../shared/services/email/email.service';
import { logger } from '../../shared/utils/logger';

const BCRYPT_ROUNDS = 12;

export class AuthService {
  async register(
    fullName: string,
    email: string,
    password: string,
  ): Promise<{ user: Record<string, unknown> }> {
    const existing = await User.findOne({ email });
    if (existing) {
      throw new ConflictError('An account with this email already exists');
    }

    const passwordHash = await bcrypt.hash(password, BCRYPT_ROUNDS);
    const verificationToken = crypto.randomBytes(32).toString('hex');
    const verificationTokenExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24h

    const user = await User.create({
      fullName,
      email,
      passwordHash,
      roles: [Role.MEMBER],
      status: UserStatus.PENDING_VERIFICATION,
      emailVerified: false,
      emailVerificationToken: verificationToken,
      emailVerificationTokenExpiry: verificationTokenExpiry,
    });

    // Fire-and-forget — do not fail registration if email fails
    emailService.sendRegistrationEmail(user.email, user.fullName, `${config.frontendUrl}/verify-email?token=${verificationToken}`).catch((err) =>
      logger.error('Failed to send verification email', { err, userId: user._id }),
    );

    logger.info('User registered', { userId: user._id, email: user.email });
    return { user: user.toJSON() };
  }

  async login(
    email: string,
    password: string,
    userAgent?: string,
    ipAddress?: string,
  ): Promise<{ accessToken: string; refreshToken: string; user: Record<string, unknown> }> {
    // Explicitly select passwordHash as it is excluded by default
    const user = await User.findOne({ email }).select('+passwordHash');
    if (!user) {
      throw new AuthenticationError('Invalid email or password');
    }

    if (user.status === UserStatus.DEACTIVATED) {
      throw new AuthenticationError('This account has been deactivated');
    }

    if (user.status === UserStatus.SUSPENDED) {
      throw new AuthenticationError('This account has been suspended. Please contact support.');
    }

    const passwordMatch = await bcrypt.compare(password, user.passwordHash);
    if (!passwordMatch) {
      throw new AuthenticationError('Invalid email or password');
    }

    const accessToken = this.generateAccessToken(user);
    const { refreshToken, tokenHash } = await this.generateRefreshToken();

    await RefreshToken.create({
      userId: user._id,
      tokenHash,
      userAgent,
      ipAddress,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    user.lastLoginAt = new Date();
    await user.save();

    logger.info('User logged in', { userId: user._id });
    return { accessToken, refreshToken, user: user.toJSON() };
  }

  async logout(refreshToken: string): Promise<void> {
    const tokenHash = this.hashToken(refreshToken);
    await RefreshToken.findOneAndUpdate(
      { tokenHash },
      { revokedAt: new Date() },
    );
  }

  async refreshTokens(
    incomingRefreshToken: string,
    userAgent?: string,
    ipAddress?: string,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const tokenHash = this.hashToken(incomingRefreshToken);

    const storedToken = await RefreshToken.findOne({
      tokenHash,
      revokedAt: { $exists: false },
      expiresAt: { $gt: new Date() },
    }).select('+tokenHash');

    if (!storedToken) {
      throw new AuthenticationError('Invalid or expired refresh token');
    }

    const user = await User.findById(storedToken.userId);
    if (!user || user.status === UserStatus.DEACTIVATED) {
      await storedToken.updateOne({ revokedAt: new Date() });
      throw new AuthenticationError('Session is no longer valid');
    }

    // Token rotation — revoke old, issue new
    await storedToken.updateOne({ revokedAt: new Date() });

    const accessToken = this.generateAccessToken(user);
    const { refreshToken: newRefreshToken, tokenHash: newHash } =
      await this.generateRefreshToken();

    await RefreshToken.create({
      userId: user._id,
      tokenHash: newHash,
      userAgent,
      ipAddress,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    return { accessToken, refreshToken: newRefreshToken };
  }

  async verifyEmail(token: string): Promise<void> {
    const user = await User.findOne({
      emailVerificationToken: token,
      emailVerificationTokenExpiry: { $gt: new Date() },
    }).select('+emailVerificationToken +emailVerificationTokenExpiry');

    if (!user) {
      throw new AppError('Verification link is invalid or has expired', 400, 'INVALID_TOKEN');
    }

    user.emailVerified = true;
    user.status = UserStatus.ACTIVE;
    user.emailVerificationToken = undefined;
    user.emailVerificationTokenExpiry = undefined;
    await user.save();

    logger.info('Email verified', { userId: user._id });
  }

  async forgotPassword(email: string): Promise<void> {
    const user = await User.findOne({ email });
    // Always succeed to prevent email enumeration
    if (!user) return;

    const resetToken = crypto.randomBytes(32).toString('hex');
    user.passwordResetToken = resetToken;
    user.passwordResetTokenExpiry = new Date(Date.now() + 60 * 60 * 1000); // 1h
    await user.save();

    emailService
      .sendForgotPasswordEmail(user.email, user.fullName, `${config.frontendUrl}/reset-password?token=${resetToken}`)
      .catch((err) => logger.error('Failed to send password reset email', { err }));

    logger.info('Password reset requested', { userId: user._id });
  }

  async resetPassword(token: string, newPassword: string): Promise<void> {
    const user = await User.findOne({
      passwordResetToken: token,
      passwordResetTokenExpiry: { $gt: new Date() },
    }).select('+passwordResetToken +passwordResetTokenExpiry');

    if (!user) {
      throw new AppError('Reset link is invalid or has expired', 400, 'INVALID_TOKEN');
    }

    user.passwordHash = await bcrypt.hash(newPassword, BCRYPT_ROUNDS);
    user.passwordResetToken = undefined;
    user.passwordResetTokenExpiry = undefined;
    await user.save();

    // Revoke all existing refresh tokens on password change
    await RefreshToken.updateMany(
      { userId: user._id, revokedAt: { $exists: false } },
      { revokedAt: new Date() },
    );

    logger.info('Password reset completed', { userId: user._id });
  }

  async resendVerification(email: string): Promise<void> {
    const user = await User.findOne({ email }).select(
      '+emailVerificationToken +emailVerificationTokenExpiry',
    );
    // Always succeed to prevent email enumeration
    if (!user || user.emailVerified) return;

    const verificationToken = crypto.randomBytes(32).toString('hex');
    user.emailVerificationToken = verificationToken;
    user.emailVerificationTokenExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000);
    await user.save();

    emailService
      .sendRegistrationEmail(
        user.email,
        user.fullName,
        `${config.frontendUrl}/verify-email?token=${verificationToken}`,
      )
      .catch((err) => logger.error('Failed to resend verification email', { err }));
  }

  async getMe(userId: string): Promise<Record<string, unknown>> {
    const user = await User.findById(userId);
    if (!user) throw new NotFoundError('User');
    return user.toJSON();
  }

  private generateAccessToken(user: IUser): string {
    const payload: AuthTokenPayload = {
      sub: user._id.toString(),
      email: user.email,
      roles: user.roles,
    };
    return jwt.sign(payload, config.jwt.accessSecret, {
      expiresIn: config.jwt.accessExpiresIn as jwt.SignOptions['expiresIn'],
    });
  }

  private async generateRefreshToken(): Promise<{ refreshToken: string; tokenHash: string }> {
    const refreshToken = crypto.randomBytes(40).toString('hex');
    const tokenHash = this.hashToken(refreshToken);
    return { refreshToken, tokenHash };
  }

  private hashToken(token: string): string {
    return crypto.createHash('sha256').update(token).digest('hex');
  }
}

export const authService = new AuthService();

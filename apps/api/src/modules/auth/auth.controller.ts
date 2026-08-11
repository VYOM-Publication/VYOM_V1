import { Request, Response, NextFunction } from 'express';
import { authService } from './auth.service';
import { sendSuccess, sendCreated } from '../../shared/utils/response';
import { config } from '../../config';

const REFRESH_COOKIE_NAME = 'vyom_rt';

const cookieOptions = {
  httpOnly: true,
  secure: config.cookie.secure,
  sameSite: config.cookie.sameSite,
  domain: config.cookie.domain,
  path: '/',
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in ms
} as const;

export class AuthController {
  async register(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { fullName, email, password } = req.body;
      const result = await authService.register(fullName, email, password);
      sendCreated(res, result, 'Registration successful. Please check your email to verify your account.');
    } catch (err) {
      next(err);
    }
  }

  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email, password } = req.body;
      const { accessToken, refreshToken, user } = await authService.login(
        email,
        password,
        req.get('user-agent'),
        req.ip,
      );
      res.cookie(REFRESH_COOKIE_NAME, refreshToken, cookieOptions);
      sendSuccess(res, { accessToken, user }, 'Login successful');
    } catch (err) {
      next(err);
    }
  }

  async logout(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const refreshToken = req.cookies?.[REFRESH_COOKIE_NAME];
      if (refreshToken) {
        await authService.logout(refreshToken);
      }
      res.clearCookie(REFRESH_COOKIE_NAME, { path: '/' });
      sendSuccess(res, null, 'Logged out successfully');
    } catch (err) {
      next(err);
    }
  }

  async refresh(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const refreshToken = req.cookies?.[REFRESH_COOKIE_NAME];
      if (!refreshToken) {
        res.status(401).json({ success: false, message: 'No refresh token provided' });
        return;
      }
      const { accessToken, refreshToken: newRefreshToken } = await authService.refreshTokens(
        refreshToken,
        req.get('user-agent'),
        req.ip,
      );
      res.cookie(REFRESH_COOKIE_NAME, newRefreshToken, cookieOptions);
      sendSuccess(res, { accessToken });
    } catch (err) {
      next(err);
    }
  }

  async verifyEmail(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { token } = req.query as { token: string };
      await authService.verifyEmail(token);
      sendSuccess(res, null, 'Email verified successfully');
    } catch (err) {
      next(err);
    }
  }

  async forgotPassword(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email } = req.body;
      await authService.forgotPassword(email);
      sendSuccess(res, null, 'If an account exists with this email, a password reset link has been sent.');
    } catch (err) {
      next(err);
    }
  }

  async resetPassword(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { token, password } = req.body;
      await authService.resetPassword(token, password);
      sendSuccess(res, null, 'Password reset successful. You can now log in with your new password.');
    } catch (err) {
      next(err);
    }
  }

  async resendVerification(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email } = req.body;
      await authService.resendVerification(email);
      sendSuccess(res, null, 'If an unverified account exists for that email, a new verification link has been sent.');
    } catch (err) {
      next(err);
    }
  }

  async getMe(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const user = await authService.getMe(req.user!.sub);
      sendSuccess(res, { user });
    } catch (err) {
      next(err);
    }
  }
}

export const authController = new AuthController();

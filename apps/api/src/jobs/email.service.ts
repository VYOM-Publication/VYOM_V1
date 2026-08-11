import nodemailer from 'nodemailer';
import { config } from '../config';
import { logger } from '../shared/utils/logger';

/**
 * Email service stub.
 * In development, logs emails to console (Ethereal or console transport).
 * In production, connects to AWS SES via SMTP.
 *
 * Full template system belongs to the Notifications phase.
 */
class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: config.email.smtpHost,
      port: config.email.smtpPort,
      auth: { user: config.email.smtpUser, pass: config.email.smtpPass },
    });
  }

  async sendVerificationEmail(
    to: string,
    name: string,
    token: string,
  ): Promise<void> {
    const verifyUrl = `${config.frontendUrl}/verify-email?token=${token}`;
    await this.send(to, 'Verify your VYOM Publication account', `
      <p>Hello ${name},</p>
      <p>Please verify your email address by clicking the link below:</p>
      <p><a href="${verifyUrl}">${verifyUrl}</a></p>
      <p>This link expires in 24 hours.</p>
      <p>VYOM Publication Team</p>
    `);
  }

  async sendPasswordResetEmail(
    to: string,
    name: string,
    token: string,
  ): Promise<void> {
    const resetUrl = `${config.frontendUrl}/reset-password?token=${token}`;
    await this.send(to, 'Reset your VYOM Publication password', `
      <p>Hello ${name},</p>
      <p>You requested a password reset. Click the link below to set a new password:</p>
      <p><a href="${resetUrl}">${resetUrl}</a></p>
      <p>This link expires in 1 hour. If you did not request this, ignore this email.</p>
      <p>VYOM Publication Team</p>
    `);
  }

  private async send(to: string, subject: string, html: string): Promise<void> {
    try {
      const info = await this.transporter.sendMail({
        from: `"${config.email.fromName}" <${config.email.from}>`,
        to,
        subject,
        html,
      });
      logger.debug('Email sent', { messageId: info.messageId, to, subject });
    } catch (err) {
      logger.error('Email send failed', { err, to, subject });
      throw err;
    }
  }
}

export const emailService = new EmailService();

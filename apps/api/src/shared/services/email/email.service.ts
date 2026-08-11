import fs from 'fs';
import path from 'path';
import nodemailer from 'nodemailer';
import { config } from '../../../config';
import { logger } from '../../utils/logger';

export interface EmailOptions {
  to: string;
  subject: string;
  text: string;
  html: string;
}

export abstract class EmailProvider {
  abstract sendEmail(options: EmailOptions): Promise<boolean>;
}

export class MockEmailProvider extends EmailProvider {
  private logDir: string;

  constructor() {
    super();
    this.logDir = path.resolve(__dirname, '../../../../logs/emails');
    if (!fs.existsSync(this.logDir)) {
      fs.mkdirSync(this.logDir, { recursive: true });
    }
  }

  async sendEmail(options: EmailOptions): Promise<boolean> {
    const filename = `${Date.now()}-${options.to.replace(/[^a-zA-Z0-9]/g, '_')}.html`;
    const logPath = path.join(this.logDir, filename);

    const emailContent = `
      Date: ${new Date().toISOString()}
      To: ${options.to}
      Subject: ${options.subject}
      -----------------------------------------
      Text Content:
      ${options.text}
      -----------------------------------------
      HTML Content:
      ${options.html}
    `;

    await fs.promises.writeFile(logPath, emailContent);
    logger.info(`[MockEmail] Email simulated and logged to file: logs/emails/${filename}`);
    return true;
  }
}

export class SmtpEmailProvider extends EmailProvider {
  private transporter: nodemailer.Transporter | null = null;

  constructor() {
    super();
    // Validate credentials, fallback if missing
    const host = process.env.SMTP_HOST;
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;

    if (!host || !user || !pass) {
      logger.warn('SMTP credentials missing. Using Mock Email Provider.');
      return;
    }

    try {
      this.transporter = nodemailer.createTransport({
        host: config.email.smtpHost,
        port: config.email.smtpPort,
        secure: config.email.smtpPort === 465,
        auth: {
          user: config.email.smtpUser,
          pass: config.email.smtpPass,
        },
      });
    } catch (err) {
      logger.error('Failed to initialize nodemailer transporter', { err });
    }
  }

  async sendEmail(options: EmailOptions): Promise<boolean> {
    if (!this.transporter) {
      const fallback = new MockEmailProvider();
      return fallback.sendEmail(options);
    }

    try {
      const info = await this.transporter.sendMail({
        from: `"${config.email.fromName}" <${config.email.from}>`,
        to: options.to,
        subject: options.subject,
        text: options.text,
        html: options.html,
      });

      logger.info(`Email sent successfully: ${info.messageId}`);
      return true;
    } catch (err) {
      logger.error('Failed to send email via SMTP, falling back to mock logging', { err });
      const fallback = new MockEmailProvider();
      return fallback.sendEmail(options);
    }
  }
}

let emailProvider: EmailProvider | null = null;

export function getEmailProvider(): EmailProvider {
  if (emailProvider) return emailProvider;

  const providerType = process.env.EMAIL_PROVIDER || 'mock';

  if (providerType === 'smtp') {
    emailProvider = new SmtpEmailProvider();
  } else {
    emailProvider = new MockEmailProvider();
  }

  logger.info(`Email Provider initialized: ${emailProvider.constructor.name}`);
  return emailProvider;
}

// Concrete helper class for sending specific workflow emails
export class EmailService {
  private provider: EmailProvider;

  constructor() {
    this.provider = getEmailProvider();
  }

  async sendRegistrationEmail(email: string, fullName: string, verificationUrl: string): Promise<boolean> {
    return this.provider.sendEmail({
      to: email,
      subject: 'Verify your VYOM Publication account',
      text: `Hello ${fullName}, verify your account by clicking: ${verificationUrl}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eaeaea; border-radius: 5px;">
          <h2>Welcome to VYOM Publication, ${fullName}!</h2>
          <p>Please verify your email address to complete your registration.</p>
          <a href="${verificationUrl}" style="background-color: #3b82f6; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">Verify Email</a>
          <p style="margin-top: 20px; font-size: 12px; color: #888;">If you did not request this, you can ignore this email.</p>
        </div>
      `,
    });
  }

  async sendForgotPasswordEmail(email: string, fullName: string, resetUrl: string): Promise<boolean> {
    return this.provider.sendEmail({
      to: email,
      subject: 'Reset your password - VYOM Publication',
      text: `Hello ${fullName}, reset your password by clicking: ${resetUrl}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eaeaea; border-radius: 5px;">
          <h2>Reset Your Password</h2>
          <p>Hello ${fullName}, we received a request to reset your password.</p>
          <a href="${resetUrl}" style="background-color: #ef4444; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">Reset Password</a>
          <p style="margin-top: 20px; font-size: 12px; color: #888;">This link will expire in 1 hour.</p>
        </div>
      `,
    });
  }

  async sendSubmissionConfirmation(email: string, authorName: string, submissionTitle: string, submissionId: string): Promise<boolean> {
    return this.provider.sendEmail({
      to: email,
      subject: `Submission Received: ${submissionTitle}`,
      text: `Hello ${authorName}, your abstract submission "${submissionTitle}" has been received. ID: ${submissionId}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eaeaea; border-radius: 5px;">
          <h2>Abstract Submission Received</h2>
          <p>Dear ${authorName},</p>
          <p>Thank you for submitting your abstract to VYOM Publication:</p>
          <blockquote style="border-left: 4px solid #3b82f6; padding-left: 10px; margin: 20px 0; font-style: italic;">
            "${submissionTitle}"
          </blockquote>
          <p>Our editorial team will review the abstract shortly. You can track the status in your Author Dashboard.</p>
        </div>
      `,
    });
  }

  async sendReviewAssignmentNotification(email: string, reviewerName: string, submissionTitle: string, dueDate: Date): Promise<boolean> {
    return this.provider.sendEmail({
      to: email,
      subject: 'Manuscript Review Assignment - VYOM Publication',
      text: `Hello ${reviewerName}, you have been assigned to review "${submissionTitle}". Due Date: ${dueDate.toLocaleDateString()}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eaeaea; border-radius: 5px;">
          <h2>Review Assignment</h2>
          <p>Dear ${reviewerName},</p>
          <p>You have been assigned to review the following manuscript:</p>
          <blockquote style="border-left: 4px solid #3b82f6; padding-left: 10px; margin: 20px 0; font-style: italic;">
            "${submissionTitle}"
          </blockquote>
          <p><strong>Due Date:</strong> ${dueDate.toLocaleDateString()}</p>
          <p>Please log into your Reviewer Dashboard to accept the assignment and submit your report.</p>
        </div>
      `,
    });
  }

  async sendWorkflowDecisionNotification(email: string, authorName: string, submissionTitle: string, decision: string, comments?: string): Promise<boolean> {
    const formattedDecision = decision.replace(/_/g, ' ').toUpperCase();
    return this.provider.sendEmail({
      to: email,
      subject: `Editorial Decision: ${submissionTitle} - ${formattedDecision}`,
      text: `Hello ${authorName}, an editorial decision has been made on "${submissionTitle}": ${formattedDecision}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eaeaea; border-radius: 5px;">
          <h2>Editorial Decision</h2>
          <p>Dear ${authorName},</p>
          <p>An editorial decision has been reached regarding your submission:</p>
          <blockquote style="border-left: 4px solid #3b82f6; padding-left: 10px; margin: 20px 0; font-style: italic;">
            "${submissionTitle}"
          </blockquote>
          <p><strong>Decision:</strong> <span style="color: #3b82f6; font-weight: bold;">${formattedDecision}</span></p>
          ${comments ? `<div style="background-color: #f9fafb; padding: 15px; border-radius: 5px; margin-top: 15px;"><strong>Editor Comments:</strong><br/>${comments}</div>` : ''}
          <p style="margin-top: 20px;">Please check your Author Dashboard for next steps.</p>
        </div>
      `,
    });
  }

  async sendPublicationConfirmation(email: string, authorName: string, title: string, doi?: string): Promise<boolean> {
    return this.provider.sendEmail({
      to: email,
      subject: 'Congratulations! Your article has been published',
      text: `Hello ${authorName}, your article "${title}" has been published. DOI: ${doi || 'Pending'}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eaeaea; border-radius: 5px; border-top: 4px solid #10b981;">
          <h2 style="color: #10b981;">Congratulations!</h2>
          <p>Dear ${authorName},</p>
          <p>We are pleased to inform you that your work has been officially published on the VYOM Publication platform:</p>
          <blockquote style="border-left: 4px solid #10b981; padding-left: 10px; margin: 20px 0; font-weight: bold;">
            "${title}"
          </blockquote>
          ${doi ? `<p><strong>Digital Object Identifier (DOI):</strong> <a href="https://doi.org/${doi}">${doi}</a></p>` : ''}
          <p>It is now publicly accessible to our global network of readers, researchers, and libraries.</p>
        </div>
      `,
    });
  }
}
export const emailService = new EmailService();

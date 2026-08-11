import { Request, Response, NextFunction } from 'express';
import { paymentsService } from './payments.service';
import { sendSuccess } from '../../shared/utils/response';
import { BadRequestError } from '../../shared/errors';
import { Role } from '@vyom/constants';

export class PaymentsController {
  async createPayment(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user.sub;
      const { submissionId, bookId, currency } = req.body;

      if (!submissionId && !bookId) {
        throw new BadRequestError('submissionId or bookId is required');
      }

      // amount is NOT accepted from the client — the service derives it server-side
      const payment = await paymentsService.createPayment(userId, {
        submissionId,
        bookId,
        amount: 0, // ignored by service; canonical amount looked up from DB
        currency,
      });

      sendSuccess(res, { payment }, 'Payment order created successfully', 201);
    } catch (err) {
      next(err);
    }
  }

  async verifyPayment(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user.sub;
      const { paymentId, orderId, signature } = req.body;

      if (!paymentId || !orderId || !signature) {
        throw new BadRequestError('paymentId, orderId, and signature are required');
      }

      const payment = await paymentsService.verifyPayment(userId, { paymentId, orderId, signature });
      sendSuccess(res, { payment }, 'Payment verified successfully');
    } catch (err) {
      next(err);
    }
  }

  async simulateWebhook(req: Request, res: Response, next: NextFunction) {
    try {
      const { transactionId, status } = req.body;

      if (!transactionId || (status !== 'success' && status !== 'failure')) {
        throw new BadRequestError('transactionId and status (success/failure) are required');
      }

      const payment = await paymentsService.handleMockWebhook(transactionId, status);
      sendSuccess(res, { payment }, `Mock webhook callback simulation successful. Status: ${status}`);
    } catch (err) {
      next(err);
    }
  }

  async getPayments(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user.sub;
      const roles = (req as any).user.roles;

      let query: any = {};
      
      // Regular users and authors can only see their own transactions
      const hasPrivileges = roles.includes(Role.ADMIN) || roles.includes(Role.EDITOR);
      if (!hasPrivileges) {
        query.userId = userId;
      }

      const payments = await paymentsService.getPayments(query);
      sendSuccess(res, { payments });
    } catch (err) {
      next(err);
    }
  }
}

export const paymentsController = new PaymentsController();

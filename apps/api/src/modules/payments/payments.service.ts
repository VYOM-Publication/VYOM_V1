import { Payment } from '../../models/payment.model';
import { Submission } from '../../models/submission.model';
import { Book } from '../../models/book.model';
import { Notification } from '../../models/notification.model';
import { getPaymentProvider } from '../../shared/services/payment/payment.provider';
import { NotFoundError, BadRequestError } from '../../shared/errors';
import { PaymentStatus, SubmissionStatus } from '@vyom/types';
import { Types } from 'mongoose';
import { logger } from '../../shared/utils/logger';

export class PaymentsService {
  async createPayment(userId: string, data: { submissionId?: string; bookId?: string; amount: number; currency?: string }) {
    const currency = data.currency || 'INR';

    // ── APC validation ────────────────────────────────────────────────────────
    // The canonical Article Processing Charge is defined server-side.
    // We do NOT trust the amount from the client request.
    // For submission payments: always charge the configured APC.
    // For book purchases: the price is read from the Book document.
    const SUBMISSION_APC_INR = 8500;

    let authorisedAmount: number;

    if (data.submissionId) {
      const submission = await Submission.findById(data.submissionId);
      if (!submission) throw new NotFoundError('Submission not found');

      // Only the submission's own author may create a payment for it
      if (submission.authorId.toString() !== userId) {
        throw new BadRequestError('You are not authorised to pay for this submission');
      }

      // Submission must be in ACCEPTED state before payment is due
      if (submission.status !== SubmissionStatus.ACCEPTED) {
        throw new BadRequestError('Payment is only accepted for submissions in ACCEPTED status');
      }

      if (submission.paymentStatus === 'paid') {
        throw new BadRequestError('This submission has already been paid');
      }

      // Ignore whatever the client sent — use the server-side APC
      authorisedAmount = SUBMISSION_APC_INR;
    } else if (data.bookId) {
      const book = await Book.findById(data.bookId);
      if (!book) throw new NotFoundError('Book not found');

      // Use the book's own price, not the client-supplied amount
      authorisedAmount = book.price;
    } else {
      throw new BadRequestError('submissionId or bookId is required');
    }

    const provider = getPaymentProvider();

    // Create transaction in provider (Razorpay or Mock)
    const receiptId = `rcpt_${Date.now()}`;
    const order = await provider.createOrder(authorisedAmount, currency, receiptId);

    // Save initial payment record using the server-authorised amount
    const payment = new Payment({
      userId: new Types.ObjectId(userId),
      submissionId: data.submissionId ? new Types.ObjectId(data.submissionId) : undefined,
      bookId: data.bookId ? new Types.ObjectId(data.bookId) : undefined,
      amount: authorisedAmount,
      currency,
      gateway: process.env.PAYMENT_PROVIDER === 'razorpay' ? 'razorpay' : 'mock',
      status: PaymentStatus.PENDING,
      transactionId: order.id,
      receiptUrl: receiptId,
    });

    await payment.save();
    return payment;
  }

  async verifyPayment(userId: string, data: { paymentId: string; orderId: string; signature: string }) {
    const payment = await Payment.findOne({ transactionId: data.orderId });
    if (!payment) throw new NotFoundError('Payment record not found');

    // Ownership check — prevent one user from verifying another user's payment order
    if (payment.userId.toString() !== userId) {
      throw new BadRequestError('Payment order does not belong to the requesting user');
    }

    const provider = getPaymentProvider();
    const isValid = await provider.verifyPayment(data.paymentId, data.orderId, data.signature);

    if (!isValid) {
      payment.status = PaymentStatus.FAILED;
      await payment.save();
      throw new BadRequestError('Payment signature verification failed');
    }

    payment.status = PaymentStatus.COMPLETED;
    await payment.save();

    // Trigger workflow updates
    if (payment.submissionId) {
      const submission = await Submission.findById(payment.submissionId);
      if (submission) {
        submission.paymentStatus = 'paid';
        submission.paymentId = payment._id as any;
        if (submission.status === SubmissionStatus.ACCEPTED) {
          submission.status = SubmissionStatus.PAID;
        }
        await submission.save();

        // Notify author
        await new Notification({
          userId: submission.authorId,
          title: 'Payment Completed Successfully',
          message: `The payment for "${submission.title}" has been successfully verified. Status: Paid.`,
          type: 'success',
          link: `/author/dashboard`,
        }).save();
      }
    }

    if (payment.bookId) {
      // Notify purchaser
      await new Notification({
        userId: payment.userId,
        title: 'Book Purchase Successful',
        message: 'Your purchase is completed. The book has been added to your Saved Books list.',
        type: 'success',
        link: `/member/dashboard`,
      }).save();
    }

    return payment;
  }

  async handleMockWebhook(transactionId: string, status: 'success' | 'failure') {
    const payment = await Payment.findOne({ transactionId });
    if (!payment) throw new NotFoundError('Payment record not found');

    logger.info(`[MockWebhook] Processing mock payment webhook: ${transactionId} -> ${status}`);

    if (status === 'success') {
      payment.status = PaymentStatus.COMPLETED;
      await payment.save();

      if (payment.submissionId) {
        const submission = await Submission.findById(payment.submissionId);
        if (submission) {
          submission.paymentStatus = 'paid';
          submission.paymentId = payment._id as any;
          if (submission.status === SubmissionStatus.ACCEPTED) {
            submission.status = SubmissionStatus.PAID;
          }
          await submission.save();

          await new Notification({
            userId: submission.authorId,
            title: 'Payment Verified via Webhook',
            message: `Payment order ${transactionId} confirmed. status updated to Paid.`,
            type: 'success',
            link: `/author/dashboard`,
          }).save();
        }
      }
    } else {
      payment.status = PaymentStatus.FAILED;
      await payment.save();
    }

    return payment;
  }

  async getPayments(query: { userId?: string }) {
    const filter: any = {};
    if (query.userId) filter.userId = new Types.ObjectId(query.userId);

    return Payment.find(filter)
      .populate('userId', 'fullName email')
      .populate('submissionId', 'title')
      .populate('bookId', 'title')
      .sort({ createdAt: -1 });
  }
}

export const paymentsService = new PaymentsService();

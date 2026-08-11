import { v4 as uuidv4 } from 'uuid';
import { logger } from '../../utils/logger';

export interface CreateOrderOutput {
  id: string;
  amount: number;
  currency: string;
  status: string;
}

export abstract class PaymentProvider {
  abstract createOrder(amount: number, currency: string, receiptId: string): Promise<CreateOrderOutput>;
  abstract verifyPayment(paymentId: string, orderId: string, signature: string): Promise<boolean>;
  abstract refundPayment(paymentId: string, amount: number): Promise<{ success: boolean; refundId?: string }>;
}

export class MockPaymentProvider extends PaymentProvider {
  async createOrder(amount: number, currency: string, _receiptId: string): Promise<CreateOrderOutput> {
    const orderId = `mock_order_${uuidv4().replace(/-/g, '').substring(0, 14)}`;
    logger.info(`[MockPayment] Order created: ${orderId} for amount ${amount} ${currency}`);
    return {
      id: orderId,
      amount,
      currency,
      status: 'created',
    };
  }

  async verifyPayment(paymentId: string, orderId: string, signature: string): Promise<boolean> {
    logger.info(`[MockPayment] Verifying payment: ${paymentId} for order: ${orderId}`);
    // In mock provider, any signature starting with 'valid_' or containing 'mock' is successful.
    // If it contains 'fail', it simulates a failed signature.
    if (signature.includes('fail')) {
      return false;
    }
    return true;
  }

  async refundPayment(paymentId: string, amount: number): Promise<{ success: boolean; refundId?: string }> {
    const refundId = `mock_refund_${uuidv4().replace(/-/g, '').substring(0, 14)}`;
    logger.info(`[MockPayment] Refund issued: ${refundId} for payment ${paymentId} amount ${amount}`);
    return {
      success: true,
      refundId,
    };
  }
}

export class RazorpayPaymentProvider extends PaymentProvider {
  async createOrder(amount: number, currency: string, receiptId: string): Promise<CreateOrderOutput> {
    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keyId || !keySecret) {
      logger.warn('Razorpay credentials missing. Falling back to Mock Payment Provider.');
      const fallback = new MockPaymentProvider();
      return fallback.createOrder(amount, currency, receiptId);
    }

    logger.info(`[Razorpay] Creating real order for ${amount} ${currency} using keys`);
    // Dynamic import of Razorpay to avoid crashes if SDK isn't fully set up or required in development
    try {
      const Razorpay = require('razorpay');
      const rz = new Razorpay({ key_id: keyId, key_secret: keySecret });
      const order = await rz.orders.create({
        amount: Math.round(amount * 100), // Razorpay expects amount in paise/cents
        currency,
        receipt: receiptId,
      });

      return {
        id: order.id,
        amount: order.amount / 100,
        currency: order.currency,
        status: order.status,
      };
    } catch (err) {
      logger.error('Failed to create Razorpay order, falling back to mock', { err });
      const fallback = new MockPaymentProvider();
      return fallback.createOrder(amount, currency, receiptId);
    }
  }

  async verifyPayment(paymentId: string, orderId: string, signature: string): Promise<boolean> {
    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    if (!keySecret) {
      logger.warn('Razorpay key secret missing. Using mock verification.');
      return true;
    }

    try {
      const crypto = require('crypto');
      const generated_signature = crypto
        .createHmac('sha256', keySecret)
        .update(`${orderId}|${paymentId}`)
        .digest('hex');

      return generated_signature === signature;
    } catch (err) {
      logger.error('Razorpay verification error', { err });
      return false;
    }
  }

  async refundPayment(paymentId: string, amount: number): Promise<{ success: boolean; refundId?: string }> {
    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keyId || !keySecret) {
      logger.warn('Razorpay credentials missing. Using mock refund.');
      return { success: true, refundId: `mock_ref_${uuidv4().substring(0, 8)}` };
    }

    try {
      const Razorpay = require('razorpay');
      const rz = new Razorpay({ key_id: keyId, key_secret: keySecret });
      const refund = await rz.payments.refund(paymentId, { amount: Math.round(amount * 100) });
      return {
        success: true,
        refundId: refund.id,
      };
    } catch (err) {
      logger.error('Razorpay refund error', { err });
      return { success: false };
    }
  }
}

let paymentProvider: PaymentProvider | null = null;

export function getPaymentProvider(): PaymentProvider {
  if (paymentProvider) return paymentProvider;

  const providerType = process.env.PAYMENT_PROVIDER || 'mock';

  if (providerType === 'razorpay') {
    paymentProvider = new RazorpayPaymentProvider();
  } else {
    paymentProvider = new MockPaymentProvider();
  }

  logger.info(`Payment Provider initialized: ${paymentProvider.constructor.name}`);
  return paymentProvider;
}

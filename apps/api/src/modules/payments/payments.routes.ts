import { Router } from 'express';
import { paymentsController } from './payments.controller';
import { authenticate } from '../../middleware/authenticate.middleware';

const router = Router();

// Logged-in transactions retrieval and creation
router.get('/', authenticate, (req, res, next) => paymentsController.getPayments(req, res, next));
router.post('/', authenticate, (req, res, next) => paymentsController.createPayment(req, res, next));
router.post('/verify', authenticate, (req, res, next) => paymentsController.verifyPayment(req, res, next));

// Simulated mock webhook — only reachable in non-production environments
// and only when PAYMENT_PROVIDER is not razorpay.
// In production this endpoint is blocked entirely to prevent payment fraud.
router.post('/webhook/mock', (req, res, next) => {
  if (process.env.NODE_ENV === 'production') {
    return res.status(404).json({ success: false, message: 'Not found' });
  }
  if (process.env.PAYMENT_PROVIDER === 'razorpay') {
    return res.status(403).json({ success: false, message: 'Simulated webhook is only available in Mock mode' });
  }
  return paymentsController.simulateWebhook(req, res, next);
});

export default router;

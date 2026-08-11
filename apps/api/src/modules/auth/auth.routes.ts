import { Router } from 'express';
import { authController } from './auth.controller';
import { validateBody } from '../../middleware/validate-request.middleware';
import { authenticate } from '../../middleware/authenticate.middleware';
import { authRateLimiter } from '../../middleware/rate-limiter.middleware';
import {
  registerSchema,
  loginSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
} from '@vyom/validations';

const router = Router();

router.post('/register', authRateLimiter, validateBody(registerSchema), (req, res, next) =>
  authController.register(req, res, next),
);

router.post('/login', authRateLimiter, validateBody(loginSchema), (req, res, next) =>
  authController.login(req, res, next),
);

router.post('/logout', (req, res, next) => authController.logout(req, res, next));

router.post('/refresh', (req, res, next) => authController.refresh(req, res, next));

router.get('/verify-email', (req, res, next) => authController.verifyEmail(req, res, next));

router.post(
  '/forgot-password',
  authRateLimiter,
  validateBody(forgotPasswordSchema),
  (req, res, next) => authController.forgotPassword(req, res, next),
);

router.post(
  '/reset-password',
  authRateLimiter,
  validateBody(resetPasswordSchema),
  (req, res, next) => authController.resetPassword(req, res, next),
);

router.post(
  '/resend-verification',
  authRateLimiter,
  (req, res, next) => authController.resendVerification(req, res, next),
);

router.get('/me', authenticate, (req, res, next) => authController.getMe(req, res, next));

export default router;

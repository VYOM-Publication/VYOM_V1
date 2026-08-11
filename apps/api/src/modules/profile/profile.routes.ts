import { Router } from 'express';
import { profileController } from './profile.controller';
import { authenticate } from '../../middleware/authenticate.middleware';

const router = Router();

router.get('/me', authenticate, (req, res, next) => profileController.getProfile(req, res, next));
router.put('/me', authenticate, (req, res, next) => profileController.updateProfile(req, res, next));

export default router;

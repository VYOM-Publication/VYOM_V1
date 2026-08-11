import { Request, Response, NextFunction } from 'express';
import { profileService } from './profile.service';
import { sendSuccess } from '../../shared/utils/response';

export class ProfileController {
  async getProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user.sub;
      const profile = await profileService.getProfile(userId);
      sendSuccess(res, profile);
    } catch (err) {
      next(err);
    }
  }

  async updateProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user.sub;
      const profile = await profileService.updateProfile(userId, req.body);
      sendSuccess(res, profile, 'Profile updated successfully');
    } catch (err) {
      next(err);
    }
  }
}

export const profileController = new ProfileController();

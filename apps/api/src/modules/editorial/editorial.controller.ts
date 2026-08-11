import { Request, Response, NextFunction } from 'express';
import { editorialService } from './editorial.service';
import { sendSuccess } from '../../shared/utils/response';
import { BadRequestError } from '../../shared/errors';

export class EditorialController {
  async getMembers(_req: Request, res: Response, next: NextFunction) {
    try {
      const members = await editorialService.getBoardMembers();
      sendSuccess(res, { members });
    } catch (err) {
      next(err);
    }
  }

  async addOrUpdateMember(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId, designation, bio, researchInterests, qualifications, photoUrl, sortOrder } = req.body;
      if (!userId || !designation || !bio) {
        throw new BadRequestError('userId, designation, and bio are required parameters');
      }

      const member = await editorialService.addOrUpdateMember({
        userId,
        designation,
        bio,
        researchInterests,
        qualifications,
        photoUrl,
        sortOrder: sortOrder ? Number(sortOrder) : undefined,
      });

      sendSuccess(res, { member }, 'Editorial board member saved successfully');
    } catch (err) {
      next(err);
    }
  }

  async removeMember(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.params.userId;
      await editorialService.removeMember(userId);
      sendSuccess(res, null, 'Member removed from Editorial Board successfully');
    } catch (err) {
      next(err);
    }
  }
}

export const editorialController = new EditorialController();

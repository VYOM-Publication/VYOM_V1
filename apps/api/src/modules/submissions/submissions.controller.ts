import { Request, Response, NextFunction } from 'express';
import { submissionsService } from './submissions.service';
import { sendSuccess } from '../../shared/utils/response';
import {
  createAbstractSchema,
  submitDecisionSchema,
  submitRevisionSchema,
  submitReviewSchema,
} from '@vyom/validations';
import { BadRequestError } from '../../shared/errors';
import { Role } from '@vyom/constants';

export class SubmissionsController {
  async submitAbstract(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user.sub;
      const data = createAbstractSchema.parse(req.body);
      const submission = await submissionsService.submitAbstract(userId, data);
      sendSuccess(res, { submission }, 'Abstract submitted successfully', 201);
    } catch (err) {
      next(err);
    }
  }

  async getSubmissions(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user.sub;
      const roles = (req as any).user.roles;
      
      const query: any = {};

      // Scope results by role:
      //   Authors   → only their own submissions
      //   Reviewers → only submissions they are assigned to (enforced in service getSubmissionById;
      //               for the list we pass reviewerId so the service can filter)
      //   Editors / Admins → all submissions
      if (roles.includes(Role.ADMIN) || roles.includes(Role.EDITOR)) {
        // No additional filter — full visibility
      } else if (roles.includes(Role.REVIEWER)) {
        // Reviewers may only list submissions where they are an assigned reviewer.
        // The service filters by reviewerIds array membership.
        query.reviewerId = userId;
      } else {
        // Author (and any unrecognised role) → own submissions only
        query.authorId = userId;
      }
      
      if (req.query.status) {
        query.status = req.query.status as string;
      }

      const submissions = await submissionsService.getSubmissions(query);
      sendSuccess(res, { submissions });
    } catch (err) {
      next(err);
    }
  }

  async getSubmissionById(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user.sub;
      const roles = (req as any).user.roles;
      const submissionId = req.params.id;

      const data = await submissionsService.getSubmissionById(submissionId, userId, roles);
      sendSuccess(res, data);
    } catch (err) {
      next(err);
    }
  }

  async reviewAbstract(req: Request, res: Response, next: NextFunction) {
    try {
      const editorId = (req as any).user.sub;
      const submissionId = req.params.id;
      const { decision, comments } = req.body;

      if (decision !== 'approve' && decision !== 'reject') {
        throw new BadRequestError('Decision must be approve or reject');
      }

      const submission = await submissionsService.reviewAbstract(submissionId, editorId, decision, comments);
      sendSuccess(res, { submission }, `Abstract ${decision}d successfully`);
    } catch (err) {
      next(err);
    }
  }

  async uploadManuscript(req: Request, res: Response, next: NextFunction) {
    try {
      const authorId = (req as any).user.sub;
      const submissionId = req.params.id;
      const data = submitRevisionSchema.parse(req.body);

      const submission = await submissionsService.uploadManuscript(submissionId, authorId, {
        url: data.fileUrl,
        name: data.fileName,
        type: data.fileType,
      });

      sendSuccess(res, { submission }, 'Manuscript uploaded successfully');
    } catch (err) {
      next(err);
    }
  }

  async assignReviewer(req: Request, res: Response, next: NextFunction) {
    try {
      const editorId = (req as any).user.sub;
      const submissionId = req.params.id;
      const { reviewerId, dueDate } = req.body;

      if (!reviewerId || !dueDate) {
        throw new BadRequestError('reviewerId and dueDate are required');
      }

      const parsedDueDate = new Date(dueDate);
      if (isNaN(parsedDueDate.getTime())) {
        throw new BadRequestError('Invalid due date format');
      }

      const result = await submissionsService.assignReviewer(submissionId, editorId, reviewerId, parsedDueDate);
      sendSuccess(res, result, 'Reviewer assigned successfully');
    } catch (err) {
      next(err);
    }
  }

  async submitReview(req: Request, res: Response, next: NextFunction) {
    try {
      const reviewerId = (req as any).user.sub;
      const reviewId = req.params.reviewId;
      const data = submitReviewSchema.parse(req.body);

      const review = await submissionsService.submitReview(reviewId, reviewerId, data);
      sendSuccess(res, { review }, 'Review submitted successfully');
    } catch (err) {
      next(err);
    }
  }

  async makeDecision(req: Request, res: Response, next: NextFunction) {
    try {
      const editorId = (req as any).user.sub;
      const submissionId = req.params.id;
      const { decision, comments } = submitDecisionSchema.parse(req.body);

      const submission = await submissionsService.makeDecision(submissionId, editorId, decision, comments);
      sendSuccess(res, { submission }, 'Editorial decision updated successfully');
    } catch (err) {
      next(err);
    }
  }

  async publishSubmission(req: Request, res: Response, next: NextFunction) {
    try {
      const editorId = (req as any).user.sub;
      const submissionId = req.params.id;
      const { volume, issue, pageRange, doi, categoryIds } = req.body;

      if (!volume || !issue || !pageRange || !categoryIds || !Array.isArray(categoryIds)) {
        throw new BadRequestError('volume, issue, pageRange, and categoryIds are required parameters');
      }

      const result = await submissionsService.publishSubmission(submissionId, editorId, {
        volume: parseInt(volume, 10),
        issue: parseInt(issue, 10),
        pageRange,
        doi,
        categoryIds,
      });

      sendSuccess(res, result, 'Submission published and article created successfully');
    } catch (err) {
      next(err);
    }
  }
}

export const submissionsController = new SubmissionsController();

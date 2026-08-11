import { Router } from 'express';
import { submissionsController } from './submissions.controller';
import { authenticate } from '../../middleware/authenticate.middleware';
import { authorize } from '../../middleware/authorize.middleware';
import { Permission } from '@vyom/constants';

const router = Router();

// Submissions listing & details
router.get('/', authenticate, (req, res, next) => submissionsController.getSubmissions(req, res, next));
router.get('/:id', authenticate, (req, res, next) => submissionsController.getSubmissionById(req, res, next));

// Author flows
router.post('/abstract', authenticate, authorize(Permission.SUBMISSION_CREATE), (req, res, next) =>
  submissionsController.submitAbstract(req, res, next)
);
router.post('/:id/manuscript', authenticate, authorize(Permission.SUBMISSION_CREATE), (req, res, next) =>
  submissionsController.uploadManuscript(req, res, next)
);

// Reviewer flows
router.post('/reviews/:reviewId/submit', authenticate, authorize(Permission.REVIEW_SUBMIT), (req, res, next) =>
  submissionsController.submitReview(req, res, next)
);

// Editor flows
router.post('/:id/review-abstract', authenticate, authorize(Permission.SUBMISSION_DECISION), (req, res, next) =>
  submissionsController.reviewAbstract(req, res, next)
);
router.post('/:id/assign-reviewer', authenticate, authorize(Permission.SUBMISSION_DECISION), (req, res, next) =>
  submissionsController.assignReviewer(req, res, next)
);
router.post('/:id/decision', authenticate, authorize(Permission.SUBMISSION_DECISION), (req, res, next) =>
  submissionsController.makeDecision(req, res, next)
);
router.post('/:id/publish', authenticate, authorize(Permission.CONTENT_PUBLISH), (req, res, next) =>
  submissionsController.publishSubmission(req, res, next)
);

export default router;

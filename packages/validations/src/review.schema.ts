import { z } from 'zod';
import { ReviewRecommendation } from '@vyom/types';

export const createReviewSchema = z.object({
  submissionId: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid submission ID'),
  reviewerId: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid reviewer user ID'),
  dueDate: z.string().transform((val) => new Date(val)),
});

export const submitReviewSchema = z.object({
  score: z.number().int().min(1, 'Score must be at least 1').max(10, 'Score cannot exceed 10'),
  commentsForAuthor: z.string().min(10, 'Comments for author must be at least 10 characters').max(3000),
  commentsForEditor: z.string().max(3000).optional(),
  recommendation: z.enum([
    ReviewRecommendation.ACCEPT,
    ReviewRecommendation.MINOR_REVISION,
    ReviewRecommendation.MAJOR_REVISION,
    ReviewRecommendation.REJECT,
  ]),
});

export type CreateReviewInput = z.infer<typeof createReviewSchema>;
export type SubmitReviewInput = z.infer<typeof submitReviewSchema>;

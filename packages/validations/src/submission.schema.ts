import { z } from 'zod';
import { SubmissionStatus } from '@vyom/types';

export const createAbstractSchema = z.object({
  title: z
    .string()
    .min(5, 'Title must be at least 5 characters')
    .max(200, 'Title must not exceed 200 characters'),
  abstract: z
    .string()
    .min(50, 'Abstract must be at least 50 characters')
    .max(2000, 'Abstract must not exceed 2000 characters'),
  keywords: z
    .array(z.string().min(1, 'Keyword cannot be empty'))
    .min(1, 'Provide at least 1 keyword')
    .max(10, 'Provide at most 10 keywords'),
});

export const assignReviewersSchema = z.object({
  reviewerIds: z
    .array(z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid reviewer user ID'))
    .min(1, 'Assign at least one reviewer')
    .max(5, 'Maximum of 5 reviewers per submission'),
});

export const submitDecisionSchema = z.object({
  decision: z.enum([
    SubmissionStatus.ACCEPTED,
    SubmissionStatus.REJECTED,
    SubmissionStatus.REVISION_REQUESTED,
  ]),
  comments: z.string().max(1000, 'Comments must not exceed 1000 characters').optional(),
});

export const submitRevisionSchema = z.object({
  fileUrl: z.string().url('Invalid file URL'),
  fileName: z.string().min(1, 'File name is required'),
  fileType: z.string().min(1, 'File type is required'),
  comments: z.string().max(1000, 'Comments must not exceed 1000 characters').optional(),
});

export type CreateAbstractInput = z.infer<typeof createAbstractSchema>;
export type AssignReviewersInput = z.infer<typeof assignReviewersSchema>;
export type SubmitDecisionInput = z.infer<typeof submitDecisionSchema>;
export type SubmitRevisionInput = z.infer<typeof submitRevisionSchema>;

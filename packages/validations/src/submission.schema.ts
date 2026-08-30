import { z } from 'zod';
import { SubmissionStatus } from '@vyom/types';

export const createAbstractSchema = z.object({
  title: z
    .string()
    .min(5, 'Title must be at least 5 characters')
    .max(200, 'Title must not exceed 200 characters'),
  journal: z.string().min(1, 'Target journal is required'),
  articleType: z.string().min(1, 'Article type is required'),
  abstract: z
    .string()
    .min(50, 'Abstract must be at least 50 characters')
    .max(5000, 'Abstract must not exceed 5000 characters'),
  keywords: z
    .array(z.string().min(1, 'Keyword cannot be empty'))
    .min(3, 'Provide at least 3 keywords')
    .max(10, 'Provide at most 10 keywords'),
  affiliation: z.string().min(2, 'Institutional affiliation is required'),
  coAuthors: z.string().optional(),
  fundingInfo: z.string().optional(),
  originalWork: z.literal(true, {
    errorMap: () => ({ message: 'You must confirm that this is original work' }),
  }),
  conflictOfInterest: z.literal(true, {
    errorMap: () => ({ message: 'You must complete the conflict of interest declaration' }),
  }),
  ethicsApproval: z.literal(true, {
    errorMap: () => ({ message: 'You must complete the ethics approval declaration' }),
  }),
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

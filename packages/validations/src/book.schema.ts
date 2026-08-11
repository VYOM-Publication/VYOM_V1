import { z } from 'zod';
import { BookStatus, ArticleStatus } from '@vyom/types';

export const createBookSchema = z.object({
  title: z.string().min(2, 'Title must be at least 2 characters').max(200, 'Title must not exceed 200 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  authorIds: z.array(z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid author user ID')).min(1, 'At least one author is required'),
  categoryIds: z.array(z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid category ID')).min(1, 'At least one category is required'),
  coverUrl: z.string().url('Invalid cover URL').optional().or(z.literal('')),
  isbn: z.string().max(20, 'ISBN must not exceed 20 characters').optional().or(z.literal('')),
  previewPdfUrl: z.string().url('Invalid preview PDF URL').optional().or(z.literal('')),
  fullPdfUrl: z.string().url('Invalid full PDF URL').optional().or(z.literal('')),
  price: z.number().min(0, 'Price must be 0 or greater'),
  status: z.enum([BookStatus.DRAFT, BookStatus.PUBLISHED, BookStatus.ARCHIVED]).default(BookStatus.DRAFT),
  isFeatured: z.boolean().default(false),
});

export const updateBookSchema = createBookSchema.partial();

export const createArticleSchema = z.object({
  title: z.string().min(2, 'Title must be at least 2 characters').max(200, 'Title must not exceed 200 characters'),
  slug: z.string().min(2, 'Slug must be at least 2 characters').optional(),
  abstract: z.string().min(20, 'Abstract must be at least 20 characters'),
  content: z.string().optional(),
  authorIds: z.array(z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid author user ID')).min(1, 'At least one author is required'),
  submissionId: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid submission ID').optional(),
  doi: z.string().max(50, 'DOI must not exceed 50 characters').optional().or(z.literal('')),
  citationText: z.string().optional().or(z.literal('')),
  pdfUrl: z.string().url('Invalid PDF URL').optional().or(z.literal('')),
  tags: z.array(z.string()).default([]),
  categoryIds: z.array(z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid category ID')).min(1, 'At least one category is required'),
  volume: z.number().int().min(1).optional(),
  issue: z.number().int().min(1).optional(),
  pageRange: z.string().optional(),
  status: z.enum([ArticleStatus.PUBLISHED, ArticleStatus.ARCHIVED]).default(ArticleStatus.PUBLISHED),
});

export const updateArticleSchema = createArticleSchema.partial();

export type CreateBookInput = z.infer<typeof createBookSchema>;
export type UpdateBookInput = z.infer<typeof updateBookSchema>;
export type CreateArticleInput = z.infer<typeof createArticleSchema>;
export type UpdateArticleInput = z.infer<typeof updateArticleSchema>;

import { Role } from '@vyom/constants';

export interface User {
  id: string;
  email: string;
  fullName: string;
  status: UserStatus;
  emailVerified: boolean;
  roles: Role[];
  createdAt: string;
  updatedAt: string;
}

export enum UserStatus {
  PENDING_VERIFICATION = 'pending_verification',
  ACTIVE = 'active',
  SUSPENDED = 'suspended',
  DEACTIVATED = 'deactivated',
}

export interface AuthTokenPayload {
  sub: string;        // user id
  email: string;
  roles: Role[];
  iat?: number;
  exp?: number;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: ValidationError[];
  meta?: PaginationMeta;
}

export interface ValidationError {
  field: string;
  message: string;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface RoleDefinition {
  id: string;
  name: Role;
  description: string;
  isSystem: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  parentCategoryId?: string;
  createdAt: string;
  updatedAt: string;
}

export enum BookStatus {
  DRAFT = 'draft',
  PUBLISHED = 'published',
  ARCHIVED = 'archived',
}

export interface Book {
  id: string;
  title: string;
  slug: string;
  description: string;
  authorIds: string[]; // references User (roles includes AUTHOR)
  categoryIds: string[]; // references Category
  coverUrl?: string;
  isbn?: string;
  previewPdfUrl?: string;
  fullPdfUrl?: string;
  price: number;
  status: BookStatus;
  publishDate?: string;
  isFeatured: boolean;
  downloadCount: number;
  viewCount: number;
  createdAt: string;
  updatedAt: string;
}

export enum ArticleStatus {
  PUBLISHED = 'published',
  ARCHIVED = 'archived',
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  abstract: string;
  content?: string;
  authorIds: string[]; // references User
  submissionId?: string; // reference to Submission
  doi?: string;
  citationText?: string;
  pdfUrl?: string;
  viewCount: number;
  downloadCount: number;
  tags: string[];
  categoryIds: string[]; // references Category
  volume?: number;
  issue?: number;
  pageRange?: string;
  publishDate?: string;
  status: ArticleStatus;
  createdAt: string;
  updatedAt: string;
}

export enum SubmissionStatus {
  ABSTRACT_SUBMITTED = 'abstract_submitted',
  ABSTRACT_APPROVED = 'abstract_approved',
  ABSTRACT_REJECTED = 'abstract_rejected',
  MANUSCRIPT_SUBMITTED = 'manuscript_submitted',
  UNDER_REVIEW = 'under_review',
  REVISION_REQUESTED = 'revision_requested',
  ACCEPTED = 'accepted',
  REJECTED = 'rejected',
  PAID = 'paid',
  PUBLISHED = 'published',
}

export interface SubmissionVersion {
  versionNo: number;
  fileUrl: string;
  fileType: string;
  fileName: string;
  comments?: string;
  createdAt: string;
}

export interface Submission {
  id: string;
  title: string;
  abstract: string;
  keywords: string[];
  authorId: string; // reference to User (Author)
  reviewerIds: string[]; // references to Users (Reviewers)
  editorId?: string; // reference to User (Editor)
  status: SubmissionStatus;
  versions: SubmissionVersion[];
  currentVersion: number;
  paymentStatus: 'pending' | 'paid' | 'failed';
  paymentId?: string; // reference to Payment
  createdAt: string;
  updatedAt: string;
}

export enum ReviewRecommendation {
  ACCEPT = 'accept',
  MINOR_REVISION = 'minor_revision',
  MAJOR_REVISION = 'major_revision',
  REJECT = 'reject',
}

export enum ReviewStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
  DECLINED = 'declined',
}

export interface Review {
  id: string;
  submissionId: string;
  reviewerId: string;
  versionNo: number;
  commentsForAuthor?: string;
  commentsForEditor?: string;
  score?: number; // scale e.g. 1-10 or 1-5
  recommendation?: ReviewRecommendation;
  status: ReviewStatus;
  dueDate: string;
  submittedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export enum PaymentStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
  FAILED = 'failed',
}

export interface Payment {
  id: string;
  userId: string;
  submissionId?: string;
  bookId?: string;
  amount: number;
  currency: string;
  gateway: 'razorpay' | 'mock';
  status: PaymentStatus;
  transactionId?: string;
  receiptUrl?: string;
  refundStatus?: string;
  refundReason?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'danger';
  read: boolean;
  link?: string;
  createdAt: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  authorId: string;
  status: 'draft' | 'published';
  category?: string;
  publishDate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface EditorialBoardMember {
  id: string;
  userId: string;
  designation: string;
  bio: string;
  researchInterests: string[];
  qualifications: string[];
  photoUrl?: string;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

export interface ReadingHistory {
  id: string;
  userId: string;
  articleId?: string;
  bookId?: string;
  readDurationMs?: number;
  lastAccessedAt: string;
}

export interface Bookmark {
  id: string;
  userId: string;
  articleId?: string;
  bookId?: string;
  createdAt: string;
}

export interface Download {
  id: string;
  userId?: string; // null for public downloads
  articleId?: string;
  bookId?: string;
  ipAddress?: string;
  userAgent?: string;
  downloadedAt: string;
}

export interface AuditLog {
  id: string;
  actorId?: string; // null if system-triggered
  action: string;
  entityName: string;
  entityId: string;
  ipAddress?: string;
  userAgent?: string;
  originalValues?: Record<string, unknown>;
  newValues?: Record<string, unknown>;
  timestamp: string;
}

export interface ActivityLog {
  id: string;
  userId: string;
  activityType: string;
  description: string;
  ipAddress?: string;
  userAgent?: string;
  timestamp: string;
}


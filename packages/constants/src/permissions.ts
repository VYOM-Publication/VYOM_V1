/**
 * Centralized permission registry.
 * Every permission string is defined here exactly once.
 * Controllers and middleware import from this file — never define inline strings.
 */
export const Permission = {
  // User management
  USER_READ_ANY: 'user:read:any',
  USER_UPDATE_ANY: 'user:update:any',
  USER_DEACTIVATE: 'user:deactivate',
  USER_ASSIGN_ROLE: 'user:assign:role',

  // Profile
  PROFILE_READ_OWN: 'profile:read:own',
  PROFILE_UPDATE_OWN: 'profile:update:own',
  PROFILE_READ_ANY: 'profile:read:any',

  // Submission — placeholder names, implementations come in later phase
  SUBMISSION_CREATE: 'submission:create',
  SUBMISSION_READ_OWN: 'submission:read:own',
  SUBMISSION_READ_ANY: 'submission:read:any',
  SUBMISSION_DECISION: 'submission:decision',

  // Review — placeholder
  REVIEW_ACCEPT_ASSIGNMENT: 'review:accept:assignment',
  REVIEW_SUBMIT: 'review:submit',
  REVIEW_READ_ANY: 'review:read:any',

  // Publication — placeholder
  CONTENT_PUBLISH: 'content:publish',
  CONTENT_ARCHIVE: 'content:archive',

  // Books
  BOOK_CREATE: 'book:create',
  BOOK_UPDATE: 'book:update',
  BOOK_DELETE: 'book:delete',

  // Articles
  ARTICLE_CREATE: 'article:create',
  ARTICLE_UPDATE: 'article:update',
  ARTICLE_DELETE: 'article:delete',

  // Categories
  CATEGORY_CREATE: 'category:create',
  CATEGORY_UPDATE: 'category:update',
  CATEGORY_DELETE: 'category:delete',

  // Payments
  PAYMENT_READ_OWN: 'payment:read:own',
  PAYMENT_READ_ANY: 'payment:read:any',
  PAYMENT_REFUND: 'payment:refund',

  // Analytics
  ANALYTICS_READ: 'analytics:read',

  // Editorial Board
  EDITORIAL_MANAGE: 'editorial:manage',

  // Admin
  ADMIN_FULL_ACCESS: 'admin:full:access',
  AUDIT_LOG_READ: 'audit:log:read',
  SYSTEM_CONFIGURE: 'system:configure',
} as const;

export type PermissionKey = (typeof Permission)[keyof typeof Permission];


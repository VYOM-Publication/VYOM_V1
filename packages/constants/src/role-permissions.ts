import { Role } from './roles';
import { Permission, PermissionKey } from './permissions';

/**
 * Role-to-permissions mapping.
 * This is the single source of truth for what each role can do.
 * To change what a role can do, change it here — nowhere else.
 */
export const ROLE_PERMISSIONS: Record<Role, PermissionKey[]> = {
  [Role.VISITOR]: [],

  [Role.MEMBER]: [
    Permission.PROFILE_READ_OWN,
    Permission.PROFILE_UPDATE_OWN,
    Permission.PAYMENT_READ_OWN,
  ],

  [Role.AUTHOR]: [
    Permission.PROFILE_READ_OWN,
    Permission.PROFILE_UPDATE_OWN,
    Permission.SUBMISSION_CREATE,
    Permission.SUBMISSION_READ_OWN,
    Permission.PAYMENT_READ_OWN,
  ],

  [Role.REVIEWER]: [
    Permission.PROFILE_READ_OWN,
    Permission.PROFILE_UPDATE_OWN,
    Permission.REVIEW_ACCEPT_ASSIGNMENT,
    Permission.REVIEW_SUBMIT,
  ],

  [Role.EDITOR]: [
    Permission.PROFILE_READ_OWN,
    Permission.PROFILE_UPDATE_OWN,
    Permission.SUBMISSION_READ_ANY,
    Permission.SUBMISSION_DECISION,
    Permission.REVIEW_READ_ANY,
    Permission.CONTENT_PUBLISH,
    Permission.CONTENT_ARCHIVE,
    Permission.BOOK_CREATE,
    Permission.BOOK_UPDATE,
    Permission.ARTICLE_CREATE,
    Permission.ARTICLE_UPDATE,
    Permission.CATEGORY_CREATE,
    Permission.CATEGORY_UPDATE,
    Permission.EDITORIAL_MANAGE,
  ],

  [Role.ADMIN]: [
    Permission.ADMIN_FULL_ACCESS,
    Permission.USER_READ_ANY,
    Permission.USER_UPDATE_ANY,
    Permission.USER_DEACTIVATE,
    Permission.USER_ASSIGN_ROLE,
    Permission.PROFILE_READ_ANY,
    Permission.SUBMISSION_READ_ANY,
    Permission.SUBMISSION_DECISION,
    Permission.REVIEW_READ_ANY,
    Permission.CONTENT_PUBLISH,
    Permission.CONTENT_ARCHIVE,
    Permission.BOOK_CREATE,
    Permission.BOOK_UPDATE,
    Permission.BOOK_DELETE,
    Permission.ARTICLE_CREATE,
    Permission.ARTICLE_UPDATE,
    Permission.ARTICLE_DELETE,
    Permission.CATEGORY_CREATE,
    Permission.CATEGORY_UPDATE,
    Permission.CATEGORY_DELETE,
    Permission.PAYMENT_READ_OWN,
    Permission.PAYMENT_READ_ANY,
    Permission.PAYMENT_REFUND,
    Permission.ANALYTICS_READ,
    Permission.EDITORIAL_MANAGE,
    Permission.AUDIT_LOG_READ,
    Permission.SYSTEM_CONFIGURE,
  ],
};


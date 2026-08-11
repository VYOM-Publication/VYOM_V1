import { Request, Response, NextFunction } from 'express';
import { Role } from '@vyom/constants';
import { ROLE_PERMISSIONS } from '@vyom/constants';
import { PermissionKey } from '@vyom/constants';
import { AuthorizationError, AuthenticationError } from '../shared/errors';

/**
 * Require one or more permissions. User must have at least one.
 * Admin role with ADMIN_FULL_ACCESS bypasses all permission checks.
 */
export function authorize(...requiredPermissions: PermissionKey[]) {
  return (req: Request, _res: Response, next: NextFunction): void => {
    if (!req.user) {
      return next(new AuthenticationError());
    }

    const userRoles = req.user.roles as Role[];
    const userPermissions = new Set<string>();

    for (const role of userRoles) {
      const perms = ROLE_PERMISSIONS[role] ?? [];
      for (const perm of perms) {
        userPermissions.add(perm);
      }
    }

    // Admin full access bypasses all checks
    if (userPermissions.has('admin:full:access')) {
      return next();
    }

    const hasPermission = requiredPermissions.some((p) => userPermissions.has(p));
    if (!hasPermission) {
      return next(new AuthorizationError());
    }

    next();
  };
}

/**
 * Require the user to have one of the specified roles.
 */
export function requireRole(...roles: Role[]) {
  return (req: Request, _res: Response, next: NextFunction): void => {
    if (!req.user) {
      return next(new AuthenticationError());
    }
    const hasRole = req.user.roles.some((r) => (roles as string[]).includes(r));
    if (!hasRole) {
      return next(new AuthorizationError());
    }
    next();
  };
}

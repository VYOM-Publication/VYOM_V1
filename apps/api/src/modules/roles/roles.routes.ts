import { Router } from 'express';
import { sendSuccess } from '../../shared/utils/response';
import { authenticate } from '../../middleware/authenticate.middleware';
import { authorize } from '../../middleware/authorize.middleware';
import { ROLE_PERMISSIONS, Role } from '@vyom/constants';
import { Permission } from '@vyom/constants';

const router = Router();

/**
 * GET /api/v1/roles
 * Returns all roles with their permissions.
 * Restricted to admins only.
 */
router.get('/', authenticate, authorize(Permission.ADMIN_FULL_ACCESS), (_req, res, next) => {
  try {
    const roles = (Object.values(Role) as Role[]).map((role) => ({
      name: role,
      permissions: ROLE_PERMISSIONS[role],
    }));
    sendSuccess(res, { roles });
  } catch (err) {
    next(err);
  }
});

export default router;

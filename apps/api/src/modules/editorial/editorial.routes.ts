import { Router } from 'express';
import { editorialController } from './editorial.controller';
import { authenticate } from '../../middleware/authenticate.middleware';
import { authorize } from '../../middleware/authorize.middleware';
import { Permission } from '@vyom/constants';

const router = Router();

router.get('/', (req, res, next) => editorialController.getMembers(req, res, next));

router.post('/', authenticate, authorize(Permission.EDITORIAL_MANAGE), (req, res, next) =>
  editorialController.addOrUpdateMember(req, res, next)
);

router.delete('/:userId', authenticate, authorize(Permission.EDITORIAL_MANAGE), (req, res, next) =>
  editorialController.removeMember(req, res, next)
);

export default router;

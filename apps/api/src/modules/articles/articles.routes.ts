import { Router } from 'express';
import { articlesController } from './articles.controller';
import { authenticate } from '../../middleware/authenticate.middleware';
import { authorize } from '../../middleware/authorize.middleware';
import { Permission } from '@vyom/constants';

const router = Router();

// Optional authentication — attaches user if token present, otherwise continues as visitor
const optionalAuthenticate = (req: any, res: any, next: any) => {
  if (req.headers.authorization) {
    return authenticate(req, res, next);
  }
  next();
};

// Public search and download log routes
router.get('/', optionalAuthenticate, (req, res, next) => articlesController.getArticles(req, res, next));
router.get('/:slugOrId', (req, res, next) => articlesController.getArticle(req, res, next));
router.post('/:id/download', optionalAuthenticate, (req, res, next) => articlesController.recordDownload(req, res, next));

// Admin/Editor CRUD
router.post('/', authenticate, authorize(Permission.ARTICLE_CREATE), (req, res, next) =>
  articlesController.createArticle(req, res, next)
);
router.put('/:id', authenticate, authorize(Permission.ARTICLE_UPDATE), (req, res, next) =>
  articlesController.updateArticle(req, res, next)
);
router.delete('/:id', authenticate, authorize(Permission.ARTICLE_DELETE), (req, res, next) =>
  articlesController.deleteArticle(req, res, next)
);

export default router;

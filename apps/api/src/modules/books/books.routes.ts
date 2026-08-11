import { Router } from 'express';
import { booksController } from './books.controller';
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

// Public Book search and catalog endpoints
router.get('/', optionalAuthenticate, (req, res, next) => booksController.getBooks(req, res, next));
router.get('/categories', (req, res, next) => booksController.getCategories(req, res, next));
router.get('/:slugOrId', (req, res, next) => booksController.getBook(req, res, next));
router.post('/:id/download', (req, res, next) => booksController.recordDownload(req, res, next));

// Admin/Editor flows
router.post('/', authenticate, authorize(Permission.BOOK_CREATE), (req, res, next) =>
  booksController.createBook(req, res, next)
);
router.put('/:id', authenticate, authorize(Permission.BOOK_UPDATE), (req, res, next) =>
  booksController.updateBook(req, res, next)
);
router.delete('/:id', authenticate, authorize(Permission.BOOK_DELETE), (req, res, next) =>
  booksController.deleteBook(req, res, next)
);
router.post('/categories', authenticate, authorize(Permission.CATEGORY_CREATE), (req, res, next) =>
  booksController.createCategory(req, res, next)
);

export default router;

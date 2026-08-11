import { Request, Response, NextFunction } from 'express';
import { booksService } from './books.service';
import { sendSuccess } from '../../shared/utils/response';
import { createBookSchema, updateBookSchema } from '@vyom/validations';
import { BadRequestError } from '../../shared/errors';
import { BookStatus } from '@vyom/types';
import { Role } from '@vyom/constants';

export class BooksController {
  async getBooks(req: Request, res: Response, next: NextFunction) {
    try {
      const category = req.query.category as string;
      const search = req.query.search as string;
      const featured = req.query.featured === 'true' ? true : req.query.featured === 'false' ? false : undefined;
      
      let status: BookStatus | undefined;
      
      // Admin/Editor can query by specific book status. General public can only view published.
      const roles = (req as any).user?.roles ?? [];
      const hasPrivileges = roles.includes(Role.ADMIN) || roles.includes(Role.EDITOR);

      if (hasPrivileges && req.query.status) {
        status = req.query.status as BookStatus;
      } else {
        status = BookStatus.PUBLISHED;
      }

      const books = await booksService.getBooks({ category, search, status, featured });
      sendSuccess(res, { books });
    } catch (err) {
      next(err);
    }
  }

  async getBook(req: Request, res: Response, next: NextFunction) {
    try {
      const identifier = req.params.slugOrId;
      const book = await booksService.getBookBySlugOrId(identifier);
      sendSuccess(res, { book });
    } catch (err) {
      next(err);
    }
  }

  async createBook(req: Request, res: Response, next: NextFunction) {
    try {
      const data = createBookSchema.parse(req.body);
      const book = await booksService.createBook(data);
      sendSuccess(res, { book }, 'Book created successfully', 201);
    } catch (err) {
      next(err);
    }
  }

  async updateBook(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const data = updateBookSchema.parse(req.body);
      const book = await booksService.updateBook(id, data);
      sendSuccess(res, { book }, 'Book updated successfully');
    } catch (err) {
      next(err);
    }
  }

  async deleteBook(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      await booksService.deleteBook(id);
      sendSuccess(res, null, 'Book deleted successfully');
    } catch (err) {
      next(err);
    }
  }

  async recordDownload(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const book = await booksService.recordDownload(id);
      sendSuccess(res, { downloadCount: book.downloadCount }, 'Download count recorded');
    } catch (err) {
      next(err);
    }
  }

  async getCategories(_req: Request, res: Response, next: NextFunction) {
    try {
      const categories = await booksService.getCategories();
      sendSuccess(res, { categories });
    } catch (err) {
      next(err);
    }
  }

  async createCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, description, parentCategoryId } = req.body;
      if (!name) {
        throw new BadRequestError('Category name is required');
      }
      const category = await booksService.createCategory({ name, description, parentCategoryId });
      sendSuccess(res, { category }, 'Category created successfully', 201);
    } catch (err) {
      next(err);
    }
  }
}

export const booksController = new BooksController();

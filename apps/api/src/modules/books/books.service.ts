import { Book } from '../../models/book.model';
import { Category } from '../../models/category.model';
import { NotFoundError, BadRequestError } from '../../shared/errors';
import { BookStatus } from '@vyom/types';
import { Types } from 'mongoose';

export class BooksService {
  async getBooks(query: { category?: string; search?: string; status?: BookStatus; featured?: boolean }) {
    const filter: any = { isDeleted: false };

    if (query.status) {
      filter.status = query.status;
    } else {
      filter.status = BookStatus.PUBLISHED; // default to public published books
    }

    if (query.featured !== undefined) {
      filter.isFeatured = query.featured;
    }

    if (query.category) {
      // Find category by slug or id
      const cat = await Category.findOne({
        $or: [
          { _id: Types.ObjectId.isValid(query.category) ? new Types.ObjectId(query.category) : undefined },
          { slug: query.category },
        ].filter(Boolean) as any,
      });
      if (cat) {
        filter.categoryIds = cat._id;
      } else {
        return []; // category not found, return empty
      }
    }

    if (query.search) {
      filter.$or = [
        { title: { $regex: query.search, $options: 'i' } },
        { description: { $regex: query.search, $options: 'i' } },
        { isbn: { $regex: query.search, $options: 'i' } },
      ];
    }

    return Book.find(filter)
      .populate('categoryIds', 'name slug')
      .populate('authorIds', 'fullName email')
      .sort({ createdAt: -1 });
  }

  async getBookBySlugOrId(identifier: string) {
    const isId = Types.ObjectId.isValid(identifier);
    const filter = isId ? { _id: identifier, isDeleted: false } : { slug: identifier, isDeleted: false };

    const book = await Book.findOne(filter)
      .populate('categoryIds', 'name slug')
      .populate('authorIds', 'fullName email');

    if (!book) {
      throw new NotFoundError('Book not found');
    }

    // Increment view count
    book.viewCount += 1;
    await book.save();

    return book;
  }

  async createBook(data: any) {
    // Generate unique slug
    let slug = data.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    const existing = await Book.findOne({ slug });
    if (existing) {
      slug = `${slug}-${Date.now().toString().substring(8)}`;
    }

    const book = new Book({
      ...data,
      slug,
      viewCount: 0,
      downloadCount: 0,
    });

    return book.save();
  }

  async updateBook(id: string, data: any) {
    const book = await Book.findById(id);
    if (!book) throw new NotFoundError('Book not found');

    // Handle slug change if title changes
    if (data.title && data.title !== book.title) {
      let slug = data.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');

      const existing = await Book.findOne({ slug, _id: { $ne: id } });
      if (existing) {
        slug = `${slug}-${Date.now().toString().substring(8)}`;
      }
      book.slug = slug;
    }

    Object.assign(book, data);
    return book.save();
  }

  async deleteBook(id: string) {
    const book = await Book.findById(id);
    if (!book) throw new NotFoundError('Book not found');

    book.isDeleted = true;
    await book.save();
    return true;
  }

  async recordDownload(id: string) {
    const book = await Book.findById(id);
    if (!book) throw new NotFoundError('Book not found');

    book.downloadCount += 1;
    await book.save();
    return book;
  }

  // Categories Helpers
  async getCategories() {
    return Category.find({ isDeleted: false }).sort({ name: 1 });
  }

  async createCategory(data: { name: string; description?: string; parentCategoryId?: string }) {
    const slug = data.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    const existing = await Category.findOne({ slug });
    if (existing) {
      throw new BadRequestError('Category name already exists');
    }

    const parentId = data.parentCategoryId && Types.ObjectId.isValid(data.parentCategoryId)
      ? new Types.ObjectId(data.parentCategoryId)
      : null;

    const category = new Category({
      name: data.name,
      slug,
      description: data.description,
      parentCategoryId: parentId,
    });

    return category.save();
  }
}

export const booksService = new BooksService();

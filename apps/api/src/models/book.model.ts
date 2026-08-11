import { Schema, model, Document } from 'mongoose';
import { BookStatus } from '@vyom/types';

export interface IBook extends Document {
  title: string;
  slug: string;
  description: string;
  authorIds: Schema.Types.ObjectId[];
  categoryIds: Schema.Types.ObjectId[];
  coverUrl?: string;
  isbn?: string;
  previewPdfUrl?: string;
  fullPdfUrl?: string;
  price: number;
  status: BookStatus;
  publishDate?: Date;
  isFeatured: boolean;
  downloadCount: number;
  viewCount: number;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const bookSchema = new Schema<IBook>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
    description: { type: String, required: true },
    authorIds: [{ type: Schema.Types.ObjectId, ref: 'User', required: true }],
    categoryIds: [{ type: Schema.Types.ObjectId, ref: 'Category', required: true }],
    coverUrl: { type: String },
    isbn: { type: String, trim: true, index: true },
    previewPdfUrl: { type: String },
    fullPdfUrl: { type: String },
    price: { type: Number, required: true, min: 0, default: 0 },
    status: { type: String, enum: Object.values(BookStatus), default: BookStatus.DRAFT, index: true },
    publishDate: { type: Date },
    isFeatured: { type: Boolean, default: false, index: true },
    downloadCount: { type: Number, default: 0 },
    viewCount: { type: Number, default: 0 },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// Soft delete middleware
bookSchema.pre('find', function () {
  this.where({ isDeleted: false });
});
bookSchema.pre('findOne', function () {
  this.where({ isDeleted: false });
});

export const Book = model<IBook>('Book', bookSchema);

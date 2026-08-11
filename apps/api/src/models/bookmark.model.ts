import { Schema, model, Document } from 'mongoose';

export interface IBookmark extends Document {
  userId: Schema.Types.ObjectId;
  articleId?: Schema.Types.ObjectId;
  bookId?: Schema.Types.ObjectId;
  createdAt: Date;
}

const bookmarkSchema = new Schema<IBookmark>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    articleId: { type: Schema.Types.ObjectId, ref: 'Article', index: true },
    bookId: { type: Schema.Types.ObjectId, ref: 'Book', index: true },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: false }
);

// Prevent duplicate bookmarks
bookmarkSchema.index({ userId: 1, articleId: 1 }, { unique: true, sparse: true });
bookmarkSchema.index({ userId: 1, bookId: 1 }, { unique: true, sparse: true });

export const Bookmark = model<IBookmark>('Bookmark', bookmarkSchema);

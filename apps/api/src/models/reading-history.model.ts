import { Schema, model, Document } from 'mongoose';

export interface IReadingHistory extends Document {
  userId: Schema.Types.ObjectId;
  articleId?: Schema.Types.ObjectId;
  bookId?: Schema.Types.ObjectId;
  readDurationMs: number;
  lastAccessedAt: Date;
}

const readingHistorySchema = new Schema<IReadingHistory>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    articleId: { type: Schema.Types.ObjectId, ref: 'Article', index: true },
    bookId: { type: Schema.Types.ObjectId, ref: 'Book', index: true },
    readDurationMs: { type: Number, default: 0 },
    lastAccessedAt: { type: Date, default: Date.now, index: true },
  },
  { timestamps: false }
);

// Compound index to ensure quick lookups of a user's progress on an article/book
readingHistorySchema.index({ userId: 1, articleId: 1 });
readingHistorySchema.index({ userId: 1, bookId: 1 });

export const ReadingHistory = model<IReadingHistory>('ReadingHistory', readingHistorySchema);

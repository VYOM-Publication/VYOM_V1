import { Schema, model, Document } from 'mongoose';

export interface IDownload extends Document {
  userId?: Schema.Types.ObjectId;
  articleId?: Schema.Types.ObjectId;
  bookId?: Schema.Types.ObjectId;
  ipAddress?: string;
  userAgent?: string;
  downloadedAt: Date;
}

const downloadSchema = new Schema<IDownload>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', index: true },
    articleId: { type: Schema.Types.ObjectId, ref: 'Article', index: true },
    bookId: { type: Schema.Types.ObjectId, ref: 'Book', index: true },
    ipAddress: { type: String },
    userAgent: { type: String },
    downloadedAt: { type: Date, default: Date.now, index: true },
  },
  { timestamps: false }
);

export const Download = model<IDownload>('Download', downloadSchema);

import { Schema, model, Document } from 'mongoose';
import { ArticleStatus } from '@vyom/types';

export interface IArticle extends Document {
  title: string;
  slug: string;
  abstract: string;
  content?: string;
  authorIds: Schema.Types.ObjectId[];
  submissionId?: Schema.Types.ObjectId;
  doi?: string;
  citationText?: string;
  pdfUrl?: string;
  viewCount: number;
  downloadCount: number;
  tags: string[];
  categoryIds: Schema.Types.ObjectId[];
  volume?: number;
  issue?: number;
  pageRange?: string;
  publishDate?: Date;
  status: ArticleStatus;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const articleSchema = new Schema<IArticle>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
    abstract: { type: String, required: true },
    content: { type: String },
    authorIds: [{ type: Schema.Types.ObjectId, ref: 'User', required: true }],
    submissionId: { type: Schema.Types.ObjectId, ref: 'Submission' },
    doi: { type: String, trim: true, index: true },
    citationText: { type: String },
    pdfUrl: { type: String },
    viewCount: { type: Number, default: 0 },
    downloadCount: { type: Number, default: 0 },
    tags: [{ type: String }],
    categoryIds: [{ type: Schema.Types.ObjectId, ref: 'Category', required: true }],
    volume: { type: Number },
    issue: { type: Number },
    pageRange: { type: String },
    publishDate: { type: Date },
    status: { type: String, enum: Object.values(ArticleStatus), default: ArticleStatus.PUBLISHED, index: true },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// Soft delete middleware
articleSchema.pre('find', function () {
  this.where({ isDeleted: false });
});
articleSchema.pre('findOne', function () {
  this.where({ isDeleted: false });
});

export const Article = model<IArticle>('Article', articleSchema);

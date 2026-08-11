import { Schema, model, Document } from 'mongoose';
import { ReviewRecommendation, ReviewStatus } from '@vyom/types';

export interface IReview extends Document {
  submissionId: Schema.Types.ObjectId;
  reviewerId: Schema.Types.ObjectId;
  versionNo: number;
  commentsForAuthor?: string;
  commentsForEditor?: string;
  score?: number;
  recommendation?: ReviewRecommendation;
  status: ReviewStatus;
  dueDate: Date;
  submittedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const reviewSchema = new Schema<IReview>(
  {
    submissionId: { type: Schema.Types.ObjectId, ref: 'Submission', required: true, index: true },
    reviewerId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    versionNo: { type: Number, required: true },
    commentsForAuthor: { type: String },
    commentsForEditor: { type: String },
    score: { type: Number, min: 1, max: 10 },
    recommendation: {
      type: String,
      enum: Object.values(ReviewRecommendation),
    },
    status: {
      type: String,
      enum: Object.values(ReviewStatus),
      default: ReviewStatus.PENDING,
      index: true,
    },
    dueDate: { type: Date, required: true },
    submittedAt: { type: Date },
  },
  { timestamps: true }
);

export const Review = model<IReview>('Review', reviewSchema);

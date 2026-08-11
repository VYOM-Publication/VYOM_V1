import { Schema, model, Document } from 'mongoose';
import { SubmissionStatus } from '@vyom/types';

export interface ISubmissionVersion {
  versionNo: number;
  fileUrl: string;
  fileType: string;
  fileName: string;
  comments?: string;
  createdAt: Date;
}

export interface ISubmission extends Document {
  title: string;
  abstract: string;
  keywords: string[];
  authorId: Schema.Types.ObjectId;
  reviewerIds: Schema.Types.ObjectId[];
  editorId?: Schema.Types.ObjectId;
  status: SubmissionStatus;
  versions: ISubmissionVersion[];
  currentVersion: number;
  paymentStatus: 'pending' | 'paid' | 'failed';
  paymentId?: Schema.Types.ObjectId;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const submissionVersionSchema = new Schema<ISubmissionVersion>({
  versionNo: { type: Number, required: true },
  fileUrl: { type: String, required: true },
  fileType: { type: String, required: true },
  fileName: { type: String, required: true },
  comments: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const submissionSchema = new Schema<ISubmission>(
  {
    title: { type: String, required: true, trim: true },
    abstract: { type: String, required: true },
    keywords: [{ type: String, trim: true }],
    authorId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    reviewerIds: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    editorId: { type: Schema.Types.ObjectId, ref: 'User', index: true },
    status: {
      type: String,
      enum: Object.values(SubmissionStatus),
      default: SubmissionStatus.ABSTRACT_SUBMITTED,
      index: true,
    },
    versions: [submissionVersionSchema],
    currentVersion: { type: Number, default: 1 },
    paymentStatus: {
      type: String,
      enum: ['pending', 'paid', 'failed'],
      default: 'pending',
      index: true,
    },
    paymentId: { type: Schema.Types.ObjectId, ref: 'Payment' },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// Soft delete middleware
submissionSchema.pre('find', function () {
  this.where({ isDeleted: false });
});
submissionSchema.pre('findOne', function () {
  this.where({ isDeleted: false });
});

export const Submission = model<ISubmission>('Submission', submissionSchema);

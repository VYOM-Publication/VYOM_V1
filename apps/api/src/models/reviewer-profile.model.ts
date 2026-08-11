import { Schema, model, Document } from 'mongoose';

export interface IReviewerProfile extends Document {
  userId: Schema.Types.ObjectId;
  bio?: string;
  affiliation?: string;
  researchInterests: string[];
  maxAssignments: number;
  activeAssignmentsCount: number;
  status: 'active' | 'inactive' | 'suspended';
  createdAt: Date;
  updatedAt: Date;
}

const reviewerProfileSchema = new Schema<IReviewerProfile>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true, index: true },
    bio: { type: String, trim: true },
    affiliation: { type: String, trim: true },
    researchInterests: [{ type: String, trim: true }],
    maxAssignments: { type: Number, default: 3, min: 1 },
    activeAssignmentsCount: { type: Number, default: 0, min: 0 },
    status: { type: String, enum: ['active', 'inactive', 'suspended'], default: 'active', index: true },
  },
  { timestamps: true }
);

export const ReviewerProfile = model<IReviewerProfile>('ReviewerProfile', reviewerProfileSchema);

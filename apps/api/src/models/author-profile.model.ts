import { Schema, model, Document } from 'mongoose';

export interface IAuthorProfile extends Document {
  userId: Schema.Types.ObjectId;
  bio?: string;
  affiliation?: string;
  researchInterests: string[];
  orcidId?: string;
  createdAt: Date;
  updatedAt: Date;
}

const authorProfileSchema = new Schema<IAuthorProfile>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true, index: true },
    bio: { type: String, trim: true },
    affiliation: { type: String, trim: true },
    researchInterests: [{ type: String, trim: true }],
    orcidId: { type: String, trim: true },
  },
  { timestamps: true }
);

export const AuthorProfile = model<IAuthorProfile>('AuthorProfile', authorProfileSchema);

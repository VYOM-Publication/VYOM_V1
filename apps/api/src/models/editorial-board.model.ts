import { Schema, model, Document } from 'mongoose';

export interface IEditorialBoard extends Document {
  userId: Schema.Types.ObjectId;
  designation: string;
  bio: string;
  researchInterests: string[];
  qualifications: string[];
  photoUrl?: string;
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
}

const editorialBoardSchema = new Schema<IEditorialBoard>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true, index: true },
    designation: { type: String, required: true, trim: true },
    bio: { type: String, required: true },
    researchInterests: [{ type: String, trim: true }],
    qualifications: [{ type: String, trim: true }],
    photoUrl: { type: String },
    sortOrder: { type: Number, default: 0, index: true },
  },
  { timestamps: true }
);

export const EditorialBoard = model<IEditorialBoard>('EditorialBoard', editorialBoardSchema);

import { Schema, model, Document } from 'mongoose';

export interface IAnnouncement extends Document {
  title: string;
  content: string;
  authorId: Schema.Types.ObjectId;
  status: 'draft' | 'published';
  category?: string;
  publishDate?: Date;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const announcementSchema = new Schema<IAnnouncement>(
  {
    title: { type: String, required: true, trim: true },
    content: { type: String, required: true },
    authorId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    status: { type: String, enum: ['draft', 'published'], default: 'draft', index: true },
    category: { type: String, trim: true },
    publishDate: { type: Date },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// Soft delete middleware
announcementSchema.pre('find', function () {
  this.where({ isDeleted: false });
});
announcementSchema.pre('findOne', function () {
  this.where({ isDeleted: false });
});

export const Announcement = model<IAnnouncement>('Announcement', announcementSchema);

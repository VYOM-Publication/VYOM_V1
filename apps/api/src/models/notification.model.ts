import { Schema, model, Document } from 'mongoose';

export interface INotification extends Document {
  userId: Schema.Types.ObjectId;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'danger';
  read: boolean;
  link?: string;
  createdAt: Date;
}

const notificationSchema = new Schema<INotification>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    title: { type: String, required: true, trim: true },
    message: { type: String, required: true },
    type: {
      type: String,
      enum: ['info', 'success', 'warning', 'danger'],
      default: 'info',
    },
    read: { type: Boolean, default: false, index: true },
    link: { type: String },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export const Notification = model<INotification>('Notification', notificationSchema);

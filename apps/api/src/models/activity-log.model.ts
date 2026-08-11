import { Schema, model, Document } from 'mongoose';

export interface IActivityLog extends Document {
  userId: Schema.Types.ObjectId;
  activityType: string;
  description: string;
  ipAddress?: string;
  userAgent?: string;
  timestamp: Date;
}

const activityLogSchema = new Schema<IActivityLog>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    activityType: { type: String, required: true, index: true },
    description: { type: String, required: true },
    ipAddress: { type: String },
    userAgent: { type: String },
    timestamp: { type: Date, default: Date.now, index: true },
  },
  { timestamps: false }
);

export const ActivityLog = model<IActivityLog>('ActivityLog', activityLogSchema);

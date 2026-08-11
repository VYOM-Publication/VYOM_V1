import { Schema, model, Document } from 'mongoose';

export interface IAuditLog extends Document {
  actorId?: Schema.Types.ObjectId;
  action: string;
  entityName: string;
  entityId: string;
  ipAddress?: string;
  userAgent?: string;
  originalValues?: Record<string, unknown>;
  newValues?: Record<string, unknown>;
  timestamp: Date;
}

const auditLogSchema = new Schema<IAuditLog>(
  {
    actorId: { type: Schema.Types.ObjectId, ref: 'User', index: true },
    action: { type: String, required: true, index: true },
    entityName: { type: String, required: true, index: true },
    entityId: { type: String, required: true },
    ipAddress: { type: String },
    userAgent: { type: String },
    originalValues: { type: Schema.Types.Mixed },
    newValues: { type: Schema.Types.Mixed },
    timestamp: { type: Date, default: Date.now, index: true },
  },
  { timestamps: false }
);

export const AuditLog = model<IAuditLog>('AuditLog', auditLogSchema);

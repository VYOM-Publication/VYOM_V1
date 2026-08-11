import { Schema, model, Document } from 'mongoose';

/**
 * Stores refresh token metadata only.
 * The actual token is an opaque string stored in this collection
 * and in an HttpOnly cookie — never in localStorage.
 */
export interface IRefreshToken extends Document {
  userId: Schema.Types.ObjectId;
  tokenHash: string;     // bcrypt hash of the opaque token
  userAgent?: string;
  ipAddress?: string;
  expiresAt: Date;
  revokedAt?: Date;
  replacedByToken?: string;
  createdAt: Date;
}

const refreshTokenSchema = new Schema<IRefreshToken>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    tokenHash: { type: String, required: true, select: false },
    userAgent: { type: String },
    ipAddress: { type: String },
    expiresAt: { type: Date, required: true, index: { expireAfterSeconds: 0 } },
    revokedAt: { type: Date },
    replacedByToken: { type: String },
  },
  { timestamps: true },
);

export const RefreshToken = model<IRefreshToken>('RefreshToken', refreshTokenSchema);

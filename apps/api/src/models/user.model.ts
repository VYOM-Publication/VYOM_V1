import { Schema, model, Document } from 'mongoose';
import { UserStatus } from '@vyom/types';
import { Role } from '@vyom/constants';

export interface IUser extends Document {
  email: string;
  passwordHash: string;
  fullName: string;
  status: UserStatus;
  emailVerified: boolean;
  roles: Role[];
  emailVerificationToken?: string;
  emailVerificationTokenExpiry?: Date;
  passwordResetToken?: string;
  passwordResetTokenExpiry?: Date;
  lastLoginAt?: Date;
  isDeleted: boolean;
  deletedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    passwordHash: { type: String, required: true, select: false },
    fullName: { type: String, required: true, trim: true },
    status: {
      type: String,
      enum: Object.values(UserStatus),
      default: UserStatus.PENDING_VERIFICATION,
      index: true,
    },
    emailVerified: { type: Boolean, default: false },
    roles: {
      type: [String],
      enum: Object.values(Role),
      default: [Role.MEMBER],
    },
    emailVerificationToken: { type: String, select: false },
    emailVerificationTokenExpiry: { type: Date, select: false },
    passwordResetToken: { type: String, select: false, index: true },
    passwordResetTokenExpiry: { type: Date, select: false },
    lastLoginAt: { type: Date },
    isDeleted: { type: Boolean, default: false },
    deletedAt: { type: Date },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (_doc, ret) => {
        delete (ret as Record<string, unknown>).passwordHash;
        delete (ret as Record<string, unknown>).emailVerificationToken;
        delete (ret as Record<string, unknown>).emailVerificationTokenExpiry;
        delete (ret as Record<string, unknown>).passwordResetToken;
        delete (ret as Record<string, unknown>).passwordResetTokenExpiry;
        return ret;
      },
    },
  },
);

// Soft-delete filter: never return deleted users in normal queries
userSchema.pre('find', function () {
  this.where({ isDeleted: false });
});
userSchema.pre('findOne', function () {
  this.where({ isDeleted: false });
});

export const User = model<IUser>('User', userSchema);

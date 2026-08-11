import { Schema, model, Document } from 'mongoose';
import { PaymentStatus } from '@vyom/types';

export interface IPayment extends Document {
  userId: Schema.Types.ObjectId;
  submissionId?: Schema.Types.ObjectId;
  bookId?: Schema.Types.ObjectId;
  amount: number;
  currency: string;
  gateway: 'razorpay' | 'mock';
  status: PaymentStatus;
  transactionId?: string;
  receiptUrl?: string;
  refundStatus?: string;
  refundReason?: string;
  createdAt: Date;
  updatedAt: Date;
}

const paymentSchema = new Schema<IPayment>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    submissionId: { type: Schema.Types.ObjectId, ref: 'Submission', index: true },
    bookId: { type: Schema.Types.ObjectId, ref: 'Book', index: true },
    amount: { type: Number, required: true, min: 0 },
    currency: { type: String, required: true, default: 'INR' },
    gateway: { type: String, enum: ['razorpay', 'mock'], default: 'mock', index: true },
    status: {
      type: String,
      enum: Object.values(PaymentStatus),
      default: PaymentStatus.PENDING,
      index: true,
    },
    transactionId: { type: String, index: true },
    receiptUrl: { type: String },
    refundStatus: { type: String },
    refundReason: { type: String },
  },
  { timestamps: true }
);

export const Payment = model<IPayment>('Payment', paymentSchema);

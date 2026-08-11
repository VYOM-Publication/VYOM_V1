import { Schema, model, Document } from 'mongoose';

export interface ICategory extends Document {
  name: string;
  slug: string;
  description?: string;
  parentCategoryId?: Schema.Types.ObjectId | null;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const categorySchema = new Schema<ICategory>(
  {
    name: { type: String, required: true, unique: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
    description: { type: String },
    parentCategoryId: { type: Schema.Types.ObjectId, ref: 'Category', default: null },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// Soft delete middleware
categorySchema.pre('find', function () {
  this.where({ isDeleted: false });
});
categorySchema.pre('findOne', function () {
  this.where({ isDeleted: false });
});

export const Category = model<ICategory>('Category', categorySchema);

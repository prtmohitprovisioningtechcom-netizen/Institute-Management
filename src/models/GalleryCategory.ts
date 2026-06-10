import mongoose, { Schema, model, models } from "mongoose";

export interface IGalleryCategory {
  _id: mongoose.Types.ObjectId;
  name: string;
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
}

const GalleryCategorySchema = new Schema<IGalleryCategory>(
  {
    name: { type: String, required: true, trim: true, unique: true },
    sortOrder: { type: Number, default: 0 },
  },
  { timestamps: true },
);

export const GalleryCategory =
  models.GalleryCategory ?? model<IGalleryCategory>("GalleryCategory", GalleryCategorySchema);

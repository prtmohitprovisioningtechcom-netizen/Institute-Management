import mongoose, { Schema, model, models } from "mongoose";

export interface IGalleryPhoto {
  _id: mongoose.Types.ObjectId;
  categoryId: mongoose.Types.ObjectId;
  title?: string;
  image: string;
  type: "image" | "video";
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
}

const GalleryPhotoSchema = new Schema<IGalleryPhoto>(
  {
    categoryId: { type: Schema.Types.ObjectId, ref: "GalleryCategory", required: true },
    title: { type: String, trim: true },
    image: { type: String, required: true },
    type: { type: String, enum: ["image", "video"], default: "image" },
    sortOrder: { type: Number, default: 0 },
  },
  { timestamps: true },
);

GalleryPhotoSchema.index({ categoryId: 1, sortOrder: 1 });

export const GalleryPhoto =
  models.GalleryPhoto ?? model<IGalleryPhoto>("GalleryPhoto", GalleryPhotoSchema);

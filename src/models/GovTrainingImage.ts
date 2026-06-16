import mongoose, { Schema, model, models } from "mongoose";

export interface IGovTrainingImage {
  _id: mongoose.Types.ObjectId;
  org: "CFTI" | "PPDC" | "MSME" | "CDGI" | "NSIC";
  image: string;
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
}

const GovTrainingImageSchema = new Schema<IGovTrainingImage>(
  {
    org: { type: String, enum: ["CFTI", "PPDC", "MSME", "CDGI", "NSIC"], required: true },
    image: { type: String, required: true },
    sortOrder: { type: Number, default: 0 },
  },
  { timestamps: true },
);

GovTrainingImageSchema.index({ org: 1, sortOrder: 1 });

export const GovTrainingImage =
  models.GovTrainingImage ?? model<IGovTrainingImage>("GovTrainingImage", GovTrainingImageSchema);

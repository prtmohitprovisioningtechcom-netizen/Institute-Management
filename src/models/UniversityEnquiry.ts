import mongoose, { Schema, model, models } from "mongoose";

export interface IUniversityEnquiry {
  _id: mongoose.Types.ObjectId;
  name: string;
  email?: string;
  mobile: string;
  programType: string; // "Distance Online Learning" | "Vocational Training"
  message?: string;
  createdAt: Date;
}

const UniversityEnquirySchema = new Schema<IUniversityEnquiry>(
  {
    name: { type: String, required: true },
    email: { type: String, required: false },
    mobile: { type: String, required: true },
    programType: { type: String, required: true },
    message: { type: String, required: false },
  },
  { timestamps: true }
);

export const UniversityEnquiry = models.UniversityEnquiry || model<IUniversityEnquiry>("UniversityEnquiry", UniversityEnquirySchema);

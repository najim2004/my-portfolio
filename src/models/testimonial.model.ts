import { Schema, model, models } from "mongoose";
import { ITestimonial, Status } from "@/types/testimonial.types";

const testimonialSchema = new Schema<ITestimonial>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  avatar: { type: String },
  position: { type: String, required: true },
  company: { type: String, required: true },
  message: { type: String, required: true },
  status: { enum: Status, default: Status.PENDING },
  createdAt: { type: Date, default: Date.now },
});

export const Testimonial =
  models.Testimonial || model<ITestimonial>("Testimonial", testimonialSchema);

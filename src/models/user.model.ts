import { Schema, model, models } from "mongoose";
import { IUser } from "@/types/user.types";

const socialLinksSchema = new Schema({
  github: { type: String },
  linkedin: { type: String },
  twitter: { type: String },
  portfolio: { type: String },
});

const userSchema = new Schema<IUser>({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // Added password field
  titles: [{ type: String }],
  phone: { type: String },
  location: { type: String },
  isFreelancer: { type: Boolean, default: false },
  profileImage: { type: String },
  resumeUrl: { type: String },
  about: { type: String },
  approach: { type: String },
  socialLinks: { type: socialLinksSchema, default: {} },
  education: [{ type: Schema.Types.ObjectId, ref: "Education" }],
  experience: [{ type: Schema.Types.ObjectId, ref: "Experience" }],
  skills: [{ type: Schema.Types.ObjectId, ref: "Skill" }],
  services: [{ type: Schema.Types.ObjectId, ref: "Service" }],
  projects: [{ type: Schema.Types.ObjectId, ref: "Project" }],
  blogs: [{ type: Schema.Types.ObjectId, ref: "Blog" }],
  createdAt: { type: Date, default: Date.now },
});

export const User = models.User || model<IUser>("User", userSchema);
import { Types } from "mongoose";

export interface SocialLinks {
  github?: string;
  linkedin?: string;
  twitter?: string;
  portfolio?: string;
}

export interface IUser {
  fullName: string;
  titles: string[];
  email: string;
  password: string; // Added password field
  phone?: string;
  location?: string;
  isFreelancer: boolean;
  profileImage?: string;
  resumeUrl?: string;
  about?: string;
  approach?: string;
  socialLinks: SocialLinks;
  education: Types.ObjectId[];
  experience: Types.ObjectId[];
  skills: Types.ObjectId[];
  services: Types.ObjectId[];
  projects: Types.ObjectId[];
  blogs: Types.ObjectId[];
  testimonials: Types.ObjectId[];
  createdAt: Date;
}

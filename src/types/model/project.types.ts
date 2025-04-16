import { Types } from "mongoose";

export interface IProject {
  userId: Types.ObjectId;
  title: string;
  slug: string;
  description: string;
  fullDescription: string;
  image?: string;
  technologies: string[];
  features: string[];
  liveLink?: string;
  githubLink?: string;
  createdAt: Date;
}
import { Types } from "mongoose";

export interface IBlog {
  userId: Types.ObjectId;
  category: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image?: string;
  readTime: string;
  authorName: string;
  publishedAt: Date;
  createdAt: Date;
}
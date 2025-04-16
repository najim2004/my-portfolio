import { Types } from "mongoose";

export interface IExperience {
  userId: Types.ObjectId;
  position: string;
  company: string;
  description: string;
  years: string;
  createdAt: Date;
}
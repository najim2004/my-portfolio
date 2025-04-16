import { Types } from "mongoose";

export interface IService {
  userId: Types.ObjectId;
  title: string;
  description: string;
  icon?: string;
  createdAt: Date;
}
import { Types } from "mongoose";

export interface IEducation {
  userId: Types.ObjectId;
  degree: string;
  institution: string;
  startDate: Date;
  endDate?: Date;
}
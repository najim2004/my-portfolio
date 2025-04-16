import { Types } from "mongoose";

export interface ISkill {
  userId: Types.ObjectId;
  name: string;
  category: string;
  level: string;
  icon?: string;
}

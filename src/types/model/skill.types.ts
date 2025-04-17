import { Types } from "mongoose";

export interface ISkill {
  userId: Types.ObjectId;
  name: string;
  categoryId: Types.ObjectId;
  level: string;
  icon?: string;
  color?: string;
}

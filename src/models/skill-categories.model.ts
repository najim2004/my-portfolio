import mongoose, { Document, Schema, Types } from "mongoose";

// Interface for the SkillCategory document
export interface ISkillCategory extends Document {
  name: string;
  skills: Types.ObjectId[];
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

// Schema for skill categories
const skillCategorySchema = new Schema<ISkillCategory>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    skills: [{ type: Schema.Types.ObjectId, ref: "Skill" }],
    order: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Create and export the model
const SkillCategory =
  mongoose.models.SkillCategory ||
  mongoose.model<ISkillCategory>("SkillCategory", skillCategorySchema);

export default SkillCategory;

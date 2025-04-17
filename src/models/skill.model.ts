import { Schema, model, models } from "mongoose";
import { ISkill } from "@/types/model/skill.types";
import { User } from "./user.model";

const skillSchema = new Schema<ISkill>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  categoryId: {
    type: Schema.Types.ObjectId,
    ref: "SkillCategory",
    required: true,
  },
  icon: { type: String },
  color: { type: String },
});

// নতুন Skill তৈরির পর User-এর skills অ্যারে আপডেট
skillSchema.post("save", async function (doc) {
  try {
    await User.findByIdAndUpdate(
      doc.userId,
      { $addToSet: { skills: doc._id } },
      { new: true }
    );
  } catch (error) {
    console.error("Error updating User skills array:", error);
  }
});

// Skill মুছে ফেলার পর User-এর skills অ্যারে আপডেট
skillSchema.post(
  "deleteOne",
  { document: true, query: false },
  async function (doc) {
    try {
      await User.findByIdAndUpdate(
        doc.userId,
        { $pull: { skills: doc._id } },
        { new: true }
      );
    } catch (error) {
      console.error("Error removing from User skills array:", error);
    }
  }
);

export const Skill = models.Skill || model<ISkill>("Skill", skillSchema);

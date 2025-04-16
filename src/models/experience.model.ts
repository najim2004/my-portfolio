import { Schema, model, models } from "mongoose";
import { IExperience } from "@/types/model/experience.types";
import { User } from "./user.model";

const experienceSchema = new Schema<IExperience>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  position: { type: String, required: true },
  company: { type: String, required: true },
  description: { type: String, required: true },
  years: { type: String, required: true },
  createdAt: { type: Date, required: true },
});

// নতুন Experience তৈরির পর User-এর experience অ্যারে আপডেট
experienceSchema.post("save", async function (doc) {
  try {
    await User.findByIdAndUpdate(
      doc.userId,
      { $addToSet: { experience: doc._id } },
      { new: true }
    );
  } catch (error) {
    console.error("Error updating User experience array:", error);
  }
});

// Experience মুছে ফেলার পর User-এর experience অ্যারে আপডেট
experienceSchema.post(
  "deleteOne",
  { document: true, query: false },
  async function (doc) {
    try {
      await User.findByIdAndUpdate(
        doc.userId,
        { $pull: { experience: doc._id } },
        { new: true }
      );
    } catch (error) {
      console.error("Error removing from User experience array:", error);
    }
  }
);

export const Experience =
  models.Experience || model<IExperience>("Experience", experienceSchema);

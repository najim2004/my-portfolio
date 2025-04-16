import { Schema, model, models } from "mongoose";
import { IEducation } from "@/types/education.types";
import { User } from "./user.model";

const educationSchema = new Schema<IEducation>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  degree: { type: String, required: true },
  institution: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date },
});

// নতুন Education তৈরির পর User-এর education অ্যারে আপডেট
educationSchema.post("save", async function (doc) {
  try {
    await User.findByIdAndUpdate(
      doc.userId,
      { $addToSet: { education: doc._id } }, // $addToSet ডুপ্লিকেট এড়ায়
      { new: true }
    );
  } catch (error) {
    console.error("Error updating User education array:", error);
  }
});

// Education মুছে ফেলার পর User-এর education অ্যারে আপডেট
educationSchema.post(
  "deleteOne",
  { document: true, query: false },
  async function (doc) {
    try {
      await User.findByIdAndUpdate(
        doc.userId,
        { $pull: { education: doc._id } },
        { new: true }
      );
    } catch (error) {
      console.error("Error removing from User education array:", error);
    }
  }
);

export const Education =
  models.Education || model<IEducation>("Education", educationSchema);

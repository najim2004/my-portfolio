import { Schema, model, models } from "mongoose";
import { IService } from "@/types/model/service.types";
import { User } from "./user.model";

const serviceSchema = new Schema<IService>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  icon: { type: String },
  createdAt: { type: Date, default: Date.now },
});

// নতুন Service তৈরির পর User-এর services অ্যারে আপডেট
serviceSchema.post("save", async function (doc) {
  try {
    await User.findByIdAndUpdate(
      doc.userId,
      { $addToSet: { services: doc._id } },
      { new: true }
    );
  } catch (error) {
    console.error("Error updating User services array:", error);
  }
});

// Service মুছে ফেলার পর User-এর services অ্যারে আপডেট
serviceSchema.post(
  "deleteOne",
  { document: true, query: false },
  async function (doc) {
    try {
      await User.findByIdAndUpdate(
        doc.userId,
        { $pull: { services: doc._id } },
        { new: true }
      );
    } catch (error) {
      console.error("Error removing from User services array:", error);
    }
  }
);

export const Service =
  models.Service || model<IService>("Service", serviceSchema);

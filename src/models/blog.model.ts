import { Schema, model, models } from "mongoose";
import { IBlog } from "@/types/blog.types";
import { User } from "./user.model";

const blogSchema = new Schema<IBlog>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  category: { type: String, required: true },
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  excerpt: { type: String, required: true },
  content: { type: String, required: true },
  image: { type: String },
  readTime: { type: String, required: true },
  publishedAt: { type: Date, default: Date.now },
});

// নতুন Blog তৈরির পর User-এর blogs অ্যারে আপডেট
blogSchema.post("save", async function (doc) {
  try {
    await User.findByIdAndUpdate(
      doc.userId,
      { $addToSet: { blogs: doc._id } },
      { new: true }
    );
  } catch (error) {
    console.error("Error updating User blogs array:", error);
  }
});

// Blog মুছে ফেলার পর User-এর blogs অ্যারে আপডেট
blogSchema.post(
  "deleteOne",
  { document: true, query: false },
  async function (doc) {
    try {
      await User.findByIdAndUpdate(
        doc.userId,
        { $pull: { blogs: doc._id } },
        { new: true }
      );
    } catch (error) {
      console.error("Error removing from User blogs array:", error);
    }
  }
);

export const Blog = models.Blog || model<IBlog>("Blog", blogSchema);

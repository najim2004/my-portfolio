import { Schema, model, models } from "mongoose";
import { IBlog } from "@/types/model/blog.types";
import { User } from "./user.model";

// Utility function to create slug
function createSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, "") // Remove special characters
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/-+/g, "-") // Replace multiple - with single -
    .trim();
}

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
  createdAt: { type: Date, default: Date.now },
});

// Add pre-save middleware for automatic slug generation
blogSchema.pre("save", async function (next) {
  if (this.isModified("title")) {
    const baseSlug = createSlug(this.title);
    let slug = baseSlug;
    let counter = 1;

    // Check for existing slug and make it unique
    while (await models.Blog.findOne({ slug, _id: { $ne: this._id } })) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }

    this.slug = slug;
  }
  next();
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

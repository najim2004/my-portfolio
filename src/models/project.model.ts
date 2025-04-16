import { Schema, model, models } from "mongoose";
import { IProject } from "@/types/model/project.types";
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

const projectSchema = new Schema<IProject>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  fullDescription: { type: String, required: true },
  image: { type: String },
  technologies: [{ type: String }],
  features: [{ type: String }],
  liveLink: { type: String },
  githubLink: { type: String },
  createdAt: { type: Date, default: Date.now },
});

// Add pre-save middleware for automatic slug generation
projectSchema.pre("save", async function (next) {
  if (this.isModified("title")) {
    const baseSlug = createSlug(this.title);
    let slug = baseSlug;
    let counter = 1;

    // Check for existing slug and make it unique
    while (await models.Project.findOne({ slug, _id: { $ne: this._id } })) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }

    this.slug = slug;
  }
  next();
});

// নতুন Project তৈরির পর User-এর projects অ্যারে আপডেট
projectSchema.post("save", async function (doc) {
  try {
    await User.findByIdAndUpdate(
      doc.userId,
      { $addToSet: { projects: doc._id } },
      { new: true }
    );
  } catch (error) {
    console.error("Error updating User projects array:", error);
  }
});

// Project মুছে ফেলার পর User-এর projects অ্যারে আপডেট
projectSchema.post(
  "deleteOne",
  { document: true, query: false },
  async function (doc) {
    try {
      await User.findByIdAndUpdate(
        doc.userId,
        { $pull: { projects: doc._id } },
        { new: true }
      );
    } catch (error) {
      console.error("Error removing from User projects array:", error);
    }
  }
);

export const Project =
  models.Project || model<IProject>("Project", projectSchema);

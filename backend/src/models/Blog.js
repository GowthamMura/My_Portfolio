import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 160 },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
    content: { type: String, required: true },
    excerpt: { type: String, default: "", maxlength: 400 },
    coverImageUrl: { type: String, default: "" },
    tags: [{ type: String, trim: true }],
    published: { type: Boolean, default: false, index: true },
    publishedAt: { type: Date },
  },
  { timestamps: true }
);

export default mongoose.model("Blog", blogSchema);


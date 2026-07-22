import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 120 },
    description: { type: String, required: true, maxlength: 4000 },
    techStack: [{ type: String, required: true, trim: true }],
    category: {
      type: String,
      enum: ["MERN", "AI", "Data Analytics", "Other"],
      default: "MERN",
      index: true,
    },
    githubUrl: { type: String, default: "" },
    liveUrl: { type: String, default: "" },
    imageUrl: { type: String, default: "" },
    isFeatured: { type: Boolean, default: false, index: true },
  },
  { timestamps: true }
);

export default mongoose.model("Project", projectSchema);


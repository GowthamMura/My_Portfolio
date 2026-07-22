import mongoose from "mongoose";

const skillSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 80 },
    level: { type: Number, required: true, min: 0, max: 100 },
    category: { type: String, default: "General", trim: true, maxlength: 80, index: true },
    icon: { type: String, default: "" },
  },
  { timestamps: true }
);

export default mongoose.model("Skill", skillSchema);


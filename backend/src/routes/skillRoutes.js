import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  createSkill,
  deleteSkill,
  getSkills,
  updateSkill,
} from "../controllers/skillController.js";

const router = express.Router();

// Public
router.get("/", getSkills);

// Admin
router.post("/", protect, createSkill);
router.put("/:id", protect, updateSkill);
router.delete("/:id", protect, deleteSkill);

export default router;


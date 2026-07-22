import express from "express";
import {
  forgotPassword,
  loginAdmin,
  registerAdmin,
  resetPassword,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/register", registerAdmin);
router.post("/login", loginAdmin);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

export default router;

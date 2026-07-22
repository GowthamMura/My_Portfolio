import crypto from "crypto";
import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";
import { HttpError, requireBodyFields } from "../utils/validateRequest.js";

export const registerAdmin = async (req, res, next) => {
  try {
    const allow = String(process.env.ALLOW_ADMIN_REGISTER || "true").toLowerCase() === "true";
    if (!allow) {
      throw new HttpError(403, "Admin registration is disabled");
    }

    requireBodyFields(req.body, ["name", "email", "password"]);
    const { name, email, password } = req.body;

    const existing = await User.findOne({ email: String(email).toLowerCase() });
    if (existing) {
      throw new HttpError(400, "User already exists");
    }

    const user = await User.create({
      name,
      email: String(email).toLowerCase(),
      password,
      role: "admin",
    });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } catch (err) {
    next(err);
  }
};

export const loginAdmin = async (req, res, next) => {
  try {
    requireBodyFields(req.body, ["email", "password"]);
    const { email, password } = req.body;

    const user = await User.findOne({ email: String(email).toLowerCase(), role: "admin" });
    const ok = user ? await user.matchPassword(password) : false;
    if (!ok) {
      throw new HttpError(401, "Invalid credentials");
    }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } catch (err) {
    next(err);
  }
};

export const forgotPassword = async (req, res, next) => {
  try {
    requireBodyFields(req.body, ["email"]);
    const email = String(req.body.email).toLowerCase();

    const user = await User.findOne({ email, role: "admin" });
    if (!user) {
      return res.json({
        message: "If that admin email exists, a password reset link has been generated.",
      });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    user.passwordResetToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    user.passwordResetExpires = new Date(Date.now() + 15 * 60 * 1000);
    await user.save();

    const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";
    const resetUrl = `${frontendUrl.replace(/\/$/, "")}/admin/reset-password/${resetToken}`;

    if (process.env.NODE_ENV !== "production") {
      console.log(`Admin password reset link: ${resetUrl}`);
    }

    res.json({
      message: "If that admin email exists, a password reset link has been generated.",
      ...(process.env.NODE_ENV !== "production" ? { resetUrl } : {}),
    });
  } catch (err) {
    next(err);
  }
};

export const resetPassword = async (req, res, next) => {
  try {
    requireBodyFields(req.body, ["password"]);
    const { token } = req.params;
    const { password } = req.body;

    if (String(password).length < 6) {
      throw new HttpError(400, "Password must be at least 6 characters");
    }

    const passwordResetToken = crypto.createHash("sha256").update(String(token)).digest("hex");
    const user = await User.findOne({
      passwordResetToken,
      passwordResetExpires: { $gt: new Date() },
      role: "admin",
    });

    if (!user) {
      throw new HttpError(400, "Password reset link is invalid or has expired");
    }

    user.password = password;
    user.passwordResetToken = "";
    user.passwordResetExpires = undefined;
    await user.save();

    res.json({ message: "Password has been reset successfully" });
  } catch (err) {
    next(err);
  }
};

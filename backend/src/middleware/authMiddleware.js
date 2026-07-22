import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
  try {
    const auth = req.headers.authorization || "";
    if (!auth.startsWith("Bearer ")) {
      res.status(401);
      throw new Error("Not authorized, no token");
    }

    const token = auth.split(" ")[1];
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      res.status(500);
      throw new Error("JWT_SECRET is not configured");
    }

    const decoded = jwt.verify(token, secret);
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      res.status(401);
      throw new Error("Not authorized");
    }

    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};


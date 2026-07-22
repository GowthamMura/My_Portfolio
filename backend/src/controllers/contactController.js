import Contact from "../models/Contact.js";
import { HttpError, parsePagination, requireBodyFields } from "../utils/validateRequest.js";

// Public: create message
export const createContactMessage = async (req, res, next) => {
  try {
    requireBodyFields(req.body, ["name", "email", "message"]);
    const { name, email, subject, message } = req.body;

    const created = await Contact.create({
      name,
      email,
      subject: subject || "",
      message,
    });

    res.status(201).json(created);
  } catch (err) {
    next(err);
  }
};

// Admin: list + search + pagination
export const getContactMessages = async (req, res, next) => {
  try {
    const { page, limit, skip } = parsePagination(req.query, { page: 1, limit: 10 });
    const { search, isRead } = req.query;

    const query = {};
    if (search) {
      query.$or = [
        { name: { $regex: String(search), $options: "i" } },
        { email: { $regex: String(search), $options: "i" } },
        { subject: { $regex: String(search), $options: "i" } },
      ];
    }
    if (isRead !== undefined) {
      query.isRead = String(isRead).toLowerCase() === "true";
    }

    const [data, total] = await Promise.all([
      Contact.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit),
      Contact.countDocuments(query),
    ]);

    res.json({
      data,
      pagination: { total, page, limit, pages: Math.ceil(total / limit) },
    });
  } catch (err) {
    next(err);
  }
};

export const toggleContactRead = async (req, res, next) => {
  try {
    const msg = await Contact.findById(req.params.id);
    if (!msg) throw new HttpError(404, "Message not found");
    msg.isRead = !msg.isRead;
    const saved = await msg.save();
    res.json(saved);
  } catch (err) {
    next(err);
  }
};

export const deleteContactMessage = async (req, res, next) => {
  try {
    const msg = await Contact.findById(req.params.id);
    if (!msg) throw new HttpError(404, "Message not found");
    await msg.deleteOne();
    res.json({ message: "Message deleted" });
  } catch (err) {
    next(err);
  }
};


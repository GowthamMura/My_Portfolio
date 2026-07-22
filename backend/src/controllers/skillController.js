import Skill from "../models/Skill.js";
import { HttpError, parsePagination } from "../utils/validateRequest.js";

export const getSkills = async (req, res, next) => {
  try {
    const { page, limit, skip } = parsePagination(req.query, { page: 1, limit: 100 });
    const { category, search } = req.query;

    const query = {};
    if (category && category !== "All") query.category = category;
    if (search) query.name = { $regex: String(search), $options: "i" };

    const [data, total] = await Promise.all([
      Skill.find(query).sort({ category: 1, level: -1 }).skip(skip).limit(limit),
      Skill.countDocuments(query),
    ]);

    res.json({
      data,
      pagination: { total, page, limit, pages: Math.ceil(total / limit) },
    });
  } catch (err) {
    next(err);
  }
};

export const createSkill = async (req, res, next) => {
  try {
    const { name, level, category, icon } = req.body;
    if (!name) throw new HttpError(400, "name is required");
    if (level === undefined) throw new HttpError(400, "level is required");

    const created = await Skill.create({
      name,
      level: Number(level),
      category: category || "General",
      icon: icon || "",
    });

    res.status(201).json(created);
  } catch (err) {
    next(err);
  }
};

export const updateSkill = async (req, res, next) => {
  try {
    const skill = await Skill.findById(req.params.id);
    if (!skill) throw new HttpError(404, "Skill not found");

    const { name, level, category, icon } = req.body;
    if (name !== undefined) skill.name = name;
    if (level !== undefined) skill.level = Number(level);
    if (category !== undefined) skill.category = category;
    if (icon !== undefined) skill.icon = icon;

    const saved = await skill.save();
    res.json(saved);
  } catch (err) {
    next(err);
  }
};

export const deleteSkill = async (req, res, next) => {
  try {
    const skill = await Skill.findById(req.params.id);
    if (!skill) throw new HttpError(404, "Skill not found");
    await skill.deleteOne();
    res.json({ message: "Skill deleted" });
  } catch (err) {
    next(err);
  }
};


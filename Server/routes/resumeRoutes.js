import express from "express";
import upload from "../configs/multer.js";
import protect from "../middlewares/authMiddleware.js";
import {
  createResume,
  updateResume,
  deleteResume,
  getResumeById,
  getPublicResumeById,
} from "../controllers/resumeController.js";

const resumeRoutes = express.Router();

resumeRoutes.post("/create",protect , createResume);
resumeRoutes.put("/update",upload.single("profileImage"),protect, updateResume);
resumeRoutes.delete("/delete/:resumeId", protect, deleteResume);
resumeRoutes.get("/get/:resumeId", protect, getResumeById);
resumeRoutes.get("/public/:resumeId", getPublicResumeById);

export default resumeRoutes;
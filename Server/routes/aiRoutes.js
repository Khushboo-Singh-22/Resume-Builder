import express from "express";
import multer from "multer";
import { analyzeResume } from "../controllers/aiController.js";
import protect from "../middlewares/authMiddleware.js";
import { enhanceProfessionalSummary, enhanceJobDescription, uploadResume} from "../controllers/aiController.js";

const aiRouter = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

aiRouter.post("/analyze-resume", protect, upload.single("resume"), analyzeResume);

aiRouter.post("/enhance-pro-sum", protect , enhanceProfessionalSummary);
aiRouter.post("/enhance-job-desc", protect , enhanceJobDescription);
aiRouter.post("/upload-resume", protect , uploadResume);

export default aiRouter;
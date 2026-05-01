import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, ".env") });

import connectDB from "./configs/db.js";
import userRouter from "./routes/userRoutes.js";
import resumeRoutes from "./routes/resumeRoutes.js";
import aiRouter from "./routes/aiRoutes.js";
import authRouter from "./routes/authRoutes.js";

const app = express();
const PORT = process.env.PORT || 5000;

// Importing database connection
await connectDB();

app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

// Add COOP and COEP headers for Firebase auth
app.use((req, res, next) => {
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin-allow-popups");
  res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
  next();
});

app.get("/", (req, res) => res.send("Server is live...."));
app.use("/api/users", userRouter);
app.use("/api/resumes", resumeRoutes);
app.use("/api/ai", aiRouter);

app.use("/api/auth", authRouter);

app.listen(PORT, () =>{
  console.log(`Server is running on port ${PORT}`);
});
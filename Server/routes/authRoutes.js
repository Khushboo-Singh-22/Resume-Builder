import express from "express";
import { sendOtp, verifyOtp, resetPassword, facebookDataDeletion } from "../controllers/authController.js";
import { firebaseLogin } from "../controllers/userController.js";

const router = express.Router();

router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);
router.post("/reset-password", resetPassword);
router.post("/forgot-password", sendOtp);
router.post("/firebase-login", firebaseLogin);
router.post("/data-deletion", facebookDataDeletion);

export default router;
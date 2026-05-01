const express = require("express");
const multer = require("multer");
const { analyzeResume } = require("./aiController");

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post("/analyze", upload.single("resume"), analyzeResume);

module.exports = router;
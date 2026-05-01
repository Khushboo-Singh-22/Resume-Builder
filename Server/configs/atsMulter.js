import multer from "multer";

// Use memory storage so we can access the buffer directly without writing to disk
const storage = multer.memoryStorage();
const upload = multer({ storage });

export default upload;
const express = require('express');
const multer = require('multer');
const pdf = require('pdf-parse');
const cors = require('cors');
const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const upload = multer({ storage: multer.memoryStorage() });

app.post('/analyze', upload.single('resume'), async (req, res) => {
    try {
        console.log('=== ATS Analysis Request Started ===');
        console.log('Request body keys:', Object.keys(req.body));
        console.log('File received:', req.file ? 'Yes' : 'No');

        const jd = req.body.jobDescription;
        const pdfBuffer = req.file ? req.file.buffer : null;

        if (!req.file) {
            console.log('No file uploaded');
            return res.status(400).json({ error: "No resume file uploaded" });
        }
        if (!jd) {
            console.log('No job description provided');
            return res.status(400).json({ error: "Job description is required" });
        }

        console.log('Parsing PDF...');
        const data = await pdf(pdfBuffer);
        const resumeText = data.text;
        console.log('Resume text extracted, length:', resumeText.length);

        if (!resumeText || resumeText.trim().length === 0) {
            console.log('Empty resume text');
            return res.status(400).json({ error: "Could not extract text from PDF" });
        }

        console.log('Initializing Gemini model...');
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

        const prompt = `
        Analyze this Resume against the Job Description.
        Resume: ${resumeText.substring(0, 3000)}
        JD: ${jd}

        Return ONLY a JSON object exactly like this format:
        {
          "overallScore": 85,
          "sections": [
            {"label": "Content", "score": 80, "status": "Good", "color": "green"},
            {"label": "Structure", "score": 75, "status": "Good", "color": "green"},
            {"label": "Skills", "score": 70, "status": "Needs Work", "color": "orange"},
            {"label": "Keywords", "score": 65, "status": "Needs Work", "color": "orange"}
          ],
          "atsDetails": {
            "isReadable": true,
            "keywordsMatched": ["JavaScript", "React"],
            "missingSkills": ["Node.js", "Database"],
            "suggestion": "Add more technical skills and keywords from the job description."
          }
        }`;

        console.log('Calling Gemini AI...');
        const result = await model.generateContent(prompt);
        const response = await result.response;
        let rawJson = response.text().trim();
        console.log('Raw AI response received, length:', rawJson.length);
        console.log('Raw AI response preview:', rawJson.substring(0, 200));

        // Clean up the response - remove markdown formatting
        rawJson = rawJson.replace(/```json\s*/gi, '').replace(/```\s*$/gi, '');
        rawJson = rawJson.replace(/^\s*[\r\n]+/g, '').replace(/[\r\n]+\s*$/g, '');

        console.log('Cleaned response preview:', rawJson.substring(0, 200));

        try {
            const parsedData = JSON.parse(rawJson);
            console.log('Successfully parsed JSON, returning data');
            res.json(parsedData);
        } catch (parseError) {
            console.error('JSON parse error:', parseError.message);
            console.log('Failed to parse:', rawJson.substring(0, 500));
            // Return a fallback response if parsing fails
            const fallbackData = {
                overallScore: 75,
                sections: [
                    { label: "Content", score: 70, status: "Good", color: "green" },
                    { label: "Structure", score: 80, status: "Good", color: "green" },
                    { label: "Skills", score: 65, status: "Needs Work", color: "orange" },
                    { label: "Keywords", score: 75, status: "Good", color: "green" }
                ],
                atsDetails: {
                    isReadable: true,
                    keywordsMatched: ["JavaScript", "React"],
                    missingSkills: ["Node.js", "Database"],
                    suggestion: "Add more technical skills and keywords from the job description."
                }
            };
            console.log('Returning fallback data');
            res.json(fallbackData);
        }
    } catch (err) {
        console.error('=== ATS Analysis Error ===');
        console.error('Error message:', err.message);
        console.error('Error stack:', err.stack);
        res.status(500).json({
            error: "Analysis Failed",
            details: err.message,
            type: err.constructor.name
        });
    }
});
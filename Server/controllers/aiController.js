import express from "express";
import Resume from "../models/Resume.js";
import ai from "../configs/ai.js";
import { GoogleGenerativeAI } from "@google/generative-ai";
import * as pdf from "pdf-parse";


// controller for enhancing resume's professional summary using AI
//post: /api/ai/enhance-pro-sum

export const enhanceProfessionalSummary = async (req, res) => {
    if (!ai) {
        return res.status(503).json({ message: "AI service not configured" });
    }

    try {
        const { userContent } = req.body;

        if (!userContent) {
            return res.status(400).json({ message: "Content is required" });
        }

        const response = await ai.chat.completions.create({
            model: process.env.OPENAI_MODEL,
            messages: [
                {
                    role: "system",
                    content: "`you are an expert resume builder. Enhance the following professional summary to make it more impactful and professional, the summary should be  1-2  sentences concise and highlight key skills,experience and achievements.Make it compellingand ATS-friebdly. and only return text no options or anything else`,"
                },
                {
                    role: "user",
                    content: userContent,
                },
            ],
        });
        const enhancedSummary = response.choices[0].message.content;
        res.status(200).json({ enhancedContent: enhancedSummary });
    } catch (error) {
    res.status(400).json({ message: error.message });
}
}

//controller for enhancing resume's job description 
//post: /api/ai/enhance-job-desc

export const enhanceJobDescription = async (req, res) => {
   if (!ai) {
        return res.status(503).json({ message: "AI service not configured" });
   }

   try {
        const { userContent } = req.body;

        if (!userContent) {
            return res.status(400).json({ message: "Content is required" });
        }

        const response = await ai.chat.completions.create({
            model: process.env.OPENAI_MODEL,
            messages: [
                {
                    role: "system",
                    content: "`You are an expert in resume writing. Your task is to enhance the job description of a resume. The job description should be only in 1-2 sentence also highlighting key responsibilities and achievements. Use action verbs and quantifiable results where possible. Make it ATS-friendly. and only return text no options or anything else.",
                },
                {
                    role: "user",
                    content: userContent,
                },
            ],
        });
        const enhancedSummary = response.choices[0].message.content;
        res.status(200).json({ enhancedContent: enhancedSummary });
    } catch (error) {
    res.status(400).json({ message: error.message });
}
}

// controller for uplaad resume to database
//post: /api/ai/upload-resume

export const uploadResume = async (req, res) => {
     if (!ai) {
        return res.status(503).json({ message: "AI service not configured" });
     }

     try {
        const {resumeText,title} = req.body;
        const userId = req.userId;

        if(!resumeText ){
            return res.status(400).json({message: "Resume text is required"});
        }

        const systemprompt = "You are an expert AI agent to extract data from resume.";
        const userprompt = `Extract data from this resume: ${resumeText}
        provide data in the following format with no additional text before or after as valid JSON:
        
        {
         "professional_summary": "",
    "skills": [],
    "personal_info": {
        "image": "",
        "full_name": "",
        "profession": "",
        "email": "",
        "phone": "",
        "location": "",
        "linkedin": "",
        "website": ""
    },
    "experience": [{
        "company": "",
        "position": "",
        "start_date": "",
        "end_date": "",
        "description": "",
        "is_current": false
    }],
    "projects": [{
        "name": "",
        "type": "",
        "description": ""
    }],
    "education": [{
        "institution": "",
        "degree": "",
        "field": "",
        "gradution_date": "",
        "gpa": ""
    }]
}`;

        const response = await ai.chat.completions.create({
            model: process.env.OPENAI_MODEL,
            messages: [
                {
                    role: "system",
                    content: systemprompt,
                },
                {
                    role: "user",
                    content: userprompt,
                },
            ],
            response_format: {
                type: "json_object", 
            }
        });
        const extractedData = response.choices[0].message.content;
        const parsedData = JSON.parse(extractedData);
        console.log('Parsed resume data:', parsedData);
        
        const newResume = await Resume.create({user: userId, title, ...parsedData});
        console.log('Resume created successfully:', newResume._id);
        
        res.json({ resumeId : newResume._id });
    } catch (error) {
    res.status(400).json({ message: error.message });
}
}

// controller for analyzing resume and providing feedback using AI

export const analyzeResume = async (req, res) => {
  try {
    const { jobDescription } = req.body;
    const resumeFile = req.file;

    if (!resumeFile || !jobDescription) {
      return res.status(400).json({ error: "Resume file aur Job Description dono zaruri hain." });
    }

    // PDF Parsing
    const pdfData = await pdf(resumeFile.buffer);
    const resumeText = pdfData.text;

    // Gemini API Setup
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Custom Prompt for ATS
    const prompt = ` 
      Analyze this Resume against the Job Description.
      Resume: ${resumeText}
      JD: ${jobDescription}

      Return response in strict JSON format:
      {
        "overallScore": 88,
        "sections": [
          {"label": "Tone & Style", "score": 55, "status": "Good Start", "color": "orange"},
          {"label": "Content", "score": 25, "status": "Needs Work", "color": "red"},
          {"label": "Structure", "score": 70, "status": "Strong", "color": "green"},
          {"label": "Skills", "score": 32, "status": "Needs Work", "color": "red"}
        ],
      "atsDetails": {
            "isReadable": true,
            "keywordsMatched": ["React", "Node.js"],
            "missingSkills": ["AWS", "Docker"],
            "suggestion": "Improve your skills section for better ATS ranking."
          }
        }`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text().replace(/```json|```/g, "").trim();
    
    // Final Result bhejna
    res.status(200).json(JSON.parse(text));

  } catch (error) {
    console.error("ATS Analysis Error:", error);
    res.status(500).json({ error: "Analysis failed, please try again." });
  }
};
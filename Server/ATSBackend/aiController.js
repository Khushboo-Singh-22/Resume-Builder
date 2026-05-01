const pdf = require("pdf-parse");

console.log("PDF parser loaded:", typeof pdf);

// ✅ NEW: Gap Analysis Generator - Identifies missing skills, experience, projects
const generateGapAnalysis = ({
  missingKeywords,
  resumeText,
  jobDescription
}) => {
  const gaps = {
    missingSkills: [],
    missingExperience: [],
    missingProjects: [],
    recommendations: []
  };

  const resumeLower = resumeText.toLowerCase();
  const jobDescLower = jobDescription.toLowerCase();

  // 🎯 All possible tech skills to check
  const allTechSkills = [
    "react", "vue", "angular", "node", "python", "java", "javascript", "typescript",
    "sql", "mongodb", "postgresql", "mysql", "git", "docker", "kubernetes", "aws",
    "azure", "gcp", "api", "rest", "graphql", "html", "css", "nodejs", "express",
    "django", "spring", "terraform", "jenkins", "ci/cd", "agile", "scrum", "linux",
    "bash", "php", "ruby", "golang", "c++", "c#", ".net", "nginx", "apache", "redis"
  ];

  // Check for missing technical skills from job description
  const skillsInJobDesc = allTechSkills.filter(skill => jobDescLower.includes(skill));
  const skillsInResume = allTechSkills.filter(skill => resumeLower.includes(skill));
  const missingSkills = skillsInJobDesc.filter(skill => !skillsInResume.includes(skill));

  // Add missing keywords as skills too
  const missingKeywordSkills = missingKeywords
    .filter(kw => kw.length > 3 && !skillsInResume.includes(kw))
    .slice(0, 3);

  gaps.missingSkills = [
    ...missingSkills.slice(0, 4),
    ...missingKeywordSkills
  ].slice(0, 5);

  // 🏢 Check experience depth
  const experienceKeywords = ["experience", "worked", "developed", "led", "managed", "implemented", "created", "built"];
  const hasExperienceSection = experienceKeywords.some(keyword => resumeLower.includes(keyword));
  
  if (!hasExperienceSection) {
    gaps.missingExperience.push("Add professional experience section with job titles and responsibilities");
  } else {
    // Check for specific experience details
    if (!resumeText.match(/\d+\s*(years?|yrs|months?)/i)) {
      gaps.missingExperience.push("Add number of years/months of experience");
    }

    if (!resumeText.match(/\d+%/)) {
      gaps.missingExperience.push("Add measurable achievements (e.g., 'increased sales by 30%')");
    }

    if (!resumeText.match(/\d+\s*(x|times?)|improved|optimized|reduced/i)) {
      gaps.missingExperience.push("Quantify impact metrics (e.g., '2x faster', '50% improvement')");
    }

    // Check for action verbs
    const actionVerbs = ["developed", "designed", "implemented", "led", "managed", "optimized", "improved"];
    const hasActionVerbs = actionVerbs.some(verb => resumeLower.includes(verb));
    if (!hasActionVerbs) {
      gaps.missingExperience.push("Use strong action verbs (Developed, Built, Optimized, Led, Managed)");
    }
  }

  // 🚀 Check projects section
  const hasProjects = resumeLower.includes("project") || resumeLower.includes("portfolio") || resumeLower.includes("built");
  
  if (!hasProjects) {
    gaps.missingProjects.push("Add 2-3 significant projects with descriptions");
  } else {
    // If projects exist, check for completeness
    if (!resumeText.match(/tech stack|technologies|tools|stack/i)) {
      gaps.missingProjects.push("Add technologies/tech stack used in each project");
    }

    if (!resumeText.match(/github|gitlab|link|url|repository|demo|live/i)) {
      gaps.missingProjects.push("Add GitHub links or live project URLs");
    }

    if (!resumeText.match(/result|outcome|impact|achievement|users|downloads/i)) {
      gaps.missingProjects.push("Add project results and impact (users, downloads, etc.)");
    }
  }

  // Check for certificates and education
  const hasEducation = resumeLower.includes("education") || resumeLower.includes("degree") || resumeLower.includes("university");
  if (!hasEducation) {
    gaps.missingExperience.push("Add education/degrees section");
  }

  const hasCertifications = resumeLower.includes("certified") || resumeLower.includes("certification");
  if (!hasCertifications) {
    gaps.missingExperience.push("Consider adding relevant certifications");
  }

  // 📋 Generate actionable recommendations with proper structure

  // Skills recommendations
  if (gaps.missingSkills.length > 0) {
    gaps.recommendations.push({
      type: 'skills',
      title: 'Add Missing Technical Skills',
      items: gaps.missingSkills.map(skill => `Add ${skill} to your resume`),
      priority: 'high'
    });
  }

  // Experience recommendations
  if (gaps.missingExperience.length > 0) {
    gaps.recommendations.push({
      type: 'experience',
      title: 'Strengthen Experience Section',
      items: gaps.missingExperience,
      priority: 'high'
    });
  }

  // Projects recommendations
  if (gaps.missingProjects.length > 0) {
    gaps.recommendations.push({
      type: 'projects',
      title: 'Add Project Details',
      items: gaps.missingProjects,
      priority: 'medium'
    });
  }

  // ✅ Fallback: If no gaps found, provide general improvement suggestions
  if (gaps.recommendations.length === 0) {
    gaps.recommendations.push({
      type: 'skills',
      title: 'Further Enhance Technical Skills',
      items: [
        'Consider adding emerging technologies in your field',
        'Add certifications or courses you have completed',
        'List framework and library expertise'
      ],
      priority: 'medium'
    });
    gaps.recommendations.push({
      type: 'experience',
      title: 'Optimize Experience Presentation',
      items: [
        'Add specific metrics to every accomplishment',
        'Include quantifiable business impact in roles',
        'Highlight client or team sizes you worked with'
      ],
      priority: 'medium'
    });
  }

  console.log("Gap Analysis Generated:", JSON.stringify(gaps, null, 2));

  return gaps;
};

// ✅ NEW: Smart Suggestions Generator
const generateSmartSuggestions = ({
  missingKeywords,
  sections,
  resumeText,
  resumeFile
}) => {
  const suggestions = [];

  if (missingKeywords.length > 0) {
    suggestions.push(`Add missing keywords: ${missingKeywords.slice(0, 5).join(", ")}`);
  }

  sections.forEach(section => {
    if (section.score < 70) {
      if (section.label === "Skills Match") {
        suggestions.push("Add more relevant technical skills based on job description");
      }
      if (section.label === "Content Relevance") {
        suggestions.push("Customize your resume for this specific job role");
      }
      if (section.label === "Resume Structure") {
        suggestions.push("Ensure sections like Education, Skills, Experience are clearly defined");
      }
      if (section.label === "Professional Tone") {
        suggestions.push("Use strong action verbs like Developed, Built, Optimized");
      }
    }
  });

  if (!resumeText.match(/\d+%|\d+x|\d+\s*(users|clients|projects)/i)) {
    suggestions.push("Add measurable achievements (e.g. Increased performance by 30%)");
  }

  if (!resumeText.toLowerCase().includes("project")) {
    suggestions.push("Add 2-3 strong projects with tech stack and impact");
  }

  if (resumeText.length < 1000) {
    suggestions.push("Resume content is too short, add more detailed experience");
  }

  if (suggestions.length === 0) {
    suggestions.push("Try adding more job-specific keywords to further improve ATS score");
    suggestions.push("Add more measurable achievements to stand out");
  }

  if (resumeFile && resumeFile.size > 2 * 1024 * 1024) {
    suggestions.push("Reduce resume file size (keep under 2MB)");
  }

  if (!resumeText.includes("•") && !resumeText.includes("-")) {
    suggestions.push("Use bullet points instead of paragraphs");
  }

  return suggestions;
};  

const analyzeResume = async (req, res) => {
  try {

    console.log("=== Resume Analysis Started ===");

    const { jobDescription } = req.body;
    const resumeFile = req.file;

    if (!resumeFile || !jobDescription) {
      return res.status(400).json({
        error: "Resume file and job description are required"
      });
    }

    console.log("File received:", {
      name: resumeFile.originalname,
      size: resumeFile.size,
      mimetype: resumeFile.mimetype
    });

    console.log("Extracting text from PDF...");

    let resumeText = "";

    try {

      const data = await pdf(resumeFile.buffer);

      resumeText = data.text || "";

      console.log("PDF parsing successful, text length:", resumeText.length);

      if (resumeText.length > 0) {
        console.log("Sample text:", resumeText.substring(0, 200));
      }

    } catch (pdfError) {

      console.error("PDF parsing error:", pdfError);

      return res.status(400).json({
        error: "Unable to read PDF. Please upload a valid PDF resume.",
        details: pdfError.message
      });

    }

    if (!resumeText.trim()) {
      console.log("No text extracted from PDF");
      return res.status(400).json({
        error: "The PDF appears to be image-based or does not contain readable text. Please upload a text-based PDF resume (created from a word processor, not scanned)."
      });
    }

    console.log("Performing ATS analysis...");

    // ===============================
    // SMART KEYWORD EXTRACTION (Technical Skills Only)
    // ===============================

    // 🎯 Predefined list of REAL technical keywords and skills
    const technicalKeywordsList = [
      // Languages
      "javascript", "python", "java", "typescript", "php", "ruby", "golang", "c++", "c#", "go",
      // Frontend
      "react", "vue", "angular", "html", "css", "tailwind", "bootstrap", "webpack", "babel", "frontend",
      // Backend
      "node", "nodejs", "express", "django", "flask", "spring", "fastapi", "laravel", "rails", "backend",
      // Databases
      "mongodb", "postgresql", "mysql", "redis", "firebase", "dynamodb", "elasticsearch", "database", "sql",
      // Cloud & DevOps
      "aws", "azure", "gcp", "google cloud", "docker", "kubernetes", "jenkins", "gitlab", "github", "ci/cd", "devops",
      // Tools & Others
      "git", "api", "rest", "graphql", "json", "xml", "linux", "bash", "terminal", "agile", "scrum",
      "jira", "figma", "photoshop", "windows", "macos", "selenium", "junit", "testing", "pytest", "mocha",
      "jasmine", "nextjs", "next.js", "gatsby", "webpack", "npm", "yarn", "docker", "rest api", "microservices",
      "oauth", "jwt", "authentication", "authorization", "responsive", "oop", "solid", "design patterns"
    ];


    const resumeLower = resumeText.toLowerCase();
    const jobDescLower = jobDescription.toLowerCase();

    // ✅ CORRECT LOGIC: 
    // 1. Find which TECHNICAL SKILLS are in the resume (matched)
    // 2. Find which TECHNICAL SKILLS are NOT in the resume (missing)
    // 3. Also check job description to identify priority missing skills
    
    const getCompleteWordMatches = (text, keywords) => {
      return keywords.filter(keyword => {
        const regex = new RegExp(`\\b${keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'gi');
        return regex.test(text);
      });
    };

    // 🎯 Step 1: Find ALL technical skills that are in the resume
    const matchedKeywords = getCompleteWordMatches(resumeLower, technicalKeywordsList);

    // 🎯 Step 2: Find ALL technical skills that are missing from resume
    const allMissingKeywords = technicalKeywordsList.filter(skill =>
      !getCompleteWordMatches(resumeLower, [skill]).length
    );

    // 🎯 Step 3: Prioritize missing skills mentioned in job description
    const missingInJobDesc = getCompleteWordMatches(jobDescLower, allMissingKeywords);
    const missingNotInJobDesc = allMissingKeywords.filter(skill => !missingInJobDesc.includes(skill));
    
    // Priority order: Missing skills from job description first, then others
    const validMissingKeywords = [...missingInJobDesc, ...missingNotInJobDesc].slice(0, 10);

    // 🎯 Step 4: Technical skills from job description (for reference)
    const jobTechSkills = getCompleteWordMatches(jobDescLower, technicalKeywordsList);

    console.log("📋 All Available Technical Keywords:", technicalKeywordsList.slice(0, 30));
    console.log("� FULL Technical Keywords List Length:", technicalKeywordsList.length);
    console.log("📜 Resume Text (first 500 chars):", resumeText.substring(0, 500));
    console.log("👤 MATCHED in Resume:", matchedKeywords);
    console.log("❌ ALL Missing from Resume:", allMissingKeywords.slice(0, 15));
    console.log("📄 Missing skills from Job Desc (priority):", missingInJobDesc);
    console.log("🎯 FINAL validMissingKeywords to send:", validMissingKeywords);
    console.log("🔢 Summary - Resume has: " + matchedKeywords.length + " skills, Missing: " + allMissingKeywords.length + " total");

    // ===============================
    // SCORE CALCULATION
    // ===============================

    // Calculate keyword match ratio based on matched skills from ALL technical skills
    const totalTechSkills = technicalKeywordsList.length;
    const keywordMatchRatio = totalTechSkills > 0 
      ? matchedKeywords.length / totalTechSkills 
      : 0.5;

    const contentScore = Math.min(
      100,
      Math.max(60, Math.round(keywordMatchRatio * 100))
    );

    const hasExperience =
      resumeLower.includes("experience") || resumeLower.includes("work");

    const hasSkills =
      resumeLower.includes("skills") || resumeLower.includes("technologies");

    const hasEducation =
      resumeLower.includes("education") || resumeLower.includes("degree");

    const structureScore =
      hasExperience && hasSkills && hasEducation
        ? 90
        : hasExperience || hasSkills || hasEducation
          ? 75
          : 60;

    const professionalWords = [
      "developed",
      "implemented",
      "managed",
      "led",
      "designed",
      "created",
      "optimized"
    ];

    const professionalCount = professionalWords.filter(word =>
      resumeLower.includes(word)
    ).length;

    const toneScore = Math.min(100, Math.max(70, 70 + professionalCount * 5));

    // ✅ Skills score based on how many technical skills are found in resume vs total available
    const skillsScore = Math.min(
      100, 
      Math.max(50, matchedKeywords.length * 8)
    );

    const overallScore = Math.round(
      contentScore*0.4 + structureScore*0.3 + toneScore*0.1 + skillsScore*0.2
    );

    const sectionsData = [
      { label: "Content Relevance", score: contentScore },
      { label: "Resume Structure", score: structureScore },
      { label: "Professional Tone", score: toneScore },
      { label: "Skills Match", score: skillsScore }
    ];

    const smartSuggestions = generateSmartSuggestions({
      missingKeywords: validMissingKeywords,
      sections: sectionsData,
      resumeText,
      resumeFile   
    });

    // ✅ NEW: Generate Gap Analysis
    const gapAnalysis = generateGapAnalysis({
      missingKeywords: validMissingKeywords,
      resumeText,
      jobDescription
    });

    console.log("✅ FINAL Gap Analysis being sent:", JSON.stringify(gapAnalysis, null, 2));

    // ===============================
    // FINAL RESPONSE
    // ===============================

    const response = {
      overallScore,

      sections: [
        {
          label: "Content Relevance",
          score: contentScore,
          status:
            contentScore >= 80
              ? "Excellent"
              : contentScore >= 70
                ? "Good"
                : "Needs Work",
          color:
            contentScore >= 80
              ? "green"
              : contentScore >= 70
                ? "orange"
                : "red"
        },
        {
          label: "Resume Structure",
          score: structureScore,
          status:
            structureScore >= 80
              ? "Excellent"
              : structureScore >= 70
                ? "Good"
                : "Needs Work",
          color:
            structureScore >= 80
              ? "green"
              : structureScore >= 70
                ? "orange"
                : "red"
        },
        {
          label: "Professional Tone",
          score: toneScore,
          status:
            toneScore >= 80
              ? "Excellent"
              : toneScore >= 70
                ? "Good"
                : "Needs Work",
          color:
            toneScore >= 80
              ? "green"
              : toneScore >= 70
                ? "orange"
                : "red"
        },
        {
          label: "Skills Match",
          score: skillsScore,
          status:
            skillsScore >= 80
              ? "Excellent"
              : skillsScore >= 70
                ? "Good"
                : "Needs Work",
          color:
            skillsScore >= 80
              ? "green"
              : skillsScore >= 70
                ? "orange"
                : "red"
        }
      ],

      atsDetails: {
        keywordsMatched: matchedKeywords.slice(0, 10),
        missingSkills: validMissingKeywords.slice(0, 10),
        totalKeywords: technicalKeywordsList  .length,
        matchPercentage: Math.round(keywordMatchRatio * 100),
        suggestions: smartSuggestions,
        gapAnalysis: gapAnalysis   // ✅ NEW: Gap analysis included
      }
    };

    console.log("✅ Analysis complete - sending response with gapAnalysis");
    console.log("📤 EXACT Data being sent:");
    console.log("   - keywordsMatched (first 10):", response.atsDetails.keywordsMatched);
    console.log("   - missingSkills (first 10):", response.atsDetails.missingSkills);
    console.log("   - matchPercentage:", response.atsDetails.matchPercentage);
    console.log("Response gapAnalysis:", JSON.stringify(response.atsDetails.gapAnalysis, null, 2));

    res.status(200).json(response);

  } catch (error) {

    console.error("Server error:", error);

    res.status(500).json({
      error: "Analysis failed",
      details: error.message
    });

  }
};

module.exports = { analyzeResume };
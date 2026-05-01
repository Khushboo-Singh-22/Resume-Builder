import { Loader2Icon, SparklesIcon, TrendingUpIcon, UploadCloudIcon } from "lucide-react";
import Marquee from "react-fast-marquee";
import { useCallback, useEffect, useRef, useState, memo } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const HeroSectionBase = () => {

  const [prompt, setPrompt] = useState("");
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);
  const [resumeFile, setResumeFile] = useState(null);
  const [animatedPlaceholder, setAnimatedPlaceholder] = useState("");
  const [charIndex, setCharIndex] = useState(0);
  const [textIndex, setTextIndex] = useState(0);
  const fileInputRef = useRef(null);

  const navigate = useNavigate();

  const handleFileChange = useCallback((e) => {
    const file = e.target.files[0];
    if (file) {
      setResumeFile(file);
    }
  }, []);

  const handleAnalysis = async () => {
    if (!resumeFile) {
      alert("Please upload your resume PDF first.");
      return;
    }
    if (!prompt || !prompt.trim()) {
      alert("Please enter a job description.");
      return;
    }
    setLoading(true);
    const formData = new FormData();
    formData.append('resume', resumeFile);
    formData.append('jobDescription', prompt);

    console.log('FormData contents:');
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }

    try {
      console.log('Sending request to ATS Backend...');
      console.log('Resume file:', resumeFile);
      console.log('Job description:', prompt);
      const res = await axios.post('http://localhost:5001/api/analyze', formData);
      console.log('Response received:', res.data);
      navigate("/ats-checker/analysis", { state: { data: res.data, resumeText: prompt, resumeFile: resumeFile } });
    } catch (err) {
      console.error('Full error details:', err);
      console.error('Error response:', err.response);
      console.error('Error response data:', err.response?.data);
      console.error('Error message:', err.message);
      alert("Error analyzing resume. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  function handleSubmit(e) {
    e.preventDefault();

    if (!resumeFile) {
      alert("Please upload your resume PDF first.");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      alert("Resume uploaded successfully. ATS checking coming soon.");
      setLoading(false);
      setPrompt("");
      setSelected(null);
      setResumeFile(null);
    }, 3000);
  }

 const prompts = [
  {
    label: "Software Developer",
    prompt: "Analyze my resume against a software developer job description and provide ATS score, missing skills, and improvement suggestions",
  },
  {
    label: "Frontend Developer",
    prompt: "Evaluate my resume for a frontend developer role (React, JavaScript, UI/UX) and calculate ATS score with keyword gaps",
  },
  {
    label: "Backend Developer",
    prompt: "Check if my resume matches a backend developer role (Node.js, APIs, databases) and highlight missing backend skills",
  },
  {
    label: "Full Stack Developer",
    prompt: "Analyze my resume for a full stack developer role (MERN stack) and give ATS score with strengths and weaknesses",
  },
  {
    label: "Data Analyst",
    prompt: "Evaluate my resume for a data analyst role (SQL, Excel, Python) and identify missing keywords and skills",
  },
  {
    label: "Java Developer",
    prompt: "Check my resume against a Java developer job description and provide ATS score with improvement areas",
  },
  {
    label: "UI/UX Designer",
    prompt: "Analyze my resume for a UI/UX designer role and evaluate design skills, tools, and ATS compatibility",
  },
  {
    label: "Intern / Fresher",
    prompt: "Evaluate my resume for a fresher or internship role and suggest improvements to increase ATS score",
  },
];

  const placeholderTexts = useCallback(() => [
  "Paste Software Engineer job description (React, Node.js, APIs)...",
  "Enter Frontend Developer requirements (HTML, CSS, JavaScript, React)...",
  "Paste Backend Developer role details (Node.js, Express, MongoDB)...",
  "Add Full Stack Developer job description (MERN stack preferred)...",
  "Paste job listing for JavaScript Developer (ES6+, APIs, async programming)...",
  "Enter requirements for Web Developer (responsive design, REST APIs)...",
  "Paste internship/job description for Software Developer role...",
  "Add technical job details (skills, experience, tools, responsibilities)..."
], []);

  useEffect(() => {
    const texts = placeholderTexts();
    const currentText = texts[textIndex];
    
    if (charIndex < currentText.length) {
      const timeout = setTimeout(() => {
        setAnimatedPlaceholder(currentText.slice(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      }, 100);

      return () => clearTimeout(timeout);
    } else if (charIndex === currentText.length) {
      setTextIndex((textIndex + 1) % texts.length);
      setCharIndex(0);
    }
  }, [charIndex, textIndex, placeholderTexts]);

  return (
    <section id="home" className="flex flex-col items-center justify-center">

       {/* toggle */}
  {/* 🔥 FINAL WHITE + DARK BUTTON TOGGLE */}

  <div className="relative flex items-center p-1 rounded-full 
  bg-white border border-gray-200 shadow-lg mt-5">

    {/* Active Sliding Button */}
    <div
      className={`absolute top-1 bottom-1 left-1 right-1 rounded-full 
      bg-gradient-to-b from-gray-600 to-gray-800 
      transition-all duration-300 shadow-md `}
    />

    {/* ATS Checker */}
    <button
      onClick={() => {
        setSelected("ats");
        navigate("/ats-checker");
      }}
      className={`relative z-10 text-white px-6 py-2 rounded-full text-sm font-medium transition ${
        selected === "ats"
      }`}
    >
      ⚡ ATS Checker
    </button>

  </div>

      <div className="flex items-center gap-2 text-gray-500 mt-10">
        <TrendingUpIcon className="size-4.5" />
        <span>ATS Resume Checker</span>
      </div>

      <h1 className="text-center text-5xl md:text-[60px] font-semibold max-w-2xl m-2">
        Check Your Resume ATS Score
      </h1>

      <p className="text-center text-base text-gray-500 max-w-md mt-2">
        Upload your resume and paste the job description to see how well your resume matches the job.
      </p>

      <form
        onSubmit={handleSubmit}
        className="border border-gray-200 rounded-xl max-w-2xl w-full mt-8"
      >

        {/* Job Description */}
        <div className="p-4 pb-2">

          <h3 className="text-sm font-semibold text-gray-700 mb-2">
            Job Description
          </h3>

          <textarea
            className="w-full resize-none p-3 outline-none border border-gray-200 rounded-lg text-gray-600"
            placeholder={`Paste ${animatedPlaceholder}`}
            rows={3}
            minLength={10}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            required
          />

        </div>

        {/* Upload Resume */}
        <div className="px-4 pb-3">

          <h3 className="text-sm font-semibold text-gray-700 mb-2">
            Upload Resume
          </h3>

          <div 
            className="flex items-center gap-3 border border-dashed border-gray-300 rounded-lg p-3 cursor-pointer hover:bg-gray-50"
            onClick={() => fileInputRef.current?.click()}
          >

            <UploadCloudIcon className="size-5 text-gray-500" />

            <span className="text-gray-500 text-sm">
              {resumeFile ? resumeFile.name : "Upload Resume (PDF only)"}
            </span>

            <input
              ref={fileInputRef}
              type="file"
              accept="application/pdf"
              hidden
              onChange={handleFileChange}
            />

          </div>

        </div>

        {/* Button */}
        <div className="flex justify-end p-4 pt-0">

          <button
            type="button"
            onClick={handleAnalysis}
            disabled={loading}
            className={`flex items-center bg-black px-5 h-10 text-white rounded-lg bg-linear-to-b from-gray-600 to-gray-800 hover:from-gray-700 hover:to-gray-900 transition px-5 py-2 text-white rounded-lg ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >

            {loading ? (
              <Loader2Icon className="size-5 animate-spin" />
            ) : (
              <>
                <SparklesIcon className="size-4" />
                <span className="ml-2">Save & Check ATS</span>
              </>
            )}

          </button>

        </div>

      </form>

      {/* Suggested Prompts */}
      <Marquee gradient speed={30} pauseOnHover className="max-w-2xl w-full mt-3">

        {prompts.map((item) => {

          const isSelected = selected === item.label;

          return (
            <button
              key={item.label}
              onClick={() => {
                setPrompt(item.prompt);
                setSelected(item.label);
              }}
              className={`px-4 py-1.5 mx-2 border rounded-full transition
                ${
                  isSelected
                    ? "bg-gray-200 text-gray-800 border-gray-300"
                    : "text-gray-500 bg-gray-50 border-gray-200 hover:bg-gray-100"
                }`}
            >
              {item.label}
            </button>
          );

        })}

      </Marquee>

    </section>
  );
}


export const HeroSection = memo(HeroSectionBase);
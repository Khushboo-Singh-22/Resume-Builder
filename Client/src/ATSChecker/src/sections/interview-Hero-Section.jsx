import { useState } from "react";
import Navbar from "../components/interviewNavbar.jsx";
import { motion } from "framer-motion";
import AIInterviewFeatures from "../components/InterviewFeatures.jsx";
import About from "../components/interviewAbout.jsx";
import Footer from "../components/interviewFooter.jsx";


export default function HeroSection() {
  const [file, setFile] = useState(null);
  const [questions, setQuestions] = useState(10);

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">

      {/* Animated Glow Background */}
      <div className="absolute w-[600px] h-[600px] bg-purple-600 opacity-20 blur-[200px] top-10 left-10 animate-pulse"></div>
      <div className="absolute w-[500px] h-[500px] bg-blue-600 opacity-20 blur-[200px] bottom-10 right-10 animate-pulse"></div>

      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center px-6 min-h-[calc(100vh-64px)] pt-20 w-full relative z-10">

        {/* Heading */}
        <h1 className="text-4xl md:text-6xl font-bold text-center mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Ace Your Interview with AI 🚀
        </h1>

        <p className="text-gray-400 text-center mb-10 text-lg">
          Upload your resume and start smart interview preparation instantly.
        </p>

        {/* Main Card */}
        <div className="w-full max-w-4xl md:max-w-4xl mx-auto p-8 rounded-3xl backdrop-blur-lg bg-white/10 border border-white/20 shadow-2xl transition duration-500 hover:scale-105 active:scale-105 hover:shadow-purple-500/20 active:shadow-purple-500/20">

          {/* Upload Section */}
          <div className="border-2 border-dashed border-gray-500 rounded-xl p-6 text-center cursor-pointer hover:border-blue-400 active:border-blue-500 transition duration-300 mb-8">
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              className="hidden"
              id="resumeUpload"
              onChange={(e) => setFile(e.target.files[0])}
            />
            <label htmlFor="resumeUpload" className="cursor-pointer">
              <p className="text-sm text-gray-400 mt-2">
                {file ? file.name : "📂 Upload Your Resume (PDF/DOCX)"}
              </p>
            </label>
          </div>

          {/* Options */}
          {file && (
            <div className="grid md:grid-cols-2 gap-6">

              {/* Live Interview */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/10 backdrop-blur-md hover:scale-105 active:scale-105 transition duration-300 cursor-pointer">
                <h2 className="text-xl font-semibold mb-2">
                  🎯 Live Interview
                </h2>
                <p className="text-gray-300 mb-4">
                  Real-time AI interview based on your resume
                </p>
                <button className="w-full py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:opacity-90 active:opacity-80 transition duration-300">
                  Start Interview
                </button>
              </div>

              {/* Generate Q&A */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-white/10 backdrop-blur-md hover:scale-105 active:scale-105 transition duration-300 cursor-pointer">
                <h2 className="text-xl font-semibold mb-2">
                  📊 Generate Q&A
                </h2>
                <p className="text-gray-300 mb-4">
                  Get tailored questions & answers
                </p>

                <input
                  type="range"
                  min="1"
                  max="100"
                  value={questions}
                  onChange={(e) => setQuestions(e.target.value)}
                  className="w-full mb-2"
                />
                <p className="text-sm text-gray-400 mb-3">
                  Questions: {questions}
                </p>

                <button className="w-full py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90 active:opacity-80 transition duration-300">
                  Generate
                </button>
              </div>

            </div>
          )}
        </div>

        {/* Bottom Text */}
        <p className="mt-10 text-gray-500 text-center">
          Prepare smarter, not harder — let AI guide you.
        </p>

      </div>

      {/* features section */}
      <AIInterviewFeatures />

      {/* about section */}
      <About />

      {/* Footer */}
      <Footer />

    </div>
  );
}
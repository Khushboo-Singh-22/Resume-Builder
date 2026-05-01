import { useEffect, useRef, useState } from "react";

const leftSteps = [
  {
    title: "Resume Analyzed with ATS Engine",
    description:
      "Upload your resume and our ATS engine scans it against industry standards, checking keyword relevance, formatting, and structure to ensure it passes modern hiring systems.",
  },
  {
    title: "Get Optimized & Download Ready Resume",
    description:
      "Receive a fully optimized resume with improved keywords, better formatting, and higher ATS score. Instantly download a job-ready version tailored for maximum visibility.",
  },
];

const rightSteps = [
  {
    title: "Upload Resume & Job Description",
    description:
      "Simply upload your resume and paste the job description. Our system understands role-specific requirements and prepares a smart comparison for accurate ATS evaluation.",
  },
  {
    title: "AI Suggests Missing Keywords",
    description:
      "The AI detects missing keywords, skill gaps, and weak sections. It provides actionable suggestions to improve your resume and increase your chances of getting shortlisted.",
  },
];

export default function BuildProcess() {
  const segmentRefs = useRef([]);
  const [progress, setProgress] = useState([0, 0, 0]);

  useEffect(() => {
    const handleScroll = () => {
      const updated = segmentRefs.current.map((el) => {
        if (!el) return 0;

        const rect = el.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        const start = windowHeight * 0.6;
        const end = windowHeight * 0.2;

        let percent = (start - rect.top) / (start - end);

        percent = Math.min(Math.max(percent, 0), 1);

        return percent;
      });

      setProgress(updated);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section id="process" className="flex flex-col items-center mt-32">
      <p className="font-domine">AI-Powered ATS Resume Checker</p>

      <h3 className="text-3xl max-w-m text-gray-500 text-center mt-5">
        Boost Your ATS Score, Fix Resume Errors & Increase Interview Chances
      </h3>

      <div className="flex flex-col md:flex-row mt-20 md:mt-32">
        <div>
          {leftSteps.map((step, index) => (
            <div key={index} className="max-w-lg h-60 md:mt-60">
              <h3 className="text-xl underline font-domine">{step.title}</h3>
              <p className="mt-6 text-gray-500 text-sm/6">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        <div className="hidden md:flex flex-col items-center">
          <div className="size-4 bg-gray-800" />

          {[0, 1, 2].map((i) => (
            <div key={i} className="flex flex-col items-center">
              <div
                ref={(el) => {
                  if (el) segmentRefs.current[i] = el;
                }}
                data-index={i}
                className="relative w-0.5 mx-10 h-60 bg-gray-300 overflow-hidden"
              >
                <div
                  style={{ height: `${progress[i] * 100}%` }}
                  className="absolute top-0 left-0 w-full bg-gray-800"
                />
              </div>

              <div
                className={`size-4 ${
                  progress[i] > 0.95 ? "bg-gray-800" : "bg-gray-300"
                }`}
              />
            </div>
          ))}
        </div>

        <div>
          {rightSteps.map((step, index) => (
            <div
              key={index}
              className={`max-w-lg h-60 ${
                index === 0 ? "" : "md:mt-60"
              }`}
            >
              <h3 className="text-xl underline font-domine">{step.title}</h3>
              <p className="mt-6 text-gray-500 text-sm/6">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
import { Check, Layout } from "lucide-react";
import React, { useState } from "react";
import classicImg from "../assets/classicTemplateImg.png";
import modernImg from "../assets/modern.png";
import minimalImg from "../assets/minimal.png";
import minimalImageImg from "../assets/minimalImg.png";
import techResume from "../assets/Tech Resume.png";
import simpleInfographicImg from "../assets/Simple-Infographic-Resume.jpg";
import minimalATSImg from "../assets/Minimalist-ATS-Resume.jpg";
import ProfessionalImg from "../assets/Professional-Corporate-Resume.jpg";


const TemplateSelector = ({ selectedTemplate, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const templates = [
    {
      id: "classic",
      name: "Classic",
      image: classicImg,
    },
    {
      id: "modern",
      name: "Modern",
      image: modernImg,
    },
    {
      id: "minimal",
      name: "Minimal",
      image: minimalImg,
    },
    {
      id: "minimal-image",
      name: "Minimal Image",
      image: minimalImageImg,
    },
     {
      id: "tech-resume",
      name: "Tech Resume",
      image: techResumeImg,
    },
    {
      id: "simple_infographic",
      name: "Simple Infographic",
      image: simpleInfographicImg,
    },
    {
      id: "minimal-ats",
      name: "Minimal ATS",
      image: minimalATSImg,
    },
    {
      id: "professional-corporate",
      name: "Professional Corporate",
      image: ProfessionalImg,
    },
  ];

  return (
    <div className="relative">
      {/* BUTTON */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 text-sm text-blue-600 bg-gradient-to-br from-blue-50 to-blue-100 ring-1 ring-blue-300 hover:ring transition-all px-3 py-2 rounded-lg"
      >
        <Layout size={14} />
        <span className="hidden sm:inline">Template</span>
      </button>

      {/* PANEL */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-[1200px] max-h-[700px] overflow-y-auto p-4 z-50 bg-white/90 backdrop-blur-lg rounded-xl border border-gray-200 shadow-xl">

          <div className="text-sm font-semibold text-gray-700 mb-4  ">Select a Template</div>

          <div className="grid grid-cols-4 gap-4">

          {templates.map((template) => (
            <div
              key={template.id}
              onClick={() => {
                onChange(template.id);
                setIsOpen(false);
              }}
              className={`relative cursor-pointer rounded-xl overflow-hidden transition-all ${
                selectedTemplate === template.id
                  ? "ring-2 ring-blue-400"
                  : "border border-gray-300 hover:shadow-lg"
              }`}
            >
              {/* IMAGE (VERTICAL RESUME STYLE) */}
              <img
                src={template.image}
                alt={template.name}
                className="w-full h-90 object-contain bg-white"
              />

              {/* NAME ONLY */}
              <div className="bg-gray-100/80 text-center text-sm font-semibold py-2 text-gray-800 border-t border-gray-200">
                {template.name}
              </div>

              {/* SELECTED ICON */}
              {selectedTemplate === template.id && (
                <div className="absolute top-2 right-2">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center shadow">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                </div>
              )}
            </div>
          ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TemplateSelector;
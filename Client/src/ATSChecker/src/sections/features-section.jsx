import { ChartSplineIcon, LayoutPanelTopIcon, NotebookPenIcon } from "lucide-react";

export default function FeaturesSection() {

  const features = [
  {
    icon: LayoutPanelTopIcon,
    title: "ATS Score Analysis",
    description: "Instantly analyze your resume with our ATS engine and get a detailed score based on keyword relevance, formatting, and industry standards.",
  },
  {
    icon: NotebookPenIcon,
    title: "Keyword Matching System",
    description: "Compare your resume with job descriptions to identify matched and missing keywords, helping you optimize for better recruiter visibility.",
  },
  {
    icon: ChartSplineIcon,
    title: "Smart Improvement Suggestions",
    description: "Receive AI-powered suggestions to fix weak sections, add missing skills, and improve your resume for higher shortlisting chances.",
  },
];
  return (
    <div
      id="features"
      className="grid border mt-42 rounded-lg max-w-6xl mx-auto border-gray-200/70 grid-cols-1 divide-y divide-gray-200/70 lg:grid-cols-3 lg:divide-x lg:divide-y-0"
    >
      {features.map((item, index) => (
        <div
          key={index}
          className="flex flex-col items-start gap-4 hover:bg-gray-50 transition duration-300 p-8 pb-14"
        >
          <div className="flex items-center gap-2 text-gray-500">
            <item.icon className="size-5" />
            <h2 className="font-medium text-base">{item.title}</h2>
          </div>

          <p className="text-gray-500 text-sm/6 max-w-72">
            {item.description}
          </p>
        </div>
      ))}
    </div>
  );
}
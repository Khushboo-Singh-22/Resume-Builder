import { useNavigate } from "react-router-dom";
import { ArrowLeft, Download } from "lucide-react";

export default function AnalysisNavbar() {

  const navigate = useNavigate();

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/sample-resume.pdf";   // jo file download karni hai
    link.download = "ATS-Resume-Report.pdf";
    link.click();
  };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-40 bg-white/60 backdrop-blur-md">
        <div className="flex items-center justify-between px-3 py-4 md:px-16 lg:px-24 xl:px-32 border-b border-gray-200">

          {/* Left Section */}
          <div className="flex items-center gap-2">

            {/* Back Button */}
            <button
              onClick={() => navigate(-1)}
              className="p-2 rounded-lg hover:bg-gray-200 transition"
            >
              <ArrowLeft className="size-5" />
            </button>

            {/* Logo */}
            <img
              src="/logo.svg"
              alt="Logo"
              className="h-5 md:h-7 w-auto"
            />

          </div>

          {/* Center Title */}
          <h1 className="absolute left-1/2 transform -translate-x-1/2 text-sm md:text-xl font-semibold text-gray-800 whitespace-nowrap">
            ATS Resume Report
          </h1>

          {/* Right Button */}
          <button
            onClick={handleDownload}
            className="flex items-center justify-center md:gap-2 bg-linear-to-b from-gray-600 to-gray-800 hover:from-gray-700 hover:to-gray-900 transition px-2 md:px-5 py-2 text-white rounded-lg"
          >
            <Download className="size-4" />
            <span className="hidden md:inline ">Download</span>
          </button>

        </div>
      </nav>

      <div className="h-18" />
    </>
  );
}

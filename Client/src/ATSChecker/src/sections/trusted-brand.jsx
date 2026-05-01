export default function TrustedBrand() {
  const trustPoints = [
    "10K+ Scans",
    "ATS Score",
    "Keyword Match",
    "AI Fix",
    "Job Ready",
  ];

  return (
    <section className="mt-32 flex flex-col items-center">

      <h3 className="text-3xl md:text-4xl font-domine text-center text-gray-800">
        Analyze 10,000+ Resumes with AI Precision
      </h3>

      <p className="py-4 text-center text-gray-500 text-sm max-w-md">
        Improve your ATS score, fix missing keywords, and get your resume ready for shortlisting.
      </p>

      <div
        className="flex flex-wrap justify-center gap-4 max-w-4xl w-full mx-auto py-4"
        id="trust-container"
      >
        {trustPoints.map((text, index) => (
          <div
            key={index}
            className="px-4 py-1.5 border border-gray-200 rounded-full text-xs text-gray-600 bg-gray-50"
          >
            {text}
          </div>
        ))}
      </div>
    </section>
  );
}
import { Document, Page, pdfjs } from "react-pdf";
import { useEffect, useState } from "react";
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const ResumePreview = ({ file }) => {
  const [numPages, setNumPages] = useState(null);

  if (!file) return <div className="h-full bg-slate-100 animate-pulse rounded-3xl" />;

  const fileURL = URL.createObjectURL(file);
  const [containerWidth, setContainerWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setContainerWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="w-full flex lg:justify-start justify-center gap-4 items-start bg-[#f8f4ff] ">
      <Document
        file={fileURL}
        onLoadSuccess={({ numPages }) => setNumPages(numPages)}
        className="flex flex-col items-center gap-4"
      >
        {/* Saare pages ko ek saath render karenge scrollable view ke liye */}
        {Array.from(new Array(numPages), (el, index) => (
          <Page
            key={`page_${index + 1}`}
            pageNumber={index + 1}
            width={containerWidth < 768 ? containerWidth * 0.9 : 550} // Size bada rakha hai taaki clear dikhe
            scale={1}
            renderTextLayer={false}
            renderAnnotationLayer={false}
            className="shadow-2xl rounded-sm border border-slate-200"
          />
        ))}
      </Document>
    </div>
  );
};

export default ResumePreview;
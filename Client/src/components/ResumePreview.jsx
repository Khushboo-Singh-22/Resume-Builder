import React from 'react'
import ClassicTemplate from './templates/ClassicTemplate'
import ModernTemplate from './templates/ModernTemplate'
import MinimalTemplate from './templates/MinimalTemplate'
import MinimalImageTemplate from './templates/MinimalImageTemplate'
import TechResume from './templates/Tech-Resume'

const ResumePreview = ({ data = {}, template = "classic", accentColor = "#3B82F6", classes = "" }) => {

  const renderTemplate = () => {
    if (!data) return null;
    switch (template) {
      case "modern":
        return <ModernTemplate data={data} accentColor={accentColor} />
      case "minimal":
        return <MinimalTemplate data={data} accentColor={accentColor} />
      case "minimal-image":
        return <MinimalImageTemplate data={data} accentColor={accentColor} />
      case "tech-resume":
        return <TechResume data={data} accentColor={accentColor} />
      default:
        return <ClassicTemplate data={data} accentColor={accentColor} />
    }
  }

  return (
    <div className="w-full bg-gray-100">
      <div
        id="resume-preview"
        className={
          "border border-gray-200 print:shadow-none print:border-none " +
          classes
        }
      >
        {renderTemplate()}
      </div>

      {/* Print Styles */}
      <style>
        {`
          @page {
            size: A4;
            margin: 0;
          }

          @media print {
            html, body {
              width: 210mm;
              height: 297mm;
              margin: 0;
              padding: 0;
              overflow: hidden;
            }
              

            body * {
              visibility: hidden;
            }

            #resume-preview,
            #resume-preview * {
              visibility: visible;
            }

            #resume-preview {
              position: absolute;
              left: 0;
              top: 0;
              width: 210mm;
              height: 297mm;
              margin: 0;
              padding: 15mm;
              box-shadow: none !important;
              border: none !important;
            }
            
            #resume-preview.minimal-template{
              padding: 0 !important;
            }
            
            @media print{
              .minimal-template {
              width: 794px;
              zoom: 100%;}
             
            #resume-preview.minimal-template{
             transform: scale(1);
             transform-origin: top left;}

            }
          }
        `}
      </style>
    </div>
  )
}

export default ResumePreview

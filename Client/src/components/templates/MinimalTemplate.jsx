import { Mail, Phone, MapPin, Linkedin } from "lucide-react";

const MinimalTemplate = ({ data, accentColor }) => {

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const [year, month] = dateStr.split("-");
    return new Date(year, month - 1).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short"
    });
  };

  return (
     <>

    <div id="resume-preview" className="minimal-template w-full max-w-[210mm] mx-auto bg-white text-gray-900 print:p-0">

      {/* HEADER */}
      <header
        className="w-full px-6 py-4 text-white"
        style={{ backgroundColor: accentColor, width: "100%" }}
      >
        <h1 className="text-xl font-semibold">
          {data.personal_info?.full_name || "Your Name"}
        </h1>
        <p className="text-xs opacity-80">
          {data.personal_info?.title || "Your Role"}
        </p>
      </header>

      {/* MAIN GRID */}
      <div className="grid grid-cols-3 h-full">

        {/* LEFT SIDE */}
        <div className="col-span-2 px-4 py-3 space-y-3">

          {/* SUMMARY */}
          {data.professional_summary && (
            <section>
              <h2
                className="text-xs font-bold uppercase mb-1"
                style={{ color: accentColor }}
              >
                Professional Summary
              </h2>
              <p className="text-xs text-gray-700 leading-snug">
                {data.professional_summary}
              </p>
            </section>
          )}

          {/* EXPERIENCE */}
          {data.experience?.length > 0 && (
            <section>
              <h2
                className="text-xs font-bold uppercase mb-1"
                style={{ color: accentColor }}
              >
                Experience
              </h2>

              {data.experience.map((exp, i) => (
                <div key={i} className="mb-2">
                  <div className="flex justify-between">
                    <h3 className="text-xs font-semibold">{exp.position}</h3>
                    <span className="text-xs text-gray-500">
                      {formatDate(exp.start_date)} -{" "}
                      {exp.is_current ? "Present" : formatDate(exp.end_date)}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600">{exp.company}</p>
                  <p className="text-xs text-gray-700 whitespace-pre-line">
                    {exp.description}
                  </p>
                </div>
              ))}
            </section>
          )}

          {/* PROJECTS (Experience ke niche) */}
          {data.projects?.length > 0 && (
            <section>
              <h2
                className="text-xs font-bold uppercase mb-1"
                style={{ color: accentColor }}
              >
                Projects
              </h2>

              {data.projects.map((proj, i) => (
                <div key={i} className="mb-2">
                  <h3 className="text-xs font-semibold">{proj.name}</h3>
                  <p className="text-xs text-gray-700">
                    {proj.description}
                  </p>
                </div>
              ))}
            </section>
          )}

          {/* EDUCATION */}
          {data.education?.length > 0 && (
            <section>
              <h2
                className="text-xs font-bold uppercase mb-1"
                style={{ color: accentColor }}
              >
                Education
              </h2>

              {data.education.map((edu, i) => (
                <div key={i} className="flex justify-between">
                  <div>
                    <h3 className="text-xs font-semibold">
                      {edu.degree}
                    </h3>
                    <p className="text-xs text-gray-600">{edu.institution}</p>
                  </div>
                  <span className="text-xs text-gray-500">
                    {formatDate(edu.graduation_date)}
                  </span>
                </div>
              ))}
            </section>
          )}

        </div>

        {/* RIGHT SIDEBAR */}
        <div className="w-full col-span-1 bg-gray-100 px-3 py-3 text-xs space-y-3">

          {/* PERSONAL INFO */}
          <section>
            <h2 className="font-bold mb-1">Personal Info</h2>

            {data.personal_info?.location && (
              <p className="flex gap-1 items-start">
                <MapPin size={12} /> {data.personal_info.location}
              </p>
            )}

            {data.personal_info?.phone && (
              <p className="flex gap-1">
                <Phone size={12} /> {data.personal_info.phone}
              </p>
            )}

            {data.personal_info?.email && (
              <p className="flex gap-1 break-all">
                <Mail size={12} /> {data.personal_info.email}
              </p>
            )}

            {data.personal_info?.linkedin && (
              <p className="flex gap-1 break-all">
                <Linkedin size={12} /> {data.personal_info.linkedin}
              </p>
            )}
          </section>

          {/* SKILLS */}
          {data.skills?.length > 0 && (
            <section>
              <h2 className="font-bold mb-1">Skills</h2>
              <div className="space-y-1">
                {data.skills.map((skill, i) => (
                  <p key={i}>{skill}</p>
                ))}
              </div>
            </section>
          )}

          {/* LANGUAGES (FIXED) */}
          <section>
            <h2 className="font-bold mb-1">Languages</h2>

            <div className="space-y-1">
              <p className="flex justify-between">
                English <span>●●●●○</span>
              </p>
              <p className="flex justify-between">
                Hindi <span>●●●●●</span>
              </p>
            </div>
          </section>

        </div>
      </div>
    </div>
       </>
  );
  
};

export default MinimalTemplate;
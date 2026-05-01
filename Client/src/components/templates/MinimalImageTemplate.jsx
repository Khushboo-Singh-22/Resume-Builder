import { Mail, Phone, MapPin } from "lucide-react";

const ModernSidebarTemplate = ({ data = {}, accentColor = "#2f3a4a" }) => {
  const formatYear = (date) => {
    if (!date) return "";
    try {
      return new Date(date).getFullYear();
    } catch {
      return "";
    }
  };

  const profileImage =
    typeof data?.personal_info?.image === "string"
      ? data.personal_info.image
      : data?.personal_info?.image
      ? URL.createObjectURL(data.personal_info.image)
      : null;

  const languages =
    data?.languages && data.languages.length > 0 ? data.languages : ["English", "Hindi"];

  return (
    <div
      style={{
        display: "flex",
        width: "210mm",
        minHeight: "297mm",
        fontFamily: "Arial, sans-serif",
        background: "#fff",
        height: "100%",
      }}
    >
      {/* LEFT SIDEBAR */}
      <div
        style={{
          width: "30%",
          background: accentColor,
          color: "#fff",
          padding: "15px",
          boxSizing: "border-box",
        }}
      >
        {/* IMAGE */}
        {profileImage && (
          <div style={{ textAlign: "center", marginBottom: "20px" }}>
            <img
              src={profileImage}
              alt="profile"
              style={{
                width: "100px",
                height: "100px",
                borderRadius: "50%",
                objectFit: "cover",
                border: "3px solid white",
                display: "block",
                margin: "0 auto",
              }}
            />
          </div>
        )}

        {/* CONTACT */}
        <Section  title="Contact">
          <div style={{ marginTop: "9px", display: "flex", flexDirection: "column"}}>
          <Item icon={<Phone size={14} />} text={data?.personal_info?.phone} />
          <Item icon={<Mail size={14} />} text={data?.personal_info?.email}
          style={{ fontSize: "12px", marginLeft: "0px" }}
           />
          <Item icon={<MapPin size={14} />} text={data?.personal_info?.location} />
          </div>
        </Section>

        {/* EDUCATION */}
        <Section title="Education">
          {data?.education?.map((edu, i) => (
            <div key={i} style={{ marginBottom: "12px" }}>
              <strong>{edu.degree}</strong>
              <p style={{ margin: 0 }}>{edu.institution}</p>

              <small>
                {formatYear(edu.start_date)} -{" "}
                {edu.is_current ? "Present" : formatYear(edu.end_date)}
              </small>

              {edu.percentage && (
                <p style={{ margin: 0, fontSize: "11px" }}>
                  Score: {edu.percentage}%
                </p>
              )}
            </div>
          ))}
        </Section>

        {/* LANGUAGES */}
        <Section title="Language">
          {languages.map((lang, i) => (
            <p key={i} style={{ margin: "2px 0" }}>
              {lang}
            </p>
          ))}
        </Section>
      </div>

      {/* RIGHT CONTENT */}
      <div style={{ width: "70%", padding: "30px" }}>
        {/* HEADER */}
        <h1 style={{ margin: 0, fontSize: "28px" }}>
          {data?.personal_info?.full_name || "Your Name"}
        </h1>

        <p style={{ color: accentColor, fontWeight: "bold", margin: "5px 0" }}>
          {data?.personal_info?.profession}
        </p>

      <SectionRight title="Professional Summary" accentColor={accentColor}>

        <p style={{ fontSize: "12px", color: "#666" }}>
          {data?.professional_summary}
        </p>
      </SectionRight>
        

        {/* EXPERIENCE */}
        {data?.experience?.length > 0 && (
          <SectionRight title="Experience" accentColor={accentColor}>
            {data.experience.map((exp, i) => (
              <TimelineItem key={i} accentColor={accentColor}>
                <strong>
                  {formatYear(exp.start_date)} -{" "}
                  {exp.is_current
                    ? "Present"
                    : formatYear(exp.end_date)}
                </strong>

                <p style={{ color: accentColor, margin: "2px 0" }}>
                  {exp.company}
                </p>

                <h4 style={{ margin: "3px 0" }}>{exp.position}</h4>

                {exp.description && (
                  <ul style={{ paddingLeft: "15px", fontSize: "12px" }}>
                    {exp.description.split("\n").map((line, j) => (
                      <li key={j}>{line}</li>
                    ))}
                  </ul>
                )}
              </TimelineItem>
            ))}
          </SectionRight>
        )}

        {/* PROJECTS */}
        {data?.projects?.length > 0 && (
          <SectionRight title="Projects" accentColor={accentColor}>
            {data.projects.map((proj, i) => (
              <div key={i} style={{ marginBottom: "10px" }}>
                <strong>{proj.name}</strong>

                {proj.description && (
                  <ul style={{ paddingLeft: "15px", fontSize: "12px" }}>
                    {proj.description.split("\n").map((line, j) => (
                      <li key={j}>{line}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </SectionRight>
        )}

        {/* SKILLS / EXPERTISE */}
        {data?.skills?.length > 0 && (
          <SectionRight title="Expertise" accentColor={accentColor}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" ,marginTop: "10px"}}>
              {data.skills.map((skill, i) => (
                <span
                  key={i}
                  style={{
                    background: accentColor,
                    color: "#fff",
                    padding: "4px 10px",
                    borderRadius: "12px",
                    fontSize: "11px",
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </SectionRight>
        )}
      </div>
    </div>
  );
};

/* LEFT SECTION */
const Section = ({ title, children }) => (
  <div style={{ marginBottom: "20px" }}>
    <h3
      style={{
        borderBottom: "1px solid rgba(255,255,255,0.4)",
        paddingBottom: "5px",
      }}
    >
      {title}
    </h3>
    {children}
  </div>
);

/* RIGHT SECTION */
const SectionRight = ({ title, children, accentColor }) => (
  <div style={{ marginBottom: "25px" }}>
    <h2
      style={{
        borderBottom: `2px solid ${accentColor}`,
        color: accentColor,
        paddingBottom: "5px",
      }}
    >
      {title}
    </h2>
    {children}
  </div>
);

/* ITEM */
const Item = ({ icon, text }) => {
  if (!text) return null;
  return (
    <div style={{ display: "flex", gap: "8px", marginBottom: "5px" }}>
      {icon}
      <span>{text}</span>
    </div>
  );
};

/* TIMELINE */
const TimelineItem = ({ children, accentColor }) => (
  <div style={{ display: "flex", marginBottom: "15px" }}>
    <div
      style={{
        width: "10px",
        borderLeft: `2px solid ${accentColor}`,
        marginRight: "10px",
        position: "relative",
        marginTop: "2px",
      }}
    >
      <div
        style={{
          width: "8px",
          height: "8px",
          background: accentColor,
          borderRadius: "50%",
          position: "absolute",
          left: "-5px",
          top: "10px",
        }}
      />
    </div>
    <div>{children}</div>
  </div>
);

export default ModernSidebarTemplate;
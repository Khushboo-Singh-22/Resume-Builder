import React from 'react';

const TechResume = ({ data, accentColor = "#2563eb" }) => {
    // Formatting helper to match the image's date style (e.g., Jan 2023 - Present)
    const formatPeriod = (start, end, isCurrent) => {
        if (!start) return "";
        const endPart = isCurrent ? "Present" : end || "";
        return `${start} - ${endPart}`;
    };

    return (
        <div className="w-full max-w-[210mm] mx-auto bg-white text-gray-900 p-10 print:p-0">
            <article className="w-full bg-white text-sm leading-relaxed" style={{ boxSizing: 'border-box' }}>
                
                {/* HEADER SECTION: Left aligned Name & Title */}
                <header className="mb-8">
                    <h1 className="text-4xl font-bold tracking-tight mb-1" style={{ color: accentColor }}>
                        {data.personal_info?.full_name?.toUpperCase() || 'YOUR NAME'}
                    </h1>
                    <h2 className="text-xl font-bold mb-3 text-gray-800 tracking-wide">
                        {data.personal_info?.profession?.toUpperCase() || 'FULL STACK WEB DEVELOPER'}
                    </h2>
                    
                    {/* Contact Info Row */}
                    <div className="flex flex-wrap gap-x-4 text-[13px] text-gray-600 italic">
                        <span>{data.personal_info?.location || 'City, State'}</span>
                        {data.personal_info?.email && (
                            <span className="border-l pl-4 border-gray-300">{data.personal_info.email}</span>
                        )}
                        {data.personal_info?.website && (
                            <span className="border-l pl-4 border-gray-300">{data.personal_info.website}</span>
                        )}
                         {data.personal_info?.linkedin && ( 
                            <span className="border-l pl-4 border-gray-300">LinkedIn</span>
                        )}
                    </div>
                </header>

                <main className="flex flex-col gap-8">
                    
                    {/* SUMMARY SECTION */}
                    {data.professional_summary && (
                        <section>
                            <h3 className="text-sm font-bold tracking-[0.15em] mb-1" style={{ color: accentColor }}>SUMMARY</h3>
                            <hr className="border-t-[1.5px] mb-3" style={{ borderColor: accentColor }} />
                            <p className="text-[13px] leading-relaxed text-gray-700 text-justify">
                                {data.professional_summary}
                            </p>
                        </section>
                    )}

                    {/* TECHNICAL SKILLS SECTION: 3-Column Grid Layout */}
                    {data.skills && data.skills.length > 0 && (
                        <section>
                            <h3 className="text-sm font-bold tracking-[0.15em] mb-1" style={{ color: accentColor }}>TECHNICAL SKILLS</h3>
                            <hr className="border-t-[1.5px] mb-3" style={{ borderColor: accentColor }} />
                            <div className="grid grid-cols-3 gap-x-8 gap-y-1 text-[13px] text-gray-700 font-medium">
                                {data.skills.map((skill, idx) => (
                                    <div key={idx} className="flex items-center">
                                        <span className="w-1 h-1 bg-gray-400 rounded-full mr-2 print:hidden"></span>
                                        {skill}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* PROFESSIONAL EXPERIENCE SECTION */}
                    {data.experience && data.experience.length > 0 && (
                        <section>
                            <h3 className="text-sm font-bold tracking-[0.15em] mb-1" style={{ color: accentColor }}>PROFESSIONAL EXPERIENCE</h3>
                            <hr className="border-t-[1.5px] mb-3" style={{ borderColor: accentColor }} />
                            <div className="flex flex-col gap-6">
                                {data.experience.map((exp, idx) => (
                                    <div key={idx} className="group">
                                        <div className="flex justify-between items-baseline mb-1">
                                            <h4 className="font-bold text-[14px] text-gray-900">
                                                {exp.position}, {exp.company}
                                            </h4>
                                            <span className="font-bold text-[12px] text-gray-800 whitespace-nowrap ml-4">
                                                {formatPeriod(exp.start_date, exp.end_date, exp.is_current)}
                                            </span>
                                        </div>
                                        {exp.description && (
                                            <ul className="list-disc ml-5 text-[13px] text-gray-700 space-y-1.5">
                                                {exp.description.split('\n').map((bullet, i) => (
                                                    <li key={i} className="pl-1 leading-normal">
                                                        {bullet.replace(/^[•-]\s*/, '')}
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* EDUCATION SECTION */}
                    {data.education && data.education.length > 0 && (
                        <section>
                            <h3 className="text-sm font-bold tracking-[0.15em] mb-1" style={{ color: accentColor }}>EDUCATION</h3>
                            <hr className="border-t-[1.5px] mb-3" style={{ borderColor: accentColor }} />
                            <div className="flex flex-col gap-5">
                                {data.education.map((edu, idx) => (
                                    <div key={idx}>
                                        <div className="flex justify-between items-baseline">
                                            <h4 className="font-bold text-[14px] text-gray-900">
                                                {edu.degree} {edu.field ? `in ${edu.field}` : ''}
                                            </h4>
                                            <span className="font-bold text-[12px] text-gray-800">
                                                {edu.graduation_date}
                                            </span>
                                        </div>
                                        <p className="text-[13px] italic text-gray-700 mt-0.5">{edu.institution}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* ADDITIONAL INFORMATION SECTION */}
                    <section className="mb-4">
                        <h3 className="text-sm font-bold tracking-[0.15em] mb-1" style={{ color: accentColor }}>ADDITIONAL INFORMATION</h3>
                        <hr className="border-t-[1.5px] mb-3" style={{ borderColor: accentColor }} />
                        <div className="text-[13px] text-gray-700 space-y-1">
                            {data.languages && data.languages.length > 0 && (
                                <p><span className="font-bold text-gray-900">• Languages:</span> {data.languages.join(', ')}</p>
                            )}
                            {data.certifications && data.certifications.length > 0 && (
                                <p><span className="font-bold text-gray-900">• Certifications:</span> {data.certifications.join(', ')}</p>
                            )}
                            {data.awards && data.awards.length > 0 && (
                                <p><span className="font-bold text-gray-900">• Awards/Activities:</span> {data.awards.join(', ')}</p>
                            )}
                        </div>
                    </section>

                </main>
            </article>
        </div>
    );
};

export default TechResume;
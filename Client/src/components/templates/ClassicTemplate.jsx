import React from 'react';
import { Mail, Phone, MapPin, Linkedin, Globe } from "lucide-react";

const ClassicTemplate = ({ data = {}, accentColor = '#0ea5a4' }) => {
    const formatDate = (dateStr) => {
        if (!dateStr) return "";
        const [year, month] = dateStr.split('-');
        if (!year || !month) return dateStr;
        return new Date(year, month - 1).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short'
        });
    };

    const SectionTitle = ({ children }) => (
        <h2 className="text-sm font-semibold mb-1" style={{ color: accentColor }}>
            {children}
        </h2>
    );

    return (
        <div className="w-full max-w-[210mm] mx-auto bg-white text-gray-900 p-6 print:p-0">
            <article className="w-full bg-white text-sm leading-relaxed" style={{ boxSizing: 'border-box' }}>
                {/* Header */}
                <header className="w-full flex flex-col items-center gap-2 pb-3 border-b" style={{ borderColor: accentColor }}>
                    <div className="w-full max-w-[180mm] flex flex-col items-center">
                        <h1 className="text-2xl sm:text-3xl font-bold leading-tight text-center break-words" style={{ color: accentColor }}>
                            {data.personal_info?.full_name || 'Your Name'}
                        </h1>

                        <div className="w-full mt-1 flex flex-wrap justify-center gap-3 text-xs text-gray-600">
                            {data.personal_info?.email && (
                                <div className="flex items-center gap-1 break-words">
                                    <Mail className="h-3 w-3" />
                                    <span className="text-xs">{data.personal_info.email}</span>
                                </div>
                            )}
                            {data.personal_info?.phone && (
                                <div className="flex items-center gap-1">
                                    <Phone className="h-3 w-3" />
                                    <span className="text-xs">{data.personal_info.phone}</span>
                                </div>
                            )}
                            {data.personal_info?.location && (
                                <div className="flex items-center gap-1">
                                    <MapPin className="h-3 w-3" />
                                    <span className="text-xs break-words">{data.personal_info.location}</span>
                                </div>
                            )}
                            {data.personal_info?.linkedin && (
                                <div className="flex items-center gap-1 break-all">
                                    <Linkedin className="h-3 w-3" />
                                    <a className="text-xs text-gray-700 underline break-all" href={data.personal_info.linkedin} target="_blank" rel="noreferrer">{data.personal_info.linkedin}</a>
                                </div>
                            )}
                            {data.personal_info?.website && (
                                <div className="flex items-center gap-1 break-all">
                                    <Globe className="h-3 w-3" />
                                    <a className="text-xs text-gray-700 underline break-all" href={data.personal_info.website} target="_blank" rel="noreferrer">{data.personal_info.website}</a>
                                </div>
                            )}
                         {data.personal_info?.profession && (
            <p className="text-xs text-gray-700 mt-1 text-2xl font-bold"
             style={{ color: accentColor }}
            >{data.personal_info.profession}</p>
          )}
                        </div>
                    </div>
                </header>

                <main className="w-full max-w-[180mm] mx-auto mt-4 flex flex-col gap-6">
                    {/* Stack all sections vertically in a single column */}
                    {data.professional_summary && (
                        <section>
                            <SectionTitle>Professional Summary</SectionTitle>
                            <p className="text-gray-700 text-xs sm:text-sm leading-tight whitespace-pre-wrap break-words">{data.professional_summary}</p>
                        </section>
                    )}

                    {data.experience && data.experience.length > 0 && (
                        <section>
                            <SectionTitle>Professional Experience</SectionTitle>
                            <div className="flex flex-col gap-4">
                                {data.experience.map((exp, idx) => (
                                    <div key={idx} className="flex flex-col gap-2">
                                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1">
                                            <div className="min-w-0">
                                                <h3 className="text-sm font-semibold text-gray-900">{exp.position || 'Position'}</h3>
                                                <p className="text-xs text-gray-700">{exp.company}</p>
                                            </div>
                                            <div className="text-xs text-gray-600 whitespace-nowrap">{formatDate(exp.start_date)} — {exp.is_current ? 'Present' : formatDate(exp.end_date)}</div>
                                        </div>
                                        {exp.description && (
                                            <div className="text-gray-700 text-xs leading-tight whitespace-pre-wrap break-words">{exp.description}</div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {data.projects && data.projects.length > 0 && (
                        <section>
                            <SectionTitle>Projects</SectionTitle>
                            <div className="flex flex-col gap-3">
                                {data.projects.map((proj, idx) => (
                                    <div key={idx} className="flex flex-col gap-1">
                                        <h4 className="text-sm font-medium text-gray-800 break-words">{proj.name}</h4>
                                        <p className="text-xs text-gray-700 break-words">{proj.description}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Education (now below main content) */}
                    {data.education && data.education.length > 0 && (
                        <section>
                            <SectionTitle>Education</SectionTitle>
                            <div className="flex flex-col gap-3">
                                {data.education.map((edu, idx) => (
                                    <div key={idx} className="flex justify-between items-start gap-3">
                                        <div className="min-w-0">
                                            <h4 className="text-sm font-semibold text-gray-900 break-words">{edu.degree} {edu.field ? `in ${edu.field}` : ''}</h4>
                                            <p className="text-xs text-gray-700 break-words">{edu.institution}</p>
                                            {edu.gpa && <p className="text-xs text-gray-600">GPA: {edu.gpa}</p>}
                                        </div>
                                        <div className="text-xs text-gray-600 whitespace-nowrap">{formatDate(edu.graduation_date)}</div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Skills (below Education) */}
                    {data.skills && data.skills.length > 0 && (
                        <section>
                            <SectionTitle>Core Skills</SectionTitle>
                            <ul className="flex flex-wrap gap-2 text-xs text-gray-700">
                                {data.skills.map((skill, idx) => (
                                    <li key={idx} className="px-2 py-1 bg-gray-100 rounded text-xs break-words">{skill}</li>
                                ))}
                            </ul>
                        </section>
                    )}

                </main>
            </article>
        </div>
    );
};

export default ClassicTemplate;
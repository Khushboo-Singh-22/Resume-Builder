import React from 'react';
import { useLocation } from 'react-router-dom';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import ResumePreview from './ResumePreview';
import GapAnalysisBox from './GapAnalysisBox';
import ImprovementChecklist from './ImprovementChecklist';

export default function AnalysisPage() {
    const location = useLocation();
    const { data, resumeFile } = location.state || {};

    console.log('=== AnalysisPage Debug ===');
    console.log('Location state:', location.state);
    console.log('Data:', data);
    console.log('AtsDetails:', data?.atsDetails);
    console.log('GapAnalysis:', data?.atsDetails?.gapAnalysis);
    console.log('Resume File:', resumeFile);

    if (!data || !data.overallScore) return <p>No data found.</p>;

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50  to-pink-50 p-10 font-sans">
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6 lg:gap-10">

                {/* LEFT: Resume Preview Card */}
                <div className="w-full lg:w-5/12">
                    <div className="sticky top-4">
                    <ResumePreview file={resumeFile} />
                    </div>
                </div>

                {/* RIGHT: Analysis Panels */}
                <div className="w-full lg:w-7/12 space-y-6">

                    {/* Improvement Potential Summary */}
                    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-8 shadow-lg text-white">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-2xl font-bold mb-2">🎯 Your Score Potential</h3>
                                <p className="text-indigo-100">Follow the improvements below to boost your ATS score</p>
                            </div>
                            <div className="text-right">
                                <p className="text-sm text-indigo-200 mb-1">Current Score</p>
                                <p className="text-4xl font-bold">{data?.overallScore || 0}</p>
                                <p className="text-sm text-green-200 mt-2">↑ Can reach <span className="font-bold">85+</span></p>
                            </div>
                        </div>
                    </div>

                    {/* Overall Score Card */}
                    <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 shadow-sm flex flex-col lg:flex-row items-center gap-6 lg:gap-10 border border-white ">
                        <div className="w-24 h-24">
                            <CircularProgressbar
                                value={data.overallScore}
                                text={`${data.overallScore}/100`}
                                styles={buildStyles({ pathColor: '#db2777', textColor: '#1e293b', trailColor: '#f1f5f9' })}
                            />
                        </div>
                        <div className="text-center lg:text-left">
                            <h3 className="text-2xl font-bold text-slate-800">Your Resume Score</h3>
                            <p className="text-slate-500">This score is calculated based on the variables listed below.</p>
                        </div>
                    </div>

                    {/* Section Breakdown Bars */}
                    <div className="bg-white/80 rounded-3xl p-8 shadow-sm space-y-6 border border-white">
                        {data.sections.map((s, i) => (
                            <div key={i} className="flex justify-between items-center gap-2 border-b border-slate-50 pb-3">
                                <div className="flex items-center gap-2 min-w-0">
                                    <span className="text-sm lg:text-base font-semibold text-slate-700 truncate">{s.label}</span>
                                    <span className={`text-[9px] lg:text-base font-bold text-slate-800 whitespace-nowrap px-2 py-0.5 rounded-full 
                                        ${s.color === 'orange' ? 'bg-orange-100 text-orange-600' :
                                            s.color === 'red' ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
                                        {s.status}
                                    </span>
                                </div>
                                <span className="font-bold text-slate-800">{s.score}/100</span>
                            </div>
                        ))}
                    </div>

                    {/* ATS Detailed Analysis Box */}
                    <div className="bg-gradient-to-br from-emerald-50 to-cyan-50 rounded-3xl p-8 border border-emerald-300 shadow-lg">
                        <div className="flex items-center gap-3 mb-5">
                            <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center text-emerald-600 font-bold">✓</div>
                            <h4 className="text-emerald-900 font-bold text-lg">ATS Keyword Analysis - {data.overallScore}/100</h4>
                        </div>

                        {/* Matched Keywords */}
                        <div className="mb-5 p-4 bg-white/70 rounded-lg border border-emerald-200">
                            <p className="text-emerald-900 font-bold text-sm mb-3">✅ Keywords Found ({data?.atsDetails?.keywordsMatched?.length || 0} matches):</p>
                            <div className="flex flex-wrap gap-2">
                                {data?.atsDetails?.keywordsMatched?.slice(0, 10).map((kw, i) => (
                                    <span key={i} className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-xs font-semibold">
                                        {kw}
                                    </span>
                                ))}
                            </div>
                            {data?.atsDetails?.keywordsMatched?.length > 10 && (
                                <p className="text-xs text-emerald-600 mt-2">+{data.atsDetails.keywordsMatched.length - 10} more matches</p>
                            )}
                        </div>

                        {/* Missing Keywords */}
                        {data?.atsDetails?.missingSkills && data.atsDetails.missingSkills.length > 0 && (
                            <div className="mb-5 p-4 bg-white/70 rounded-lg border border-orange-200">
                                <p className="text-orange-900 font-bold text-sm mb-3">⚠️ Keywords Missing ({data.atsDetails.missingSkills.length} to add):</p>
                                <div className="flex flex-wrap gap-2">
                                    {data.atsDetails.missingSkills.slice(0, 8).map((skill, i) => (
                                        <span key={i} className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-xs font-semibold">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                                <p className="text-xs text-orange-700 mt-3 font-medium">
                                    💡 Add these keywords to your resume where applicable
                                </p>
                            </div>
                        )}

                        {/* Match Percentage */}
                        <div className="p-4 bg-white/70 rounded-lg border border-emerald-200">
                            <div className="flex items-center justify-between mb-2">
                                <p className="text-emerald-900 font-bold text-sm">Match Percentage</p>
                                <span className="text-emerald-700 font-bold">{data?.atsDetails?.matchPercentage || 0}%</span>
                            </div>
                            <div className="w-full bg-emerald-200 h-3 rounded-full overflow-hidden">
                                <div 
                                    className="bg-green-500 h-full transition-all"
                                    style={{width: `${data?.atsDetails?.matchPercentage || 0}%`}}
                                />
                            </div>
                            <p className="text-xs text-emerald-700 mt-2">
                                {data?.atsDetails?.matchPercentage >= 80 ? '🎉 Excellent match!' : 
                                 data?.atsDetails?.matchPercentage >= 60 ? '✨ Good match, can improve' :
                                 '⚠️ Need more matching keywords'}
                            </p>
                        </div>
                    </div>


                    {/* 🚀 Smart Improvement Box - ENHANCED */}
                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 backdrop-blur-md rounded-3xl p-8 border border-green-300 shadow-lg">

                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center text-green-600 text-lg">
                                    🚀
                                </div>
                                <div>
                                    <h4 className="text-green-900 font-bold text-xl">Improve Your ATS Score</h4>
                                    <p className="text-green-700 text-xs">Step-by-step actions to boost from {data?.overallScore || 0} → 85+</p>
                                </div>
                            </div>
                        </div>

                        {/* Score Sections Needing Work */}
                        <div className="mb-6 space-y-3">
                            <p className="text-green-900 font-bold text-sm mb-3">📊 Priority Improvements:</p>
                            {data?.sections?.filter(s => s.score < 80).map((section, i) => (
                                <div key={i} className="bg-white/70 rounded-lg p-4 border border-green-200">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="font-semibold text-green-900">{section.label}</span>
                                        <span className="text-sm font-bold text-green-700">
                                            {section.score}/100 → {Math.min(100, section.score + 15)}
                                        </span>
                                    </div>
                                    <div className="w-full bg-green-100 h-2 rounded-full overflow-hidden">
                                        <div 
                                            className="bg-green-500 h-full transition-all"
                                            style={{width: `${section.score}%`}}
                                        />
                                    </div>
                                    <p className="text-xs text-green-700 mt-2">
                                        {section.label === 'Content Relevance' && '✏️ Add missing keywords from job description'}
                                        {section.label === 'Resume Structure' && '📋 Clear section headers (Education, Experience, Skills)'}
                                        {section.label === 'Professional Tone' && '💬 Use strong action verbs (Developed, Built, Led)'}
                                        {section.label === 'Skills Match' && '🎯 Add more technical skills mentioned in job'}
                                    </p>
                                </div>
                            ))}
                        </div>

                        {/* Quick Action Items */}
                        <div className="bg-white/70 rounded-lg p-5 border border-green-200 mb-6">
                            <p className="text-green-900 font-bold text-sm mb-4">⚡ Quick Actions (15-30 min):</p>
                            <ul className="space-y-3">
                                <li className="flex gap-3 items-start">
                                    <span className="text-lg flex-shrink-0">1️⃣</span>
                                    <div>
                                        <p className="font-semibold text-green-900 text-sm">Add Job Keywords</p>
                                        <p className="text-xs text-green-700">Copy key terms from job description → paste in resume</p>
                                        <p className="text-xs text-green-600 font-medium mt-1">💡 Example: Add "React", "Node.js", "MongoDB" if you use them</p>
                                    </div>
                                </li>
                                <li className="flex gap-3 items-start">
                                    <span className="text-lg flex-shrink-0">2️⃣</span>
                                    <div>
                                        <p className="font-semibold text-green-900 text-sm">Use Action Verbs</p>
                                        <p className="text-xs text-green-700">Replace weak words → strong action verbs</p>
                                        <p className="text-xs text-green-600 font-medium mt-1">💡 "Worked on" → "Developed" | "Did" → "Implemented" | "Helped" → "Led"</p>
                                    </div>
                                </li>
                                <li className="flex gap-3 items-start">
                                    <span className="text-lg flex-shrink-0">3️⃣</span>
                                    <div>
                                        <p className="font-semibold text-green-900 text-sm">Add Metrics & Results</p>
                                        <p className="text-xs text-green-700">Every achievement needs numbers</p>
                                        <p className="text-xs text-green-600 font-medium mt-1">💡 "Improved performance" → "Improved performance by 40%" | "Reduced bugs" → "Reduced bugs by 60%"</p>
                                    </div>
                                </li>
                                <li className="flex gap-3 items-start">
                                    <span className="text-lg flex-shrink-0">4️⃣</span>
                                    <div>
                                        <p className="font-semibold text-green-900 text-sm">Add Technologies Used</p>
                                        <p className="text-xs text-green-700">List tools, frameworks, languages you used</p>
                                        <p className="text-xs text-green-600 font-medium mt-1">💡 Tech Stack: React, Node.js, MongoDB, Docker, AWS</p>
                                    </div>
                                </li>
                                <li className="flex gap-3 items-start">
                                    <span className="text-lg flex-shrink-0">5️⃣</span>
                                    <div>
                                        <p className="font-semibold text-green-900 text-sm">Showcase Projects</p>
                                        <p className="text-xs text-green-700">Add 2-3 projects with GitHub links</p>
                                        <p className="text-xs text-green-600 font-medium mt-1">💡 Format: Project Name | Tech Stack | GitHub Link | Key Achievement</p>
                                    </div>
                                </li>
                            </ul>
                        </div>

                        {/* Smart Suggestions */}
                        {data?.atsDetails?.suggestions?.length > 0 && (
                            <div className="bg-white/70 rounded-lg p-5 border border-green-200">
                                <p className="text-green-900 font-bold text-sm mb-3">✨ AI Suggestions:</p>
                                <ul className="space-y-2">
                                    {data.atsDetails.suggestions.map((item, i) => (
                                        <li key={i} className="flex gap-2 items-start text-sm text-green-800">
                                            <span className="font-bold text-green-600 flex-shrink-0">→</span>
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                    </div>

                    {/* 💡 Gap Analysis Box - NEW */}
                    {data?.atsDetails?.gapAnalysis && (
                        <GapAnalysisBox gapAnalysis={data.atsDetails.gapAnalysis} />
                    )}

                </div>

                {/* RIGHT: Additional Info - Full Width Below */}
            </div>

            {/* Improvement Checklist - Full Width */}
            <div className="max-w-7xl mx-auto mt-6">
                <h2 className="text-3xl font-bold text-slate-800 mb-6">📋 Your Improvement Roadmap</h2>
                <ImprovementChecklist sections={data?.sections} scoringData={data?.atsDetails} />
            </div>
        </div>
    );
}
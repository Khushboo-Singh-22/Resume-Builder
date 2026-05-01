import React, { useState } from 'react';

export default function ImprovementChecklist({ sections, scoringData }) {
    const [completed, setCompleted] = useState(new Set());

    const toggleComplete = (id) => {
        const newSet = new Set(completed);
        if (newSet.has(id)) {
            newSet.delete(id);
        } else {
            newSet.add(id);
        }
        setCompleted(newSet);
    };

    const improvementTasks = [
        {
            id: 1,
            icon: '🔍',
            title: 'Review & Add Missing Keywords',
            description: 'Copy top keywords from job description and naturally add them to your resume',
            timeNeeded: '10-15 min',
            impact: '+5-10 points',
            tips: [
                'Use keywords in job title/headline',
                'Include in skills section',
                'Mention in experience descriptions',
                'Add to professional summary'
            ],
            examples: [
                'React → add to "Tech Stack" or "Skills"',
                'Leadership → mention "Led" projects',
                'AWS → add if you use it'
            ]
        },
        {
            id: 2,
            icon: '💬',
            title: 'Use Strong Action Verbs',
            description: 'Replace weak/passive words with impactful action verbs throughout your resume',
            timeNeeded: '5-10 min',
            impact: '+3-5 points',
            tips: [
                'Find and replace weak words',
                'One verb per bullet point',
                'Use past tense for previous roles',
                'Vary your verbs'
            ],
            examples: [
                'Worked on → Developed/Engineered',
                'Did → Built/Created/Implemented',
                'Helped → Led/Managed/Coordinated',
                'Made → Designed/Architected'
            ]
        },
        {
            id: 3,
            icon: '📊',
            title: 'Add Metrics & Numbers',
            description: 'Quantify every achievement with percentages, time saved, users impacted, etc.',
            timeNeeded: '15-20 min',
            impact: '+5-8 points',
            tips: [
                'Add % improvement to each achievement',
                'Include user/customer numbers',
                'Mention time/cost savings',
                'Use "X users", "Y% improvement"'
            ],
            examples: [
                'Fast website → "Reduced load time by 40%"',
                'Many users → "Served 50K+ users"',
                'Good performance → "30% improvement in click-through rate"'
            ]
        },
        {
            id: 4,
            icon: '🛠️',
            title: 'List Technologies & Tools Used',
            description: 'Clearly mention all frameworks, languages, tools, and platforms you\'ve used',
            timeNeeded: '10 min',
            impact: '+4-6 points',
            tips: [
                'Create explicit tech stack sections',
                'Mention in project descriptions',
                'Include tools you\'re proficient with',
                'Add relevant certifications'
            ],
            examples: [
                'React, Node.js, MongoDB',
                'AWS S3, Lambda, DynamoDB',
                'Docker, Kubernetes, CI/CD'
            ]
        },
        {
            id: 5,
            icon: '📁',
            title: 'Showcase 2-3 Strong Projects',
            description: 'Highlight key projects with tech stack, links, and impact achieved',
            timeNeeded: '20-30 min',
            impact: '+8-12 points',
            tips: [
                'Pick your best 2-3 projects',
                'Add GitHub/Live links',
                'Describe tech stack used',
                'Quantify user engagement/impact'
            ],
            examples: [
                'Project Name | React + Node.js | github.com/... | 1000+ users',
                'Feature: Search optimization | +40% query speed',
                'Deployed to: AWS, served 100K requests/day'
            ]
        },
        {
            id: 6,
            icon: '📚',
            title: 'Complete Education & Certifications',
            description: 'Add/update education section and include relevant certifications',
            timeNeeded: '5-10 min',
            impact: '+2-4 points',
            tips: [
                'List degree and graduation date',
                'Add relevant coursework if space',
                'Include professional certifications',
                'Add online courses (Udemy, Coursera)'
            ],
            examples: [
                'BS Computer Science | MIT | 2020',
                'AWS Solutions Architect Certification',
                'React Advanced Patterns - Udemy'
            ]
        }
    ];

    const completedCount = completed.size;
    const totalTasks = improvementTasks.length;
    const estimatedScoreIncrease = completedCount * 3; // Rough estimate

    return (
        <div className="space-y-6">
            {/* Progress Summary */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-blue-900 text-lg">📋 Improvement Checklist</h3>
                    <span className="text-sm font-bold text-blue-700 bg-blue-100 px-3 py-1 rounded-full">
                        {completedCount}/{totalTasks} completed
                    </span>
                </div>

                <div className="flex items-center gap-4">
                    <div className="flex-1">
                        <div className="h-2 bg-blue-200 rounded-full overflow-hidden">
                            <div 
                                className="bg-blue-600 h-full transition-all duration-300"
                                style={{width: `${(completedCount / totalTasks) * 100}%`}}
                            />
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="text-xs text-blue-600 font-medium">Estimated boost</p>
                        <p className="text-lg font-bold text-blue-900">+{estimatedScoreIncrease}</p>
                    </div>
                </div>
            </div>

            {/* Tasks */}
            <div className="space-y-3">
                {improvementTasks.map((task) => {
                    const isCompleted = completed.has(task.id);
                    return (
                        <div
                            key={task.id}
                            className={`rounded-xl border-2 transition-all ${
                                isCompleted
                                    ? 'bg-green-50 border-green-300 opacity-75'
                                    : 'bg-white border-slate-200 hover:border-indigo-300'
                            }`}
                        >
                            <button
                                onClick={() => toggleComplete(task.id)}
                                className="w-full p-4 text-left"
                            >
                                <div className="flex items-start gap-4">
                                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 text-xl
                                        ${isCompleted ? 'bg-green-200' : 'bg-indigo-100'}`}>
                                        {isCompleted ? '✅' : task.icon}
                                    </div>

                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <p className={`font-bold ${isCompleted ? 'text-green-700 line-through' : 'text-slate-900'}`}>
                                                {task.title}
                                            </p>
                                        </div>
                                        <p className={`text-sm ${isCompleted ? 'text-green-700' : 'text-slate-600'}`}>
                                            {task.description}
                                        </p>

                                        {/* Expanded Details */}
                                        {isCompleted && (
                                            <div className="mt-4 space-y-3 p-3 bg-green-100/50 rounded-lg border border-green-200">
                                                <div>
                                                    <p className="text-xs font-bold text-green-900 mb-2">✨ Key Tips:</p>
                                                    <ul className="text-xs text-green-800 space-y-1">
                                                        {task.tips.map((tip, idx) => (
                                                            <li key={idx}>• {tip}</li>
                                                        ))}
                                                    </ul>
                                                </div>
                                                <div>
                                                    <p className="text-xs font-bold text-green-900 mb-2">💡 Examples:</p>
                                                    <div className="space-y-1">
                                                        {task.examples.map((example, idx) => (
                                                            <p key={idx} className="text-xs text-green-800 bg-white/60 p-2 rounded">
                                                                {example}
                                                            </p>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex flex-col items-end gap-2 flex-shrink-0">
                                        <span className={`text-xs font-semibold px-2 py-1 rounded ${
                                            isCompleted 
                                                ? 'bg-green-200 text-green-800' 
                                                : 'bg-indigo-100 text-indigo-800'
                                        }`}>
                                            {task.impact}
                                        </span>
                                        <span className="text-xs text-slate-600">⏱️ {task.timeNeeded}</span>
                                    </div>
                                </div>
                            </button>
                        </div>
                    );
                })}
            </div>

            {/* Completion Message */}
            {completedCount === totalTasks && (
                <div className="bg-green-50 border-2 border-green-300 rounded-xl p-6 text-center">
                    <p className="text-2xl mb-2">🎉</p>
                    <p className="font-bold text-green-900 mb-2">All improvements complete!</p>
                    <p className="text-green-800 text-sm">
                        Your resume score should now be <span className="font-bold">85+/100</span>. 
                        Ready to upload and check? 🚀
                    </p>
                </div>
            )}
        </div>
    );
}

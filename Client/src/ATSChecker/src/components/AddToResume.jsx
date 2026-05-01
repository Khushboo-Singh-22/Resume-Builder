import React, { useState } from 'react';

/**
 * Component to add gap analysis suggestions to the resume
 * This handles the integration between gap analysis and resume builder
 */
export default function AddToResume({ gapAnalysis, selectedItems, onAddSuccess }) {
    const [isLoading, setIsLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [skillsToAdd, setSkillsToAdd] = useState([]);
    const [experienceToAdd, setExperienceToAdd] = useState([]);
    const [projectsToAdd, setProjectsToAdd] = useState([]);

    const handleAddItems = async () => {
        setIsLoading(true);
        try {
            // Extract the actual items to add from selectedItems
            const itemsToAdd = {
                skills: [],
                experience: [],
                projects: []
            };

            gapAnalysis?.recommendations?.forEach((recommendation, idx) => {
                recommendation.items.forEach((item, itemIdx) => {
                    const itemIndex = `${idx}-${itemIdx}`;
                    if (selectedItems?.has(itemIndex)) {
                        if (recommendation.type === 'skills') {
                            itemsToAdd.skills.push(item);
                        } else if (recommendation.type === 'experience') {
                            itemsToAdd.experience.push(item);
                        } else if (recommendation.type === 'projects') {
                            itemsToAdd.projects.push(item);
                        }
                    }
                });
            });

            // Store in localStorage for resume builder
            localStorage.setItem('suggestionsToAdd', JSON.stringify(itemsToAdd));

            // Call success callback
            onAddSuccess?.(itemsToAdd);

            setShowModal(true);
            setIsLoading(false);
        } catch (error) {
            console.error('Error preparing items to add:', error);
            setIsLoading(false);
        }
    };

    return (
        <>
            {/* Add Button - shown by parent component */}
            <button
                onClick={handleAddItems}
                disabled={isLoading || selectedItems?.size === 0}
                className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white font-bold py-3 rounded-xl transition-all shadow-lg disabled:cursor-not-allowed"
            >
                {isLoading ? 'Adding...' : '✓ Add Selected Items to Resume'}
            </button>

            {/* Success Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl max-w-md p-8 shadow-xl">
                        <div className="text-center">
                            <div className="text-5xl mb-4">🎉</div>
                            <h3 className="text-2xl font-bold text-slate-800 mb-2">Great!</h3>
                            <p className="text-slate-600 mb-6">
                                {selectedItems?.size || 0} suggestions prepared. You can now:
                            </p>

                            <div className="space-y-3 text-left bg-slate-50 rounded-lg p-4 mb-6">
                                <div className="flex items-start gap-3">
                                    <span className="text-lg">📝</span>
                                    <div>
                                        <p className="font-bold text-slate-800">1. Review in Resume Builder</p>
                                        <p className="text-sm text-slate-600">Go to Resume Builder to add these items</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <span className="text-lg">✨</span>
                                    <div>
                                        <p className="font-bold text-slate-800">2. Improve Your Score</p>
                                        <p className="text-sm text-slate-600">Adding these items will boost your ATS score</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <span className="text-lg">📊</span>
                                    <div>
                                        <p className="font-bold text-slate-800">3. Re-analyze</p>
                                        <p className="text-sm text-slate-600">Upload again to verify improvements</p>
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={() => setShowModal(false)}
                                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 rounded-lg transition-all"
                            >
                                Got it! 👍
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

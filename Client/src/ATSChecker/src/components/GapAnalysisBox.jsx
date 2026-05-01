import React, { useState, useEffect } from 'react';
import AddToResume from './AddToResume';

export default function GapAnalysisBox({ gapAnalysis }) {
    const [expandedSections, setExpandedSections] = useState({});
    const [addedItems, setAddedItems] = useState(new Set());

    // Auto-expand first section on mount
    useEffect(() => {
        if (gapAnalysis?.recommendations?.length > 0) {
            setExpandedSections({
                [gapAnalysis.recommendations[0].type]: true
            });
        }
    }, [gapAnalysis]);

    // Debug logging
    console.log('GapAnalysisBox received:', gapAnalysis);

    // Check if gapAnalysis has recommendations
    const hasRecommendations = gapAnalysis?.recommendations && gapAnalysis.recommendations.length > 0;

    console.log('Has recommendations:', hasRecommendations);

    const toggleSection = (type) => {
        setExpandedSections(prev => ({
            ...prev,
            [type]: !prev[type]
        }));
    };

    const toggleAddItem = (index) => {
        const newSet = new Set(addedItems);
        if (newSet.has(index)) {
            newSet.delete(index);
        } else {
            newSet.add(index);
        }
        setAddedItems(newSet);
    };

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'high':
                return 'bg-red-50 border-red-200';
            case 'medium':
                return 'bg-yellow-50 border-yellow-200';
            default:
                return 'bg-blue-50 border-blue-200';
        }
    };

    const getPriorityIcon = (priority) => {
        switch (priority) {
            case 'high':
                return '🔴';
            case 'medium':
                return '🟡';
            default:
                return '🔵';
        }
    };

    const getAllItemsCount = gapAnalysis?.recommendations?.reduce(
        (sum, rec) => sum + (rec.items?.length || 0),
        0
    ) || 0;

    const addedCount = Array.from(addedItems).length;

    // Show empty state only if truly no recommendations
    if (!hasRecommendations) {
        return (
            <div className="bg-blue-50/50 rounded-3xl p-8 border border-blue-200 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 font-bold">💡</div>
                    <h4 className="text-blue-900 font-bold text-lg">Gap Analysis</h4>
                </div>
                <p className="text-blue-700 text-sm">✨ Your resume covers all the essential requirements! Keep it up to make it even stronger.</p>
            </div>
        );
    }

    return (
        <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-3xl p-8 border border-indigo-200 shadow-sm">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600 text-lg">
                        💡
                    </div>
                    <div>
                        <h4 className="text-indigo-900 font-bold text-xl">Gap Analysis</h4>
                        <p className="text-indigo-600 text-xs">What's missing in your resume</p>
                    </div>
                </div>
                <div className="bg-white rounded-lg px-4 py-2 border border-indigo-200">
                    <p className="text-indigo-900 font-bold text-sm">{addedCount}/{getAllItemsCount}</p>
                    <p className="text-indigo-600 text-xs">Items to add</p>
                </div>
            </div>

            {/* Recommendations Sections */}
            <div className="space-y-4">
                {gapAnalysis?.recommendations?.length > 0 ? (
                    gapAnalysis.recommendations.map((recommendation, idx) => (
                        <div
                            key={idx}
                            className={`rounded-2xl border transition-all ${getPriorityColor(recommendation.priority)}`}
                        >
                            {/* Section Header */}
                            <button
                                onClick={() => toggleSection(recommendation.type)}
                                className="w-full p-5 flex items-center justify-between hover:bg-white/30 transition-colors"
                            >
                                <div className="flex items-center gap-3 flex-1">
                                    <span className="text-xl">
                                        {recommendation.type === 'skills' && '🎯'}
                                        {recommendation.type === 'experience' && '📊'}
                                        {recommendation.type === 'projects' && '🚀'}
                                    </span>
                                    <div className="text-left">
                                        <p className="font-bold text-slate-800 text-sm">{recommendation.title}</p>
                                        <p className="text-xs text-slate-600">
                                            {recommendation.items?.length || 0} suggestion{(recommendation.items?.length || 0) !== 1 ? 's' : ''}
                                        </p>
                                    </div>
                                </div>
                                <span className="text-xl">
                                    {expandedSections[recommendation.type] ? '▼' : '▶'}
                                </span>
                            </button>

                            {/* Items List */}
                            {expandedSections[recommendation.type] && (
                                <div className="border-t border-current border-opacity-10 px-5 py-4 space-y-3">
                                    {recommendation.items && recommendation.items.length > 0 ? (
                                        recommendation.items.map((item, itemIdx) => {
                                            const itemIndex = `${idx}-${itemIdx}`;
                                            const isAdded = addedItems.has(itemIndex);

                                            return (
                                                <div
                                                    key={itemIndex}
                                                    className={`flex items-start gap-3 p-3 rounded-lg transition-all ${
                                                        isAdded
                                                            ? 'bg-green-100/50 border border-green-300'
                                                            : 'bg-white/50 border border-transparent hover:bg-white'
                                                    }`}
                                                >
                                                    <button
                                                        onClick={() => toggleAddItem(itemIndex)}
                                                        className={`mt-1 w-5 h-5 rounded border-2 flex items-center justify-center transition-all flex-shrink-0 ${
                                                            isAdded
                                                                ? 'bg-green-500 border-green-500'
                                                                : 'border-slate-300 hover:border-indigo-500'
                                                        }`}
                                                    >
                                                        {isAdded && <span className="text-white text-xs">✓</span>}
                                                    </button>
                                                    <div className="flex-1">
                                                        <p className={`text-sm font-medium transition-all ${
                                                            isAdded ? 'text-green-700 line-through' : 'text-slate-700'
                                                        }`}>
                                                            {item}
                                                        </p>
                                                        {isAdded && (
                                                            <p className="text-xs text-green-600 mt-1">✓ Marked to add</p>
                                                        )}
                                                    </div>
                                                </div>
                                            );
                                        })
                                    ) : (
                                        <p className="text-slate-600 text-sm">No items in this section</p>
                                    )}
                                </div>
                            )}
                        </div>
                    ))
                ) : (
                    <div className="p-4 bg-white rounded-lg border border-indigo-200 text-center">
                        <p className="text-slate-600 font-medium">No gaps detected. Your resume looks great! 🎉</p>
                    </div>
                )}
            </div>

            {/* Action Buttons */}
            {addedCount > 0 && (
                <div className="mt-6 flex gap-3">
                    <AddToResume
                        gapAnalysis={gapAnalysis}
                        selectedItems={addedItems}
                        onAddSuccess={(items) => {
                            console.log('Items prepared to add:', items);
                        }}
                    />
                    <button
                        onClick={() => setAddedItems(new Set())}
                        className="px-6 bg-white hover:bg-slate-100 text-slate-700 font-bold py-3 rounded-xl border border-slate-200 transition-all"
                    >
                        Clear
                    </button>
                </div>
            )}

            {/* Info Footer */}
            <div className="mt-6 p-4 bg-white/50 rounded-lg border border-indigo-100">
                <p className="text-xs text-indigo-700 font-medium">💡 Pro Tip:</p>
                <p className="text-xs text-indigo-600 mt-1">
                    Check the items above and mark them to add to your resume. Higher priority items (🔴) will have more impact on your ATS score.
                </p>
            </div>
        </div>
    );
}

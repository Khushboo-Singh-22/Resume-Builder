import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function FileUpload() {
    const [file, setFile] = useState(null);
    const [jd, setJd] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleUpload = async () => {

        // ✅ NEW: validation add kiya
        if (!file || !jd) {
            alert("Please upload resume and enter job description");
            return;
        }

        setLoading(true);

        const formData = new FormData();
        formData.append('resume', file);
        formData.append('jobDescription', jd);

        try {

            // ✅ FIX: correct backend URL (apne backend route check kar lena)
            const res = await axios.post(
                'http://localhost:5001/api/analyze',  // 👈 IMPORTANT CHANGE
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );

            console.log("API RESPONSE:", res.data); // ✅ DEBUG

            // ✅ FIX: proper data pass karo (resumeText hata diya)
            navigate('/ats-checker/analysis', {
                state: {
                    data: res.data,     // 👈 MAIN DATA
                    resumeFile: file    // 👈 preview ke liye
                }
            });

        } catch (err) {
            console.error(err);
            alert("Error while analyzing resume");
        }

        setLoading(false);
    };

    return (
        <div className="flex flex-col items-center p-10 bg-slate-50 min-h-screen">
            <h1 className="text-3xl font-bold mb-6 text-indigo-900">
                AI Resume Analyzer
            </h1>

            <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md space-y-4 border border-indigo-100">

                {/* ✅ FILE INPUT */}
                <input
                    type="file"
                    accept=".pdf"   // 👈 only PDF allowed
                    onChange={(e) => setFile(e.target.files[0])}
                    className="w-full border p-2 rounded"
                />

                {/* ✅ JOB DESCRIPTION */}
                <textarea
                    placeholder="Paste Job Description here..."
                    className="w-full border p-2 h-32 rounded"
                    onChange={(e) => setJd(e.target.value)}
                />

                {/* ✅ BUTTON */}
                <button
                    onClick={handleUpload}
                    disabled={loading}
                    className="w-full bg-indigo-600 text-white py-3 rounded-lg font-bold hover:bg-indigo-700 transition"
                >
                    {loading ? "Analyzing..." : "Analyze Now"}
                </button>

            </div>
        </div>
    );
}
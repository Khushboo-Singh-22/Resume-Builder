import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <footer className="relative overflow-hidden px-6 md:px-16 lg:px-24 xl:px-32 w-full text-sm text-slate-500 bg-white pt-10">
            <img
                src="/logo.svg"
                alt="Logo"
                width={400}
                height={400}
                className="hidden md:block absolute -bottom-30 -left-80 opacity-5 w-full h-full pointer-events-none"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-14">
                
                {/* LEFT */}
                <div className="sm:col-span-2 lg:col-span-1">
                    <a>
                        <img
                            src="/logo.svg"
                            alt="ATS Checker Logo"
                            width={68}
                            height={26}
                            className="h-7 w-auto"
                        />
                    </a>
                    <p className="text-sm/7 mt-6">
                        AI-powered ATS Resume Checker that analyzes your resume, matches keywords with job descriptions, and provides smart suggestions to improve your chances of getting shortlisted.
                    </p>
                </div>

                {/* MIDDLE */}
                <div className="flex flex-col lg:items-center lg:justify-center">
                    <div className="flex flex-col text-sm space-y-2.5">
                        <h2 className="font-semibold mb-5 text-gray-800">Product</h2>
                        <a className="hover:text-slate-600 transition" href="#">ATS Score Checker</a>
                        <a className="hover:text-slate-600 transition" href="#">Keyword Matching</a>
                        <a className="hover:text-slate-600 transition" href="#">Resume Optimization</a>
                        <a className="hover:text-slate-600 transition" href="#">Contact Support</a>
                    </div>
                </div>

                {/* RIGHT */}
                <div>
                    <h2 className="font-semibold text-gray-800 mb-5">
                        Get Resume Tips & Updates
                    </h2>
                    <div className="text-sm space-y-6 max-w-sm">
                        <p>
                            Get latest resume tips, ATS strategies, and job insights directly in your inbox.
                        </p>
                        <div className="flex items-center">
                            <input
                                className="rounded-l-md bg-gray-100 outline-none w-full max-w-64 h-11 px-3"
                                type="email"
                                placeholder="Enter your email"
                            />
                            <button className="bg-linear-to-b from-gray-600 to-gray-800 hover:from-gray-700 hover:to-gray-900 transition px-4 h-11 text-white rounded-r-md">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* BOTTOM */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 py-4 border-t mt-6 border-slate-200">
                <p className="text-center">
                    Copyright 2025 © ATS Resume Checker. All Rights Reserved.
                </p>
                <div className="flex items-center gap-4">
                    <Link to="/">Privacy Policy</Link>
                    <Link to="/">Terms of Service</Link>
                    <Link to="/">Cookie Policy</Link>
                </div>
            </div>
        </footer>
    );
}
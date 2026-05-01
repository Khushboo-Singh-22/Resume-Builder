import React from 'react'
import { Zap } from 'lucide-react'
import Title from './Title';
import resumeImg from '../../assets/john-smith-resume-template_75286-original-removebg-preview.png';
import atsLogo from "./image/ATS-logo.png";


export const Features = () => {
    const [isHover, setIsHover] = React.useState(false);
    return (

        <div id='features' className='bg-[#FAFAFA] flex flex-col items-center my-0 scroll-mt-12'>

            <div className="flex items-center gap-2 text-sm text-blue-600 bg-blue-400/10  rounded-full px-4 py-1.5">
                <Zap width={14} />
                <span>Simple Process</span>
            </div>
            <Title title='Build Your Resume' description='Our AI-powered resume builder helps you create a professional,
                   ATS-optimized resume in just a few minutes. No design skills required..'/>


            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
            
                * {
                    font-family: 'Poppins', sans-serif;
                }
            `}</style>

            <div className="flex flex-col md:flex-row justify-start items-start gap-2 mt-10">
                <img className="w-full max-w-3xl mr-auto" src={resumeImg} alt="" />
                <div className="space-y-5 px-4 md:px-0">

                    <div className='bg-white p-4 rounded-xl shadow-sm max-w-4xl mx-auto'>
                    <div className="flex items-center justify-center gap-6 w-full">
                        <div className="p-6 aspect-square bg-violet-100 rounded-full">

                            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">


                                <path d="M8 3.5h8l5 5v14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V5.5a2 2 0 0 1 2-2z"
                                    stroke="#7F22FE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />


                                <path d="M16 3.5v5h5"
                                    stroke="#7F22FE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

                                <path d="M14 11a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z"
                                    stroke="#7F22FE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M10.5 15c1.6-1.5 5.4-1.5 7 0"
                                    stroke="#7F22FE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M9 18.5h10M9 21h10"
                                    stroke="#7F22FE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

                            </svg>

                        </div>
                        <div className="space-y-2 w-full">
                            <h3 className="text-base font-semibold text-slate-700">Easy Resume Creation</h3>
                            <p className="text-sm text-slate-600">Create your resume easily by filling simple forms.
                                Add your personal information, education, experience, and skills....</p>
                        </div>
                    </div>
                    </div>

                    <div className='bg-white p-4 rounded-xl shadow-sm max-w-4xl mx-auto'>
                    <div className="flex items-center justify-center gap-6 w-full">
                        <div className="p-6 aspect-square bg-blue-100 rounded-full">
                            <svg width="28" height="28" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">

                                <rect x="6" y="5" width="22" height="30" rx="3" stroke="#7C3AED" strokeWidth="2" />

                                <circle cx="17" cy="13" r="3" stroke="#7C3AED" strokeWidth="2" />

                                <path d="M12 18c2-2 8-2 10 0" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" />

                                <line x1="12" y1="23" x2="22" y2="23" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" />
                                <line x1="12" y1="27" x2="22" y2="27" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" />
                                <line x1="12" y1="31" x2="20" y2="31" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" />

                                <text x="30" y="10" fontSize="8" fontWeight="700" fill="#7C3AED">AI</text>

                            </svg>
                        </div>
                        <div className="space-y-2 w-full">
                            <h3 className="text-base font-semibold text-slate-700">AI Resume Enhancement</h3>
                            <p className="text-sm text-slate-600">Improve your resume content instantly with AI.
                                Get better wording, strong keywords, and professional descriptions.</p>
                        </div>
                    </div>
                    </div>

                <div className='bg-white p-4 rounded-xl shadow-sm max-w-4xl mx-auto'>
                    <div className="flex items-center justify-center gap-6 w-full">
                        <div className="p-6 aspect-square bg-orange-100 rounded-full">
                            <svg width="28" height="28" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">

                                <path d="M26 10H46L54 18V54H26V10Z"
                                    stroke="currentColor"
                                    strokeWidth="3" />

                                <path d="M46 10V18H54"
                                    stroke="currentColor"
                                    strokeWidth="3" />


                                <path d="M12 16H34L42 24V60H12V16Z"
                                    stroke="currentColor"
                                    strokeWidth="3" />

                                <path d="M34 16V24H42"
                                    stroke="currentColor"
                                    strokeWidth="3" />


                                <line x1="16" y1="28" x2="36" y2="28"
                                    stroke="currentColor"
                                    strokeWidth="3"
                                    strokeLinecap="round" />

                                <line x1="16" y1="34" x2="36" y2="34"
                                    stroke="currentColor"
                                    strokeWidth="3"
                                    strokeLinecap="round" />

                                <line x1="16" y1="40" x2="36" y2="40"
                                    stroke="currentColor"
                                    strokeWidth="3"
                                    strokeLinecap="round" />

                                <line x1="16" y1="46" x2="36" y2="46"
                                    stroke="currentColor"
                                    strokeWidth="3"
                                    strokeLinecap="round" />

                                <line x1="16" y1="52" x2="30" y2="52"
                                    stroke="currentColor"
                                    strokeWidth="3"
                                    strokeLinecap="round" />

                            </svg>
                        </div>
                        <div className="space-y-2 w-full">
                            <h3 className="text-base font-semibold text-slate-700">Multiple Resume Templates</h3>
                            <p className="text-sm text-slate-600">Choose from modern and ATS-friendly resume templates
                                designed for different industries and job roles.</p>
                        </div>
                    </div>
                    </div>

                    <div className='bg-white p-4 rounded-xl shadow-sm max-w-4xl mx-auto'>
                    <div className="flex items-center justify-center gap-6 w-full ">
                        <div className="p-6 aspect-square bg-orange-100 rounded-full">
                            <svg width="28" height="28" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">

                                <path d="M14 6H38L50 18V58H14V6Z" stroke="#E53935" strokeWidth="3" />

                                <path d="M38 6L50 18H38V6Z" fill="#E53935" />

                                <rect x="14" y="20" width="28" height="10" rx="2" fill="#E53935" />

                                <text x="28" y="27" textAnchor="middle" fontSize="8" fill="white" fontFamily="Arial" fontWeight="bold">
                                    PDF
                                </text>

                                <path d="M32 36V48" stroke="#E53935" strokeWidth="3" strokeLinecap="round" />

                                <path d="M26 42L32 48L38 42" stroke="#E53935" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />

                            </svg>
                        </div>
                        <div className="space-y-2 w-full">
                            <h3 className="text-base font-semibold text-slate-700">Instant PDF Download</h3>
                            <p className="text-sm text-slate-600">Download your resume instantly in high-quality PDF format
                                and start applying for jobs immediately.</p>
                        </div>
                    </div>
                    </div>


                    <div className='bg-white p-4 rounded-xl shadow-sm max-w-4xl mx-auto'>
                    <div className="flex items-center justify-center gap-6 w-full ">
                        <div className="w-18 h-18 bg-orange-100 rounded-full flex items-center justify-center shrink-0">
                           <img src={atslogo} alt="ATS Logo" className='w-12 h-12 object-contain' />
                        </div>
                        <div className="space-y-2 w-full">
                            <h3 className="text-base font-semibold text-slate-700"> ATS Resume Checker</h3>
                            <p className="text-sm text-slate-600"> Analyze your resume, check ATS score, and get keyword suggestions to improve your chances of getting shortlisted.</p>
                        </div>
                    </div>
                    </div>


                </div>
            </div>
        </div>
    )
}

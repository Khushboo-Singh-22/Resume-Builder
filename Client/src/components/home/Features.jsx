import React from 'react'
import { Zap } from 'lucide-react'
import Title from './Title'
import resumeImg from '../../assets/john-smith-resume-template_75286-original-removebg-preview.png'
import atsLogo from "./image/ATS-logo.png"

export const Features = () => {
    return (

        <div id='features' className='bg-[#FAFAFA] flex flex-col items-center my-0 scroll-mt-12'>

            <div className="flex items-center gap-2 text-sm text-blue-600 bg-blue-400/10 rounded-full px-4 py-1.5">
                <Zap width={14} />
                <span>Simple Process</span>
            </div>

            <Title 
                title='Build Your Resume' 
                description='Our AI-powered resume builder helps you create a professional, ATS-optimized resume in just a few minutes. No design skills required.'
            />

            <div className="flex flex-col md:flex-row justify-start items-start gap-2 mt-10">

                <img className="w-full max-w-3xl mr-auto" src={resumeImg} alt="" />

                <div className="space-y-5 px-4 md:px-0">

                    {/* FEATURE 1 */}
                    <div className='bg-white p-4 rounded-xl shadow-sm max-w-4xl mx-auto'>
                        <div className="flex items-center gap-6 w-full">
                            <div className="p-6 bg-violet-100 rounded-full">
                                <Zap />
                            </div>
                            <div>
                                <h3 className="font-semibold">Easy Resume Creation</h3>
                                <p>Create resume by filling simple forms.</p>
                            </div>
                        </div>
                    </div>

                    {/* FEATURE 2 */}
                    <div className='bg-white p-4 rounded-xl shadow-sm max-w-4xl mx-auto'>
                        <div className="flex items-center gap-6 w-full">
                            <div className="p-6 bg-blue-100 rounded-full">
                                <Zap />
                            </div>
                            <div>
                                <h3 className="font-semibold">AI Resume Enhancement</h3>
                                <p>Improve content with AI suggestions.</p>
                            </div>
                        </div>
                    </div>

                    {/* FEATURE 3 */}
                    <div className='bg-white p-4 rounded-xl shadow-sm max-w-4xl mx-auto'>
                        <div className="flex items-center gap-6 w-full">
                            <div className="p-6 bg-orange-100 rounded-full">
                                <Zap />
                            </div>
                            <div>
                                <h3 className="font-semibold">Multiple Templates</h3>
                                <p>Choose from ATS-friendly templates.</p>
                            </div>
                        </div>
                    </div>

                    {/* FEATURE 4 */}
                    <div className='bg-white p-4 rounded-xl shadow-sm max-w-4xl mx-auto'>
                        <div className="flex items-center gap-6 w-full">
                            <div className="p-6 bg-orange-100 rounded-full">
                                <Zap />
                            </div>
                            <div>
                                <h3 className="font-semibold">PDF Download</h3>
                                <p>Download resume instantly.</p>
                            </div>
                        </div>
                    </div>

                    {/* FEATURE 5 (FIXED PART) */}
                    <div className='bg-white p-4 rounded-xl shadow-sm max-w-4xl mx-auto'>
                        <div className="flex items-center gap-6 w-full">
                            <div className="w-18 h-18 bg-orange-100 rounded-full flex items-center justify-center">
                                {/* ✅ FIX HERE */}
                                <img src={atsLogo} alt="ATS Logo" className='w-12 h-12 object-contain' />
                            </div>
                            <div>
                                <h3 className="font-semibold">ATS Resume Checker</h3>
                                <p>Check ATS score & improve resume.</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
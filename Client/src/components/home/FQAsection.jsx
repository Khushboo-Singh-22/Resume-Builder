const FQAsection = () => {
    const faqs = [
        {
            question: "How does the ATS Resume Checker work?",
            answer: "Our ATS system scans your resume and compares it with job descriptions to evaluate keyword matching, formatting, and relevance. It then gives you an ATS score along with improvement suggestions."
        },
        {
            question: "Is this tool free to use?",
            answer: "Yes, you can check your resume for free and get basic ATS insights. Advanced features like detailed suggestions and downloads may be included in premium plans."
        },
        {
            question: "How can I improve my ATS score?",
            answer: "You can improve your ATS score by adding relevant keywords, improving formatting, and aligning your resume with the job description. Our AI provides exact suggestions to help you optimize it."
        },
        {
            question: "Can I upload any resume format?",
            answer: "Yes, you can upload common formats like PDF and DOCX. Our system automatically reads and analyzes the content for ATS compatibility."
        },
        {
            question: "Does this help me get more interview calls?",
            answer: "Yes, optimizing your resume with proper keywords and ATS-friendly formatting increases your chances of getting shortlisted by recruiters."
        },
        {
            question: "Is my resume data secure?",
            answer: "Your data is safe and processed securely. We do not share your resume with third parties and ensure privacy during analysis."
        },
        {
            question: "Can I compare my resume with a job description?",
            answer: "Yes, you can paste a job description and our system will show keyword matches, missing skills, and suggestions to improve alignment."
        },
        {
            question: "What makes this AI Resume Builder different?",
            answer: "Our platform combines resume building, ATS scoring, keyword matching, and AI suggestions in one place, making it easier to create a job-ready resume faster."
        }
    ]

    const mid = Math.ceil(faqs.length / 2)
    const columns = [faqs.slice(0, mid), faqs.slice(mid)]

    return (
        <>
            <style>
                {`
                @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap');
                *{ font-family: "Poppins", sans-serif; }
                `}
            </style>

            <section id="fqaSection" className='bg-zinc-100  w-full flex flex-col items-center justify-center py-20 px-4 mt-10'>
                <div className='w-full max-w-5xl'>

                    {/* Heading */}
                    <div className='mb-12 text-center'>
                        <h2 className='text-4xl font-semibold text-gray-800'>Frequently Asked Questions</h2>
                        <p className='text-gray-500 max-w-[540px] text-sm mx-auto mt-4'>
                            Everything you need to know about ATS scores, resume optimization, and improving your chances of getting hired.
                        </p>
                    </div>

                    {/* FAQ Grid */}
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                        {columns.map((column, columnIndex) => (
                            <div key={columnIndex} className='space-y-4'>
                                {column.map((faq) => (
                                    <details
                                        key={faq.question}
                                        className='group rounded-lg border border-gray-200 bg-gradient-to-r from-gray-200 via-gray-100 to-white shadow-sm transition-all duration-300 hover:shadow-md'
                                    >
                                        <summary className='flex cursor-pointer list-none items-center justify-between gap-4 p-4 [&::-webkit-details-marker]:hidden'>
                                            <span className='text-sm font-medium text-gray-800'>
                                                {faq.question}
                                            </span>

                                            <svg
                                                className='transition-transform duration-300 group-open:rotate-180'
                                                width="18"
                                                height="18"
                                                viewBox="0 0 18 18"
                                                fill="none"
                                            >
                                                <path
                                                    d="m4.5 7.2 3.793 3.793a1 1 0 0 0 1.414 0L13.5 7.2"
                                                    stroke="#1D293D"
                                                    strokeWidth="1.5"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>
                                        </summary>

                                        <div className='px-4 pb-4 text-sm text-gray-500 leading-relaxed'>
                                            {faq.answer}
                                        </div>
                                    </details>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
}

export default FQAsection;
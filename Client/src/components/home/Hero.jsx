import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux'
import { logout } from '../../app/features/authSlice.js';
import toast from 'react-hot-toast'

const Hero = ({ handleGetStarted }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { user } = useSelector((state) => state.auth);
    const [menuOpen, setMenuOpen] = React.useState(false)
    const [showScrollTop, setShowScrollTop] = React.useState(false)
    const token = localStorage.getItem('token');
    

    const state = [
        { value : "10,000+", label : "Resumes Created" },
        { value : "5,000+", label : "Active Users" },
        { value : "95%", label : " ATS Success Rate" },
        { value : "2x", label : "Faster Resume Creation"},
        { value : "4.8", label : "User Rating" },
    ]

    const logoutUser = () => {
    navigate('/')
    dispatch(logout())
  }

  const handleinterviewClick = () => {
    navigate('/interview-prep')
  }

    const handleATSClick = () => {
        if (!token){
            toast.error("Please login first to access the ATS Checker.", {
              duration: 4000,
              position: 'top-center',
            });
            navigate('/login?state=register');
            return;
        }

        navigate('/ats-checker');
    }

    // navbar button simply forwards to parent handler
    const handleGetStartedClick = () => {
        if (handleGetStarted) {
            handleGetStarted()
        } else {
            const token = localStorage.getItem('token')
            if (token) navigate('/app')
            else navigate('/login?state=register')
        }
    }

    // Handle Login button
    const handleLoginClick = () => {
        navigate('/login')
    }

    // hero section GET STARTED uses same handler
    const handleSignUpClick = () => {
        if (handleGetStarted) handleGetStarted()
        else navigate('/login?state=register')
    }

    React.useEffect(() => {
      const handleScroll = () => {
        setShowScrollTop(window.scrollY > 80)
      }

      window.addEventListener('scroll', handleScroll)
      handleScroll()
      return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const scrollToTop = () => {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    return (
        <>
            <div className=" bg-[#FAFAFA] min-h-screen pb-20">
                {/* Navbar */}
                <nav className="z-50 flex items-center justify-between w-full py-4 px-6 md:px-16 lg:px-24 xl:px-40 text-sm">
                    <a>
                        <img src="/logo.svg.jpeg" alt="logo" className="h-15 w-15 rounded-full object-cover bg-white" />
                    </a>

                    <div className="hidden md:flex items-center gap-8 transition duration-500 text-slate-800">
                        <a href="#" className="hover:text-blue-600 transition">Home</a>
                        <a href="#features" className="hover:text-blue-600 transition">Features</a>
                        <a href="#testimonials" className="hover:text-blue-600 transition">Testimonials</a>
                        <a href='#fqaSection' className="hover:text-blue-600 transition">FAQ</a>
                        <a href="#contact" className="hover:text-blue-600 transition">Contact</a>
                    </div>

                    <div className="flex gap-2">
                        <button 
                            onClick={handleSignUpClick}
                            className="hidden md:block px-6 py-2 bg-linear-to-b from-gray-600 to-gray-800 hover:from-gray-700 hover:to-gray-900 transition active:scale-95 transition-all rounded-full text-white cursor-pointer" 
                            hidden={user} 
                        >
                            Get started
                        </button>
                        <button 
                            onClick={handleLoginClick}
                            className="hidden md:block px-6 py-2 border active:scale-95 hover:bg-slate-50 transition-all rounded-full text-slate-700 hover:text-slate-900 cursor-pointer"
                            hidden={user}
                        >
                            Login
                        </button>
                        <Link to="/app" className='hidden md:block px-8 py-2 bg-linear-to-b from-gray-600 to-gray-800 hover:from-gray-700 hover:to-gray-900 transition active:scale-95 transition-all rounded-full text-white ring-offset-2 ring-1 ring-gray-400'
                            hidden={!user}
                            >
                        Dashboard
                        </Link>
                        <button   className="hidden md:block px-8 py-2 bg-linear-to-b from-gray-600 to-gray-800 hover:from-gray-700 hover:to-gray-900 transition active:scale-95 transition-all rounded-full text-white ring-offset-2 ring-1 ring-gray-400"
                            onClick={logoutUser}
                            hidden={!user}
                        >
                            Logout
                        </button>
                    </div>

                    <button 
                        onClick={() => setMenuOpen(true)} 
                        className="md:hidden active:scale-90 transition"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2" className="lucide lucide-menu">
                            <path d="M4 5h16M4 12h16M4 19h16" />
                        </svg>
                    </button>
                </nav>

                {/* radio toggle options below navbar */}
                <div className="flex justify-center mt-4">
                    <div className="flex space-x-2 bg-white p-1 border border-gray-500/50 rounded-full text-sm">
                        <div className="flex items-center">
                            <input type="radio" name="options" id="option1" className="hidden peer" defaultChecked />
                            <label htmlFor="option1" className="cursor-pointer rounded-full py-2 px-9 text-gray-500 transition-colors duration-200 peer-checked:bg-linear-to-b from-gray-600 to-gray-800 hover:from-gray-700 hover:to-gray-900 transition peer-checked:text-white">Resume Builder</label>
                        </div>
                        <div className="flex items-center">
                            <input type="radio" name="options" id="option2" className="hidden peer" />
                            <label onClick={handleATSClick} htmlFor="option2" className={`flex items-center cursor-pointer rounded-full py-2 px-9 text-gray-500 transition-colors duration-200 peer-checked:bg-linear-to-b from-gray-600 to-gray-800 hover:from-gray-700 hover:to-gray-900 transition peer-checked:text-white ${token ? "text-gray-900" : "text-gray-400 cursor-not-allowed"}`}>
                               {/* <svg xmlns="http://www.w3.org/2000/svg" className="inline-block w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                                    <rect x="4" y="10" width="16" height="12" rx="2"></rect>
                                    <path d="M7 10V7a5 5 0 0 1 10 0v3h-2V7a3 3 0 0 0-6 0v3z"></path>
                                    <circle cx="12" cy="16" r="2" fill="white"></circle>
                                    <rect x="11.3" y="16" width="1.4" height="3.5" fill="white"></rect>
                                </svg> */}
                                {token ? " ATS Checker" : " 🔒 ATS Checker"}
                            </label>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                <div className={`fixed inset-0 z-[100] bg-black/40 text-black backdrop-blur flex flex-col items-center justify-center text-lg gap-8 md:hidden transition-transform duration-300 ${menuOpen ? "translate-x-0" : "-translate-x-full"}`}>
                    <a href="#" className="text-white hover:text-blue-400 transition" onClick={() => setMenuOpen(false) }>Home</a>
                    <a href="#features" className="text-white hover:text-blue-400 transition" onClick={() => setMenuOpen(false) }>Features</a>
                    <a href="#testimonials" className="text-white hover:text-blue-400 transition" onClick={() => setMenuOpen(false) }>Testimonials</a>
                    <a href='#fqaSection' className="text-white hover:text-blue-400 transition" onClick={() => setMenuOpen(false) }>FAQ</a>
                    <a href="#contact" className="text-white hover:text-blue-400 transition" onClick={() => setMenuOpen(false) }>Contact</a>
                    <button   className="active:ring-3 active:ring-white px-4 py-2 items-center justify-center bg-linear-to-b from-gray-600 to-gray-800 hover:from-gray-700 hover:to-gray-900 transition text-white rounded-md flex"
                            onClick={handleLoginClick}
                            hidden={user}
                        >
                            Login
                    </button>

                    <button   className="active:ring-3 active:ring-white px-4 py-2 items-center justify-center bg-linear-to-b from-gray-600 to-gray-800 hover:from-gray-700 hover:to-gray-900 transition text-white rounded-md flex"
                            onClick={() => {
                                logoutUser();
                                setMenuOpen(false);
                            }}
                            hidden={!user}
                        >
                            Logout
                    </button>

                       <button   className="active:ring-3 active:ring-white px-4 py-2 items-center justify-center bg-linear-to-b from-gray-600 to-gray-800 hover:from-gray-700 hover:to-gray-900 transition text-white rounded-md flex"
                            onClick={handleinterviewClick}
                            hidden={!user}
                        >
                            🚀 AI Interview
                    </button>

                    <button
                        onClick={() => setMenuOpen(false)}
                        className="active:ring-3 active:ring-white aspect-square size-10 p-1 items-center justify-center bg-linear-to-b from-gray-600 to-gray-800 hover:from-gray-700 hover:to-gray-900 transition text-white rounded-md flex"
                    >
                        X
                    </button>
                </div>

                {/* Hero Section */}
                <div className="relative flex flex-col items-center justify-center text-sm px-4 md:px-16 lg:px-24 xl:px-40 text-black">
                    <div className="absolute top-28 xl:top-10 -z-10 left-1/4 size-72 sm:size-96 xl:size-120 2xl:size-132 bg-gray-500 blur-[100px] opacity-30"></div>
            <button
              onClick={scrollToTop}
              className={`fixed right-6 bottom-6 z-50 rounded-full bg-linear-to-b from-gray-600 to-gray-800 text-white shadow-lg shadow-slate-900/20 p-3 transition-all duration-300 hover:-translate-y-1 hover:shadow-slate-900/30 ${showScrollTop ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none'}`}
              aria-label="Back to top"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5">
                <path fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
              </svg>
            </button>

                    {/* Avatars + Stars */}
                    <div className="flex items-center mt-24">
                        <div className="flex -space-x-3 pr-3">
                            <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200" alt="user3" className="size-8 object-cover rounded-full border-2 border-white hover:-translate-y-0.5 transition z-[1]" />
                            <img src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200" alt="user1" className="size-8 object-cover rounded-full border-2 border-white hover:-translate-y-0.5 transition z-2" />
                            <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200" alt="user2" className="size-8 object-cover rounded-full border-2 border-white hover:-translate-y-0.5 transition z-[3]" />
                            <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200" alt="user3" className="size-8 object-cover rounded-full border-2 border-white hover:-translate-y-0.5 transition z-[4]" />
                            <img src="https://randomuser.me/api/portraits/men/75.jpg" alt="user5" className="size-8 rounded-full border-2 border-white hover:-translate-y-0.5 transition z-[5]" />
                        </div>

                        <div>
                            <div className="flex">
                                {Array(5).fill(0).map((_, i) => (
                                    <svg key={i} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-star text-transparent fill-blue-600" aria-hidden="true">
                                        <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"></path>
                                    </svg>
                                ))}
                            </div>
                            <p className="text-sm text-gray-700">
                                Used by 5,000+ users
                            </p>
                        </div>
                    </div>

                    {/* Headline + CTA */}
                    <h1 className="text-5xl md:text-6xl font-semibold max-w-5xl text-center mt-4 md:leading-[70px]">
                        Land your dream job with <span className="bg-gradient-to-r from-blue-700 to-blue-600 bg-clip-text text-transparent text-nowrap">AI-powered </span> Resumes & ATS Optimization
                    </h1>

                    <p className="max-w-md text-center text-base my-7">Create, Edit and download professional resume with AI-powered assistance.</p>

                    {/* CTA Buttons */}
                    <div className="flex justify-center items-center gap-4 px-4 md:px-0">
                        <button 
                            onClick={handleSignUpClick}
                            className="bg-linear-to-b from-gray-600 to-gray-800 hover:from-gray-700 hover:to-gray-900 transition text-white rounded-full px-9 h-11 m-1 ring-offset-2 ring-1 ring-gray-400 flex items-center transition-colors cursor-pointer whitespace-nowrap "
                        >
                            Get started
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right ml-1 size-4" aria-hidden="true">
                                <path d="M5 12h14"></path>
                                <path d="m12 5 7 7-7 7"></path>
                            </svg>
                        </button>
                        <button 
                            className="flex items-center gap-2 border border-slate-400 hover:bg-blue-50 transition rounded-full px-7 h-11 text-slate-700 cursor-pointer whitespace-nowrap"
                            onClick={handleinterviewClick}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-video size-5" aria-hidden="true">
                                <path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5"></path>
                                <rect x="2" y="6" width="14" height="12" rx="2"></rect>
                            </svg>
                            <span>🚀 AI Interview</span>
                        </button>
                    </div>

                    <p className="py-6 text-slate-600 mt-14">Trusted by 5,000+ job seekers worldwide</p>

                    <div className="flex flex-wrap justify-between max-sm:justify-center gap-6 max-w-3xl w-full mx-auto py-4">
                        {state.map((stat, index) => (
                            <div key={index} className="flex flex-col items-center">
                                <span className="text-2xl font-bold">{stat.value}</span>
                                <span className="text-sm text-slate-600">{stat.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <style>
                {`
                    @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

                    * {
                        font-family: 'Poppins', sans-serif;
                    }
                `}
            </style>
        </>
    )
}

export default Hero
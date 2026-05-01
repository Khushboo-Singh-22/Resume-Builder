import { MenuIcon, XIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();


  const scrolltosection = (id) => {
    const section = document.getElementById(id);
    if (section) section.scrollIntoView({ behavior: "smooth" });
  };

  const [isOpen, setIsOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const lastScrollY = useRef(0);

  const navLinks = [
    { name: "Home", id: "home" },
    { name: "Features", id: "features" },
    { name: "Process", id: "process" },
    { name: "Pricing", id: "pricing" },
  ];

  useEffect(() => {
    const handleScroll = () => {

      const currentScroll = window.scrollY;

      if (currentScroll > lastScrollY.current && currentScroll > 80) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }

      lastScrollY.current = currentScroll;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-40 bg-white/60 backdrop-blur-md transition-transform duration-400 ${
          showNavbar ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="flex items-center justify-between px-4 py-4 md:px-16 lg:px-24 xl:px-32 border-b border-gray-200">

          <div className="flex items-center gap-6">

            {/* Back Button */}
            <button
              onClick={() => navigate("/")}
              className="p-2 rounded-lg hover:bg-gray-200 transition"
            >
              <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Logo */}
            <a href="/ats-checker">
              <img
                src="/logo.svg"
                alt="Logo"
                width={68}
                height={26}
                className="h-7 w-auto md:mr-31"
              />
            </a>

          </div>

          <div className="hidden md:flex items-center gap-8 text-gray-600">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => {
                  const section = document.getElementById(link.id);
                  if (section) section.scrollIntoView({ behavior: "smooth" });
                }}
                className="hover:text-gray-800"
              >
                {link.name}
              </button>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-2">
            
        
            <button
           
              className="bg-linear-to-b from-gray-600 to-gray-800 hover:from-gray-700 hover:to-gray-900 transition px-5 py-2 text-white rounded-lg"
            >
            🚀 Upgrade to Premium
            </button>
         
          </div>

          <button
            onClick={() => setIsOpen(true)}
            className="transition active:scale-90 md:hidden"
          >
            <MenuIcon className="size-6.5" />
          </button>

        </div>
      </nav>

      <div
        className={`flex flex-col items-center justify-center gap-6 text-lg font-medium fixed inset-0 bg-white/40 backdrop-blur-md z-50 transition-all duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >

        {navLinks.map((link) => (
          <button
            key={link.name}
            onClick={() => {
              const section = document.getElementById(link.id);
              if (section) section.scrollIntoView({ behavior: "smooth" });
              setIsOpen(false);
            }}
          >
            {link.name}
          </button>
        ))}

        <button
          onClick={() => { scrolltosection("pricing"); 
            setIsOpen(false);
          }}
          className="bg-linear-to-b from-gray-600 to-gray-800 px-5 py-2 text-white rounded-lg"
        >
         🚀 Upgrade to Premium
        </button>

        <button
          onClick={() => setIsOpen(false)}
          className="rounded-md bg-linear-to-b from-gray-600 to-gray-800 p-2 text-white ring-white active:ring-2"
        >
          <XIcon />
        </button>

      </div>

      <div className="h-18" />
    </>
  );
}
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 w-full h-16 z-50 backdrop-blur-xl bg-white/10 border-b border-white/10 shadow-lg">
        
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">

               {/* Glow Background */}
      <div className="absolute w-[600px] h-[600px] bg-purple-600 opacity-20 blur-[200px] top-10 left-10 animate-pulse"></div>
      <div className="absolute w-[500px] h-[500px] bg-blue-600 opacity-20 blur-[200px] bottom-10 right-10 animate-pulse"></div>

          {/* Logo */}
          <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            AI Interview
          </h1>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8 text-gray-300">
            <a href="#" className="hover:text-white transition">Home</a>
            <a href="#" className="hover:text-white transition">Features</a>
            <a href="#" className="hover:text-white transition">About</a>
          </div>

          {/* Desktop Button */}
          <button className="hidden md:block px-5 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:opacity-90 transition">
            Get Started
          </button>

          {/* Mobile Icon */}
          <div className="md:hidden text-white">
            {open ? (
              <X size={28} onClick={() => setOpen(false)} />
            ) : (
              <Menu size={28} onClick={() => setOpen(true)} />
            )}
          </div>

        </div>
      </nav>

      {/* Mobile Menu (FIXED OVERLAY) */}
      {open && (
        <div className="md:hidden fixed top-16 left-0 w-full bg-black/95 backdrop-blur-xl px-6 py-6 space-y-6 text-center z-40">
          <a href="#" className="block text-lg">Home</a>
          <a href="#" className="block text-lg">Features</a>
          <a href="#" className="block text-lg">About</a>

          <button className="w-full py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600">
            Get Started
          </button>
        </div>
      )}
    </>
  );
}
import { Linkedin, Github, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-black text-white relative overflow-hidden mt-20 border-t border-white/10">

      {/* Glow Background */}
      <div className="absolute w-[400px] h-[400px] bg-purple-600 opacity-20 blur-[120px] top-0 left-10"></div>
      <div className="absolute w-[300px] h-[300px] bg-blue-600 opacity-20 blur-[120px] bottom-0 right-10"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-16 py-16 relative z-10">

        {/* Top Section */}
        <div className="grid md:grid-cols-4 gap-10 mb-12">

          {/* Brand */}
          <div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              AI Interview
            </h2>
            <p className="text-gray-400 mt-4 text-sm">
              Prepare smarter with AI-powered interview simulations, resume analysis, and real-time feedback.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li className="hover:text-white cursor-pointer transition">Home</li>
              <li className="hover:text-white cursor-pointer transition">Features</li>
              <li className="hover:text-white cursor-pointer transition">About</li>
              <li className="hover:text-white cursor-pointer transition">Contact</li>
            </ul>
          </div>

          {/* Features */}
          <div>
            <h3 className="font-semibold mb-4 text-white">Features</h3>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li className="hover:text-white cursor-pointer transition">AI Interview</li>
              <li className="hover:text-white cursor-pointer transition">Resume Analysis</li>
              <li className="hover:text-white cursor-pointer transition">ATS Score</li>
              <li className="hover:text-white cursor-pointer transition">Smart Questions</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4 text-white">Connect</h3>
            <div className="flex gap-4 mb-6">

              <a href="#" className="text-gray-400 hover:text-blue-400 transition">
                <Linkedin size={20} />
              </a>

              <a href="#" className="text-gray-400 hover:text-gray-300 transition">
                <Github size={20} />
              </a>

              <a href="#" className="text-gray-400 hover:text-purple-400 transition">
                <Mail size={20} />
              </a>

            </div>

            <p className="text-gray-400 text-sm">
              support@aiinterview.com
            </p>
          </div>

        </div>

        {/* Divider */}
        <div className="border-t border-white/10 my-10"></div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm gap-4">

          <p>© 2026 AI Interview. All rights reserved.</p>

          <div className="flex gap-6">
            <span className="hover:text-white cursor-pointer transition">Privacy Policy</span>
            <span className="hover:text-white cursor-pointer transition">Terms</span>
          </div>

        </div>

      </div>
    </footer>
  );
}
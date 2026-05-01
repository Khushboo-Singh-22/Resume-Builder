import { motion } from "framer-motion";

const features = [
  {
    title: "AI-Powered Interview",
    desc: "Simulate real interviews using advanced AI tailored to your resume.",
    icon: "🤖",
  },
  {
    title: "Voice + Chat Mode",
    desc: "Practice interviews via chat or voice for real experience.",
    icon: "🎤",
  },
  {
    title: "Real-time Feedback",
    desc: "Get instant feedback on answers, tone, and confidence.",
    icon: "⚡",
  },
  {
    title: "Smart Question Engine",
    desc: "Dynamic questions based on your skills & job role.",
    icon: "📊",
  },
  {
    title: "Resume-based Questions",
    desc: "AI asks questions based on your resume content.",
    icon: "📄",
  },
  {
    title: "Behavioral + Technical",
    desc: "Practice both HR and technical interviews.",
    icon: "💼",
  },
  {
    title: "Performance Analytics",
    desc: "Track improvement with detailed reports.",
    icon: "📈",
  },
  {
    title: "Multi-role Support",
    desc: "Frontend, Backend, Full Stack, Data roles supported.",
    icon: "🚀",
  },
];

export default function AIInterviewFeatures() {
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">

      {/* Animated Glow Background */}
      <div className="absolute w-[600px] h-[600px] bg-purple-600 opacity-20 blur-[200px] top-10 left-10 animate-pulse"></div>
      <div className="absolute w-[500px] h-[500px] bg-blue-600 opacity-20 blur-[200px] bottom-10 right-10 animate-pulse"></div>

      {/* Main Content */}
      <div className="pt-28 px-6 md:px-16">

        {/* Hero */}
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            AI Interview Assistant
          </h1>
          <p className="text-gray-400 mt-6 text-lg max-w-2xl mx-auto">
            Experience next-generation interview preparation with AI-driven insights, feedback, and real-time simulation.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-4 gap-8">

          {features.map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.08, rotateX: 8, rotateY: -8 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="relative group p-[1px] rounded-3xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
            >
              <div className="bg-black/60 backdrop-blur-xl rounded-3xl p-6 h-full border border-white/10 group-hover:shadow-[0_0_40px_rgba(139,92,246,0.7)] transition duration-300">

                <div className="text-4xl mb-4">{item.icon}</div>

                <h2 className="text-lg font-semibold mb-2">
                  {item.title}
                </h2>

                <p className="text-gray-400 text-sm">
                  {item.desc}
                </p>

                {/* Glow */}
                <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 blur-2xl bg-gradient-to-r from-purple-500 to-blue-500 transition duration-500"></div>

              </div>
            </motion.div>
          ))}

        </div>

        {/* Stats Section */}
        <div className="mt-28 grid md:grid-cols-3 gap-10 text-center">

          {[
            { num: "10K+", label: "Interviews Practiced" },
            { num: "95%", label: "Success Rate" },
            { num: "500+", label: "Companies Covered" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.1 }}
              className="p-8 rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10"
            >
              <h2 className="text-4xl font-bold text-blue-400">
                {stat.num}
              </h2>
              <p className="text-gray-400 mt-2">
                {stat.label}
              </p>
            </motion.div>
          ))}

        </div>

        {/* CTA */}
        <div className="mt-28 text-center">

          <h2 className="text-4xl font-bold mb-4">
            Start Your AI Interview Journey 🚀
          </h2>

          <p className="text-gray-400 mb-6">
            Upload your resume and experience real interview simulation now.
          </p>

          <button className="px-10 py-4 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 hover:scale-110 transition shadow-lg shadow-purple-500/30">
            Try Now
          </button>

        </div>

      </div>
    </div>
  );
}
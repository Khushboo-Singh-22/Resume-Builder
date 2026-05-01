import { motion } from "framer-motion";

export default function AIInterviewAbout() {
  return (
    <div className="w-full py-24 px-6 md:px-16 bg-black text-white relative overflow-hidden">

      {/* Glow Background */}
      <div className="absolute w-[600px] h-[600px] bg-purple-600 opacity-20 blur-[200px] top-10 left-10 animate-pulse"></div>
      <div className="absolute w-[500px] h-[500px] bg-blue-600 opacity-20 blur-[200px] bottom-10 right-10 animate-pulse"></div>

      {/* Content */}
      <div className="max-w-6xl mx-auto relative z-10">

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold text-center mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
        >
          About AI Interview Preparation 🤖
        </motion.h2>

        {/* Description */}
        <p className="text-gray-400 text-center max-w-3xl mx-auto mb-16">
          Our AI Interview Preparation system is designed to simulate real-world interview experiences. 
          It analyzes your resume, understands job roles, and generates smart questions to help you prepare effectively. 
          With instant feedback and performance insights, you can improve faster and gain confidence before facing actual interviews.
        </p>

        {/* Grid Section */}
        <div className="grid md:grid-cols-3 gap-8">

          {/* Card 1 */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="p-6 rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10"
          >
            <h3 className="text-xl font-semibold mb-3 text-blue-400">
              🎯 Real Interview Simulation
            </h3>
            <p className="text-gray-400">
              Experience real interview scenarios powered by AI that adapts to your resume and job role.
            </p>
          </motion.div>

          {/* Card 2 */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="p-6 rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10"
          >
            <h3 className="text-xl font-semibold mb-3 text-purple-400">
              ⚡ Instant AI Feedback
            </h3>
            <p className="text-gray-400">
              Get instant feedback on your answers, including strengths, weaknesses, and improvement tips.
            </p>
          </motion.div>

          {/* Card 3 */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="p-6 rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10"
          >
            <h3 className="text-xl font-semibold mb-3 text-pink-400">
              📊 Smart Analytics
            </h3>
            <p className="text-gray-400">
              Track your performance with detailed analytics and improve your interview skills step by step.
            </p>
          </motion.div>

        </div>

        {/* Extra Section */}
        <div className="mt-20 grid md:grid-cols-2 gap-10">

          <div>
            <h3 className="text-2xl font-semibold mb-4">
              Why Use AI for Interview Preparation?
            </h3>
            <p className="text-gray-400">
              Traditional preparation methods are limited. Our AI system provides personalized questions, 
              real-time feedback, and continuous improvement suggestions — making your preparation smarter, faster, and more effective.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-semibold mb-4">
              How It Works?
            </h3>
            <ul className="text-gray-400 space-y-2">
              <li>✔ Upload your resume</li>
              <li>✔ AI analyzes your profile</li>
              <li>✔ Generate role-based questions</li>
              <li>✔ Practice interview in real-time</li>
              <li>✔ Get feedback & improve</li>
            </ul>
          </div>

        </div>

      </div>
    </div>
  );
}
import React from 'react';
import { motion } from 'motion/react';
import { 
  Brain, 
  Target, 
  Globe, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  Users, 
  Zap,
  GraduationCap,
  Search,
  Cpu,
  TrendingUp
} from 'lucide-react';

interface HowItWorksProps {
  onBack: () => void;
  onStartAssessment: () => void;
}

const HowItWorks: React.FC<HowItWorksProps> = ({ onBack, onStartAssessment }) => {
  const steps = [
    {
      title: "Data-Driven Profiling",
      desc: "We analyze 20+ unique data points including your subjects, grades, interests, and even your personality traits to build a comprehensive digital twin of your potential.",
      icon: Search,
      color: "bg-blue-600",
      img: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "AI Impact Simulation",
      desc: "Our proprietary AI engine simulates the future of work for 2030 and beyond, showing you exactly how automation will affect your chosen career path.",
      icon: Cpu,
      color: "bg-purple-600",
      img: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "Global Roadmap Generation",
      desc: "Get a detailed roadmap including top universities, latest fee structures, and entrance exams across India and global markets like the US, UK, and Europe.",
      icon: Globe,
      color: "bg-cyan-600",
      img: "https://images.unsplash.com/photo-1523050335392-9bf5675f42e8?auto=format&fit=crop&q=80&w=800"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={onBack}
            className="mb-12 flex items-center gap-2 text-gray-400 hover:text-white transition-colors font-bold"
          >
            <ArrowRight className="rotate-180" size={20} />
            Back to Home
          </motion.button>
          
          <div className="max-w-3xl space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600/20 text-blue-400 rounded-full text-sm font-bold uppercase tracking-widest border border-blue-600/30"
            >
              <Zap size={16} />
              The Science of Success
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-black tracking-tight leading-[0.9]"
            >
              How CareerPath AI <br />
              <span className="text-blue-500">Transforms</span> Your Future
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-400 leading-relaxed"
            >
              We bridge the gap between Class 12th confusion and professional clarity using 
              advanced machine learning and real-time global market data.
            </motion.p>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-20 grayscale pointer-events-none">
          <img 
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1200" 
            alt="Students" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
      </section>

      {/* Benefits for Parents & Students */}
      <section className="py-32 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div className="space-y-12">
            <div className="space-y-4">
              <h2 className="text-4xl font-black text-gray-900 tracking-tight">Empowering the Next Generation</h2>
              <p className="text-gray-500 text-lg leading-relaxed">
                Career decisions shouldn't be based on guesswork or outdated trends. 
                We provide a scientific framework that benefits both students and parents.
              </p>
            </div>

            <div className="space-y-8">
              <div className="flex gap-6">
                <div className="p-4 bg-blue-50 rounded-2xl text-blue-600 h-fit">
                  <GraduationCap size={32} />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-gray-900">For Students</h3>
                  <p className="text-gray-500">Discover careers you'll actually love. Understand the skills you need to stay relevant in an AI-dominated world.</p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="p-4 bg-green-50 rounded-2xl text-green-600 h-fit">
                  <Users size={32} />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-gray-900">For Parents</h3>
                  <p className="text-gray-500">Get peace of mind with data-backed recommendations. Understand financial requirements and ROI for different degree paths.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800" 
              alt="Technology" 
              className="rounded-[48px] shadow-2xl"
              referrerPolicy="no-referrer"
            />
            <div className="absolute -bottom-10 -left-10 bg-white p-8 rounded-3xl shadow-2xl border border-gray-100 max-w-xs hidden md:block">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-2 bg-blue-600 rounded-lg text-white">
                  <ShieldCheck size={20} />
                </div>
                <span className="font-bold text-gray-900">100% Data Privacy</span>
              </div>
              <p className="text-xs text-gray-500">Your profile data is encrypted and used only for your personalized analysis.</p>
            </div>
          </div>
        </div>
      </section>

      {/* The Process Steps */}
      <section className="py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20 space-y-4">
            <h2 className="text-4xl md:text-6xl font-black tracking-tight text-gray-900">Our 3-Step Process</h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-lg">
              Simple, fast, and incredibly deep. Here is how we build your roadmap.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {steps.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="bg-white rounded-[40px] overflow-hidden shadow-xl border border-gray-100 group"
              >
                <div className="h-48 overflow-hidden">
                  <img 
                    src={step.img} 
                    alt={step.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="p-10 space-y-6">
                  <div className={`p-4 ${step.color} text-white rounded-2xl w-fit -mt-20 relative z-10 shadow-xl`}>
                    <step.icon size={28} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">{step.title}</h3>
                  <p className="text-gray-500 leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-32">
        <div className="max-w-5xl mx-auto px-6">
          <div className="bg-blue-600 rounded-[64px] p-16 text-center text-white relative overflow-hidden">
            <div className="relative z-10 space-y-8">
              <h2 className="text-4xl md:text-6xl font-black tracking-tight">Ready to find your path?</h2>
              <p className="text-blue-100 text-xl max-w-2xl mx-auto">
                Join thousands of students who have already discovered their future with CareerPath AI.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  onClick={onStartAssessment}
                  className="px-10 py-5 bg-white text-blue-600 rounded-2xl font-bold text-lg hover:bg-blue-50 transition-all shadow-2xl shadow-blue-900/20"
                >
                  Start Full Assessment
                </button>
                <button
                  onClick={onBack}
                  className="px-10 py-5 bg-blue-700 text-white rounded-2xl font-bold text-lg hover:bg-blue-800 transition-all border border-blue-500/30"
                >
                  Back to Home
                </button>
              </div>
            </div>
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent opacity-50" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default HowItWorks;

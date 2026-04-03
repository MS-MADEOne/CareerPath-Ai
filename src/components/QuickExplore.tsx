import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  Sparkles, 
  Zap, 
  Cpu, 
  Brain, 
  Globe, 
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  AlertTriangle,
  Shield,
  Anchor,
  Plane,
  Award
} from 'lucide-react';

const QUICK_OPTIONS = [
  {
    subject: 'Mathematics & Physics',
    interest: 'Technology',
    jobs: [
      { title: 'AI Research Scientist', aiImpact: 'Highly Augmented', risk: 'Low', icon: Brain },
      { title: 'Quantum Computing Engineer', aiImpact: 'Least Affected', risk: 'Very Low', icon: Cpu },
      { title: 'Robotics Process Automation', aiImpact: 'Highly Affected', risk: 'Moderate', icon: Zap }
    ]
  },
  {
    subject: 'Biology & Chemistry',
    interest: 'Healthcare',
    jobs: [
      { title: 'Bio-Informatics Specialist', aiImpact: 'Highly Augmented', risk: 'Low', icon: Brain },
      { title: 'Genetic Counselor', aiImpact: 'Least Affected', risk: 'Very Low', icon: ShieldCheck },
      { title: 'Medical Imaging Analyst', aiImpact: 'Highly Affected', risk: 'High', icon: AlertTriangle }
    ]
  },
  {
    subject: 'Economics & Math',
    interest: 'Finance',
    jobs: [
      { title: 'Algorithmic Trader', aiImpact: 'Highly Affected', risk: 'High', icon: Zap },
      { title: 'ESG Investment Analyst', aiImpact: 'Least Affected', risk: 'Low', icon: Globe },
      { title: 'FinTech Product Manager', aiImpact: 'Highly Augmented', risk: 'Low', icon: Sparkles }
    ]
  },
  {
    subject: 'Humanities & Arts',
    interest: 'Creative',
    jobs: [
      { title: 'UX/UI Designer', aiImpact: 'Highly Augmented', risk: 'Moderate', icon: Sparkles },
      { title: 'AI Ethics Consultant', aiImpact: 'Least Affected', risk: 'Very Low', icon: ShieldCheck },
      { title: 'Content Strategist', aiImpact: 'Highly Affected', risk: 'Moderate', icon: Zap }
    ]
  },
  {
    subject: 'Defense & UPSC',
    interest: 'Officer Cadre (10+2)',
    jobs: [
      { title: 'UPSC NDA Officer', aiImpact: 'Least Affected', risk: 'Zero', icon: Shield },
      { title: 'Army Technical Entry', aiImpact: 'Highly Augmented', risk: 'Very Low', icon: Cpu },
      { title: 'Navy B.Tech Entry', aiImpact: 'Least Affected', risk: 'Zero', icon: Anchor }
    ]
  }
];

interface QuickExploreProps {
  onSelectJob: (jobTitle: string, category: string) => void;
  onStartAssessment: () => void;
}

const QuickExplore: React.FC<QuickExploreProps> = ({ onSelectJob, onStartAssessment }) => {
  const [selectedCategory, setSelectedCategory] = useState(0);

  return (
    <div className="max-w-5xl mx-auto py-20 px-6">
      <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-bold uppercase tracking-widest">
            <Zap size={14} />
            Quick Explore
          </div>
          <h2 className="text-4xl font-black text-gray-900 tracking-tight">Readymade Career Paths</h2>
          <p className="text-gray-500 max-w-xl">
            Explore popular career options based on common subject combinations and interests, with real-time AI impact insights.
          </p>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 w-full md:w-auto no-scrollbar">
          {QUICK_OPTIONS.map((opt, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedCategory(idx)}
              className={`px-6 py-3 rounded-2xl font-bold text-sm whitespace-nowrap transition-all ${selectedCategory === idx ? 'bg-gray-900 text-white shadow-xl shadow-gray-200' : 'bg-white text-gray-500 hover:bg-gray-100 border border-gray-100'}`}
            >
              {opt.subject}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <AnimatePresence mode="wait">
          {QUICK_OPTIONS[selectedCategory].jobs.map((job, idx) => {
            const Icon = job.icon;
            return (
              <motion.div
                key={`${selectedCategory}-${idx}`}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white p-8 rounded-[32px] shadow-xl border border-gray-100 hover:shadow-2xl hover:-translate-y-1 transition-all group"
              >
                <div className="p-4 bg-gray-50 rounded-2xl text-gray-900 mb-6 group-hover:bg-purple-600 group-hover:text-white transition-all w-fit">
                  <Icon size={24} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{job.title}</h3>
                <div className="flex items-center gap-2 mb-6">
                  <div className={`w-2 h-2 rounded-full ${job.risk === 'High' ? 'bg-red-500' : job.risk === 'Moderate' ? 'bg-orange-500' : 'bg-green-500'}`} />
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">{job.aiImpact}</span>
                </div>
                
                <div className="space-y-4 pt-4 border-t border-gray-50">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">AI Risk Level</span>
                    <span className={`font-bold ${job.risk === 'High' ? 'text-red-500' : job.risk === 'Moderate' ? 'text-orange-500' : 'text-green-500'}`}>
                      {job.risk}
                    </span>
                  </div>
                  <button 
                    onClick={() => onSelectJob(job.title, QUICK_OPTIONS[selectedCategory].subject)}
                    className="w-full py-3 bg-gray-50 hover:bg-gray-100 rounded-xl text-sm font-bold text-gray-900 flex items-center justify-center gap-2 transition-all"
                  >
                    View Details
                    <ArrowRight size={16} />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      <div className="mt-16 p-12 bg-gradient-to-br from-purple-600 to-blue-700 rounded-[48px] text-white overflow-hidden relative">
        <div className="relative z-10 max-w-2xl">
          <h3 className="text-3xl font-black mb-4">Want a more detailed analysis?</h3>
          <p className="text-purple-100 mb-8 text-lg">
            Our AI engine can provide a deep dive into your specific profile, including 20+ data points for a truly personalized roadmap.
          </p>
          <button 
            onClick={onStartAssessment}
            className="px-8 py-4 bg-white text-purple-700 rounded-2xl font-bold hover:bg-purple-50 transition-all shadow-xl shadow-purple-900/20"
          >
            Start Full Assessment
          </button>
        </div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-blue-400/20 rounded-full translate-y-1/2 translate-x-1/4 blur-3xl" />
      </div>
    </div>
  );
};

export default QuickExplore;

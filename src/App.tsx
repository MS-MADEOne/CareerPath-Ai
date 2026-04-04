import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import CareerInputForm from './components/CareerInputForm';
import ResultsDashboard from './components/ResultsDashboard';
import QuickExplore from './components/QuickExplore';
import DefenseVertical from './components/DefenseVertical';
import HowItWorks from './components/HowItWorks';
import { UserInputs, CareerAnalysisResponse } from './types';
import { getCareerAnalysis, getQuickAnalysis } from './services/geminiService';
import { 
  Sparkles, 
  Search, 
  ArrowRight, 
  Zap, 
  ShieldCheck, 
  Globe, 
  Cpu, 
  Brain, 
  GraduationCap, 
  Briefcase, 
  TrendingUp,
  Info,
  AlertTriangle,
  Loader2
} from 'lucide-react';

export default function App() {
  const [view, setView] = useState<'home' | 'form' | 'results' | 'how-it-works'>('home');
  const [isLoading, setIsLoading] = useState(false);
  const [analysisData, setAnalysisData] = useState<CareerAnalysisResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const isApiKeyMissing = !process.env.GEMINI_API_KEY;

  const handleStartForm = () => {
    setError(null);
    setView('form');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleShowHowItWorks = () => {
    console.log('Switching to how-it-works view');
    setView('how-it-works');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReset = () => {
    setAnalysisData(null);
    setError(null);
    setView('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async (inputs: UserInputs) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getCareerAnalysis(inputs);
      setAnalysisData(data);
      setView('results');
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'Failed to generate career analysis. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickAnalysis = async (jobTitle: string, category: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getQuickAnalysis(jobTitle, category);
      setAnalysisData(data);
      setView('results');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'Failed to generate quick analysis. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const renderHome = () => (
    <div className="space-y-32">
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1 space-y-8 text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-bold uppercase tracking-widest"
              >
                <Sparkles size={16} />
                AI-Powered Career Guidance
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-6xl md:text-8xl font-black text-gray-900 leading-[0.9] tracking-tight"
              >
                The Future of <span className="text-blue-600">Career</span> Discovery
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-xl text-gray-500 max-w-2xl leading-relaxed mx-auto lg:mx-0"
              >
                Empowering Class 12th students and parents with deep AI insights. 
                Analyze 20+ data points to find your perfect course, job, and global destination.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start"
              >
                <button
                  onClick={handleStartForm}
                  className="px-10 py-5 bg-blue-600 text-white rounded-2xl font-bold text-lg shadow-2xl shadow-blue-200 hover:bg-blue-700 transition-all hover:-translate-y-1 flex items-center gap-3 group"
                >
                  Start Full Assessment
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
                <button 
                  onClick={() => {
                    const el = document.getElementById('quick-explore');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-10 py-5 bg-white text-gray-900 border border-gray-200 rounded-2xl font-bold text-lg hover:bg-gray-50 transition-all"
                >
                  Explore Quick Options
                </button>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex items-center gap-8 pt-8 justify-center lg:justify-start"
              >
                <div className="flex -space-x-4">
                  {[1, 2, 3, 4].map(i => (
                    <img 
                      key={i}
                      src={`https://picsum.photos/seed/user${i}/100/100`}
                      alt="User"
                      className="w-12 h-12 rounded-full border-4 border-white shadow-sm"
                      referrerPolicy="no-referrer"
                    />
                  ))}
                </div>
                <div className="text-sm">
                  <p className="font-bold text-gray-900">10,000+ Students</p>
                  <p className="text-gray-500">Guided globally this year</p>
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', damping: 20 }}
              className="flex-1 relative"
            >
              <div className="relative z-10 bg-white p-8 rounded-[48px] shadow-2xl border border-gray-100">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-6 bg-blue-50 rounded-3xl space-y-4">
                    <div className="p-3 bg-white rounded-xl text-blue-600 w-fit shadow-sm">
                      <Brain size={24} />
                    </div>
                    <h3 className="font-bold text-gray-900">AI Impact Analysis</h3>
                    <p className="text-xs text-gray-500 leading-relaxed">Detailed risk assessment for every career path in the age of AI.</p>
                  </div>
                  <div className="p-6 bg-green-50 rounded-3xl space-y-4">
                    <div className="p-3 bg-white rounded-xl text-green-600 w-fit shadow-sm">
                      <Globe size={24} />
                    </div>
                    <h3 className="font-bold text-gray-900">Global Reach</h3>
                    <p className="text-xs text-gray-500 leading-relaxed">Top universities and job markets across 50+ countries.</p>
                  </div>
                  <div className="p-6 bg-purple-50 rounded-3xl space-y-4">
                    <div className="p-3 bg-white rounded-xl text-purple-600 w-fit shadow-sm">
                      <TrendingUp size={24} />
                    </div>
                    <h3 className="font-bold text-gray-900">Growth Insights</h3>
                    <p className="text-xs text-gray-500 leading-relaxed">Salary trends and future demand projections for 2030.</p>
                  </div>
                  <div className="p-6 bg-orange-50 rounded-3xl space-y-4">
                    <div className="p-3 bg-white rounded-xl text-orange-600 w-fit shadow-sm">
                      <ShieldCheck size={24} />
                    </div>
                    <h3 className="font-bold text-gray-900">Resilience Score</h3>
                    <p className="text-xs text-gray-500 leading-relaxed">Identify jobs that are least likely to be automated.</p>
                  </div>
                </div>
              </div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-blue-100/50 rounded-full blur-3xl -z-10" />
            </motion.div>
          </div>
        </div>
      </section>

      <div id="quick-explore">
        <QuickExplore onSelectJob={handleQuickAnalysis} onStartAssessment={handleStartForm} />
      </div>

      <div id="defense-section">
        <DefenseVertical onSelectEntry={handleQuickAnalysis} onStartAssessment={handleStartForm} />
      </div>

      <section className="bg-gray-900 py-32 text-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-20 space-y-4">
            <h2 className="text-4xl md:text-6xl font-black tracking-tight">Why CareerPath AI?</h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              We combine traditional career counseling with advanced AI analysis to give you a 360° view of your future.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { title: '20+ Data Inputs', desc: 'From subjects to hobbies, we analyze everything that makes you unique.', icon: Search },
              { title: 'AI Infusion Analysis', desc: 'Understand which jobs will be augmented by AI and which are at risk.', icon: Cpu },
              { title: 'Global Opportunities', desc: 'Find top courses and jobs in the US, Europe, Asia, and beyond.', icon: Globe }
            ].map((feature, idx) => (
              <div key={idx} className="space-y-6 p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
                <div className="p-4 bg-blue-600 rounded-2xl w-fit">
                  <feature.icon size={28} />
                </div>
                <h3 className="text-2xl font-bold">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/20 rounded-full translate-x-1/2 -translate-y-1/2 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-600/20 rounded-full -translate-x-1/2 translate-y-1/2 blur-3xl" />
      </section>

      <footer className="py-20 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-blue-600 rounded-lg text-white">
              <GraduationCap size={24} />
            </div>
            <span className="text-xl font-black text-gray-900 tracking-tight">CareerPath AI</span>
          </div>
          <p className="text-gray-500 text-sm">© 2026 CareerPath AI. All rights reserved.</p>
          <div className="flex gap-8 text-sm font-bold text-gray-400">
            <a href="#" className="hover:text-blue-600 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Contact Us</a>
          </div>
        </div>
      </footer>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#FDFDFF] font-sans selection:bg-blue-100 selection:text-blue-600">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div 
            className="flex items-center gap-2 cursor-pointer"
            onClick={handleReset}
          >
            <div className="p-2 bg-blue-600 rounded-lg text-white">
              <GraduationCap size={24} />
            </div>
            <span className="text-xl font-black text-gray-900 tracking-tight">CareerPath AI</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <button 
              onClick={handleShowHowItWorks}
              className={`text-sm font-bold transition-colors ${view === 'how-it-works' ? 'text-blue-600' : 'text-gray-500 hover:text-blue-600'}`}
            >
              How it Works
            </button>
            <button 
              onClick={() => {
                if (view !== 'home') setView('home');
                setTimeout(() => {
                  const el = document.getElementById('defense-section');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
              className={`text-sm font-bold transition-colors ${view === 'home' ? 'text-gray-500 hover:text-blue-600' : 'text-gray-500 hover:text-blue-600'}`}
            >
              Defense & UPSC
            </button>
            <button 
              onClick={() => {
                if (view !== 'home') setView('home');
                setTimeout(() => {
                  const el = document.getElementById('quick-explore');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
              className="text-sm font-bold text-gray-500 hover:text-blue-600 transition-colors"
            >
              Global Markets
            </button>
            <button 
              onClick={handleStartForm}
              className="px-6 py-2.5 bg-gray-900 text-white rounded-xl text-sm font-bold hover:bg-gray-800 transition-all"
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>

      <main className="pt-20">
        {isLoading && (
          <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-[100] flex flex-col items-center justify-center gap-6">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              className="text-blue-600"
            >
              <Loader2 size={48} />
            </motion.div>
            <div className="text-center space-y-2">
              <h3 className="text-2xl font-black text-gray-900">AI is Analyzing...</h3>
              <p className="text-gray-500">Finding the best colleges, fees, and career paths for you.</p>
            </div>
          </div>
        )}
        {isApiKeyMissing && (
          <div className="max-w-7xl mx-auto px-6 mt-6">
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl flex flex-col sm:flex-row items-center gap-4 text-amber-800">
              <div className="p-2 bg-amber-100 rounded-xl">
                <AlertTriangle size={20} />
              </div>
              <div className="flex-1 text-center sm:text-left">
                <p className="font-bold">API Key Missing</p>
                <p className="text-sm opacity-90">
                  The application requires a Gemini API key to function. 
                  If you are seeing this on GitHub Pages, please add <code>GEMINI_API_KEY</code> to your repository secrets.
                </p>
              </div>
            </div>
          </div>
        )}
        {error && view !== 'form' && (
          <div className="max-w-7xl mx-auto px-6 mt-6">
            <div className="p-4 bg-red-50 border border-red-200 rounded-2xl flex flex-col sm:flex-row items-center gap-4 text-red-800">
              <div className="p-2 bg-red-100 rounded-xl">
                <AlertTriangle size={20} />
              </div>
              <div className="flex-1 text-center sm:text-left">
                <p className="font-bold">Error Occurred</p>
                <p className="text-sm opacity-90">{error}</p>
              </div>
              <button 
                onClick={() => setError(null)}
                className="px-4 py-2 bg-red-100 hover:bg-red-200 rounded-xl text-xs font-bold transition-colors"
              >
                Dismiss
              </button>
            </div>
          </div>
        )}
        <AnimatePresence mode="wait">
          {view === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {renderHome()}
            </motion.div>
          )}

          {view === 'form' && (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="py-20 px-6"
            >
              <CareerInputForm onSubmit={handleSubmit} isLoading={isLoading} />
              {error && (
                <div className="max-w-4xl mx-auto mt-6 p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-600">
                  <AlertTriangle size={20} />
                  <p className="text-sm font-bold">{error}</p>
                </div>
              )}
            </motion.div>
          )}

          {view === 'results' && analysisData && (
            <motion.div
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="py-20 px-6"
            >
              <ResultsDashboard data={analysisData} onReset={handleReset} />
            </motion.div>
          )}

          {view === 'how-it-works' && (
            <motion.div
              key="how-it-works"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <HowItWorks onBack={handleReset} onStartAssessment={handleStartForm} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

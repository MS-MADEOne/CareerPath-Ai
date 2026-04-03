import React from 'react';
import { motion } from 'motion/react';
import { CareerAnalysisResponse, CareerRecommendation } from '../types';
import { 
  Briefcase, 
  MapPin, 
  GraduationCap, 
  TrendingUp, 
  AlertTriangle, 
  ShieldCheck, 
  Info,
  ExternalLink,
  ArrowRight,
  Search
} from 'lucide-react';

interface Props {
  data: CareerAnalysisResponse;
  onReset: () => void;
}

const RecommendationCard: React.FC<{ rec: CareerRecommendation; index: number }> = ({ rec, index }) => {
  const isHighRisk = rec.aiImpact.score > 70;
  const isSafe = rec.aiImpact.isLeastAffected;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-all group"
    >
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1 space-y-6">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">{rec.job}</h3>
              <p className="text-gray-500 font-medium flex items-center gap-2">
                <GraduationCap size={18} className="text-blue-500" />
                {rec.degree}
              </p>
            </div>
            <div className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider ${isSafe ? 'bg-green-100 text-green-700' : isHighRisk ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'}`}>
              {isSafe ? 'AI Resilient' : isHighRisk ? 'AI High Impact' : 'AI Augmented'}
            </div>
          </div>

          <p className="text-gray-600 leading-relaxed">{rec.description}</p>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
              <div className="flex items-center gap-2 text-gray-400 mb-1">
                <MapPin size={16} />
                <span className="text-xs font-bold uppercase">Top Locations</span>
              </div>
              <p className="text-sm font-semibold text-gray-900">{rec.location}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
              <div className="flex items-center gap-2 text-gray-400 mb-1">
                <TrendingUp size={16} />
                <span className="text-xs font-bold uppercase">Growth Potential</span>
              </div>
              <p className="text-sm font-semibold text-gray-900">{rec.growthPotential}</p>
            </div>
          </div>

          <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white rounded-lg text-blue-600 shadow-sm">
                <Briefcase size={18} />
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold text-blue-400">Est. Salary Range</p>
                <p className="text-sm font-bold text-blue-900">{rec.salaryRange}</p>
              </div>
            </div>
            <button className="p-2 hover:bg-blue-100 rounded-full transition-colors text-blue-600">
              <ArrowRight size={20} />
            </button>
          </div>
        </div>

        <div className="md:w-72 space-y-6">
          <div className={`p-6 rounded-3xl border-2 ${isSafe ? 'border-green-100 bg-green-50/30' : isHighRisk ? 'border-red-100 bg-red-50/30' : 'border-blue-100 bg-blue-50/30'}`}>
            <div className="flex items-center gap-2 mb-4">
              {isSafe ? <ShieldCheck className="text-green-600" /> : <AlertTriangle className={isHighRisk ? 'text-red-600' : 'text-blue-600'} />}
              <h4 className="font-bold text-gray-900">AI Impact Analysis</h4>
            </div>
            
            <div className="mb-4">
              <div className="flex justify-between text-xs font-bold mb-1">
                <span className="text-gray-500 uppercase">Impact Score</span>
                <span className={isHighRisk ? 'text-red-600' : 'text-blue-600'}>{rec.aiImpact.score}%</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${rec.aiImpact.score}%` }}
                  className={`h-full ${isHighRisk ? 'bg-red-500' : 'bg-blue-500'}`}
                />
              </div>
            </div>

            <p className="text-xs text-gray-600 leading-relaxed italic">
              "{rec.aiImpact.analysis}"
            </p>
          </div>

          <div className="p-6 bg-gray-900 rounded-3xl text-white">
            <div className="flex items-center gap-2 mb-3">
              <Info size={16} className="text-blue-400" />
              <h4 className="text-sm font-bold">Recommended Course</h4>
            </div>
            <p className="text-xs text-gray-400 mb-4">{rec.course}</p>
            
            <div className="space-y-4 pt-4 border-t border-white/10">
              <div>
                <p className="text-[10px] uppercase font-bold text-gray-500 mb-2">Top Colleges</p>
                <div className="flex flex-wrap gap-2">
                  {rec.colleges.map((college, i) => (
                    <span key={i} className="text-[10px] bg-white/5 px-2 py-1 rounded-md border border-white/10">
                      {college}
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <p className="text-[10px] uppercase font-bold text-gray-500 mb-1">Entrance Exams</p>
                <p className="text-[10px] text-blue-400 font-bold">{rec.entranceExams.join(", ")}</p>
              </div>

              <div>
                <p className="text-[10px] uppercase font-bold text-gray-500 mb-1">Fee Structure</p>
                <p className="text-[10px] text-gray-300 italic">{rec.fees}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 pt-8 border-t border-gray-50 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h4 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
            <Search size={16} className="text-blue-600" />
            Alternative Career Options
          </h4>
          <div className="flex flex-wrap gap-2">
            {rec.alternativeOptions.map((opt, i) => (
              <span key={i} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-[10px] font-bold uppercase tracking-wider">
                {opt}
              </span>
            ))}
          </div>
        </div>
        <div className="flex items-end justify-end">
          <button className="px-6 py-3 bg-gray-50 hover:bg-gray-100 rounded-xl text-xs font-bold text-gray-900 flex items-center gap-2 transition-all">
            Explore Universities
            <ExternalLink size={14} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const ResultsDashboard: React.FC<Props> = ({ data, onReset }) => {
  return (
    <div className="max-w-6xl mx-auto space-y-12 pb-20">
      <header className="text-center space-y-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-bold uppercase tracking-wider"
        >
          <TrendingUp size={16} />
          Analysis Complete
        </motion.div>
        <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">Your Personalized Career Roadmap</h2>
        <p className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
          Based on your academic profile and interests, we've identified the top 5 career paths that align with your future goals.
        </p>
      </header>

      <div className="bg-white/50 backdrop-blur-sm border border-white/20 p-8 rounded-[40px] shadow-sm">
        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Info className="text-blue-600" />
          Executive Summary
        </h3>
        <p className="text-gray-600 leading-relaxed text-lg">
          {data.summary}
        </p>
      </div>

      <div className="space-y-8">
        {data.recommendations.map((rec, idx) => (
          <RecommendationCard key={idx} rec={rec} index={idx} />
        ))}
      </div>

      <div className="flex flex-col items-center gap-6 pt-12">
        <div className="text-center">
          <h4 className="text-2xl font-bold text-gray-900 mb-2">Not quite what you were looking for?</h4>
          <p className="text-gray-500">You can always refine your inputs and try again.</p>
        </div>
        <button
          onClick={onReset}
          className="px-10 py-4 bg-gray-900 text-white rounded-2xl font-bold hover:bg-gray-800 transition-all hover:-translate-y-1 shadow-xl"
        >
          Start New Analysis
        </button>
      </div>
    </div>
  );
};

export default ResultsDashboard;

import React from 'react';
import { motion } from 'motion/react';
import { 
  Shield, 
  Anchor, 
  Plane, 
  Award, 
  CheckCircle2, 
  Info, 
  ArrowRight,
  Target,
  Users,
  Calendar
} from 'lucide-react';

const DEFENSE_ENTRIES = [
  {
    title: 'UPSC NDA (National Defence Academy)',
    branches: ['Army', 'Navy', 'Air Force'],
    eligibility: 'Class 12th (Any for Army, PCM for Navy/AF)',
    selection: 'UPSC Written Exam + 5-Day SSB Interview + Medicals',
    description: 'The most prestigious entry point for young officers. Provides a 3-year degree followed by specialized training at IMA/INA/AFA.',
    icon: Shield,
    color: 'bg-blue-600'
  },
  {
    title: 'Army Technical Entry Scheme (TES)',
    branches: ['Indian Army'],
    eligibility: 'Class 12th (PCM 60%+) + JEE Mains Appearance',
    selection: 'Direct SSB Interview (No Written Exam) + Medicals',
    description: 'A direct entry for PCM students to become Commissioned Officers in the Technical branches of the Army.',
    icon: Award,
    color: 'bg-green-600'
  },
  {
    title: 'Navy 10+2 B.Tech Entry',
    branches: ['Indian Navy'],
    eligibility: 'Class 12th (PCM 70%+) + JEE Mains Rank',
    selection: 'Direct SSB Interview based on JEE Rank + Medicals',
    description: 'Join the Indian Navy as a Permanent Commissioned Officer in the Executive or Technical branches.',
    icon: Anchor,
    color: 'bg-cyan-600'
  },
  {
    title: 'UPSC SCRA (Historical Context)',
    branches: ['Railway Services'],
    eligibility: 'Class 12th (PCM)',
    selection: 'UPSC Exam (Currently on hold/replaced)',
    description: 'While currently on hold, it was a premier 12th-level entry for officer-grade roles in Indian Railways.',
    icon: Plane,
    color: 'bg-sky-600'
  }
];

interface DefenseVerticalProps {
  onSelectEntry: (jobTitle: string, category: string) => void;
  onStartAssessment: () => void;
}

const DefenseVertical: React.FC<DefenseVerticalProps> = ({ onSelectEntry, onStartAssessment }) => {
  return (
    <section className="py-32 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-bold uppercase tracking-widest">
              <Shield size={16} />
              Elite Career Vertical
            </div>
            <h2 className="text-5xl font-black text-gray-900 tracking-tight leading-tight">
              Defense Forces & <br />
              <span className="text-blue-600">Officer Cadre</span> Entries
            </h2>
            <p className="text-xl text-gray-500 max-w-2xl leading-relaxed">
              Comprehensive guide for Class 12th students aiming for the Indian Armed Forces (Army, Navy, Air Force) and future paths to CAPF. 
              These roles offer unparalleled prestige and are highly resilient to AI automation.
            </p>
          </div>
          <div className="flex gap-4">
            <div className="p-6 bg-white rounded-3xl shadow-xl border border-gray-100 flex items-center gap-4">
              <div className="p-3 bg-green-100 text-green-600 rounded-2xl">
                <Users size={24} />
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900">Officer Cadre</p>
                <p className="text-xs text-gray-500">Class 12th Level</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {DEFENSE_ENTRIES.map((entry, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-[40px] p-10 shadow-xl border border-gray-100 hover:shadow-2xl transition-all group"
            >
              <div className="flex flex-col md:flex-row gap-8">
                <div className={`w-20 h-20 shrink-0 rounded-3xl ${entry.color} text-white flex items-center justify-center shadow-lg shadow-blue-200`}>
                  <entry.icon size={40} />
                </div>
                <div className="space-y-6 flex-1">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{entry.title}</h3>
                    <div className="flex flex-wrap gap-2">
                      {entry.branches.map(branch => (
                        <span key={branch} className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-[10px] font-bold uppercase tracking-wider">
                          {branch}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <p className="text-gray-500 leading-relaxed">{entry.description}</p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-[10px] uppercase font-bold text-gray-400 flex items-center gap-1">
                        <Target size={12} />
                        Eligibility
                      </p>
                      <p className="text-sm font-bold text-gray-900">{entry.eligibility}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] uppercase font-bold text-gray-400 flex items-center gap-1">
                        <Calendar size={12} />
                        Selection Process
                      </p>
                      <p className="text-sm font-bold text-gray-900">{entry.selection}</p>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-gray-50 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-green-600">
                      <CheckCircle2 size={16} />
                      <span className="text-xs font-bold uppercase">AI Resilient (100%)</span>
                    </div>
                    <button 
                      onClick={() => onSelectEntry(entry.title, 'Defense & Officer Cadre')}
                      className="flex items-center gap-2 text-blue-600 font-bold text-sm hover:gap-3 transition-all"
                    >
                      View Application Guide
                      <ArrowRight size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 p-8 bg-gray-100 rounded-[32px] border border-gray-200">
          <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Target className="text-blue-600" />
            Future Officer Paths (Post-Graduation)
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="space-y-2">
              <button 
                onClick={() => onSelectEntry('UPSC CAPF (AC)', 'Defense & Officer Cadre')}
                className="text-sm font-bold text-gray-900 hover:text-blue-600 text-left"
              >
                UPSC CAPF (AC)
              </button>
              <p className="text-xs text-gray-500">Become an Assistant Commandant in BSF, CRPF, CISF, ITBP, or SSB after graduation.</p>
            </div>
            <div className="space-y-2">
              <button 
                onClick={() => onSelectEntry('UPSC CDS', 'Defense & Officer Cadre')}
                className="text-sm font-bold text-gray-900 hover:text-blue-600 text-left"
              >
                UPSC CDS
              </button>
              <p className="text-xs text-gray-500">Entry for graduates into IMA, INA, AFA, and OTA for all three services.</p>
            </div>
            <div className="space-y-2">
              <button 
                onClick={() => onSelectEntry('AFCAT (Graduate)', 'Defense & Officer Cadre')}
                className="text-sm font-bold text-gray-900 hover:text-blue-600 text-left"
              >
                AFCAT (Graduate)
              </button>
              <p className="text-xs text-gray-500">Direct entry for graduates into the Flying, Technical, and Ground Duty branches of the IAF.</p>
            </div>
          </div>
        </div>

        <div className="mt-16 p-10 bg-blue-600 rounded-[40px] text-white flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-6">
            <div className="p-4 bg-white/10 rounded-2xl">
              <Info size={32} />
            </div>
            <div>
              <h4 className="text-2xl font-bold">Need a custom prep strategy?</h4>
              <p className="text-blue-100">Our AI can analyze your physical fitness and academic score to suggest the best entry.</p>
            </div>
          </div>
          <button 
            onClick={onStartAssessment}
            className="px-8 py-4 bg-white text-blue-600 rounded-2xl font-bold hover:bg-blue-50 transition-all shadow-xl whitespace-nowrap"
          >
            Get Prep Strategy
          </button>
        </div>
      </div>
    </section>
  );
};

export default DefenseVertical;

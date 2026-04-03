import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { UserInputs } from '../types';
import { 
  BookOpen, 
  Target, 
  Briefcase, 
  Globe, 
  DollarSign, 
  Cpu, 
  Heart, 
  GraduationCap, 
  ChevronRight, 
  ChevronLeft,
  CheckCircle2
} from 'lucide-react';

interface Props {
  onSubmit: (inputs: UserInputs) => void;
  isLoading: boolean;
}

const steps = [
  { id: 'basics', title: 'Academic Foundation', icon: BookOpen },
  { id: 'interests', title: 'Interests & Skills', icon: Target },
  { id: 'preferences', title: 'Work Preferences', icon: Briefcase },
  { id: 'lifestyle', title: 'Lifestyle & Values', icon: Heart },
  { id: 'future', title: 'Future Outlook', icon: Globe },
];

const CareerInputForm: React.FC<Props> = ({ onSubmit, isLoading }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<UserInputs>({
    subjects: [],
    grades: '',
    interests: [],
    skills: [],
    workEnvironment: '',
    salaryExpectation: '',
    willingnessToRelocate: '',
    industries: [],
    extracurriculars: '',
    learningStyle: '',
    values: [],
    hobbies: '',
    languages: [],
    studyDuration: '',
    financialNeeds: '',
    personality: '',
    researchVsApp: '',
    entrepreneurship: '',
    preferredRegions: [],
    techSavviness: '',
  });

  const handleInputChange = (field: keyof UserInputs, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleToggleArray = (field: keyof UserInputs, value: string) => {
    const currentArray = formData[field] as string[];
    if (currentArray.includes(value)) {
      handleInputChange(field, currentArray.filter(item => item !== value));
    } else {
      handleInputChange(field, [...currentArray, value]);
    }
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onSubmit(formData);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Major Subjects (Select all that apply)</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {['Physics', 'Chemistry', 'Mathematics', 'Biology', 'Economics', 'Accountancy', 'History', 'Pol Science', 'Computer Science', 'Psychology'].map(sub => (
                  <button
                    key={sub}
                    onClick={() => handleToggleArray('subjects', sub)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${formData.subjects.includes(sub) ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                  >
                    {sub}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Overall Academic Performance (Grades/Score)</label>
              <select 
                value={formData.grades}
                onChange={(e) => handleInputChange('grades', e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="">Select Grade Range</option>
                <option value="90%+">Excellent (90%+)</option>
                <option value="80-90%">Very Good (80-90%)</option>
                <option value="70-80%">Good (70-80%)</option>
                <option value="60-70%">Average (60-70%)</option>
                <option value="Below 60%">Below 60%</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Study Duration</label>
              <div className="flex gap-4">
                {['3 Years', '4 Years', '5+ Years'].map(dur => (
                  <button
                    key={dur}
                    onClick={() => handleInputChange('studyDuration', dur)}
                    className={`flex-1 py-3 rounded-lg text-sm font-medium transition-all ${formData.studyDuration === dur ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                  >
                    {dur}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Financial Scholarship Needs</label>
              <select 
                value={formData.financialNeeds}
                onChange={(e) => handleInputChange('financialNeeds', e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="">Select Financial Status</option>
                <option value="Full Scholarship Required">Full Scholarship Required</option>
                <option value="Partial Scholarship Required">Partial Scholarship Required</option>
                <option value="Self-Funded">Self-Funded</option>
              </select>
            </div>
          </div>
        );
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Core Interests</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {['Technology', 'Creative Arts', 'Healthcare', 'Business', 'Social Sciences', 'Research', 'Sports', 'Law', 'Public Service', 'Environment'].map(interest => (
                  <button
                    key={interest}
                    onClick={() => handleToggleArray('interests', interest)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${formData.interests.includes(interest) ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                  >
                    {interest}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Key Skills</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {['Coding', 'Writing', 'Public Speaking', 'Analytical Thinking', 'Leadership', 'Design', 'Problem Solving', 'Teamwork', 'Critical Thinking'].map(skill => (
                  <button
                    key={skill}
                    onClick={() => handleToggleArray('skills', skill)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${formData.skills.includes(skill) ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                  >
                    {skill}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Extracurricular Activities</label>
              <input 
                type="text"
                placeholder="e.g., Debate, Sports, Volunteering..."
                value={formData.extracurriculars}
                onChange={(e) => handleInputChange('extracurriculars', e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Hobbies</label>
              <input 
                type="text"
                placeholder="e.g., Reading, Gaming, Cooking..."
                value={formData.hobbies}
                onChange={(e) => handleInputChange('hobbies', e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none"
              />
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Work Environment</label>
              <div className="grid grid-cols-2 gap-2">
                {['Corporate Office', 'Remote/Work from Home', 'Field Work', 'Laboratory', 'Creative Studio', 'Hospital/Clinic'].map(env => (
                  <button
                    key={env}
                    onClick={() => handleInputChange('workEnvironment', env)}
                    className={`px-4 py-3 rounded-lg text-sm font-medium transition-all ${formData.workEnvironment === env ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                  >
                    {env}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Salary Expectations (Annual)</label>
              <select 
                value={formData.salaryExpectation}
                onChange={(e) => handleInputChange('salaryExpectation', e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none"
              >
                <option value="">Select Range</option>
                <option value="High (Top 10%)">High (Top 10%)</option>
                <option value="Above Average">Above Average</option>
                <option value="Average">Average</option>
                <option value="Stability over Salary">Stability over Salary</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Willingness to Relocate</label>
              <div className="flex gap-4">
                {['International', 'National', 'Local Only'].map(rel => (
                  <button
                    key={rel}
                    onClick={() => handleInputChange('willingnessToRelocate', rel)}
                    className={`flex-1 py-3 rounded-lg text-sm font-medium transition-all ${formData.willingnessToRelocate === rel ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                  >
                    {rel}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Industries of Interest</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {['FinTech', 'EdTech', 'BioTech', 'Entertainment', 'Manufacturing', 'E-commerce', 'Renewable Energy', 'Space Tech'].map(ind => (
                  <button
                    key={ind}
                    onClick={() => handleToggleArray('industries', ind)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${formData.industries.includes(ind) ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                  >
                    {ind}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Learning Style</label>
              <div className="grid grid-cols-2 gap-2">
                {['Practical/Hands-on', 'Theoretical/Conceptual', 'Visual/Creative', 'Collaborative/Group'].map(style => (
                  <button
                    key={style}
                    onClick={() => handleInputChange('learningStyle', style)}
                    className={`px-4 py-3 rounded-lg text-sm font-medium transition-all ${formData.learningStyle === style ? 'bg-orange-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                  >
                    {style}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Core Values</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {['Innovation', 'Stability', 'Social Impact', 'Work-Life Balance', 'Prestige', 'Autonomy', 'Growth'].map(val => (
                  <button
                    key={val}
                    onClick={() => handleToggleArray('values', val)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${formData.values.includes(val) ? 'bg-orange-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                  >
                    {val}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Personality Type</label>
              <div className="flex gap-4">
                {['Introverted', 'Ambiverted', 'Extroverted'].map(p => (
                  <button
                    key={p}
                    onClick={() => handleInputChange('personality', p)}
                    className={`flex-1 py-3 rounded-lg text-sm font-medium transition-all ${formData.personality === p ? 'bg-orange-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Languages Known</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {['English', 'Spanish', 'Mandarin', 'French', 'German', 'Hindi', 'Japanese', 'Arabic'].map(lang => (
                  <button
                    key={lang}
                    onClick={() => handleToggleArray('languages', lang)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${formData.languages.includes(lang) ? 'bg-orange-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Research vs. Application</label>
              <div className="flex gap-4">
                {['Research Oriented', 'Application Oriented', 'Balanced'].map(opt => (
                  <button
                    key={opt}
                    onClick={() => handleInputChange('researchVsApp', opt)}
                    className={`flex-1 py-3 rounded-lg text-sm font-medium transition-all ${formData.researchVsApp === opt ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Entrepreneurship Interest</label>
              <div className="flex gap-4">
                {['High', 'Moderate', 'Low'].map(opt => (
                  <button
                    key={opt}
                    onClick={() => handleInputChange('entrepreneurship', opt)}
                    className={`flex-1 py-3 rounded-lg text-sm font-medium transition-all ${formData.entrepreneurship === opt ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Global Regions</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {['North America', 'Europe', 'Asia-Pacific', 'Middle East', 'Australia', 'Africa'].map(region => (
                  <button
                    key={region}
                    onClick={() => handleToggleArray('preferredRegions', region)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${formData.preferredRegions.includes(region) ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                  >
                    {region}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tech-Savviness Level</label>
              <div className="flex gap-4">
                {['Expert', 'Intermediate', 'Beginner'].map(opt => (
                  <button
                    key={opt}
                    onClick={() => handleInputChange('techSavviness', opt)}
                    className={`flex-1 py-3 rounded-lg text-sm font-medium transition-all ${formData.techSavviness === opt ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
      <div className="bg-gray-50 p-8 border-b border-gray-100">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-600 rounded-2xl text-white shadow-lg shadow-blue-200">
              <GraduationCap size={28} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Career Discovery</h2>
              <p className="text-gray-500 text-sm">Step {currentStep + 1} of {steps.length}: {steps[currentStep].title}</p>
            </div>
          </div>
          <div className="hidden md:flex gap-2">
            {steps.map((step, idx) => (
              <div 
                key={step.id}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${idx <= currentStep ? 'bg-blue-600 w-8' : 'bg-gray-200'}`}
              />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-5 gap-4">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div 
                key={step.id}
                className={`flex flex-col items-center gap-2 transition-all duration-300 ${idx === currentStep ? 'opacity-100' : 'opacity-40'}`}
              >
                <div className={`p-3 rounded-xl ${idx === currentStep ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-400'}`}>
                  <Icon size={20} />
                </div>
                <span className="text-[10px] uppercase tracking-wider font-bold hidden md:block">{step.title}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="p-8 min-h-[500px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderStepContent()}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="p-8 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
        <button
          onClick={prevStep}
          disabled={currentStep === 0 || isLoading}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${currentStep === 0 ? 'opacity-0 pointer-events-none' : 'text-gray-600 hover:bg-gray-200'}`}
        >
          <ChevronLeft size={20} />
          Back
        </button>
        <button
          onClick={nextStep}
          disabled={isLoading}
          className="flex items-center gap-2 px-8 py-3 bg-blue-600 text-white rounded-xl font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50"
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Analyzing...
            </div>
          ) : (
            <>
              {currentStep === steps.length - 1 ? 'Generate Analysis' : 'Next Step'}
              <ChevronRight size={20} />
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default CareerInputForm;

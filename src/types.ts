export interface UserInputs {
  subjects: string[];
  grades: string;
  interests: string[];
  skills: string[];
  workEnvironment: string;
  salaryExpectation: string;
  willingnessToRelocate: string;
  industries: string[];
  extracurriculars: string;
  learningStyle: string;
  values: string[];
  hobbies: string;
  languages: string[];
  studyDuration: string;
  financialNeeds: string;
  personality: string;
  researchVsApp: string;
  entrepreneurship: string;
  preferredRegions: string[];
  techSavviness: string;
}

export interface CareerRecommendation {
  course: string;
  job: string;
  location: string;
  degree: string;
  aiImpact: {
    score: number; // 0 to 100, where 100 is highly affected
    analysis: string;
    isLeastAffected: boolean;
  };
  description: string;
  salaryRange: string;
  growthPotential: string;
  colleges: string[];
  fees: string;
  alternativeOptions: string[];
  entranceExams: string[];
}

export interface CareerAnalysisResponse {
  recommendations: CareerRecommendation[];
  summary: string;
}

import { GoogleGenAI, Type } from "@google/genai";
import { UserInputs, CareerAnalysisResponse } from "../types";

const apiKey = process.env.GEMINI_API_KEY;

const handleApiError = (error: any): never => {
  console.error("Gemini API Error:", error);
  
  const errorMessage = error?.message || "";
  const errorStatus = error?.status || "";
  
  if (errorMessage.includes("API key expired") || errorMessage.includes("API_KEY_INVALID")) {
    throw new Error("The AI service key has expired or is invalid. Please update your GEMINI_API_KEY in GitHub Secrets and rebuild the app.");
  }
  
  if (errorMessage.includes("quota") || errorMessage.includes("429")) {
    throw new Error("We've reached the free limit for AI requests. Please try again in a few minutes.");
  }
  
  if (errorMessage.includes("network") || errorMessage.includes("fetch") || !navigator.onLine) {
    throw new Error("Network error detected. Please check your internet connection and try again.");
  }

  if (errorMessage.includes("safety") || errorMessage.includes("blocked")) {
    throw new Error("The request was blocked by AI safety filters. Please try rephrasing your inputs.");
  }

  throw new Error("Something went wrong while connecting to the AI. Please try again later.");
};

export const getCareerAnalysis = async (inputs: UserInputs): Promise<CareerAnalysisResponse> => {
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not set.");
  }

  const ai = new GoogleGenAI({ apiKey });
  
  const prompt = `
    As a world-class career counselor, analyze the following profile of a Class 12th student and provide the top 5 most suitable career paths.
    
    Student Profile:
    - Subjects: ${inputs.subjects.join(", ")}
    - Grades: ${inputs.grades}
    - Interests: ${inputs.interests.join(", ")}
    - Skills: ${inputs.skills.join(", ")}
    - Preferred Work Environment: ${inputs.workEnvironment.join(", ")}
    - Salary Expectation: ${inputs.salaryExpectation}
    - Willingness to Relocate: ${inputs.willingnessToRelocate.join(", ")}
    - Industries of Interest: ${inputs.industries.join(", ")}
    - Extracurriculars: ${inputs.extracurriculars}
    - Learning Style: ${inputs.learningStyle.join(", ")}
    - Core Values: ${inputs.values.join(", ")}
    - Hobbies: ${inputs.hobbies}
    - Languages: ${inputs.languages.join(", ")}
    - Preferred Study Duration: ${inputs.studyDuration.join(", ")}
    - Financial Needs: ${inputs.financialNeeds}
    - Personality: ${inputs.personality.join(", ")}
    - Research vs. Application: ${inputs.researchVsApp.join(", ")}
    - Entrepreneurship Interest: ${inputs.entrepreneurship.join(", ")}
    - Preferred Regions: ${inputs.preferredRegions.join(", ")}
    - Tech-Savviness: ${inputs.techSavviness.join(", ")}

    For each career path, include:
    1. A suitable professional degree/course.
    2. A specific job role.
    3. Top global locations for this career.
    4. A detailed AI impact analysis (how AI will augment or replace tasks, and whether it's a 'safe' or 'high-risk' job).
    5. Growth potential and estimated salary range.
    6. Starting Salary (in INR) for a fresh college graduate.
    7. Expert Salary (in INR) for a professional with 10+ years of experience.
    8. Market Demand Score (0-100) based on current global and Indian trends.
    9. Skill Match Score (0-100) based on the student's provided profile.
    10. Top 3-5 Colleges/Universities (Global & India).
    11. Latest Fee Structure (Approximate).
    12. Alternative Career Options.
    13. Required Entrance Exams.

    Provide the response in a structured JSON format.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            recommendations: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  course: { type: Type.STRING },
                  job: { type: Type.STRING },
                  location: { type: Type.STRING },
                  degree: { type: Type.STRING },
                  aiImpact: {
                    type: Type.OBJECT,
                    properties: {
                      score: { type: Type.NUMBER },
                      analysis: { type: Type.STRING },
                      isLeastAffected: { type: Type.BOOLEAN },
                    },
                    required: ["score", "analysis", "isLeastAffected"],
                  },
                  description: { type: Type.STRING },
                  salaryRange: { type: Type.STRING },
                  startingSalaryINR: { type: Type.STRING },
                  expertSalaryINR: { type: Type.STRING },
                  marketDemandScore: { type: Type.NUMBER },
                  skillMatchScore: { type: Type.NUMBER },
                  growthPotential: { type: Type.STRING },
                  colleges: { type: Type.ARRAY, items: { type: Type.STRING } },
                  fees: { type: Type.STRING },
                  alternativeOptions: { type: Type.ARRAY, items: { type: Type.STRING } },
                  entranceExams: { type: Type.ARRAY, items: { type: Type.STRING } },
                },
                required: [
                  "course", "job", "location", "degree", "aiImpact", 
                  "description", "salaryRange", "startingSalaryINR", "expertSalaryINR",
                  "marketDemandScore", "skillMatchScore",
                  "growthPotential", "colleges", "fees", "alternativeOptions", "entranceExams"
                ],
              },
            },
            summary: { type: Type.STRING },
          },
          required: ["recommendations", "summary"],
        },
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error("No response from AI.");
    }

    return JSON.parse(text.trim());
  } catch (error) {
    return handleApiError(error);
  }
};

export const getQuickAnalysis = async (jobTitle: string, category: string): Promise<CareerAnalysisResponse> => {
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not set.");
  }

  const ai = new GoogleGenAI({ apiKey });
  
  const prompt = `
    Provide a detailed career analysis for the role of "${jobTitle}" in the category of "${category}".
    The target audience is a Class 12th student.
    
    Include:
    1. A suitable professional degree/course.
    2. A specific job role.
    3. Top global locations for this career.
    4. A detailed AI impact analysis (how AI will augment or replace tasks, and whether it's a 'safe' or 'high-risk' job).
    5. Growth potential and estimated salary range.
    6. Starting Salary (in INR) for a fresh college graduate.
    7. Expert Salary (in INR) for a professional with 10+ years of experience.
    8. Market Demand Score (0-100) based on current global and Indian trends.
    9. Skill Match Score (0-100) based on the student's provided profile.
    10. Top 3-5 Colleges/Universities (Global & India).
    11. Latest Fee Structure (Approximate).
    12. Alternative Career Options.
    13. Required Entrance Exams.

    Provide the response in a structured JSON format with a "recommendations" array containing exactly one item, and a "summary".
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            recommendations: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  course: { type: Type.STRING },
                  job: { type: Type.STRING },
                  location: { type: Type.STRING },
                  degree: { type: Type.STRING },
                  aiImpact: {
                    type: Type.OBJECT,
                    properties: {
                      score: { type: Type.NUMBER },
                      analysis: { type: Type.STRING },
                      isLeastAffected: { type: Type.BOOLEAN },
                    },
                    required: ["score", "analysis", "isLeastAffected"],
                  },
                  description: { type: Type.STRING },
                  salaryRange: { type: Type.STRING },
                  startingSalaryINR: { type: Type.STRING },
                  expertSalaryINR: { type: Type.STRING },
                  marketDemandScore: { type: Type.NUMBER },
                  skillMatchScore: { type: Type.NUMBER },
                  growthPotential: { type: Type.STRING },
                  colleges: { type: Type.ARRAY, items: { type: Type.STRING } },
                  fees: { type: Type.STRING },
                  alternativeOptions: { type: Type.ARRAY, items: { type: Type.STRING } },
                  entranceExams: { type: Type.ARRAY, items: { type: Type.STRING } },
                },
                required: [
                  "course", "job", "location", "degree", "aiImpact", 
                  "description", "salaryRange", "startingSalaryINR", "expertSalaryINR",
                  "marketDemandScore", "skillMatchScore",
                  "growthPotential", "colleges", "fees", "alternativeOptions", "entranceExams"
                ],
              },
            },
            summary: { type: Type.STRING },
          },
          required: ["recommendations", "summary"],
        },
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error("No response from AI.");
    }

    return JSON.parse(text.trim());
  } catch (error) {
    return handleApiError(error);
  }
};

import { GoogleGenAI, Type } from "@google/genai";
import { UserInputs, CareerAnalysisResponse } from "../types";

const apiKey = process.env.GEMINI_API_KEY;

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
    - Preferred Work Environment: ${inputs.workEnvironment}
    - Salary Expectation: ${inputs.salaryExpectation}
    - Willingness to Relocate: ${inputs.willingnessToRelocate}
    - Industries of Interest: ${inputs.industries.join(", ")}
    - Extracurriculars: ${inputs.extracurriculars}
    - Learning Style: ${inputs.learningStyle}
    - Core Values: ${inputs.values.join(", ")}
    - Hobbies: ${inputs.hobbies}
    - Languages: ${inputs.languages.join(", ")}
    - Preferred Study Duration: ${inputs.studyDuration}
    - Financial Needs: ${inputs.financialNeeds}
    - Personality: ${inputs.personality}
    - Research vs. Application: ${inputs.researchVsApp}
    - Entrepreneurship Interest: ${inputs.entrepreneurship}
    - Preferred Regions: ${inputs.preferredRegions.join(", ")}
    - Tech-Savviness: ${inputs.techSavviness}

    For each career path, include:
    1. A suitable professional degree/course.
    2. A specific job role.
    3. Top global locations for this career.
    4. A detailed AI impact analysis (how AI will augment or replace tasks, and whether it's a 'safe' or 'high-risk' job).
    5. Growth potential and estimated salary range.

    Provide the response in a structured JSON format.
  `;

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
                growthPotential: { type: Type.STRING },
              },
              required: ["course", "job", "location", "degree", "aiImpact", "description", "salaryRange", "growthPotential"],
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
};

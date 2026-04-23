import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export interface UserProfile {
  height: number;
  weight: number;
  torsoType: 'long' | 'short' | 'balanced';
  preferences: string[];
  skinTone?: string;
  occasion?: string;
}

export interface Recommendation {
  title: string;
  analysis: string;
  colorAdvice: string;
  doList: string[];
  dontList: string[];
  suggestedPieces: string[];
  horasComment: string;
}

export async function getStylingRecommendation(profile: UserProfile): Promise<Recommendation> {
  const prompt = `
    Analyze a user's body characteristics, skin tone, and intended occasion to provide personalized fashion advice.
    User Profile:
    - Height: ${profile.height} cm
    - Weight: ${profile.weight} kg
    - Torso Type: ${profile.torsoType}
    - Preferred Styles: ${profile.preferences.join(', ')}
    - Skin Tone/Undertone: ${profile.skinTone || 'Not specified'}
    - Intended Occasion: ${profile.occasion || 'General use'}

    Please provide a detailed analysis in a structured JSON format.
    Include a specific "colorAdvice" section based on their skin tone.
    The "horasComment" should be a friendly, encouraging remark from 'Horas'.
  `;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          analysis: { type: Type.STRING },
          colorAdvice: { type: Type.STRING },
          doList: { type: Type.ARRAY, items: { type: Type.STRING } },
          dontList: { type: Type.ARRAY, items: { type: Type.STRING } },
          suggestedPieces: { type: Type.ARRAY, items: { type: Type.STRING } },
          horasComment: { type: Type.STRING },
        },
        required: ["title", "analysis", "colorAdvice", "doList", "dontList", "suggestedPieces", "horasComment"],
      },
    },
  });

  return JSON.parse(response.text || '{}');
}

export async function getHorasGreeting(context: string): Promise<string> {
  const response = await ai.models.generateContent({
    model: "gemini-3.1-flash-lite-preview",
    contents: `You are Horas, a friendly, professional, and stylish guide for a fashion app. 
               Generate a short, warm, and encouraging greeting for: ${context}. Keep it under 2 sentences.`,
  });
  return response.text?.trim() || "Hello! I'm Horas, your personal style guide!";
}

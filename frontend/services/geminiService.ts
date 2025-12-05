import { GoogleGenAI, Type } from "@google/genai";
import { BlogPost } from "../types";

// Initialize Gemini API Client
// The API key must be obtained exclusively from the environment variable process.env.API_KEY
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Define the interface for the structured response we want from AI
export interface StructuredAIResponse {
  title: string;
  excerpt: string;
  author: string;
  tags: string[];
  introduction: string;
  sections: { heading: string; content: string }[];
  conclusion: string;
  faqs: { question: string; answer: string }[];
}

export const generateBlogContent = async (topic: string, category: string, tone: string): Promise<StructuredAIResponse> => {
  if (!process.env.API_KEY) {
    throw new Error("API Key is missing. Please set process.env.API_KEY.");
  }

  const model = "gemini-2.5-flash";

  // Define category-specific high CPC instructions
  let categoryInstructions = "";
  if (category === 'Cybersecurity') {
    categoryInstructions = `
    SPECIFIC INSTRUCTIONS FOR CYBERSECURITY:
    - Target high CPC B2B keywords: "Endpoint Security", "Cloud Firewalls", "VAPT Services India", "Data Loss Prevention (DLP)", "Zero Trust Architecture", "Ransomware Protection".
    - Focus on enterprise-grade solutions and protection strategies for Indian SMEs and corporations.
    `;
  } else if (category === 'Startups & Business Tech') {
    categoryInstructions = `
    SPECIFIC INSTRUCTIONS FOR STARTUPS & BUSINESS TECH:
    - Target high CPC keywords: "Best CRM Software India", "ERP System Implementation", "Cloud Hosting for Startups", "Payment Gateway Integration", "SaaS Business Models", "Venture Capital India".
    - Mention localized business tools and success stories involving companies like Zoho, Freshworks, Razorpay.
    `;
  }

  // FINAL High-Power AI Studio Prompt adapted for STRUCTURED JSON output
  // LOCALIZED FOR INDIA & ADSENSE OPTIMIZED
  const prompt = `
    You are an expert SEO writer, Google AdSense specialist, and Indian Tech News Editor.
    
    Topic: ${topic}
    Category: ${category}
    Tone: ${tone}

    GOAL:
    Create a blog post that is fully monetizable under Google AdSense policies, helpful, original, and written for an Indian audience (Indian English).

    SEO REQUIREMENTS:
    1. Focus on High CPC keywords for India (e.g., Hosting, Trading, Software, AI).
    ${categoryInstructions}
    2. INDIAN CONTEXT IS MANDATORY: Use ₹ (INR), mention UPI, Jio, Flipkart, Amazon.in, and local examples.
    3. NO generic AI fluff. Write like a human journalist.

    The output must be broken down into logical sections to allow for a 'Block Editor' experience.

    Return the response as a JSON object with this exact structure:
    {
      "title": "High CTR Title (Max 65 chars)",
      "excerpt": "Meta description style (Max 160 chars)",
      "author": "TechFlow India Editor",
      "tags": ["Tag1", "Tag2"],
      "introduction": "Strong Hook Intro paragraph (Markdown supported)",
      "sections": [
        { "heading": "H2 Heading", "content": "Paragraph content (Markdown supported, bullet points allowed)" }
      ],
      "conclusion": "Key takeaways or final verdict paragraph",
      "faqs": [
        { "question": "Question string", "answer": "Short concise answer" }
      ]
    }
  `;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            excerpt: { type: Type.STRING },
            author: { type: Type.STRING },
            tags: { type: Type.ARRAY, items: { type: Type.STRING } },
            introduction: { type: Type.STRING },
            sections: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  heading: { type: Type.STRING },
                  content: { type: Type.STRING }
                },
                required: ["heading", "content"]
              }
            },
            conclusion: { type: Type.STRING },
            faqs: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  question: { type: Type.STRING },
                  answer: { type: Type.STRING }
                },
                required: ["question", "answer"]
              }
            }
          },
          required: ["title", "excerpt", "author", "tags", "introduction", "sections", "conclusion", "faqs"]
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from Gemini");

    return JSON.parse(text) as StructuredAIResponse;
  } catch (error) {
    console.error("Error generating blog content:", error);
    throw error;
  }
};
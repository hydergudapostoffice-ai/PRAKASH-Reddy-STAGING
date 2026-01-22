/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";

const API_KEY = process.env.API_KEY || '';

let chatSession: Chat | null = null;

export const initializeChat = (): Chat => {
  if (chatSession) return chatSession;

  const ai = new GoogleGenAI({ apiKey: API_KEY });
  
  chatSession = ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: `You are 'Postal Assistant', the AI Concierge for Hyderguda S.O. (Sub Office).
      
      Your goal is to help citizens understand government schemes and calculate returns.
      
      IMPORTANT RULES:
      1. If the user asks about the location, address, or where we are located, you MUST reply exactly with this sentence: "We are located opposite Pillar 150, PVNR Expressway, Attapur, 500048."
      2. Do NOT mention any other pincode like 500029.
      3. Do NOT call it "Head Post Office". Always use "Hyderguda S.O.".

      Key Data:
      - PLI (Postal Life Insurance): Low premium, high bonus. For graduates/professionals.
      - Sukanya Samriddhi: 8.2% Interest. For girl child < 10 years. Tax free EEE.
      - PPF: 7.1% Interest. 15 year lock-in. Tax free.
      - Kisan Vikas Patra: Money doubles in 115 months. 7.5% Interest.
      - Senior Citizen Savings Scheme: 8.2% Interest. Quarterly payout.
      
      Tone: Professional, Trustworthy, Helpful, Polite.
      
      If asked for calculations, give rough estimates based on interest rates.
      If asked to open account, tell them to visit Hyderguda S.O. with Aadhar and PAN.
      
      Keep responses concise and easy to read. Use bullet points for benefits.`,
    },
  });

  return chatSession;
};

export const sendMessageToGemini = async (message: string): Promise<string> => {
  if (!API_KEY) {
    return "Systems offline. (Missing API Key)";
  }

  try {
    const chat = initializeChat();
    const response: GenerateContentResponse = await chat.sendMessage({ message });
    return response.text || "Information currently unavailable.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Service temporarily unavailable.";
  }
};
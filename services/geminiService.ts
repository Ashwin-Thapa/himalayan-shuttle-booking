

import { GoogleGenAI, Chat, GenerateContentResponse, Content, Part, SendMessageParameters } from "@google/genai";
import { SearchResult, AiTravelSuggestion, ChatMessage } from '../types';
import { locations as appLocations } from '../constants';

// --- Prompt Engineering for Conciseness ---
const CONCISE_INSTRUCTION = "Provide very concise, scannable, and to-the-point answers. Use short sentences or bullet points. Travelers need quick information. Strictly adhere to any word limits given. Avoid conversational fluff.";
const CONCISE_LIST_INSTRUCTION = "Use bullet points for lists. Keep descriptions to a single brief phrase or sentence where possible. Be extremely direct.";
const MAX_WORDS_CHAT = "Maximum 50 words total, ideally less. Be extremely brief.";
const MAX_WORDS_SHORT_PLAN = "Maximum 75 words total.";
const MAX_WORDS_CUSTOM_TOUR = "Maximum 120 words. Focus on a scannable itinerary or key points.";


export const initChatService = (ai: GoogleGenAI): Chat => {
  return ai.chats.create({
    model: 'gemini-2.5-flash-preview-04-17',
    config: {
      systemInstruction: `You are Himalayan Helper, a friendly and extremely concise AI travel assistant for Himalayan Shuttle.
Your primary goal is to assist users with travel in the Indian Himalayas (Assam, Meghalaya, Arunachal Pradesh).
Answer general travel queries, booking information, and common tourist questions.
${CONCISE_INSTRUCTION}
If a user uploads an image, briefly describe what you see (max 20 words) and answer any related questions based on the image and their text query.
Assume voice notes are transcribed to text by the app; you only process text and image data.
Your responses MUST be extremely brief and easily scannable. ${MAX_WORDS_CHAT}`,
    },
  });
};

export const fetchAiTravelTimeEstimateService = async (
  ai: GoogleGenAI,
  fromName: string,
  toName: string,
  shuttleTypeName: string
): Promise<{ estimatedHours: number; rawText: string } | null> => {
  const prompt = `Estimate typical road travel time for a ${shuttleTypeName} from "${fromName}" to "${toName}" in Indian Himalayas.
Respond ONLY with an estimated duration in hours as a single number or a small range (e.g., "4" or "3-4"). No other text or units. Example: "5" or "2-3". Strict format.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-preview-04-17',
      contents: prompt,
    });
    const text = response.text.trim();
    if (!text) throw new Error("AI returned empty response for travel time.");

    let estimatedHours: number;
    if (text.includes('-')) {
      const parts = text.split('-').map(s => parseInt(s.trim(), 10));
      if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
        estimatedHours = Math.round((parts[0] + parts[1]) / 2);
      } else {
        // Fallback if range parsing fails but '-' is present
        estimatedHours = 3;
      }
    } else {
      estimatedHours = parseInt(text, 10);
      if (isNaN(estimatedHours)) estimatedHours = 3; // Fallback if single number parsing fails
    }
    estimatedHours = Math.max(1, Math.min(estimatedHours, 24)); // Clamp within reasonable bounds
    return { estimatedHours, rawText: `${text} hours (Himalayan Helper est.)` };
  } catch (error) {
    console.error("Error in fetchAiTravelTimeEstimateService:", error);
    throw error;
  }
};

export const fetchAiDestinationSuggestionsForModalService = async (
  ai: GoogleGenAI,
  leavingFromName: string
): Promise<string[]> => {
  const prompt = `User starts from "${leavingFromName}" (Indian Himalayas).
Suggest three distinct, popular tourist destinations reachable by shuttle.
Return ONLY destination names, comma-separated. E.g.: Destination One, Destination Two, Destination Three.
Suggestions must be valid Himalayan travel locations (e.g., in Assam, Meghalaya, Arunachal Pradesh). No other text. Strict format.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-preview-04-17',
      contents: prompt,
    });
    const text = response.text;
    return text.split(',').map(s => s.trim()).filter(s => s.length > 0 && s.length < 50);
  } catch (error) {
    console.error("Error in fetchAiDestinationSuggestionsForModalService:", error);
    throw error;
  }
};

export const fetchCustomTourPlanService = async (
  ai: GoogleGenAI,
  preferences: string
): Promise<string> => {
  const prompt = `You are Himalayan Helper, a tour planner for Indian Himalayas (Assam, Meghalaya, Arunachal Pradesh).
User preferences: "${preferences}".
Generate a *very concise, scannable, day-by-day* itinerary if duration specified. Otherwise, suggest key places/activities in bullet points.
Include *brief* estimated travel times if relevant. Suggest general accommodation types.
${CONCISE_LIST_INSTRUCTION} ${CONCISE_INSTRUCTION}
For Kamakhya requests, address pilgrim needs (veg food, appropriate stay) very briefly.
${MAX_WORDS_CUSTOM_TOUR}`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-preview-04-17',
      contents: prompt,
    });
    return response.text;
  } catch (error)
{
    console.error("Error in fetchCustomTourPlanService:", error);
    throw error;
  }
};

export const fetchAiTravelPlanService = async (
  ai: GoogleGenAI,
  shuttle: SearchResult,
  prefersVegMeals?: boolean
): Promise<AiTravelSuggestion> => {
  const destinationCity = shuttle.toName.split('(')[0].trim();
  const isKamakhyaBooking = shuttle.toName.toLowerCase().includes('kamakhya temple');
  const kamakhyaPrompt = `This is a pilgrimage site. Focus on pilgrim-friendly options. The user ${prefersVegMeals ? "prefers vegetarian meals." : "has no meal preference."}`;
  const generalPrompt = `The user has no special preferences mentioned.`;
  
  const prompt = `You are Himalayan Helper, an expert tour planner for the Indian Himalayas.
A user has booked a shuttle from "${shuttle.fromName}" to "${shuttle.toName}". The destination is "${destinationCity}".
Provide travel suggestions for the destination.
${isKamakhyaBooking ? kamakhyaPrompt : generalPrompt}

Please respond ONLY with a JSON object matching this exact structure. Do not include any text, markdown, or commentary outside of the JSON object.
{
  "hotels": [
    {
      "name": "Specific, real hotel name",
      "description": "Brief, enticing description (e.g., 'Luxury resort with stunning valley views'). Max 15 words.",
      "bookingLink": "A functional booking.com SEARCH URL for this hotel. The URL must be properly encoded. Example for 'Hotel Name' in 'City': https://www.booking.com/searchresults.html?ss=Hotel%20Name%2C%20City"
    }
  ],
  "mealIdeas": [
    "A specific local dish to try.",
    "A type of restaurant or eatery to visit."
  ],
  "tip": "One brief, practical travel tip for the destination. Max 20 words."
}

Rules:
- Provide exactly 2 distinct hotel suggestions.
- Ensure hotel names are real and located in or very near "${destinationCity}".
- The bookingLink MUST be a valid, URL-encoded booking.com search URL for the hotel in its city. Construct it carefully.
- Provide 2 meal ideas. They should be specific and local.
- The tip must be concise and useful.
`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-preview-04-17',
      contents: prompt,
      config: {
          responseMimeType: "application/json",
      }
    });
    
    let jsonStr = response.text.trim();
    const fenceRegex = /^```(\w*)?\s*\n?(.*?)\n?\s*```$/s;
    const match = jsonStr.match(fenceRegex);
    if (match && match[2]) {
      jsonStr = match[2].trim();
    }

    try {
        const parsedData = JSON.parse(jsonStr);
        if (parsedData.hotels && parsedData.mealIdeas && parsedData.tip) {
            return parsedData as AiTravelSuggestion;
        } else {
             console.warn("AI Travel Plan: Parsed JSON is missing required fields.", parsedData);
             throw new Error("Himalayan Helper returned an incomplete travel plan.");
        }
    } catch (e) {
        console.error("AI Travel Plan: Failed to parse JSON response:", e, "Raw response:", jsonStr);
        throw new Error("Himalayan Helper provided a travel plan in an invalid format.");
    }

  } catch (error) {
    console.error("Error in fetchAiTravelPlanService (Hotel & Meal Ideas):", error);
    if (error instanceof Error) {
      if (error.message.includes("API_KEY_INVALID") || error.message.includes("permission denied")) {
        throw new Error("Failed to generate travel plan due to an API key or permission issue. Please check configuration.");
      }
      if (error.message.includes("quota")) {
        throw new Error("Himalayan Helper is currently busy generating travel plans. Please try again shortly.");
      }
      if (error.message.toLowerCase().includes("xhr error") || error.message.toLowerCase().includes("server error") || error.message.includes("500")) {
        throw new Error("Himalayan Helper couldn't connect to generate travel ideas at this moment. Please try again later or ask in chat.");
      }
      if (error.message.includes("invalid format") || error.message.includes("incomplete travel plan")) {
          throw error;
      }
    }
    throw new Error("Himalayan Helper encountered an unexpected issue while generating travel ideas. Please try asking in chat.");
  }
};

export const sendMessageToChatbotService = async (
  chat: Chat,
  messageText: string,
  imagePart?: Part | null
): Promise<string> => {
  try {
    const messagePayload: Part[] = [];

    if (imagePart) {
      messagePayload.push(imagePart);
    }

    if (messageText.trim() !== "") {
        messagePayload.push({ text: messageText });
    } else if (imagePart && messageText.trim() === "") {
        messagePayload.push({ text: "Describe this image very briefly or answer based on it." });
    }

    if (messagePayload.length === 0) {
        return "Please provide a message or an image.";
    }

    const params: SendMessageParameters = { message: messagePayload };

    const response: GenerateContentResponse = await chat.sendMessage(params);
    return response.text;
  } catch (error) {
    console.error("Error in sendMessageToChatbotService:", error);
    if (error instanceof Error && error.message.includes("quota")) {
        throw new Error("Himalayan Helper is currently busy. Please try again later.");
    }
    throw new Error("Himalayan Helper encountered an issue. Please try again.");
  }
};
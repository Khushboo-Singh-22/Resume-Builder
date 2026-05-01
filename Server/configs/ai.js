import OpenAI from "openai";

const apiKey = process.env.OPENAI_API_KEY || process.env.GEMINI_API_KEY;

const ai = apiKey
  ? new OpenAI({
      apiKey,
      baseURL: process.env.OPENAI_BASE_URL,
      defaultModel: process.env.OPENAI_MODEL,
    })
  : null;

export default ai;
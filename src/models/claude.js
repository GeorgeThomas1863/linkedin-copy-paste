import OpenAI from "openai";
import CONFIG from "../../config/config.js";

const client = new OpenAI({
  apiKey: CONFIG.CLAUDE_API_KEY,
  baseURL: "https://api.anthropic.com",
});

export const runClaude = async (inputParams) => {
  const { prompt, model } = inputParams;
  if (!prompt || !model) return null;

  console.log("CLAUDE PARAMS");
  console.dir(inputParams);

  const res = await client.messages.create({
    model: model,
    messages: prompt,
    max_tokens: 500,
  });

  console.log("CLAUDE RESPONSE");
  console.dir(res);

  return res;
};

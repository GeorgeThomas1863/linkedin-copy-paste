import Anthropic from "@anthropic-ai/sdk";
import CONFIG from "../../config/config.js";
import { buildPrompt } from "../src.js";

const client = new Anthropic({
  apiKey: CONFIG.CLAUDE_API_KEY,
});

export const runClaude = async (inputParams) => {
  const { prompt, model, maxTokens, temperature } = inputParams;
  if (!prompt || !model) return null;

  console.log("CLAUDE PARAMS");
  console.dir(inputParams);

  //FIX SYSTEM HERE (needed for all type)
  const claudePrompt = await buildPrompt(inputParams);
  if (!claudePrompt) return null;

  console.log("CLAUDE PROMPT");
  console.dir(claudePrompt);

  const data = await client.messages.create({
    model: model,
    tools: [
      {
        type: "web_search_20250305", // Built-in web search tool!
        name: "web_search",
        max_uses: 5, // Optional: limit number of searches
      },
    ],
    messages: claudePrompt,
    max_tokens: +maxTokens,
    temperature: +temperature,
  });
  if (!data) return null;
  data.aiReturnType = "claude";

  console.log("CLAUDE RESPONSE");
  console.log(data);
  console.log("MESSAGE RESPONSE");
  console.log(data.content);

  return data;
};

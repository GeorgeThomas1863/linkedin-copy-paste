import Anthropic from "@anthropic-ai/sdk";
import CONFIG from "../../config/config.js";

const client = new Anthropic({
  apiKey: CONFIG.CLAUDE_API_KEY,
  // baseURL: "https://api.anthropic.com/v1",
  // defaultHeaders: {
  //   "anthropic-version": "2023-06-01",
  // },
});

export const runClaude = async (inputParams) => {
  const { prompt, model } = inputParams;
  if (!prompt || !model) return null;

  console.log("CLAUDE PARAMS");
  console.dir(inputParams);

  const messages = [
    // { role: "system", content: "You are a helpful assistant." },
    { role: "user", content: prompt },
  ];

  const res = await client.messages.create({
    model: model,
    tools: [
      {
        type: "web_search_20250305", // Built-in web search tool!
        name: "web_search",
        max_uses: 5, // Optional: limit number of searches
      },
    ],
    messages: messages,
    max_tokens: 500,
  });

  console.log("CLAUDE RESPONSE");
  console.log(res);
  console.log("MESSAGE RESPONSE");
  console.log(res.content);

  return res;
};

import OpenAI from "openai";
import CONFIG from "../../config/config.js";

const client = new OpenAI({
  apiKey: CONFIG.CLAUDE_API_KEY,
  baseURL: "https://api.anthropic.com/v1",
  defaultHeaders: {
    "anthropic-version": "2023-06-01",
  },
});

export const runClaude = async (inputParams) => {
  const { prompt, model } = inputParams;
  if (!prompt || !model) return null;

  console.log("CLAUDE PARAMS");
  console.dir(inputParams);

  const messages = [
    { role: "system", content: "You are a helpful assistant." },
    { role: "user", content: prompt },
  ];

  const res = await client.chat.completions.create({
    model: model,
    tools: [
      {
        name: "web_search",
        description: "Searches the web for current information",
        input_schema: {
          type: "object",
          properties: {
            query: {
              type: "string",
              description: "The search query",
            },
          },
          required: ["query"],
        },
      },
    ],
    messages: messages,
    max_tokens: 500,
  });

  console.log("CLAUDE RESPONSE");
  console.dir(res);
  console.log("MESSAGE RESPONSE");
  console.log(res.choices[0].message.content);

  return res;
};

//BUILD
import OpenAI from "openai";
import CONFIG from "../../config/config.js";

const client = new OpenAI({
  apiKey: CONFIG.OPENAI_API_KEY,
});

export const runChatGPT = async (inputParams) => {
  const { prompt, model } = inputParams;
  if (!prompt || !model) return null;

  const response = await client.responses.create({
    model: model,
    tools: [{ type: "web_search" }],
    input: prompt,
  });

  console.log("CHATGPT RESPONSE");
  console.dir(response);
  console.log("MESSAGE RESPONSE");
  console.log(response.output_text);

  return response;
};

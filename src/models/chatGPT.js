//BUILD
import OpenAI from "openai";
import CONFIG from "../../config/config.js";

const client = new OpenAI({
  apiKey: CONFIG.OPENAI_API_KEY,
  //ADD BASE URL
});

export const runChatGPT = async (inputParams) => {
  const { prompt, model } = inputParams;
  if (!prompt || !model) return null;

  console.log("CHATGPT PARAMS");
  console.dir(inputParams);

  const res = await client.responses.create({
    model: model,
    tools: [{ type: "web_search" }],
    // input: "What is the capital of Uzbekistan?"
    input: prompt,
    max_tokens: 500,
  });

  console.log("CHATGPT RESPONSE");
  console.dir(res);
  console.log("MESSAGE RESPONSE");
  console.log(res.output_text);

  return res;
};

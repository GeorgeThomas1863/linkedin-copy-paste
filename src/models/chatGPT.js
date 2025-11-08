//BUILD
import OpenAI from "openai";
import CONFIG from "../../config/config.js";

const client = new OpenAI({
  apiKey: CONFIG.OPENAI_API_KEY,
  //ADD BASE URL
});

export const runChatGPT = async (inputParams) => {
  const { prompt, model, maxTokens, temperature } = inputParams;
  if (!prompt || !model) return null;

  console.log("CHATGPT PARAMS");
  console.dir(inputParams);

  const data = await client.responses.create({
    model: model,
    tools: [{ type: "web_search" }],
    // input: "What is the capital of Uzbekistan?"
    input: prompt,
    max_output_tokens: +maxTokens,
    // temperature: +temperature, // something fucked here, figure out
  });

  console.log("CHATGPT RESPONSE");
  console.dir(data);
  console.log("MESSAGE RESPONSE");
  console.log(data.output_text);

  data.aiReturnType = "chatgpt";

  return data;
};

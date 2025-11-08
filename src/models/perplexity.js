import OpenAI from "openai";
import CONFIG from "../../config/config.js";

const client = new OpenAI({
  apiKey: CONFIG.PERPLEXITY_API_KEY,
  baseURL: "https://api.perplexity.ai",
});

export const runPerplexity = async (inputParams) => {
  const { prompt, model, maxTokens } = inputParams;
  if (!prompt || !model) return null;

  // const messages = [
  //   { role: "system", content: "You are a helpful assistant." },
  //   { role: "user", content: prompt },
  // ];

  const params = {
    model: model,
    messages: prompt,
    max_tokens: maxTokens,
    search_recency_filter: "week",
    // reasoning_effort: "high", //TURN OFF
  };

  console.log("PERPLEXITY PARAMS");
  console.dir(params);

  const data = await client.chat.completions.create(params);
  if (!data) return null;
  console.log("PERPLEXITY DATA");
  console.dir(data);
  console.log("MESSAGE RESPONSE");
  console.log(data.choices[0].message.content);

  return data;
};

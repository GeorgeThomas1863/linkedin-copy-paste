import { runPerplexity } from "./models/perplexity.js";
import { runChatGPT } from "./models/chatGPT.js";
import { runClaude } from "./models/claude.js";
import { runLocalLLM } from "./models/local.js";

export const runAI = async (inputParams) => {
  if (!inputParams) return null;
  const { aiType, model, maxTokens, temperature } = inputParams;

  console.log("RUN AI BACKEND INPUT PARAMS");
  console.dir(inputParams);

  // build prompt based on post type
  const prompt = await buildPrompt(inputParams);
  if (!prompt) return null;

  const params = {
    prompt: prompt,
    model: model,
    maxTokens: maxTokens,
    temperature: temperature,
  };

  if (aiType === "all") return await runAll(params);
  if (aiType === "perplexity") return await runPerplexity(params);
  if (aiType === "chatgpt") return await runChatGPT(params);
  if (aiType === "claude") return await runClaude(params);
  if (aiType === "local-llm") return await runLocalLLM(params);
};

export const runAll = async (params) => {
  const { model } = params;
  const data = [];

  const modelQualityMap = {
    high: {
      perplexity: "sonar-deep-research",
      chatgpt: "gpt-5",
      claude: "claude-sonnet-4-5",
      ["local-llm"]: "local-llm",
    },
    medium: {
      perplexity: "sonar-pro",
      chatgpt: "gpt-5-mini",
      claude: "claude-sonnet-4-5",
      ["local-llm"]: "local-llm",
    },
    low: {
      perplexity: "sonar",
      chatgpt: "gpt-5-nano",
      claude: "claude-opus-4-1",
      ["local-llm"]: "local-llm",
    },
  };

  const modelQuality = modelQualityMap[model];

  data.push(await runPerplexity({ ...params, model: modelQuality.perplexity }));
  data.push(await runChatGPT({ ...params, model: modelQuality.chatgpt }));
  data.push(await runClaude({ ...params, model: modelQuality.claude }));
  data.push(await runLocalLLM({ ...params, model: modelQuality["local-llm"] }));

  return data;
};

//MAKE BETTER
export const buildPrompt = async (inputParams) => {
  if (!inputParams) return null;
  const { postType, userInput, systemPrompt, aiType } = inputParams;

  const promptArray = await getSystemPrompt(systemPrompt, aiType);
  // const promptArray = [];

  let userPrompt = null;
  switch (postType) {
    case "cybersecurity-news":
      userPrompt = await buildCybersecurityNewsPrompt();
      break;

    case "foreign-policy-news":
      userPrompt = await buildForeignPolicyNewsPrompt();
      break;

    case "user-input":
      userPrompt = userInput;
      break;
  }

  if (!userPrompt) return null;
  promptArray.push({ role: "user", content: userPrompt });

  return promptArray;
};

export const getSystemPrompt = async (systemPrompt, aiType) => {
  if (aiType === "claude" || aiType === "all") return [];

  //default system prompt
  if (!systemPrompt) {
    return [{ role: "system", content: "You are a helpful assistant." }];
  }

  return [{ role: "system", content: systemPrompt }];
};

export const buildCybersecurityNewsPrompt = async () => {
  const prompt = `##Background: You are a writer and a cybersecurity expert. Your job is to search the open internet in real time and find the single most important and interesting cybersecurity news story from the past 24 hours. Then write 3-4 sharp, concise sentences about the news story you found, describing the main point and why it is important. The sentences should be professional, but engaging, and written in a tone similar to posts found on LinkedIn. 

  ##Instructions: 
- First, search the latest web sources (credible cybersecurity outlets, major tech and security news sites, CERT advisories, vendor blogs, and government alerts) to identify the BEST cybersecurity news story about a recent cybersecurity incident, vulnerability, policy development, or major breach that has occurred or been reported within the last 24 hours. When choosing the best cybersecurity news story give more weight to legitimate nation state or cyber criminal activity, not to hype or speculation about random trends, and try to find articles that contain original primary source information and analysis. 
- Second, write 3-4 GOOD sentences that summarizes the information in the news story. Your sentences should follow the following basic outline: First sentence gives a broad overview of event and highlights the main reason why it matters. Next 2-3 sentences summarize the news story concisely and factually.  Use specific names, companies, malware, CVE numbers, or agencies if available. The writing should be professional, and in a tone commonly found on LinkedIn.
- Third, at the end of your sentences please provide a link to the news story you chose and are summarizing. Again try to find original information from reliable primary sources or trusted security publications. 

##Rules:  
Your response MUST adhere to the following rules: 
- Never use emojis or any non-text characters in your response
- NEVER reference or repeat anything about the prompt or reference that this is a prompt or question in your response. Do not say “this matters because” (or similar), simply describe why it matters. 
- Never use any markdown formatting in your response (this includes bolding, italics, underlining, etc.)
- Never use any HTML tags, code blocks, lists, or images in your response
- Never list out the citations for specific sentences in your response, or include any citations. 
- Avoid hype, speculation, or marketing tone.
- Focus on factual accuracy and insight value.
- Never chose stories that are rumors or speculation. Always use primary sources or original reporting from reliable outlets such as: KrebsOnSecurity, Public Service Announcements on IC3.gov,The Hacker News, BleepingComputer, DarkReading, SecurityWeek, Recorded Future, CyberScoop, CISA advisories, Major tech media (e.g., Wired, TechCrunch, Reuters Tech, Bloomberg Tech).
- If multiple stories are equally important, select only one — whichever has the broadest impact or most unique insight for cybersecurity professionals.
`;

  return prompt;
};

//MAKE LESS STUPID
export const buildForeignPolicyNewsPrompt = async () => {
  const prompt = `You are a foreign policy expert. Please write 3-4 sentences on relevant foreign policy news.`;
  return prompt;
};

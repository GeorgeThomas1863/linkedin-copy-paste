import { runPerplexity } from "./models/perplexity.js";
import { runChatGPT } from "./models/chatGPT.js";
import { runClaude } from "./models/claude.js";
import { runLocalLLM } from "./models/local.js";

export const runAI = async (inputParams) => {
  if (!inputParams) return null;
  const { aiType, model } = inputParams;

  console.log("RUN AI BACKEND INPUT PARAMS");
  console.dir(inputParams);

  //build prompt based on post type
  const prompt = await buildPrompt(inputParams);
  if (!prompt) return null;

  const params = {
    prompt: prompt,
    model: model,
  };

  if (aiType === "perplexity") return await runPerplexity(params);
  if (aiType === "chatgpt") return await runChatGPT(params);
  if (aiType === "claude") return await runClaude(params);
  if (aiType === "local-llm") return await runLocalLLM(params);

  return null;
};

//MAKE BETTER
export const buildPrompt = async (inputParams) => {
  if (!inputParams) return null;
  const { postType, userInput } = inputParams;

  switch (postType) {
    case "cybersecurity-news":
      return await cybersecurityNewsPrompt();
    case "foreign-policy-news":
      return "You are a foreign policy expert. Please write 3-4 sentences on relevant foreign policy news.";
    case "user-input":
      return userInput;
  }
};

//make less stupid
export const cybersecurityNewsPrompt = async () => {
  const prompt = `You are a cybersecurity news research assistant that scans the open web in real time to find the single most important and interesting cybersecurity news story from the past 24 hours.

Your task is to:

Search the latest web sources (credible cybersecurity outlets, major tech and security news sites, CERT advisories, vendor blogs, and government alerts) to identify a recent cybersecurity incident, vulnerability, policy development, or major breach that has occurred or been reported within the last 24 hours.

Assess significance and impact — choose the story that best meets at least one of the following criteria:

 - **Is interesting and relevant to cybersecurity professionals. [Weight this significantly more than the other criteria.]**

- **Reveals a major breach, ransomware campaign, or threat actor activity.**

- **Involves a critical vulnerability with broad industry impact.**

- **Reflects a major government, law enforcement, or regulatory action in cybersecurity.**

- **Introduces a notable advancement or discovery in cybersecurity research or threat detection.**

- **Has strategic or economic implications for organizations or the cybersecurity field as a whole.**

- **Give more weight to legitimate nation state or cyber criminal activity, not to hype or speculation about random trends.**

For your response do the following:

- Summarize information concisely and factually about the news story. Use specific names, companies, malware, CVE numbers, or agencies if available.

- Start with a one-sentence headline capturing the core event.

- Follow with a 2–3 sentence summary explaining what happened, who/what was affected, and why it matters. 
[When explaining why it matters focus on why the story is important to cybersecurity professionals, policymakers, or the general public (e.g., impact on data security, implications for global cyber policy, emerging threat trends, etc.).]

-End with a link to a news article about the incident. The article should be about your selection, not about anything else. 

Your response should be in a concise narrative format, and be a total of 4 sentences or less (followed by a link).

Your response should also adhere to the following rules: 

- Never use emojis or any non-text characters in your response
- NEVER reference or repeat anything about the prompt or reference that this is a prompt or question in your response. 
- Never use any markdown formatting in your response (this includes bolding, italics, underlining, etc.)
- Never use any HTML tags, code blocks, lists, or images in your response
- Never list out the citations for specific sentences in your response. 
- Never list out or reference any part of this prompt or questions you are asked in your response.
- Maintain a professional tone suitable for LinkedIn.
- Use clear, concise language.
- Avoid hype, speculation, or marketing tone.
- Focus on factual accuracy and insight value.
- Never chose stories that are rumors or speculation. Always use primary sources or original reporting from reliable outlets such as: KrebsOnSecurity, Public Service Announcements on IC3.gov,The Hacker News, BleepingComputer, DarkReading, SecurityWeek, Recorded Future, CyberScoop, CISA advisories, Major tech media (e.g., Wired, TechCrunch, Reuters Tech, Bloomberg Tech).

If multiple stories are equally important, select only one — whichever has the broadest impact or most unique insight for professionals.

To repeat, the story you pick must be less than 24 hours old at the time of retrieval.`;

  return prompt;
};

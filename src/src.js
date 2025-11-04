//build
export const runAI = async (inputParams) => {
  if (!inputParams) return null;
  const { aiType } = inputParams;

  console.log("RUN AI BACKEND INPUT PARAMS");
  console.dir(inputParams);

  //build prompt based on post type
  const prompt = await buildPrompt(inputParams);
  if (!prompt) return null;

  if (aiType === "perplexity") return await runPerplexity(prompt);
  if (aiType === "chatgpt") return await runChatGPT(prompt);
  if (aiType === "claude") return await runClaude(prompt);
  if (aiType === "local-llm") return await runLocalLLM(prompt);

  return null;
};

//MAKE BETTER
export const buildPrompt = async (inputParams) => {
  if (!inputParams) return null;
  const { postType, userInput } = inputParams;

  switch (postType) {
    case "cybersecurity-news":
      return "You are a cybersecurity expert. Please write 2 very short concise paragraphs on recent cybersecurity news.";
    case "foreign-policy-news":
      return "You are a foreign policy expert. Please write 3-4 sentences on relevant foreign policy news.";
    case "user-input":
      return userInput;
  }
};

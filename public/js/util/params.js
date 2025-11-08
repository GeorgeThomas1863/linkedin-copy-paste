export const buildMainParams = async () => {
  const params = {
    aiType: document.getElementById("ai-type-select").value,
    model: document.getElementById("model-type-select").value,
    postType: document.getElementById("post-type-select").value,
    maxTokens: document.getElementById("max-tokens-input").value || null,
    temperature: document.getElementById("temperature-input").value || null,
    systemPrompt: document.getElementById("system-prompt-input").value || null,
    userInput: document.getElementById("user-input").value || null,
  };

  return params;
};

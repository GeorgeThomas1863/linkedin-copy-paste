export const hideArray = async (inputs) => {
  for (const input of inputs) {
    if (!input) continue;
    input.classList.add("hidden");
  }
};

export const unhideArray = async (inputs) => {
  for (const input of inputs) {
    if (!input) continue;
    input.classList.remove("hidden");
  }
};

export const getHideArray = async () => {
  const selectModelListItem = document.getElementById("select-model-list-item");
  const maxTokensListItem = document.getElementById("max-tokens-list-item");
  const temperatureListItem = document.getElementById("temperature-list-item");
  const systemPromptListItem = document.getElementById("system-prompt-list-item");

  return [selectModelListItem, maxTokensListItem, temperatureListItem, systemPromptListItem];
};

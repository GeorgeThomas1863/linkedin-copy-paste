import { EXPAND_OPTIONS_SVG } from "../util/define-things.js";

export const buildInputForm = async () => {
  const inputFormWrapper = document.createElement("div");
  inputFormWrapper.id = "input-form-wrapper";

  const postTypeListItem = await buildPostTypeListItem();
  const selectAIListItem = await buildSelectAIListItem();
  const advancedOptionsListItem = await buildAdvancedOptionsListItem();
  const userInputListItem = await buildUserInputListItem();
  const buttonListItem = await buildButtonListItem();

  inputFormWrapper.append(postTypeListItem, selectAIListItem, advancedOptionsListItem, userInputListItem, buttonListItem);

  return inputFormWrapper;
};

export const buildPostTypeListItem = async () => {
  const postTypeListItem = document.createElement("li");
  postTypeListItem.id = "post-type-list-item";
  postTypeListItem.className = "form-list-item";

  const postTypeLabel = document.createElement("label");
  postTypeLabel.setAttribute("for", "post-type-select");
  postTypeLabel.textContent = "Select Post Type";
  postTypeLabel.className = "form-label";

  const postTypeSelect = document.createElement("select");
  postTypeSelect.id = "post-type-select";
  postTypeSelect.className = "form-select";
  postTypeSelect.setAttribute("data-label", "post-type-select");

  const optionArray = [
    { value: "user-input", text: "User Input", selected: true },
    { value: "cybersecurity-news", text: "Cybersecurity News [Default Prompt]" },
    { value: "foreign-policy-news", text: "Foreign Policy News [Default Prompt]" },
  ];

  for (let i = 0; i < optionArray.length; i++) {
    const optionData = optionArray[i];
    const option = document.createElement("option");
    option.value = optionData.value;
    option.textContent = optionData.text;
    if (optionData.selected) option.selected = true;

    postTypeSelect.append(option);
  }

  postTypeListItem.append(postTypeLabel, postTypeSelect);
  return postTypeListItem;
};

export const buildSelectAIListItem = async () => {
  const selectAIListItem = document.createElement("li");
  selectAIListItem.id = "select-ai-list-item";
  selectAIListItem.className = "form-list-item";

  const selectAILabel = document.createElement("label");
  selectAILabel.setAttribute("for", "ai-type-select");
  selectAILabel.textContent = "Select AI";
  selectAILabel.className = "form-label";

  const aiSelectType = document.createElement("select");
  aiSelectType.id = "ai-type-select";
  aiSelectType.className = "form-select";
  aiSelectType.setAttribute("data-label", "ai-type-select");

  const optionArray = [
    { value: "perplexity", text: "Perplexity", selected: true },
    { value: "chatgpt", text: "ChatGPT" },
    { value: "claude", text: "Claude" },
    { value: "local-llm", text: "Local LLM" },
  ];

  for (let i = 0; i < optionArray.length; i++) {
    const optionData = optionArray[i];
    const option = document.createElement("option");
    option.value = optionData.value;
    option.textContent = optionData.text;
    if (optionData.selected) option.selected = true;

    aiSelectType.append(option);
  }

  selectAIListItem.append(selectAILabel, aiSelectType);

  return selectAIListItem;
};

export const buildAdvancedOptionsListItem = async () => {
  const advancedOptionsListItem = document.createElement("li");
  advancedOptionsListItem.id = "advanced-options-list-item";
  advancedOptionsListItem.className = "form-list-item";

  // Header with toggle button
  const advancedHeader = document.createElement("div");
  advancedHeader.className = "advanced-options-header";

  const toggleButton = document.createElement("button");
  toggleButton.id = "advanced-options-toggle";
  toggleButton.className = "advanced-toggle-btn";
  toggleButton.setAttribute("aria-expanded", "false");
  toggleButton.setAttribute("aria-label", "Toggle advanced options");
  toggleButton.innerHTML = EXPAND_OPTIONS_SVG;

  const advancedLabel = document.createElement("span");
  advancedLabel.className = "advanced-options-label";
  advancedLabel.textContent = "Options";

  advancedHeader.append(toggleButton, advancedLabel); // Button first, then label

  // Collapsible content container
  const advancedContent = document.createElement("div");
  advancedContent.id = "advanced-options-content";
  advancedContent.className = "advanced-options-content";

  const selectModelListItem = await buildSelectModelListItem();
  const maxTokensListItem = await buildMaxTokensListItem();
  const temperatureListItem = await buildTemperatureListItem();
  const systemPromptListItem = await buildSystemPromptListItem();

  // Append all options to content
  advancedContent.append(selectModelListItem, maxTokensListItem, temperatureListItem, systemPromptListItem);

  advancedOptionsListItem.append(advancedHeader, advancedContent);

  return advancedOptionsListItem;
};

export const buildSelectModelListItem = async () => {
  const selectModelListItem = document.createElement("li");
  selectModelListItem.id = "select-model-list-item";
  // selectModelListItem.className = "form-list-item";
  selectModelListItem.className = "advanced-option-item";

  const selectModelLabel = document.createElement("label");
  selectModelLabel.textContent = "Model";
  selectModelLabel.className = "form-label";
  selectModelLabel.setAttribute("for", "model-type-select");

  const modelSelectType = document.createElement("select");
  modelSelectType.id = "model-type-select";
  modelSelectType.className = "form-select";
  modelSelectType.setAttribute("data-label", "model-type-select");

  //default to perplexity models, change to others with js
  const optionArray = [
    { value: "sonar-pro", text: "Sonar Pro", selected: true },
    { value: "sonar", text: "Sonar" },
    { value: "sonar-pro-deep-research", text: "Sonar Pro Deep Research" },
  ];

  for (let i = 0; i < optionArray.length; i++) {
    const optionData = optionArray[i];
    const option = document.createElement("option");
    option.value = optionData.value;
    option.textContent = optionData.text;
    if (optionData.selected) option.selected = true;

    modelSelectType.append(option);
  }

  selectModelListItem.append(selectModelLabel, modelSelectType);

  return selectModelListItem;
};

export const buildMaxTokensListItem = async () => {
  const maxTokensWrapper = document.createElement("div");
  maxTokensWrapper.className = "advanced-option-item";

  const maxTokensLabel = document.createElement("label");
  maxTokensLabel.setAttribute("for", "max-tokens-input");
  maxTokensLabel.className = "form-label";
  maxTokensLabel.textContent = "Max Tokens";

  const maxTokensInput = document.createElement("input");
  maxTokensInput.type = "number";
  maxTokensInput.id = "max-tokens-input";
  maxTokensInput.className = "form-input";
  maxTokensInput.min = "1";
  maxTokensInput.max = "4096";
  maxTokensInput.step = "1";
  maxTokensInput.value = "1000";
  maxTokensInput.placeholder = "1000";

  maxTokensWrapper.append(maxTokensLabel, maxTokensInput);

  return maxTokensWrapper;
};

export const buildTemperatureListItem = async () => {
  // Temperature option
  const temperatureWrapper = document.createElement("div");
  temperatureWrapper.className = "advanced-option-item";

  const temperatureLabel = document.createElement("label");
  temperatureLabel.setAttribute("for", "temperature-input");
  temperatureLabel.className = "form-label";
  temperatureLabel.textContent = "Temperature";

  const temperatureInput = document.createElement("input");
  temperatureInput.type = "number";
  temperatureInput.id = "temperature-input";
  temperatureInput.className = "form-input";
  temperatureInput.min = "0";
  temperatureInput.max = "2";
  temperatureInput.step = "0.1";
  temperatureInput.value = "0.7";
  temperatureInput.placeholder = "0.7";

  temperatureWrapper.append(temperatureLabel, temperatureInput);
  return temperatureWrapper;
};

export const buildSystemPromptListItem = async () => {
  // System prompt option
  const systemPromptWrapper = document.createElement("div");
  systemPromptWrapper.className = "advanced-option-item";

  const systemPromptLabel = document.createElement("label");
  systemPromptLabel.setAttribute("for", "system-prompt-input");
  systemPromptLabel.className = "form-label";
  systemPromptLabel.textContent = "System Prompt";

  const systemPromptTextarea = document.createElement("textarea");
  systemPromptTextarea.rows = 3;
  systemPromptTextarea.id = "system-prompt-input";
  systemPromptTextarea.className = "form-textarea";
  systemPromptTextarea.placeholder = "Enter custom system prompt (optional)";

  systemPromptWrapper.append(systemPromptLabel, systemPromptTextarea);
  return systemPromptWrapper;
};

export const buildUserInputListItem = async () => {
  const userInputListItem = document.createElement("li");
  userInputListItem.id = "user-input-list-item";
  userInputListItem.className = "form-list-item";

  const userInputLabel = document.createElement("label");
  userInputLabel.setAttribute("for", "user-input");
  userInputLabel.className = "form-label";
  userInputLabel.textContent = "User Input:";

  const userInput = document.createElement("textarea");
  userInput.rows = 7;
  userInput.name = "user-input";
  userInput.id = "user-input";
  userInput.className = "form-textarea";
  userInput.placeholder = "Enter your prompt here";

  userInputListItem.append(userInputLabel, userInput);

  return userInputListItem;
};

export const buildButtonListItem = async () => {
  const buttonListItem = document.createElement("li");
  buttonListItem.id = "button-list-item";

  const buttonWrapper = document.createElement("div");
  buttonWrapper.className = "button-wrapper";

  const submitButton = document.createElement("button");
  submitButton.id = "form-submit-button";
  submitButton.className = "btn-submit";
  submitButton.textContent = "SUBMIT";
  submitButton.setAttribute("data-label", "submit-button");

  buttonWrapper.append(submitButton);

  buttonListItem.append(buttonWrapper);

  return buttonListItem;
};

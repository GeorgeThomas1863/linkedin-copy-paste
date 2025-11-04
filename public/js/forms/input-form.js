export const buildInputForm = async () => {
  const inputFormWrapper = document.createElement("div");
  inputFormWrapper.id = "input-form-wrapper";

  const selectAIListItem = await buildSelectAIListItem();
  const selectModelListItem = await buildSelectModelListItem();
  const postTypeListItem = await buildPostTypeListItem();
  const userInputListItem = await buildUserInputListItem();
  const buttonListItem = await buildButtonListItem();

  inputFormWrapper.append(selectAIListItem, selectModelListItem, postTypeListItem, userInputListItem, buttonListItem);

  return inputFormWrapper;
};

export const buildSelectAIListItem = async () => {
  const selectAIListItem = document.createElement("li");
  selectAIListItem.id = "select-ai-list-item";
  selectAIListItem.className = "form-list-item";

  const selectAILabel = document.createElement("label");
  selectAILabel.setAttribute("for", "ai-select-type");
  selectAILabel.textContent = "Select AI";
  selectAILabel.className = "form-label";

  const aiSelectType = document.createElement("select");
  aiSelectType.id = "ai-select-type";
  aiSelectType.className = "form-select";

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

export const buildSelectModelListItem = async () => {
  const selectModelListItem = document.createElement("li");
  selectModelListItem.id = "select-model-list-item";
  selectModelListItem.className = "form-list-item";

  const selectModelLabel = document.createElement("label");
  selectModelLabel.setAttribute("for", "model-select-type");
  selectModelLabel.textContent = "Select Model";
  selectModelLabel.className = "form-label";

  const modelSelectType = document.createElement("select");
  modelSelectType.id = "model-select-type";
  modelSelectType.className = "form-select";

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
    { value: "cybersecurity-news", text: "Cybersecurity News", selected: true },
    { value: "foreign-policy-news", text: "Foreign Policy News" },
    { value: "user-input", text: "User Input" },
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

export const buildUserInputListItem = async () => {
  const userInputListItem = document.createElement("li");
  userInputListItem.id = "user-input-list-item";
  userInputListItem.className = "form-list-item";
  userInputListItem.classList.add("hidden");

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

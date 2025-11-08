import { buildReturnForm } from "./forms/return-form.js";
import { sendToBack } from "./util/api-front.js";
import { hideArray, unhideArray, getHideArray } from "./util/collapse.js";
import { EYE_OPEN_SVG, EYE_CLOSED_SVG, modelMap } from "./util/define-things.js";

export const runAuthSubmit = async () => {
  const authPwInput = document.getElementById("auth-pw-input");
  if (!authPwInput || !authPwInput.value) return null;

  const data = await sendToBack({ route: "/site-auth-route", pw: authPwInput.value });
  if (!data || !data.redirect) return null;

  window.location.href = data.redirect;
  return data;
};

export const runMainSubmit = async () => {
  const submitRoute = await sendToBack({ route: "/get-backend-value-route", key: "submitRoute" });
  if (!submitRoute) return null;

  const params = {
    route: submitRoute,
    aiType: document.getElementById("ai-type-select").value,
    model: document.getElementById("model-type-select").value,
    postType: document.getElementById("post-type-select").value,
    userInput: document.getElementById("user-input").value || null,
  };

  console.log("MAIN SUBMIT PARAMS");
  console.dir(params);

  const data = await sendToBack(params);
  if (!data) return null;
  console.log("RETURN DATA");
  console.dir(data);

  await buildReturnForm(data);
  return data;
};

//------------------

export const runPwToggle = async () => {
  const pwButton = document.querySelector(".password-toggle-btn");
  const pwInput = document.querySelector(".password-input");

  console.log(pwButton);
  console.log(pwInput);
  const currentSvgId = pwButton.querySelector("svg").id;

  if (currentSvgId === "eye-closed-icon") {
    pwButton.innerHTML = EYE_OPEN_SVG;
    pwInput.type = "text";
    return true;
  }

  pwButton.innerHTML = EYE_CLOSED_SVG;
  pwInput.type = "password";
  return true;
};

export const runAdvancedToggle = async () => {
  const hideListItems = await getHideArray();
  const toggleButton = document.getElementById("advanced-options-toggle");
  const advancedOptionsListItem = document.getElementById("advanced-options-list-item");
  const systemPromptListItem = document.getElementById("system-prompt-list-item");

  //expanded to collapsed
  if (toggleButton.getAttribute("aria-expanded") === "true") {
    await hideArray(hideListItems);
    toggleButton.setAttribute("aria-expanded", "false");
    toggleButton.classList.remove("expanded");
    advancedOptionsListItem.style.borderBottom = "none";
    advancedOptionsListItem.style.paddingBottom = "0";
    systemPromptListItem.style.borderBottom = "none";
    systemPromptListItem.style.paddingBottom = "0";
    return true;
  }

  //collapsed to expanded
  await unhideArray(hideListItems);
  toggleButton.setAttribute("aria-expanded", "true");
  toggleButton.classList.add("expanded");
  advancedOptionsListItem.style.borderBottom = "1px solid rgba(209, 213, 219, 0.6)";
  advancedOptionsListItem.style.paddingBottom = "2rem";
  systemPromptListItem.style.borderBottom = "1px solid rgba(209, 213, 219, 0.6)";
  systemPromptListItem.style.paddingBottom = "2rem";

  return true;
};

export const runPrettyToggle = async (clickId) => {
  if (!clickId) return null;

  const parseData = document.getElementById("parse-data");
  if (!parseData) return null;

  const makePrettyButton = document.getElementById("make-pretty-button");
  const undoPrettyButton = document.getElementById("undo-pretty-button");
  const currentFormat = parseData.innerHTML;

  if (clickId === "make-pretty-button") {
    // Make pretty
    const prettyFormat = "<pre>" + JSON.stringify(JSON.parse(currentFormat), null, 2) + "</pre>";
    parseData.innerHTML = prettyFormat;
    parseData.style.fontSize = "0.8rem";

    makePrettyButton.classList.add("hidden");
    undoPrettyButton.classList.remove("hidden");
    return true;
  }

  // Undo pretty
  if (currentFormat.substring(0, 5) !== "<pre>") return null;

  const undoPrettyFormat = currentFormat.substring(5, currentFormat.length - 6);
  parseData.innerHTML = undoPrettyFormat;
  parseData.style.fontSize = "1.2rem";

  makePrettyButton.classList.remove("hidden");
  undoPrettyButton.classList.add("hidden");
  return true;
};

export const runCopyReturnData = async () => {
  const copyPasteElement = document.getElementById("copy-paste-element");
  if (!copyPasteElement) return null;

  const copyText = copyPasteElement.innerHTML;
  if (!copyText) return null;

  await navigator.clipboard.writeText(copyText);
  console.log("COPIED TO CLIPBOARD");
  console.log(copyText);
  return true;
};

//--------------------

export const runAITypeSelect = async (changeValue) => {
  if (!changeValue) return null;
  const aiTypeSelect = document.getElementById("ai-type-select");
  const modelValue = modelMap[aiTypeSelect.value];
  console.log("MODEL VALUE");
  console.log(modelValue);
  const modelSelectType = document.getElementById("model-type-select");
  if (!modelSelectType) return null;
  modelSelectType.innerHTML = "";
  for (let i = 0; i < modelValue.length; i++) {
    const model = modelValue[i];
    const option = document.createElement("option");
    option.value = model.value;
    option.textContent = model.text;
    if (model.selected) option.selected = true;
    modelSelectType.append(option);
  }
  return true;
};

export const runPostTypeSelect = async (changeValue) => {
  if (!changeValue) return null;
  const userInputListItem = document.getElementById("user-input-list-item");
  if (!userInputListItem) return null;

  if (changeValue === "user-input") {
    if (!userInputListItem.classList.contains("hidden")) return true;
    userInputListItem.classList.remove("hidden");
    return true;
  }

  if (userInputListItem.classList.contains("hidden")) return true;
  userInputListItem.classList.add("hidden");
  return true;
};

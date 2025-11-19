import { parsePerplexityReturn, parseChatGPTReturn, parseClaudeReturn, parseLocalLLMReturn } from "../util/parse-ai.js";

const displayElement = document.getElementById("display-element");

export const buildReturnForm = async (data) => {
  if (!data || !displayElement) return null;

  //remove old data
  const currentData = document.getElementById("return-wrapper");
  if (currentData) currentData.remove();

  const returnWrapper = document.createElement("div");
  returnWrapper.id = "return-wrapper";

  const copyPasteArea = await buildCopyPasteArea(data);
  const makePrettyButtons = await buildMakePrettyButtons();
  const parseData = await buildParseData(data);

  returnWrapper.append(copyPasteArea, makePrettyButtons, parseData);

  displayElement.append(returnWrapper);
};

export const buildCopyPasteArea = async (data) => {
  if (!data) return null;

  console.log("BUILD COPY PASTE AREA DATA");
  console.dir(data);

  const copyPasteAreaWrapper = document.createElement("div");
  copyPasteAreaWrapper.id = "copy-paste-area-wrapper";

  for (const item of data) {
    if (!item) continue;
    const { aiReturnType } = item;

    const copyPasteText = await getCopyPasteText(item);
    if (!copyPasteText) continue;

    // console.log("COPY PASTE TEXT");
    // console.log(copyPasteText);

    const copyPasteElement = await buildCopyPasteElement(copyPasteText, aiReturnType);
    if (!copyPasteElement) continue;

    copyPasteAreaWrapper.append(copyPasteElement);
  }

  return copyPasteAreaWrapper;
};

export const getCopyPasteText = async (data) => {
  if (!data) return null;
  const { aiReturnType } = data;

  //for perplexity
  // if (aiReturnType === "perplexity") return data.choices[0].message.content;
  // if (aiReturnType === "chatgpt") return data.output_text;
  // if (aiReturnType === "claude") return data.content[0].text;

  if (aiReturnType === "perplexity") return await parsePerplexityReturn(data);
  if (aiReturnType === "chatgpt") return await parseChatGPTReturn(data);
  if (aiReturnType === "claude") return await parseClaudeReturn(data);
  if (aiReturnType === "local-llm") return await parseLocalLLMReturn(data);
  return null;
};

export const buildCopyPasteElement = async (copyPasteText, aiReturnType) => {
  if (!copyPasteText || !aiReturnType) return null;

  const copyPasteElementWrapper = document.createElement("div");
  copyPasteElementWrapper.className = "copy-paste-wrapper";

  const headerTextElement = document.createElement("div");
  headerTextElement.id = "header-text";
  headerTextElement.textContent = `AI Return From: ${aiReturnType}`;

  const copyPasteElement = document.createElement("div");
  copyPasteElement.contentEditable = "true";
  copyPasteElement.id = "copy-paste-element";
  copyPasteElement.textContent = copyPasteText;

  //add button to copy to clipboard
  const copyButton = document.createElement("button");
  copyButton.id = "copy-button";
  copyButton.textContent = "Copy Post";
  copyButton.className = "btn-submit";
  copyButton.setAttribute("data-label", "copy-return-data");

  copyPasteElementWrapper.append(headerTextElement, copyPasteElement, copyButton);
  return copyPasteElementWrapper;
};

export const buildMakePrettyButtons = async () => {
  const checkButton = document.getElementById("button-wrapper");
  if (checkButton) return checkButton;

  const buttonWrapper = document.createElement("div");
  buttonWrapper.id = "button-wrapper";

  const makePrettyButton = document.createElement("button");
  makePrettyButton.id = "make-pretty-button";
  makePrettyButton.textContent = "Make Pretty";
  makePrettyButton.className = "pretty-button";
  makePrettyButton.setAttribute("data-label", "make-pretty");

  const undoPrettyButton = document.createElement("button");
  undoPrettyButton.id = "undo-pretty-button";
  undoPrettyButton.textContent = "Undo Pretty";
  undoPrettyButton.className = "pretty-button";
  undoPrettyButton.setAttribute("data-label", "make-pretty");
  undoPrettyButton.classList.add("hidden");

  buttonWrapper.append(makePrettyButton, undoPrettyButton);

  return buttonWrapper;
};

export const buildParseData = async (data) => {
  if (!data) return null;

  const parseWrapper = document.createElement("div");
  parseWrapper.id = "parse-wrapper";

  let itemText = "";
  for (let i = 0; i < data.length; i++) {
    const item = data[i];
    if (!item) continue;
    if (i === 0) itemText = "[";
    itemText += JSON.stringify(item) + ",";
  }
  itemText = itemText.slice(0, -1);
  itemText += "]";

  const parseData = document.createElement("div");
  parseData.id = "parse-data";
  parseData.innerHTML = itemText;
  parseWrapper.append(parseData);

  return parseWrapper;
};

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

  const copyPasteWrapper = document.createElement("div");
  copyPasteWrapper.id = "copy-paste-wrapper";

  for (const item of data) {
    const { aiReturnType } = item;
    if (!aiReturnType) continue;

    const copyPasteText = await getCopyPasteText(aiReturnType);
    if (!copyPasteText) continue;

    const copyPasteElement = await buildCopyPasteElement(copyPasteText, aiReturnType);
    if (!copyPasteElement) continue;

    copyPasteWrapper.append(copyPasteElement);
  }

  return copyPasteWrapper;
};

export const getCopyPasteText = async (aiReturnType) => {


  //for perplexity
  if (aiReturnType === "perplexity") return data.choices[0].message.content;
  if (aiReturnType === "chatgpt") return data.output_text;
  if (aiReturnType === "claude") return data.content[0].text;

  return null;
};

export const buildCopyPasteElement = async (copyPasteText, aiReturnType) => {
  if (!copyPasteText || !aiReturnType) return null;

  const copyPasteElementWrapper = document.createElement("div");
  copyPasteElementWrapper.id = "copy-paste-element-wrapper";

  const headerTextElement = document.createElement("div");
  headerTextElement.id = "header-text";
  headerTextElement.textContent = `AI Return From: ${aiReturnType}`;

  const copyPasteElement = document.createElement("div");
  copyPasteElement.contentEditable = "true";
  copyPasteElement.id = "copy-paste-element";
  // copyPasteElement.innerHTML = copyPasteText;
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
  //check if already built
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

  for (const item of data) {
    const parseData = await getParseData(item);
    if (!parseData) continue;

    parseWrapper.append(parseData);
  }

  return parseWrapper;
};

export const getParseData = async (item) => {
  if (!item) return null;

  const parseData = document.createElement("div");
  parseData.id = "parse-data";
  parseData.innerHTML = JSON.stringify(item);
  return parseData;
};

const displayElement = document.getElementById("display-element");

export const buildReturnForm = async (data) => {
  if (!data || !displayElement) return null;

  //remove old data
  const currentData = document.getElementById("return-wrapper");
  if (currentData) currentData.remove();

  const returnWrapper = document.createElement("div");
  returnWrapper.id = "return-wrapper";

  //ADD COPY PASTE ABILITY HERE
  const copyPasteArea = await buildCopyPasteArea(data);
  const makePrettyButtons = await buildMakePrettyButtons();
  const parseData = await buildParseData(data);

  returnWrapper.append(copyPasteArea, makePrettyButtons, parseData);

  displayElement.append(returnWrapper);
};

export const buildCopyPasteArea = async (data) => {
  if (!data) return null;
  const copyPasteText = await getCopyPasteText(data);
  if (!copyPasteText) return null;

  const copyPasteWrapper = document.createElement("div");
  copyPasteWrapper.id = "copy-paste-wrapper";

  // const copyPasteElement = document.createElement("textarea");
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

  copyPasteWrapper.append(copyPasteElement, copyButton);
  return copyPasteWrapper;
};

export const getCopyPasteText = async (data) => {
  if (!data) return null;

  //for perplexity
  const text = data.choices[0].message.content;
  if (!text) return null;

  return text;

  // const formattedText = text.replaceAll("\n", "<br>");

  // return JSON.stringify(formattedText);
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

  const parseData = document.createElement("div");
  parseData.id = "parse-data";
  parseData.innerHTML = JSON.stringify(data);
  parseWrapper.append(parseData);

  return parseWrapper;
};

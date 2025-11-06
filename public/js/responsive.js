import {
  runAuthSubmit,
  runMainSubmit,
  runPwToggle,
  runAdvancedToggle,
  runPrettyToggle,
  runCopyReturnData,
  runAITypeSelect,
  runPostTypeSelect,
} from "./run.js";

const authElement = document.getElementById("auth-element");
const displayElement = document.getElementById("display-element");

export const clickHandler = async (e) => {
  e.preventDefault();

  const clickElement = e.target;
  const clickId = clickElement.id;
  const clickType = clickElement.getAttribute("data-label");

  console.log("CLICK HANDLER");
  console.log(clickId);
  console.log("CLICK TYPE");
  console.log(clickType);

  if (clickType === "auth-submit") await runAuthSubmit();
  if (clickType === "submit-button") await runMainSubmit();

  if (clickType === "pwToggle") await runPwToggle();
  if (clickType === "advancedToggle") await runAdvancedToggle();
  if (clickType === "make-pretty") await runPrettyToggle(clickId);
  if (clickType === "copy-return-data") await runCopyReturnData();
};

export const keyHandler = async (e) => {
  if (e.key !== "Enter") return null;
  e.preventDefault();

  const keyElement = e.target;
  const keyId = keyElement.id;

  console.log("KEY HANDLER");
  console.log(keyId);

  if (keyId === "auth-pw-input") await runAuthSubmit();
  //   if (keyId === "query-input") await runSearchSubmit();
  return true;
};

export const changeHandler = async (e) => {
  e.preventDefault();
  const changeElement = e.target;
  const changeValue = changeElement.value;
  const changeType = changeElement.getAttribute("data-label");

  console.log("CHANGE HANDLER");
  console.log(changeValue);

  if (changeType === "ai-type-select") await runAITypeSelect(changeValue);
  // if (changeType === "model-type-select") await runModelTypeSelect(changeValue);
  if (changeType === "post-type-select") await runPostTypeSelect(changeValue);

  return true;
};

if (authElement) {
  authElement.addEventListener("click", clickHandler);
  authElement.addEventListener("keydown", keyHandler);
}

if (displayElement) {
  displayElement.addEventListener("click", clickHandler);
  displayElement.addEventListener("keydown", keyHandler);
  displayElement.addEventListener("change", changeHandler);
}

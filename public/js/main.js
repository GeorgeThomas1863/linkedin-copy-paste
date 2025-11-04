import { buildInputForm } from "./forms/input-form.js";

const displayElement = document.getElementById("display-element");

export const buildDisplay = async () => {
  if (!displayElement) return null;

  const inputData = await buildInputForm();
  if (!inputData) return null;

  displayElement.appendChild(inputData);
  return true;
};

buildDisplay();

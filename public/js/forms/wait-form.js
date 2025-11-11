export const buildWaitForm = async () => {
  const displayElement = document.getElementById("display-element");
  if (!displayElement) return null;

  const currentData = document.getElementById("return-wrapper");
  if (currentData) currentData.remove();

  const returnWrapper = document.createElement("div");
  returnWrapper.id = "return-wrapper";

  const waitWrapper = document.createElement("div");
  waitWrapper.id = "wait-wrapper";

  const waitText = document.createElement("h4");
  waitText.id = "wait-text";
  waitText.innerHTML = "Request Submitted to AI Provider API's. Please wait for the response." + "<br>" + "[Should take less than 20-30 seconds, inshaAllah].";

  waitWrapper.append(waitText);
  returnWrapper.append(waitWrapper);

  displayElement.append(returnWrapper);
  return true;
};

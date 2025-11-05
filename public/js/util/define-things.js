export const EYE_CLOSED_SVG = `
  <svg id= "eye-closed-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-label="pwToggle">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" data-label="pwToggle"/>
    <circle cx="12" cy="12" r="3" data-label="pwToggle"/>
    <path d="M2 2l20 20" data-label="pwToggle"/>
  </svg>
`;

export const EYE_OPEN_SVG = `
  <svg id= "eye-open-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-label="pwToggle">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" data-label="pwToggle"/>
    <circle cx="12" cy="12" r="3" data-label="pwToggle"/>
  </svg>
`;

export const modelMap = {
  perplexity: [
    { value: "sonar-pro", text: "Sonar Pro" },
    { value: "sonar", text: "Sonar" },
    { value: "sonar-deep-research", text: "Sonar Deep Research" },
  ],
  chatgpt: [{ value: "gpt-5-nano", text: "GPT-5 Nano" }],
  claude: [{ value: "claude-3-5-sonnet-20240620", text: "Claude 3.5 Sonnet 20240620" }],
  "local-llm": [{ value: "local-llm", text: "Local LLM" }],
};

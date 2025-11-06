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
  chatgpt: [
    { value: "gpt-5-nano", text: "GPT-5 Nano" },
    { value: "gpt-5", text: "GPT-5" },
    { value: "gpt-5-mini", text: "GPT-5 Mini" },
    { value: "gpt-5-search-api", text: "GPT-5 Search API" },
    { value: "gpt-4.1", text: "GPT-4.1" },
  ],
  claude: [
    { value: "claude-sonnet-4-5", text: "Claude Sonnet 4.5" },
    { value: "claude-opus-4-1", text: "Claude Opus 4.1" },
    { value: "claude-haiku-4-5", text: "Claude Haiku 4.5" },
  ],
  "local-llm": [{ value: "local-llm", text: "Local LLM" }],
};

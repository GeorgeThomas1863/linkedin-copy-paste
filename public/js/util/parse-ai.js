export const parsePerplexityReturn = async (data) => {
  if (!data) return null;
  const { choices } = data;
  if (!choices) return null;
  return choices[0].message.content;
};

export const parseChatGPTReturn = async (data) => {
  if (!data) return null;
  const { status, output_text, incomplete_details } = data;
  if (status === "incomplete") return `INCOMPLETE RETURN, REASON: ${incomplete_details.reason}`;
  if (!output_text) return null;
  return output_text;
};

export const parseClaudeReturn = async (data) => {
  if (!data) return null;
  const { content } = data;
  if (!content) return null;
  return content[0].text || null;
};

export const parseLocalLLMReturn = async (data) => {
  return null;
};

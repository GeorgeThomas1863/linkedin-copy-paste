import CONFIG from "../config/config.js";

// import { runPerplexitySearch } from "../src/src.js";

export const getBackendValueControl = async (req, res) => {
  const { key } = req.body;
  if (!key) return null;

  const value = CONFIG[key];

  return res.json(value);
};

export const submitControl = async (req, res) => {
  const inputParams = req.body;

  const data = await runAI(inputParams);
  if (!data) return res.json({ success: false, message: "Failed to run AI" });

  return res.json(data);
};

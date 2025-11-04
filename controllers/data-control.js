import CONFIG from "../config/config.js";

import { runPerplexitySearch } from "../src/src.js";

export const getBackendValueControl = async (req, res) => {
  const { key } = req.body;
  if (!key) return null;

  const value = CONFIG[key];

  return res.json(value);
};

// export const searchControl = async (req, res) => {
//   const { query } = req.body;

//   const data = await runPerplexitySearch(query);
//   if (!data) return null;

//   return res.json(data);
// };

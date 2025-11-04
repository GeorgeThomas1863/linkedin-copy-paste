import CONFIG from "../config/config.js";

export const authControl = async (req, res) => {
  if (!req.body || !req.body.pw) {
    res.json({ success: false, redirect: "/401" });
    return;
  }

  if (req.body.pw !== CONFIG.pw) {
    res.json({ success: false, redirect: "/401" });
    return;
  }

  // auth pw
  req.session.authenticated = true;
  res.json({ success: true, redirect: "/" });
};

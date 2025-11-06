//STYLES ARE BETTER, BUT NEED TO BE FIXED

//UNFUCK THE PROMPTS

//FIX FRONTEND DATA RETURN DISPLAY

//BUILD LOCAL LLM 

import express from "express";
import session from "express-session";
import routes from "./routes/router.js";

import CONFIG from "./config/config.js";

const app = express();

app.use(session(CONFIG.buildSessionConfig()));

//standard public path
app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//routes
app.use(routes);

// app.listen(1801);
app.listen(CONFIG.displayPort);

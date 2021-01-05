import express from "express";
import { json } from "body-parser";
import cors from "cors";
import consola from "consola";

import Route from "./routes/index";

import { APP_PORT } from "./config/env";

const app = express();
app.use(json());
app.use(cors());

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Welcome 😃",
  });
});

Route(app);

app.use((req, res) => res.status(404).json({ error: "Route not found" }));

app.listen(APP_PORT, () => {
  consola.success(`server is listening on port ${APP_PORT}`);
});

export { app };

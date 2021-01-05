import { Express } from "express";
import user from "./user";

export default (app: Express): void => {
  app.use("/api/v1", user);
};

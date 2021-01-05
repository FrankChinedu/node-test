import { Express } from "express";
import user from "./user";
import post from "./post";
import like from "./like";

export default (app: Express): void => {
  app.use("/api/v1", user);
  app.use("/api/v1/post", post);
  app.use("/api/v1/like", like);
};

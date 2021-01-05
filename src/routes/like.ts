import express from "express";
import { Like as PostController } from "../controller/Like";
import {
  get as getAllMiddleware,
 } from "../middleware/post";
import {
  authenticate } from '../middleware/auth'

const Router = express.Router();

Router.use(authenticate);

Router.post("/:id", getAllMiddleware, PostController.like);
Router.post("/dislike/:id", getAllMiddleware, PostController.disLike);
Router.delete("/:id", getAllMiddleware, PostController.deleteLike);

export default Router;

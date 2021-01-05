import express from "express";
import { Post as PostController } from "../controller/Post";
import {
  get as getAllMiddleware
 } from "../middleware/post";
import {
  authenticate } from '../middleware/auth'

const Router = express.Router();

Router.use(authenticate);

Router.get("/", getAllMiddleware, PostController.getAllPosts);

Router.get("/:id", getAllMiddleware, PostController.getOne);

Router.delete("/:id", getAllMiddleware, PostController.delete);

export default Router;

import express from "express";
import { User as UserController } from "../controller/User";
import {
  register as validateRegisterBody,
  login as validateLoginBody,
  update as validateUpdateBody
 } from "../middleware/user";
import {
  authenticate } from '../middleware/auth'

const Router = express.Router();

Router.post("/register", validateRegisterBody, UserController.register);

Router.post("/login", validateLoginBody,  UserController.login);

Router.patch("/user", authenticate, validateUpdateBody,  UserController.update);

Router.get("/user", authenticate,  UserController.get);

export default Router;

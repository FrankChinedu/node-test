import express from "express";
import { User as UserController } from "../controller/User";
import {
  register as validateRegisterBody,
  login as validateLoginBody,
 } from "../middleware/user";

const Router = express.Router();

Router.post("/register", validateRegisterBody, UserController.register);

Router.post("/login", validateLoginBody,  UserController.login);

export default Router;

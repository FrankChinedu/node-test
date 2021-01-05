import { Response, Request } from "express";
import {IRegisterIn, IResponse } from "../Interfaces";
import { User as UserProcessor } from "../processor/user";
import {sign} from '../utils/jwt'

export const User = {
  register: async (req: Request, res: Response): Promise<Response> => {
    const body = req.body as IRegisterIn;
    const response = await UserProcessor.register(body) as IResponse;

    let token: string;
    if(response.success) {
      token = await sign(response.data)
      response.token = token;
    }
    return res.status(response.status).send(response);
  },

  login: async (req: Request, res: Response): Promise<Response> => {
    const body = req.body as IRegisterIn;
    const response = await UserProcessor.login(body) as IResponse;

    let token: string;
    if(response.success) {
      token = await sign(response.data)
      response.token = token;
    }
    return res.status(response.status).send(response);
  },
};

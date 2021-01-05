import { Response, Request } from "express";
import {UserDataType
  , IResponse, UserType } from "../Interfaces";
import { User as UserProcessor } from "../processor/user";
import {sign} from '../utils/jwt'

export const User = {
  register: async (req: Request, res: Response): Promise<Response> => {
    const body = req.body as UserDataType
    ;
    const response = await UserProcessor.register(body) as IResponse;

    let token: string;
    if(response.success) {
      token = await sign(response.data)
      response.token = token;
    }
    return res.status(response.status).send(response);
  },

  login: async (req: Request, res: Response): Promise<Response> => {
    const body = req.body as UserDataType
    ;
    const response = await UserProcessor.login(body) as IResponse;

    let token: string;
    if(response.success) {
      token = await sign(response.data)
      response.token = token;
    }
    return res.status(response.status).send(response);
  },

  update: async (req: Request, res: Response): Promise<Response> => {
    const body = req.body as UserDataType;
    const user = req.user;

    const response = await UserProcessor.update(body, user) as IResponse;

    return res.status(response.status).send(response);
  },

  get: async (req: Request, res: Response): Promise<Response> => {
    const user = req.user;

    const response = await UserProcessor.getById(user?.id as number) as IResponse;

    return res.status(response.status).send(response);
  },

  delete: async (req: Request, res: Response): Promise<Response> => {
    const user = req.user;

    const response = await UserProcessor.delete(user?.id as number) as IResponse;

    return res.status(response.status).send(response);
  },
};

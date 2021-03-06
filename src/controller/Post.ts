import { Response, Request } from "express";
import {IResponse } from "../Interfaces";
import { Post as UserProcessor } from "../processor/post";
import {sign} from '../utils/jwt'

export const Post = {
  create: async (req: Request, res: Response): Promise<Response> => {
    const user = req.user;
    const body = req.body;

    const response = await UserProcessor.create(body, user?.id as number) as IResponse;

    return res.status(response.status).send(response);
  },

  update: async (req: Request, res: Response): Promise<Response> => {
    const user = req.user;
    const body = req.body;
    const post_id = req.params.id as any;

    const response = await UserProcessor.update(body, post_id as number, user?.id as number) as IResponse;

    return res.status(response.status).send(response);
  },

  getAllPosts: async (req: Request, res: Response): Promise<Response> => {
    const user = req.user;
    let page = req.query.page ? req.query.page : 1;
    page = +page ? page : 1;
    const limit = req.query.limit ? Math.abs(+req.query.limit) : 10;

    const offset = (Math.abs(+page) - 1) * +limit;

    const response = await UserProcessor.getAllPosts(user?.id as number, limit as number, offset) as IResponse;

    return res.status(response.status).send(response);
  },

  getOne: async (req: Request, res: Response): Promise<Response> => {
    const post_id = req.params.id as any;

    const response = await UserProcessor.getOne(post_id as number) as IResponse;

    return res.status(response.status).send(response);
  },

  delete: async (req: Request, res: Response): Promise<Response> => {
    const post_id = req.params.id as any;
    const user = req.user;

    const response = await UserProcessor.delete(post_id as number, user?.id as number) as IResponse;

    return res.status(response.status).send(response);
  },
};

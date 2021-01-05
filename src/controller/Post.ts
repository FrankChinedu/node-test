import { Response, Request } from "express";
import {IResponse } from "../Interfaces";
import { Post as UserProcessor } from "../processor/post";
import {sign} from '../utils/jwt'

export const Post = {
  getAllPosts: async (req: Request, res: Response): Promise<Response> => {
    const user = req.user;
    const page = req.query.page;
    const limit = req.query.limit as any;
    const offset = 1;

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

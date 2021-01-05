import { Response, Request } from "express";
import {IResponse } from "../Interfaces";
import { Like as PostProcessor } from "../processor/like";
import {sign} from '../utils/jwt'

export const Like = {
  like: async (req: Request, res: Response): Promise<Response> => {
    const user = req.user;
    const post_id = req.params.id as any;

    const response = await PostProcessor.like(user?.id as number, post_id as number) as IResponse;

    return res.status(response.status).send(response);
  },
  disLike: async (req: Request, res: Response): Promise<Response> => {
    const user = req.user;
    const post_id = req.params.id as any;

    const response = await PostProcessor.disLike(user?.id as number, post_id as number) as IResponse;

    return res.status(response.status).send(response);
  },
  deleteLike: async (req: Request, res: Response): Promise<Response> => {
    const user = req.user;
    const body = req.body;

    const response = await PostProcessor.like(body, user?.id as number) as IResponse;

    return res.status(response.status).send(response);
  },
};

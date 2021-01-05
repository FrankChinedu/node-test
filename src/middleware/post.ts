import Joi from 'joi';
import { NextFunction, Response, Request } from 'express';

export async function get(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void | Response> {
  let query = req.query
  let params = req.params

  const data = {
    ...query,
    ...params
  }

  const schema = Joi.object()
    .keys({
      page: Joi.number(),
      limit: Joi.number(),
      id: Joi.number(),
    })

  const { error, value } = schema.validate({ ...data }, {abortEarly: false})

  if(error) {
    return res.status(400).json({success: false, error});
  }
  next()
}

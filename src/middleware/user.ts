import Joi from 'joi';
import { NextFunction, Response, Request } from 'express';

export async function register(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void | Response> {
  let body = req.body;

  const schema = Joi.object()
    .keys({
      name: Joi.string()
        .min(3)
        .required(),
      email: Joi.string()
      .email().required(),
      password: Joi.string()
      .min(6).required()
    })

  const { error, value } = schema.validate({ ...body }, {abortEarly: false})

  if(error) {
    return res.status(400).json({success: false, error});
  }
  next()
}

export async function login(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void | Response> {
  let body = req.body;

  const schema = Joi.object()
    .keys({
      email: Joi.string()
      .email().required(),
      password: Joi.string()
      .min(6).required()
    })

  const { error, value } = schema.validate({ ...body }, {abortEarly: false})

  if(error) {
    return res.status(400).json({success: false, error});
  }
  next()
}

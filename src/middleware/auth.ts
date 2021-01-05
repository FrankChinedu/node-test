import Joi from 'joi';
import { NextFunction, Response, Request } from 'express';
import { throwIfUndefined } from '../utils';
import { JWT_SECRET } from '../config/env';
import jwt from 'jsonwebtoken';

export async function validateUserToken(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void | Response> {
  let { authorization } = req.headers;

  const schema = Joi.object()
    .keys({
      authorization: Joi.string()
        .regex(/^Bearer [A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/)
        .required()
        .label('authorization [header]'),
    })
    .unknown(true);

  const { error, value } = schema.validate({ authorization })

  if(error) {
    return res.status(400).json({success: false, error});
  }

  try {
    authorization = throwIfUndefined(authorization, 'authorization');

    const [, token] = authorization.split('Bearer ');
    let decoded: { id: string };

    try {
      decoded = jwt.verify(token, JWT_SECRET) as { id: string };
    } catch (error) {
      return res.status(401).json({
        success: false,
        error: 'Invalid authorization token',
      });
    }

    // req.user = user;

    return next();
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: 'Internal Server Error' });
  }
}

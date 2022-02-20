import { Context, Next } from 'koa';
import * as passport from 'koa-passport';
import * as jwt from 'jsonwebtoken';
import UserService from '../services/users/application/service';

export const auth = async (ctx: Context, next: Next) => {
  const token = ctx.request.header.authorization;
  if (token) {
    const { id } = jwt.verify(
      token,
      process.env.SECRET as string
    ) as jwt.JwtPayload;
    const user = await UserService.retrieve(id);
    ctx.request.body.user = user.id;
    return next();
  }
};

export const authForGuest = async (ctx: Context, next: Next) => {
  const token = ctx.request.header.authorization;
  if (token) {
    const { id } = jwt.verify(
      token,
      process.env.SECRET as string
    ) as jwt.JwtPayload;
    const user = await UserService.retrieve(id);
    ctx.request.body.user = user.id;
    return next();
  } else {
    ctx.request.body.user = 3;
    return next();
  }
};

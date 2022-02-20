import { Context, Next } from 'koa';
import * as passport from 'koa-passport';

export const auth = async (ctx: Context, next: Next) => {
  passport.authenticate('jwt', { session: false }, async (err, user) => {
    ctx.request.body.user = user.id;
  })(ctx, next);
  return next();
};

export const authForGuest = (ctx: Context, next: Next) => {
  passport.authenticate('jwt', { session: false }, (err, user) => {
    if (err) {
      ctx.request.body.user = 3;
    }
    ctx.request.body.user = user.id;
  })(ctx, next);
};

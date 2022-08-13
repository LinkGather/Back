import { Spec } from 'koa-joi-router';
import * as passport from 'koa-passport';
import { generateToken } from '../../../../../lib/utils/tokenGenerator';

export default {
  path: '/api/users/kakao/callback',
  method: 'get',
  handler: async (ctx, next) => {
    return passport.authenticate(
      'kakao',
      { session: false, failureRedirect: '/' },
      (err, user) => {
        const token = generateToken(user.id);
        // ctx.redirect(`http://localhost:3000/social/token=${token}`);
        ctx.redirect(`https://linkgather.co.kr/social/token=${token}`);
      }
    )(ctx, next);
  },
} as Spec;

import { Spec } from 'koa-joi-router';
import * as passport from 'koa-passport';
import { generateToken } from '../../../../../lib/utils/tokenGenerator';

export default {
  path: '/api/users/kakao/callback',
  method: 'get',
  handler: async (ctx) => {
    passport.authenticate(
      'kakao',
      { session: false, failureRedirect: '/' },
      (err, user) => {
        const token = generateToken(user.id);
        ctx.redirect(`http://linkgather.co.kr/social/token=${token}`);
      }
    );
  },
} as Spec;

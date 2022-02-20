import { Spec } from 'koa-joi-router';
import * as passport from 'koa-passport';
import { generateToken } from '../../../../lib/utils/tokenGenerator';

export default {
  path: '/api/users/signin',
  method: 'post',
  handler: async (ctx) => {
    passport.authenticate('local', { session: false }, (err, user) => {
      if (err || !user) {
        ctx.status = 400;
        return (ctx.body = {
          data: {
            success: false,
            msg: '아이디 및 비밀번호가 일치하지 않습니다',
          },
        });
      }
      const token = generateToken(user.id);
      return (ctx.body = { data: { success: true, token } });
    });
  },
} as Spec;

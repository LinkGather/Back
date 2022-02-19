import { Spec } from 'koa-joi-router';
import * as passport from 'koa-passport';

export default {
  path: 'api/users/kakao',
  method: 'get',
  handler: passport.authenticate('kakao', { session: false }),
} as Spec;

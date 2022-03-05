import { Spec } from 'koa-joi-router';
import UserService from '../../../../services/users/application/service';

export default {
  path: '/api/users/signin',
  method: 'post',
  handler: async (ctx) => {
    const { email, password } = ctx.request.body;
    const token = await UserService.localLgoin(email, password);
    console.log(token);
    if (!token) {
      ctx.status = 400;
      return (ctx.body = {
        success: false,
        msg: '아이디 및 비밀번호가 일치하지 않습니다',
      });
    }
    return (ctx.body = {
      success: true,
      token,
    });
  },
} as Spec;

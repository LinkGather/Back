import { Spec } from 'koa-joi-router';
import { validateEmail } from '../../../../lib/utils/emailValidator';
import { validatePw, validatePwCheck } from '../../../../lib/utils/pwCheck';
import UserService from '../../../../services/users/application/service';

export default {
  path: '/api/users/signup',
  method: 'post',
  handler: async (ctx) => {
    const { email, name, password, passwordCheck } = ctx.request.body;
    if (!validateEmail(email)) {
      ctx.status = 400;
      return (ctx.body = {
        success: false,
        msg: '이메일을 확인해주세요',
      });
    }
    const exEmail = await UserService.dupCheck(email);
    if (!exEmail) {
      if (!validatePwCheck(password, passwordCheck)) {
        ctx.status = 400;
        return (ctx.body = {
          success: false,
          msg: '비밀번호 체크란을 확인해주세요',
        });
      }
      if (!validatePw(password)) {
        ctx.status = 400;
        return (ctx.body = {
          success: false,
          msg: '비밀번호를 확인해주세요',
        });
      }
      await UserService.signup(email, name, password);
      return (ctx.body = {
        success: true,
      });
    }
    ctx.status = 400;
    return (ctx.body = {
      data: {
        success: false,
        msg: '이메일이 중복됩니다.',
      },
    });
  },
} as Spec;

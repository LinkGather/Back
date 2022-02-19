import { getUserRepository } from '../../../../entity/repository/user.repository';
import { Spec } from 'koa-joi-router';
import { validateEmail } from '../../../../utils/emailValidator';
import { validatePw, validatePwCheck } from '../../../../utils/pwCheck';
import * as bcrypt from 'bcrypt';
const salt = Number(process.env.SALT);

export default {
  path: '/api/users/signup',
  method: 'post',
  handler: async (ctx) => {
    const { email, name, password, passwordCheck } = ctx.request.body;
    if (!validateEmail(email)) {
      ctx.status = 400;
      return (ctx.body = {
        data: { success: false, msg: '이메일을 확인해주세요' },
      });
    }
    const userRepository = getUserRepository();
    const exEmail = await userRepository.findOneByEmail(email);
    if (!exEmail) {
      if (!validatePwCheck(password, passwordCheck)) {
        ctx.status = 400;
        return (ctx.body = {
          data: {
            success: false,
            msg: '비밀번호 체크란을 확인해주세요',
          },
        });
      }
      if (!validatePw(password)) {
        ctx.status = 400;
        return (ctx.body = {
          data: {
            success: false,
            msg: '비밀번호를 확인해주세요',
          },
        });
      }
      const hashedPw = bcrypt.hashSync(password, salt);
      return (ctx.body = {
        data: {
          success: true,
        },
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

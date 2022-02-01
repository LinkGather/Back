import { Request, Response, NextFunction } from 'express';
import { getCustomRepository } from 'typeorm';
import { UserRepository } from '../entity/repository/user.repository';
import * as bcrypt from 'bcrypt';
import 'dotenv/config';
const salt = Number(process.env.SALT);
import * as passport from 'passport';
import { generateToken } from '../utils/tokenGenerator';
import { User } from '../entity/user.entity';
import { validateEmail } from '../utils/emailValidator';
import { validatePw, validatePwCheck } from '../utils/pwCheck';

class userController {
  public signUp = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, name, password, passwordCheck }: signup = req.body;
      if (!validateEmail(email)) {
        return res
          .status(400)
          .json({ success: false, msg: '이메일을 확인해주세요' });
      }
      const userRepository = getCustomRepository(UserRepository);
      const exEmail = await userRepository.findOneByEmail(email);
      if (!exEmail) {
        if (!validatePwCheck(password, passwordCheck)) {
          return res
            .status(400)
            .json({ success: false, msg: '비밀번호 체크란을 확인해주세요' });
        }
        if (!validatePw(password)) {
          return res
            .status(400)
            .json({ success: false, msg: '비밀번호를 확인해주세요' });
        }
        const hashedPw = bcrypt.hashSync(password, salt);
        await userRepository.save(email, name, hashedPw);
        return res.status(200).json({ success: true });
      }
      return res
        .status(400)
        .json({ success: false, msg: '이메일이 중복됩니다.' });
    } catch (err) {
      next(err);
    }
  };

  public signIn = async (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate('local', { session: false }, (err, user: User) => {
      if (err || !user) {
        return res.status(400).json({
          success: false,
          msg: '아이디 및 비밀번호가 일치하지 않습니다',
        });
      }
      req.login(user, { session: false }, (err) => {
        if (err) {
          next(err);
        }
        const token = generateToken(user.id);
        return res.status(200).json({ success: true, token });
      });
    })(req, res, next);
  };

  public kakaoLogin = passport.authenticate('kakao', { session: false });

  public kakaoLoginCallback = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    passport.authenticate(
      'kakao',
      { session: false, failureRedirect: '/' },
      (err, user: User) => {
        const token = generateToken(user.id);
        res.redirect(`http://localhost:3000/social/token=${token}`);
      }
    )(req, res, next);
  };
}

export default new userController();

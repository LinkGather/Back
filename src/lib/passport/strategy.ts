import * as passport from 'koa-passport';
import { Strategy } from 'passport-local';
import * as bcrypt from 'bcrypt';
import UserService from '../../services/users/application/service';
import * as passportJWT from 'passport-jwt';
import * as kakao from 'passport-kakao';
import 'dotenv/config';
const jwtStrategy = passportJWT.Strategy;
const KakaoStrategy = kakao.Strategy;

export const passportStrategy = () => {
  //localStrategy
  passport.use(
    new Strategy(
      {
        usernameField: 'email',
        passwordField: 'password',
        // session: true, // 세션에 저장 여부
        // passReqToCallback: false,
      },
      async (email, password, done) => {
        try {
          console.log('local strategy');
          const exUser = await UserService.dupCheck(email);
          if (exUser) {
            const validatePw = await bcrypt.compare(password, exUser.password);
            if (validatePw) {
              done(null, exUser);
            }
          }
          done(null, false, {
            message: '아이디 및 비밀번호가 일치하지 않습니다.',
          });
        } catch (error) {
          console.error(error);
          done(error);
        }
      }
    )
  );
  passport.use(
    new KakaoStrategy(
      {
        clientID: process.env.KAKAO_CLIENT_ID as string,
        clientSecret: process.env.KAKAO_CLIENT_SECRET as string,
        // callbackURL: 'http://localhost:3001/api/users/kakao/callback',
        callbackURL: 'https://linkgather.shop/api/users/kakao/callback',
      },
      async (_, __, profile, done) => {
        console.log('kakao strategy');
        const name = profile.username as string;
        const email = profile._json.kakao_account.email;
        const exUser = await UserService.dupCheck(email);
        if (exUser) {
          done(null, exUser);
        } else {
          const user = await UserService.kakaoSignup(email, name, profile);
          done(null, user);
        }
      }
    )
  );
};

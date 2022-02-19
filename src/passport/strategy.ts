import * as passport from 'koa-passport';
import { Strategy } from 'passport-local';
import * as bcrypt from 'bcrypt';
import { getUserRepository } from '../entity/repository/user.repository';
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
          const userRepository = getUserRepository();
          const exUser = await userRepository.findOneByEmail(email);
          const validatePw = await bcrypt.compare(password, exUser.password);
          if (exUser && validatePw) {
            done(null, exUser);
          } else {
            done(null, false, {
              message: '아이디 및 비밀번호가 일치하지 않습니다.',
            });
          }
        } catch (error) {
          console.error(error);
          done(error);
        }
      }
    )
  );
  //jwt Strategy
  passport.use(
    new jwtStrategy(
      {
        jwtFromRequest: passportJWT.ExtractJwt.fromHeader('authorization'),
        secretOrKey: process.env.SECRET,
      },
      async (jwtPayload, done) => {
        try {
          console.log('jwt strategy');
          console.log(jwtPayload);
          const userRepository = getUserRepository();
          const user = await userRepository.findOneById(jwtPayload.id);
          return done(null, user);
        } catch (err) {
          return done(err);
        }
      }
    )
  );
  passport.use(
    new KakaoStrategy(
      {
        clientID: process.env.KAKAO_CLIENT_ID as string,
        clientSecret: process.env.KAKAO_CLIENT_SECRET as string,
        callbackURL: 'https://linkgather.shop/users/kakao/callback',
      },
      async (_, __, profile, done) => {
        console.log('kakao strategy');
        const name = profile.username as string;
        const email = profile._json.kakao_account.email;
        const userRepository = getUserRepository();
        const exUser = await userRepository.findOneByKakao(email);
        if (exUser) {
          done(null, exUser);
        } else {
          const user = await userRepository.kakaoSave(email, name, profile.id);
          done(null, user);
        }
      }
    )
  );
};

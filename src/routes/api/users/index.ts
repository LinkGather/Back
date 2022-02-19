import { Spec } from 'koa-joi-router';
import { kakaoRoutes } from './kakao';
import { signinRoutes } from './signin';
import { signupRoutes } from './signup';

export const userRoutes: Spec[] = [
  ...kakaoRoutes,
  ...signinRoutes,
  ...signupRoutes,
];

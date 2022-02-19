import { kakaoRoutes } from './kakao';
import { signinRoutes } from './signin';
import { signupRoutes } from './signup';

export const userRoutes = [...kakaoRoutes, ...signinRoutes, ...signupRoutes];

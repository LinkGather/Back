import { Spec } from 'koa-joi-router';
import { kakaoCallbackRoutes } from './callback';
import get from './get';

export const kakaoRoutes: Spec[] = [...kakaoCallbackRoutes, get];

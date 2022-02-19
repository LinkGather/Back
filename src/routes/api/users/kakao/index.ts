import { kakaoCallbackRoutes } from './callback';
import get from './get';

export const kakaoRoutes = [...kakaoCallbackRoutes, get];

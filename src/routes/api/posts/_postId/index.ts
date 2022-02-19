import { dibRoutes } from './dib';
import { likeRoutes } from './likes';

export const postIdRoutes = [...dibRoutes, ...likeRoutes];

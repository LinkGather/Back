import { Spec } from 'koa-joi-router';
import { dibRoutes } from './dib';
import { likeRoutes } from './likes';

export const postIdRoutes: Spec[] = [...dibRoutes, ...likeRoutes];

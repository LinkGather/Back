import { Spec } from 'koa-joi-router';
import { dibRoutes } from './dib';
import { likeRoutes } from './likes';
import delSpec from './delete';
import patch from './patch';

export const postIdRoutes: Spec[] = [
  ...dibRoutes,
  ...likeRoutes,
  delSpec,
  patch,
];

import { postIdRoutes } from './_postId';
import { myPageRoutes } from './mypage';
import { previewRoutes } from './preview';
import { sortRoutes } from './sort';
import { searchRoutes } from './search';
import get from './get';
import post from './post';
import { Spec } from 'koa-joi-router';

export const postRoutes: Spec[] = [
  ...postIdRoutes,
  ...myPageRoutes,
  ...previewRoutes,
  ...sortRoutes,
  ...searchRoutes,
  get,
  post,
];

import { postIdRoutes } from './_postId';
import { myPageRoutes } from './mypage';
import { previewRoutes } from './preview';
import { sortRoutes } from './sort';
import { searchRoutes } from './search';

export const postRoutes = [
  ...postIdRoutes,
  ...myPageRoutes,
  ...previewRoutes,
  ...sortRoutes,
  ...searchRoutes,
];

import { Spec } from 'koa-joi-router';
import { getPostRepository } from '../../../../entity/repository/post.repository';

export default {
  path: '/api/posts/sort',
  method: 'get',
  handler: async (ctx) => {
    const user = 1;
    const postRepository = getPostRepository();
    const posts = postRepository.findAllSortLike(user);
    return (ctx.body = {
      data: {
        success: true,
        posts,
      },
    });
  },
} as Spec;

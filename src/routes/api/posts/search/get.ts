import { Spec } from 'koa-joi-router';
import { getPostRepository } from '../../../../entity/repository/post.repository';

export default {
  path: '/api/posts/search',
  method: 'get',
  handler: async (ctx) => {
    const words = ctx.request.query.words as string;
    const user = 1;
    const postRepository = getPostRepository();
    if (words) {
      const posts = await postRepository.search(words, user);
      return (ctx.body = {
        data: {
          success: true,
          posts,
        },
      });
    } else {
      const posts = await postRepository.randomSearch();
      return (ctx.body = {
        data: {
          success: true,
          posts,
        },
      });
    }
  },
} as Spec;

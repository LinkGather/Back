import { getPostRepository } from '../../../entity/repository/post.repository';
import { Spec } from 'koa-joi-router';

export default {
  path: '/api/posts',
  method: 'get',
  handler: async (ctx) => {
    const user = 1;
    const postRepository = getPostRepository();
    const posts = await postRepository.findAll(user);
    return (ctx.body = {
      data: {
        success: true,
        posts,
      },
    });
  },
} as Spec;

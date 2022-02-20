import { getPostRepository } from '../../../entity/repository/post.repository';
import { Spec } from 'koa-joi-router';
import PostService from '../../../services/posts/application/service';

export default {
  path: '/api/posts',
  method: 'get',
  handler: async (ctx) => {
    const user = 1;
    const posts = await PostService.getPostList(user);
    return (ctx.body = {
      data: {
        success: true,
        posts,
      },
    });
  },
} as Spec;

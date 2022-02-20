import { Spec } from 'koa-joi-router';
import PostService from '../../../../services/posts/application/service';

export default {
  path: '/api/posts/sort',
  method: 'get',
  handler: async (ctx) => {
    const user = 1;
    const posts = await PostService.sortPost(user);
    return (ctx.body = {
      data: {
        success: true,
        posts,
      },
    });
  },
} as Spec;

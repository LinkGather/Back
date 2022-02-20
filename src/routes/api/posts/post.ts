import { Spec } from 'koa-joi-router';
import PostService from '../../../services/posts/application/service';

export default {
  path: '/api/posts',
  method: 'post',
  handler: async (ctx) => {
    const { url, title, description } = ctx.request.body;
    const user = 1;
    await PostService.submitPost(url, title, description, user);
    return (ctx.body = {
      data: {
        success: true,
      },
    });
  },
} as Spec;

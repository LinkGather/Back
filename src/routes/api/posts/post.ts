import { Spec } from 'koa-joi-router';
import { auth } from '../../../middlewares/auth';
import PostService from '../../../services/posts/application/service';

export default {
  path: '/api/posts',
  method: 'post',
  pre: auth,
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

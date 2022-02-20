import { Spec } from 'koa-joi-router';
import { authForGuest } from '../../../middlewares/auth';
import PostService from '../../../services/posts/application/service';

export default {
  path: '/api/posts',
  method: 'get',
  pre: authForGuest,
  handler: async (ctx) => {
    const { user } = ctx.request.body;
    const posts = await PostService.getPostList(user);
    return (ctx.body = {
      success: true,
      posts,
    });
  },
} as Spec;

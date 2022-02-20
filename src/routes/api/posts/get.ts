import { Spec } from 'koa-joi-router';
import { auth } from '../../../middlewares/auth';
import PostService from '../../../services/posts/application/service';

export default {
  path: '/api/posts',
  method: 'get',
  pre: auth,
  handler: async (ctx) => {
    const { user } = ctx.request.body;
    console.log(user);
    const posts = await PostService.getPostList(user);
    return (ctx.body = {
      data: {
        success: true,
        posts,
      },
    });
  },
} as Spec;

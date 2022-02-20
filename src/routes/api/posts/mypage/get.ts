import { Spec } from 'koa-joi-router';
import { auth } from '../../../../middlewares/auth';
import PostService from '../../../../services/posts/application/service';

export default {
  path: '/api/posts/mypage',
  method: 'get',
  pre: auth,
  handler: async (ctx) => {
    const { user } = ctx.request.body;
    const posts = await PostService.myPage(user);
    return (ctx.body = {
      success: true,
      posts,
    });
  },
} as Spec;

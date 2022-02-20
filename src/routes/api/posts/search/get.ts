import { Spec } from 'koa-joi-router';
import { authForGuest } from '../../../../middlewares/auth';
import PostService from '../../../../services/posts/application/service';

export default {
  path: '/api/posts/search',
  method: 'get',
  pre: authForGuest,
  handler: async (ctx) => {
    const words = ctx.request.query.words as string;
    const { user } = ctx.request.body;
    if (words) {
      const posts = await PostService.search(words, user);
      return (ctx.body = {
        success: true,
        posts,
      });
    } else {
      const posts = await PostService.randomSearch();
      return (ctx.body = {
        success: true,
        posts,
      });
    }
  },
} as Spec;

import { Spec } from 'koa-joi-router';
import { auth } from '../../../../middlewares/auth';
import PostService from '../../../../services/posts/application/service';

export default {
  path: '/api/posts/preview',
  method: 'get',
  pre: auth,
  handler: async (ctx) => {
    const { url } = ctx.request.body;
    const image = await PostService.preview(url);
    return (ctx.body = {
      success: true,
      image,
    });
  },
} as Spec;

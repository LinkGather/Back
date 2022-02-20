import { Spec } from 'koa-joi-router';
import PostService from '../../../../services/posts/application/service';

export default {
  path: '/api/posts/preview',
  method: 'get',
  handler: async (ctx) => {
    const { url } = ctx.request.body;
    const image = await PostService.preview(url);
    return (ctx.body = {
      data: {
        success: true,
        image,
      },
    });
  },
} as Spec;

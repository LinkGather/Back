import { Spec } from 'koa-joi-router';
import { auth } from '../../../../middlewares/auth';
import PostService from '../../../../services/posts/application/service';

export default {
  path: '/api/posts/:postId',
  method: 'delete',
  pre: auth,
  handler: async (ctx) => {
    const { postId } = ctx.params;
    const { user } = ctx.request.body;
    const isDeleted = await PostService.delete(user, Number(postId));
    if (isDeleted) {
      ctx.body = { success: true };
    } else {
      ctx.status = 400;
      ctx.body = { success: false, msg: '작성자가 아닙니다.' };
    }
  },
} as Spec;

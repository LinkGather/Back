import { Spec } from 'koa-joi-router';
import { auth } from '../../../../../middlewares/auth';
import PostService from '../../../../../services/posts/application/service';

export default {
  path: '/api/posts/:postId/dib',
  method: 'post',
  pre: auth,
  handler: async (ctx) => {
    const { postId } = ctx.params;
    const user: number = 1;
    const dibExist = await PostService.isDib(user, Number(postId));
    if (dibExist) {
      const dibId = dibExist.id;
      await PostService.cancelDib(dibId);
      return (ctx.body = {
        data: { success: true, msg: '찜하기 취소' },
      });
    } else {
      await PostService.dib(user, postId);
      return (ctx.body = {
        data: { success: true, msg: '찜하기 성공' },
      });
    }
  },
} as Spec;

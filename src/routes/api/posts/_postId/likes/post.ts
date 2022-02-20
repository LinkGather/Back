import { Spec } from 'koa-joi-router';
import PostService from '../../../../../services/posts/application/service';

export default {
  path: '/api/posts/:postId/likes',
  method: 'post',
  handler: async (ctx) => {
    const { postId } = ctx.params;
    const user = 1;
    const likeExist = await PostService.isLike(user, Number(postId));
    if (likeExist) {
      const likeId = likeExist.id;
      const likeNum = await PostService.cancelLike(likeId, Number(postId));
      return (ctx.body = {
        data: {
          success: true,
          msg: '좋아요 취소',
          likeNum,
        },
      });
    } else {
      const likeNum = await PostService.like(user, Number(postId));
      return (ctx.body = {
        data: {
          success: true,
          msg: '좋아요 성공',
          likeNum,
        },
      });
    }
  },
} as Spec;

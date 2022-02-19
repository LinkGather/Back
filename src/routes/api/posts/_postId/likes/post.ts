import { Spec } from 'koa-joi-router';
import { getLikeRepository } from '../../../../../entity/repository/like.repository';
import { getPostRepository } from '../../../../../entity/repository/post.repository';

export default {
  path: '/api/posts/:postId/likes',
  method: 'post',
  handler: async (ctx) => {
    const { postId } = ctx.params;
    const user = 1;
    const likeRepository = getLikeRepository();
    const postRepository = getPostRepository();
    const likeExist = await likeRepository.findByUserAndPostId(
      user,
      Number(postId)
    );
    if (likeExist) {
      const likeId = likeExist.id;
      await likeRepository.deleteOne(likeId);
      const likeNum = await likeRepository.countNum(Number(postId));
      await postRepository.updateLikeNum(Number(postId), likeNum);
      return (ctx.body = {
        data: {
          success: true,
          msg: '좋아요 취소',
          likeNum,
        },
      });
    } else {
      await likeRepository.save(user, Number(postId));
      const likeNum = await likeRepository.countNum(Number(postId));
      await postRepository.updateLikeNum(Number(postId), likeNum);
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

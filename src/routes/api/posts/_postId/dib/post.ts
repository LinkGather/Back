import { Spec } from 'koa-joi-router';
import { getDibRepository } from '../../../../../entity/repository/dib.repository';

export default {
  path: 'api/posts/:postId/dib',
  method: 'post',
  handler: async (ctx) => {
    const { postId } = ctx.params;
    const user: number = 1;
    const dibRepository = getDibRepository();
    const dibExist = await dibRepository.findByUserAndPostId(
      user,
      Number(postId)
    );
    if (dibExist) {
      const dibId = dibExist.id;
      await dibRepository.deleteOne(dibId);
      return (ctx.body = {
        data: { success: true, msg: '찜하기 취소' },
      });
    } else {
      await dibRepository.save(user, Number(postId));
      return (ctx.body = {
        data: { success: true, msg: '찜하기 성공' },
      });
    }
  },
} as Spec;

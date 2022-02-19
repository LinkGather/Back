import { Spec } from 'koa-joi-router';
import { getPostRepository } from '../../../../entity/repository/post.repository';

export default {
  path: 'api/posts/mypage',
  method: 'get',
  handler: async (ctx) => {
    const user = 1;
    const postRepository = getPostRepository();
    const posts = await postRepository.findMyPost(user);
    return (ctx.body = {
      data: {
        success: true,
        posts,
      },
    });
  },
} as Spec;

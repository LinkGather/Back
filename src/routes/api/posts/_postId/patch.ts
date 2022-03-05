import { Spec } from 'koa-joi-router';
import { auth } from '../../../../middlewares/auth';
import PostService from '../../../../services/posts/application/service';

export default {
  path: '/api/posts/:postId',
  method: 'patch',
  pre: auth,
  handler: async (ctx) => {
    const { postId } = ctx.params;
    const { url, title, description, user } = ctx.request.body;
    const newPost = await PostService.update(
      user,
      Number(postId),
      url,
      title,
      description
    );
    if (newPost) {
      ctx.body = {
        success: true,
        newPost,
      };
    } else {
      ctx.status = 400;
      ctx.body = {
        success: false,
        msg: '작성자가 아닙니다.',
      };
    }
  },
} as Spec;

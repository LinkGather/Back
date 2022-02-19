import { Spec } from 'koa-joi-router';
import { crawling } from '../../../../utils/crawling';

export default {
  path: '/api/posts/preview',
  method: 'get',
  handler: async (ctx) => {
    const { url } = ctx.request.body;
    let image = await crawling(url);
    if (!image) {
      image =
        'https://user-images.githubusercontent.com/86486778/148679216-0d895bca-7499-4c67-9a80-93e295d7650c.png';
    }
    return (ctx.body = {
      data: {
        success: true,
        image,
      },
    });
  },
} as Spec;

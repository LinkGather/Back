import { getPostRepository } from '../../../entity/repository/post.repository';
import { Spec } from 'koa-joi-router';
import * as moment from 'moment';
import { crawling } from '../../../utils/crawling';

export default {
  path: '/api/posts',
  method: 'post',
  handler: async (ctx) => {
    const { url, title, description } = ctx.request.body;
    const user = 1;
    const postRepository = getPostRepository();
    let image = await crawling(url);
    if (!image) {
      image =
        'https://user-images.githubusercontent.com/86486778/148642786-552a0da0-06e2-4a19-bf5c-17a28e184ded.png';
    }
    const uploadTime = moment().format('YYYY-MM-DD');
    await postRepository.save(url, title, description, user, image, uploadTime);
    return (ctx.body = {
      data: {
        success: true,
      },
    });
  },
} as Spec;

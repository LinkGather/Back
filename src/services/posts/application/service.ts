import * as moment from 'moment';
import { crawling } from '../../../utils/crawling';
import {
  getPostRepository,
  PostRepository,
} from '../infrastructure/repository';

class PostService {
  // 리스트 전체조회
  public getPostList = async (user: number) => {
    const postRepository = getPostRepository();
    return await postRepository.findAll(user);
  };

  // 등록
  public submitPost = async (
    url: string,
    title: string,
    description: string,
    user: number
  ) => {
    const postRepository = getPostRepository();
    let image = await crawling(url);
    if (!image) {
      image =
        'https://user-images.githubusercontent.com/86486778/148642786-552a0da0-06e2-4a19-bf5c-17a28e184ded.png';
    }
    const uploadTime = moment().format('YYYY-MM-DD');
    return await postRepository.save(
      url,
      title,
      description,
      user,
      image,
      uploadTime
    );
  };

  // 정렬
  public sortPost = async (user: number) => {
    const postRepository = getPostRepository();
    return await postRepository.findAllSortLike(user);
  };

  // 검색
  public search = async (words: string, user: number) => {
    const postRepository = getPostRepository();
    return await postRepository.search(words, user);
  };
  public randomSearch = async () => {
    const postRepository = getPostRepository();
    return await postRepository.randomSearch();
  };

  // 미리보기
  public preview = async (url: string) => {
    let image = await crawling(url);
    return (
      image ||
      'https://user-images.githubusercontent.com/86486778/148679216-0d895bca-7499-4c67-9a80-93e295d7650c.png'
    );
  };

  //마이페이지
  public myPage = async (user: number) => {
    const postRepository = getPostRepository();
    return await postRepository.findMyPost(user);
  };
}

export default new PostService();

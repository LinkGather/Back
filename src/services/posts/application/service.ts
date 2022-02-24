import * as moment from 'moment';
import { crawling } from '../../../lib/utils/crawling';
import { Post } from '../domain/model';
import {
  getDibRepository,
  getLikeRepository,
  getPostRepository,
} from '../infrastructure/repository';

class PostService {
  // 리스트 전체조회
  public getPostList = async (user: number) => {
    const postRepository = getPostRepository();
    return await postRepository.find(user);
  };

  // 등록
  public submitPost = async (
    url: string,
    title: string,
    description: string,
    userId: number
  ) => {
    const postRepository = getPostRepository();
    let image = await crawling(url);
    if (!image) {
      image =
        'https://user-images.githubusercontent.com/86486778/148642786-552a0da0-06e2-4a19-bf5c-17a28e184ded.png';
    }
    const post = new Post({ title, description, image, url, userId });
    return await postRepository.save(post);
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

  //좋아요
  public isLike = async (user: number, postId: number) => {
    const likeRepository = getLikeRepository();
    return await likeRepository.findByUserAndPostId(user, postId);
  };

  public cancelLike = async (likeId: number, postId: number) => {
    const likeRepository = getLikeRepository();
    const postRepository = getPostRepository();
    await likeRepository.deleteOne(likeId);
    const likeNum = await likeRepository.countNum(postId);
    const post = await postRepository.findById(postId);
    post.update({ likeNum });
    await postRepository.save(post);
    return likeNum;
  };

  public like = async (user: number, postId: number) => {
    const postRepository = getPostRepository();
    const likeRepository = getLikeRepository();
    await postRepository.like(user, postId);
    const likeNum = await likeRepository.countNum(postId);
    const post = await postRepository.findById(postId);
    post.update({ likeNum });
    await postRepository.save(post);
    return likeNum;
  };

  //찜
  public isDib = async (user: number, postId: number) => {
    const dibRepository = getDibRepository();
    return await dibRepository.findByUserAndPostId(user, postId);
  };

  public cancelDib = async (dibId: number) => {
    const dibRepository = getDibRepository();
    await dibRepository.deleteOne(dibId);
  };

  public dib = async (user: number, postId: number) => {
    const postRepository = getPostRepository();
    await postRepository.dib(user, postId);
  };

  public delete = async (user: number, postId: number) => {
    const postRepository = getPostRepository();
    const post = await postRepository.findByUserAndId(user, postId);
    if (post) {
      await postRepository.deleteOne(postId);
      return true;
    } else {
      return false;
    }
  };
  public update = async (
    user: number,
    postId: number,
    url: string,
    title: string,
    description: string
  ) => {
    const postRepository = getPostRepository();
    const post = await postRepository.findByUserAndId(user, postId);
    if (post) {
      let image = await crawling(url);
      if (!image) {
        image =
          'https://user-images.githubusercontent.com/86486778/148679216-0d895bca-7499-4c67-9a80-93e295d7650c.png';
      }
      post.update({ url, title, description, image });
      return await postRepository.save(post);
    } else {
      return false;
    }
  };
}

export default new PostService();

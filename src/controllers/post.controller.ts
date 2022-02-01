import { Request, Response, NextFunction } from 'express';
import * as moment from 'moment';
import { getCustomRepository, getRepository } from 'typeorm';
import { PostRepository } from '../entity/repository/post.repository';
import { LikeRepository } from '../entity/repository/like.repository';
import { DibRepository } from '../entity/repository/dib.repository';
import { crawling } from '../utils/crawling';

class postController {
  //게시글 뷰
  public getPost = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = res.locals.user;
      const postRepository = getCustomRepository(PostRepository);
      const posts = await postRepository.findAll(user);
      return res.status(200).json({ success: true, posts });
    } catch (err) {
      next(err);
    }
  };

  //추천순 정렬
  public getPostSorted = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const user = res.locals.user;
      const postRepository = getCustomRepository(PostRepository);
      const posts = await postRepository.findAllSortLike(user);
      return res.status(200).json({ succes: true, posts });
    } catch (err) {
      next(err);
    }
  };

  //마이페이지 뷰
  public getMyPost = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const user: number = res.locals.user;
      const postRepository = getCustomRepository(PostRepository);
      const posts = await postRepository.findMyPost(user);
      return res.status(200).json({ success: true, posts });
    } catch (err) {
      next(err);
    }
  };

  //게시글 작성
  public createPost = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { url, title, description }: postInput = req.body;
      const user: number = res.locals.user;
      const postRepository = getCustomRepository(PostRepository);
      let image = await crawling(url);
      if (!image) {
        image =
          'https://user-images.githubusercontent.com/86486778/148642786-552a0da0-06e2-4a19-bf5c-17a28e184ded.png';
      }
      const uploadTime = moment().format('YYYY-MM-DD');
      await postRepository.save(
        url,
        title,
        description,
        user,
        image,
        uploadTime
      );
      return res.status(200).json({ success: true });
    } catch (err) {
      next(err);
    }
  };

  //게시글 수정
  public editPost = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const { url, title, description } = req.body;
      const user: number = res.locals.user;
      const postRepository = getCustomRepository(PostRepository);
      const post = await postRepository.findByUserAndId(user, Number(id));
      if (post) {
        let image = await crawling(url);
        if (!image) {
          image =
            'https://user-images.githubusercontent.com/86486778/148679216-0d895bca-7499-4c67-9a80-93e295d7650c.png';
        }
        const newPost = await postRepository.updateOne(
          url,
          title,
          description,
          image,
          Number(id)
        );
        return res.status(200).json({ success: true, newPost });
      }
      return res
        .status(400)
        .json({ success: false, msg: '작성자가 아닙니다.' });
    } catch (err) {
      next(err);
    }
  };

  //게시글 삭제
  public deletePost = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { id } = req.params;
      const user: number = res.locals.user;
      const postRepository = getCustomRepository(PostRepository);
      const post = await postRepository.findByUserAndId(user, Number(id));
      if (post) {
        await postRepository.deleteOne(Number(id));
        return res.status(200).json({ success: true });
      }
      return res
        .status(400)
        .json({ success: false, msg: '작성자가 아닙니다.' });
    } catch (err) {
      next(err);
    }
  };

  //preview 이미지
  public previewImage = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { url } = req.body;
      let image = await crawling(url);
      if (!image) {
        image =
          'https://user-images.githubusercontent.com/86486778/148679216-0d895bca-7499-4c67-9a80-93e295d7650c.png';
      }
      return res.status(200).json({ success: true, image });
    } catch (err) {
      next(err);
    }
  };

  //좋아요
  public like = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const user: number = res.locals.user;
      const likeRepository = getCustomRepository(LikeRepository);
      const postRepository = getCustomRepository(PostRepository);
      const likeExist = await likeRepository.findByUserAndPostId(
        user,
        Number(id)
      );
      if (likeExist) {
        const likeId = likeExist.id;
        await likeRepository.deleteOne(likeId);
        const likeNum = await likeRepository.countNum(Number(id));
        await postRepository.updateLikeNum(Number(id), likeNum);
        return res
          .status(200)
          .json({ success: true, msg: '좋아요 취소', likeNum });
      } else {
        await likeRepository.save(user, Number(id));
        const likeNum = await likeRepository.countNum(Number(id));
        await postRepository.updateLikeNum(Number(id), likeNum);
        return res
          .status(200)
          .json({ success: true, msg: '좋아요 성공', likeNum });
      }
    } catch (err) {
      next(err);
    }
  };

  //찜하기
  public dib = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const user: number = res.locals.user;
      const dibRepository = getCustomRepository(DibRepository);
      const dibExist = await dibRepository.findByUserAndPostId(
        user,
        Number(id)
      );
      if (dibExist) {
        const dibId = dibExist.id;
        await dibRepository.deleteOne(dibId);
        return res.status(200).json({ success: true, msg: '찜하기 취소' });
      } else {
        await dibRepository.save(user, Number(id));
        return res.status(200).json({ success: true, msg: '찜하기 성공' });
      }
    } catch (err) {
      next(err);
    }
  };

  //검색
  public search = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const words = req.query.words as string;
      const user: number = res.locals.user;
      const postRepository = getCustomRepository(PostRepository);
      if (words) {
        const posts = await postRepository.search(words, user);
        return res.status(200).json({ success: true, posts });
      } else {
        const posts = await postRepository.randomSearch();
        return res.status(200).json({ success: true, posts });
      }
    } catch (err) {
      next(err);
    }
  };
}

export default new postController();

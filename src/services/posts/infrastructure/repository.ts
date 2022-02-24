import {
  EntityRepository,
  AbstractRepository,
  getCustomRepository,
} from 'typeorm';
import { Like, Post, Dib } from '../domain/model';

@EntityRepository(Post)
class PostRepository extends AbstractRepository<Post> {
  //생성
  save(post: Post) {
    return this.manager.save([post]);
  }

  //찾기
  findByUserAndId(userId: number, id: number) {
    return this.repository.findOne({ userId, id });
  }
  findById(id: number) {
    return this.repository.findOneOrFail({ id });
  }
  find(user: number) {
    return this.repository
      .createQueryBuilder('posts')
      .leftJoinAndSelect('posts.dibs', 'dibs', 'dibs.userId=:user', { user })
      .leftJoinAndSelect('posts.likes', 'likes', 'likes.userId=:user', { user })
      .orderBy('posts.id', 'DESC')
      .getMany();
  }
  findMyPost(user: number) {
    return this.repository.find({
      where: { user },
      relations: ['dibs', 'likes'],
      order: { id: 'DESC' },
    });
  }
  findAllSortLike(user: number) {
    return this.repository
      .createQueryBuilder('posts')
      .leftJoinAndSelect('posts.dibs', 'dibs', 'dibs.userId=:user', { user })
      .leftJoinAndSelect('posts.likes', 'likes', 'likes.userId=:user', { user })
      .orderBy('posts.likeNum', 'DESC')
      .addOrderBy('posts.id', 'DESC')
      .getMany();
  }

  //검색
  search(words: string, user: number) {
    return this.repository
      .createQueryBuilder('posts')
      .select()
      .where(`MATCH(title) AGAINST ('*${words}*' IN BOOLEAN MODE) `)
      .orWhere(`MATCH(description) AGAINST ('*${words}*' IN BOOLEAN MODE) `)
      .leftJoinAndSelect('posts.dibs', 'dibs', 'dibs.userId=:user', { user })
      .leftJoinAndSelect('posts.likes', 'likes', 'likes.userId=:user', { user })
      .orderBy('posts.id', 'DESC')
      .getMany();
  }

  randomSearch() {
    return this.repository
      .createQueryBuilder()
      .orderBy('RAND()')
      .limit(1)
      .getMany();
  }

  //삭제
  deleteOne(id: number) {
    return this.repository.delete({ id });
  }

  //좋아요
  async like(user: number, id: number) {
    const post = await this.findById(id);
    post.addLikes(user);
    return this.manager.save(post);
  }

  //찜하기
  async dib(user: number, id: number) {
    const post = await this.findById(id);
    post.addDibs(user);
    return this.manager.save(post);
  }
}

export const getPostRepository = () => {
  return getCustomRepository(PostRepository);
};

@EntityRepository(Like)
class LikeRepository extends AbstractRepository<Like> {
  findByUserAndPostId(user: number, post: number) {
    return this.repository.findOne({ user, post });
  }

  deleteOne(id: number) {
    return this.repository.delete({ id });
  }

  countNum(post: number) {
    return this.repository.count({ post });
  }
}

export const getLikeRepository = () => {
  return getCustomRepository(LikeRepository);
};

@EntityRepository(Dib)
class DibRepository extends AbstractRepository<Dib> {
  findByUserAndPostId(user: number, post: number) {
    return this.repository.findOne({ user, post });
  }

  deleteOne(id: number) {
    return this.repository.delete({ id });
  }
}

export const getDibRepository = () => {
  return getCustomRepository(DibRepository);
};

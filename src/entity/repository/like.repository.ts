import { EntityRepository, AbstractRepository } from 'typeorm';
import { Like } from '../like.entity';

@EntityRepository(Like)
export class LikeRepository extends AbstractRepository<Like> {
  save(user: number, post: number) {
    const like = new Like();
    like.user = user;
    like.post = post;
    return this.manager.save(like);
  }

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

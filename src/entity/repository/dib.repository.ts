import { EntityRepository, AbstractRepository } from 'typeorm';
import { Dib } from '../dib.entity';

@EntityRepository(Dib)
export class DibRepository extends AbstractRepository<Dib> {
  save(user: number, post: number) {
    const dib = new Dib();
    dib.user = user;
    dib.post = post;
    return this.manager.save(dib);
  }

  findByUserAndPostId(user: number, post: number) {
    return this.repository.findOne({ user, post });
  }

  deleteOne(id: number) {
    return this.repository.delete({ id });
  }
}

import {
  EntityRepository,
  AbstractRepository,
  getCustomRepository,
} from 'typeorm';
import { User } from '../domain/model';

@EntityRepository(User)
class UserRepository extends AbstractRepository<User> {
  save(email: string, name: string, password: string) {
    const user = new User();
    user.email = email;
    user.name = name;
    user.password = password;
    return this.manager.save(user);
  }

  kakaoSave(email: string, name: string, password: string) {
    const user = new User();
    user.email = email;
    user.name = name;
    user.password = password;
    user.provider = 'kakao';
    return this.manager.save(user);
  }

  findOneByEmail(email: string) {
    return this.repository.findOneOrFail({ email });
  }
  findOneById(id: number) {
    return this.repository.findOneOrFail({ id });
  }
  findOneByKakao(email: string) {
    return this.repository.findOneOrFail({ email, provider: 'kakao' });
  }
}

export const getUserRepository = () => {
  return getCustomRepository(UserRepository);
};

import { getUserRepository } from '../infarastructure/repository';
import * as bcrypt from 'bcrypt';
const salt = Number(process.env.SALT);
import * as kakao from 'passport-kakao';

class UserService {
  public dupCheck = async (email: string) => {
    const userRepository = getUserRepository();
    return await userRepository.findOneByEmail(email);
  };
  public signup = async (email: string, name: string, password: string) => {
    const userRepository = getUserRepository();
    const hashedPw = bcrypt.hashSync(password, salt);
    return await userRepository.save(email, name, hashedPw);
  };
  public retrieve = async (id: number) => {
    const userRepository = getUserRepository();
    return userRepository.findOneById(id);
  };
  public kakaoSignup = async (
    email: string,
    name: string,
    profile: kakao.Profile
  ) => {
    const userRepository = getUserRepository();
    return await userRepository.kakaoSave(email, name, profile.id);
  };
}

export default new UserService();

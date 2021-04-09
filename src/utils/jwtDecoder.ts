import jwtDecode from 'jwt-decode';
import { getCustomRepository } from 'typeorm';
import { UsersRepository } from '../repository/userRepository';

interface LoginUser {
  email: string;
  password: string;
}

export class JWTDecoder {
  static async getUserByToken(token: string) {
    const userRepository = getCustomRepository(UsersRepository);
    const loginUser = jwtDecode<LoginUser>(token);
    const user = await userRepository.findOne({ email: loginUser.email });
    return user;
  }
}

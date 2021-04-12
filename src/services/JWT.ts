import * as dotenv from 'dotenv';
import * as jwt from 'jsonwebtoken';
import { Encrypter } from '../utils/bcrypter';
import { UserController } from '../controllers/userController';

dotenv.config();

const userController = new UserController();

export class JWTService {
  async createToken(email: string, password: string) {
    const user = await userController.findByEmail(email);
    const validate = await Encrypter.compare(password, user.password);
    if (!validate) {
      return null;
    }
    const token = jwt.sign({ email, password }, process.env.AUTH_SECRET, {
      expiresIn: '1d',
    });
    return token;
  }
}

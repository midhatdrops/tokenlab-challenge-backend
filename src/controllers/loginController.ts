import * as yup from 'yup';
import { Request, Response } from 'express';
import { JWTService } from '../services/JWT';

const jwtService = new JWTService();

export class LoginController {
  async login(req: Request, res: Response) {
    const schema = yup.object().shape({
      email: yup.string().email().required(),
      password: yup.string().required().min(5),
    });
    try {
      await schema.validate(req.body);
    } catch (err) {
      return res.status(404).json({ error: err.errors });
    }
    const { email, password } = req.body;
    const token = await jwtService.createToken(email, password);
    if (!token)
      return res.status(403).json({ message: 'Email/Password incorrect' });
    return res.status(200).json(token);
  }
}

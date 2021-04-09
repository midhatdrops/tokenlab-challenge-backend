import { Request, Response } from 'express';
import { JWTService } from '../services/JWT';

const jwtService = new JWTService();

export class LoginController {
  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const token = await jwtService.createToken(email, password);
    if (!token)
      return res.status(500).json({ message: 'Email/Password incorrect' });
    return res.status(200).json(token);
  }
}

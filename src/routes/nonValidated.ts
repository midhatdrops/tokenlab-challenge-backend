import { Router, Request, Response } from 'express';
import { LoginController } from '../controllers/loginController';

const loginController = new LoginController();

const routes = Router();

routes.post('/api/login', (req: Request, res: Response) =>
  loginController.login(req, res)
);

export default routes;

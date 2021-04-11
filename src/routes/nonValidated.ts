import { Router, Request, Response } from 'express';
import { LoginController } from '../controllers/loginController';
import { UserController } from '../controllers/userController';

const loginController = new LoginController();
const userController = new UserController();

const routes = Router();

routes.post('/api/login', (req: Request, res: Response) =>
  loginController.login(req, res)
);

routes.get('/api/users/', (req: Request, res: Response) =>
  userController.findAll(req, res)
);
routes.post('/api/users', (req: Request, res: Response) =>
  userController.create(req, res)
);

export default routes;

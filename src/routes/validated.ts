import { Router, Request, Response } from 'express';
import { EventController } from '../controllers/eventController';
import { UserController } from '../controllers/userController';

const eventController = new EventController();
const userController = new UserController();

const routes = Router();

routes.get('/api/events', (req: Request, res: Response) =>
  eventController.findAll(res)
);
routes.get('/api/events/:id', (req: Request, res: Response) =>
  eventController.findOne(req, res)
);
routes.post('/api/events', (req: Request, res: Response) =>
  eventController.create(req, res)
);
routes.put('/api/events/:id', (req: Request, res: Response) =>
  eventController.update(req, res)
);
routes.delete('/api/events/:id', (req: Request, res: Response) =>
  eventController.delete(req, res)
);

// users Routes

routes.get('/api/users/', (req: Request, res: Response) =>
  userController.findAll(req, res)
);
routes.post('/api/users', (req: Request, res: Response) =>
  userController.create(req, res)
);

export default routes;

import { Router, Request, Response } from 'express';
import { EventController } from '../controllers/eventController';

const eventController = new EventController();

const routes = Router();

routes.get('/api/events', (req: Request, res: Response) =>
  eventController.findAll(res)
);

routes.get('/api/events/user/:month', (req: Request, res: Response) =>
  eventController.findByUser(req, res)
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

export default routes;

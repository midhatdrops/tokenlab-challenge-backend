import { Router, Request, Response } from 'express';

const routes = Router();

routes.get('/', (req: Request, res: Response) =>
  res.status(200).json({ message: 'Hello World' })
);

export default routes;

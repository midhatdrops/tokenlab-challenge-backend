import 'reflect-metadata';
import * as express from 'express';
import * as cors from 'cors';
import ValidatedRoutes from './routes/validated';
import nonAuthRoutes from './routes/nonValidated';
import createConnection from './database/index';
import { jwtValidate } from './middlewares/jwtValidate';

createConnection();

const app = express();

app.use(express.json());
app.use(cors());
app.use(nonAuthRoutes);
app.use(jwtValidate);
app.use(ValidatedRoutes);

export { app };

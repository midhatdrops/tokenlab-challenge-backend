import 'reflect-metadata';
import * as express from 'express';
import Routes from './routes/index';
import createConnection from './database/index';

const app = express();

createConnection();

app.use(express.json());
app.use(Routes);

export { app };

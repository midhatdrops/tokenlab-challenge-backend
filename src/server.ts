import * as express from 'express';
import Routes from './routes/index';

const app = express();

app.use(express.json());
app.use(Routes);

const port = 3000;

app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});

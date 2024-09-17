import serverless from 'serverless-http';
import express, { Request, Response } from 'express';
import usersRouter from './routes/users';

const app = express();

app.use(express.json());

app.get('/', (_req: Request, res: Response) => {
  res.send('Hello, Lambda!');
});

app.use('/users', usersRouter);

export const handler = serverless(app);

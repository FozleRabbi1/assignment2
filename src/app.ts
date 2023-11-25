// const express = require("express");
import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { userRouter } from './app/modules/user.route';
const app: Application = express();

app.use(express.json());
app.use(cors());

app.use('/api', userRouter);

app.get('/', (req: Request, res: Response) => {
  const data = 'app run successfully';
  res.send(data);
});

export default app;

import express from 'express';
import { usersControler } from './user.controller';

const router = express.Router();

router.post('/api/users', usersControler.createUsers);

export const userRouter = router;

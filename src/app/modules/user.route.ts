import express from 'express';
import { usersControler } from './user.controller';

const router = express.Router();

router.get('/users', usersControler.getAllUsers);
router.post('/users', usersControler.createUsers);
router.get('/users/:userId', usersControler.getSingleUser);

export const userRouter = router;

import express from 'express';
import { usersControler } from './user.controller';

const router = express.Router();

router.get('/users', usersControler.getAllUsers);
router.post('/users', usersControler.createUsers);
router.get('/users/:userId', usersControler.getSingleUser);
router.put('/users/:userId', usersControler.updateUserData);
router.delete('/users/:userId', usersControler.deleteUser);
router.put('/users/:userId/orders', usersControler.usersOrderData);

export const userRouter = router;

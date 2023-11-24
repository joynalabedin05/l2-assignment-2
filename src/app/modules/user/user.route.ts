import express from 'express';
import { UserController } from './user.controler';

const router = express.Router();
router.post('/create-user', UserController.createUser);
router.get('/', UserController.getAllUsers);
router.get('/:userId', UserController.getSingleUser);
router.delete('/:userId', UserController.deleteUser);

export const UserRoutes = router;

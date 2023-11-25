import express from 'express';
import { UserController } from './user.controler';

const router = express.Router();
router.post('/create-user', UserController.createUser);
router.get('/', UserController.getAllUsers);
router.get('/:userId', UserController.getSingleUser);
router.put('/:userId',UserController.updateSingleUser);
router.delete('/:userId', UserController.deleteUser);
router.put('/:userId/orders', UserController.updateSingleOrder);

export const UserRoutes = router;

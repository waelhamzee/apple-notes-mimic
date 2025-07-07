import { Router } from 'express';
import userController from './controllers/UserController';

const router = Router();

router.get('/profile', userController.getProfile);

export default router; 
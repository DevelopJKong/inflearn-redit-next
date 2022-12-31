import { Router } from 'express';
import { login, register } from '../controller/authController';

const authRouter = Router();

authRouter.post('/register', register);
authRouter.post('/login', login);

export default authRouter;

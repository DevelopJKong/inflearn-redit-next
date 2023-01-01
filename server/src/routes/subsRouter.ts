import { Router } from 'express';
import { createSub } from '../controller/subsController';

const subsRouter = Router();

subsRouter.post('/', createSub);

export default subsRouter;

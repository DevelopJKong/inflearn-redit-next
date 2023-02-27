import { Router } from "express";
import { createSub } from "../controller/subsController";
import userMiddleware from "../middlewares/user";
import authMiddleware from "../middlewares/auth";

const subsRouter = Router();

subsRouter.post("/", userMiddleware, authMiddleware, createSub);

export default subsRouter;

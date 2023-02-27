import { User } from "./../entities/User";
import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { appDataSource } from "../data-source";

export const createSub = async (req: Request, res: Response, next: NextFunction) => {
  const { name, title, description } = req.body;
  try {
    return res.status(200).json("성공하였습니다");
  } catch (error) {
    return res.status(500).json(error);
  }
};

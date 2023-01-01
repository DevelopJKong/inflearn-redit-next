import { User } from './../entities/User';
import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import { appDataSource } from '../data-source';

export const createSub = async (req: Request, res: Response, next: NextFunction) => {
   const { name, title, description } = req.body;
   try {
      const token = req.cookies.token;
      if (!token) return next();

      const { username } = jwt.verify(token, process.env.JWT_SECRET!) as { username: string };

      const users = appDataSource.getRepository(User);
      const user = await users.findOneBy({ username });

      if (!user) throw new Error('Unauthenticated');

      return res.status(200).json('성공하였습니다');
   } catch (error) {
      return res.status(500).json(error);
   }
};

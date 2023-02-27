import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { isEmpty } from "class-validator";
import { Sub } from "../entities/Sub";
import { User } from "../entities/User";

export const createSub = async (req: Request, res: Response, next: NextFunction) => {
  const { name, title, description } = req.body;
  try {
    let errors: any = {};
    if (isEmpty(name)) errors.name = "이름은 비워 둘 수 없습니다.";
    if (isEmpty(title)) errors.title = "제목은 비워 둘 수 없습니다.";

    const sub = await AppDataSource.getRepository(Sub)
      .createQueryBuilder("sub")
      .where("lower(sub.name) = :name", { name: name.toLowerCase() })
      .getOne();

    if (sub) errors.name = "이미 존재하는 이름입니다.";

    if (Object.keys(errors).length > 0) {
      throw errors;
    }
  } catch (error) {
    return res.status(500).json({ error: "문제가 발생 했습니다." });
  }

  try {
    const user: User = res.locals.user;

    const sub = new Sub();
    sub.name = name;
    sub.title = title;
    sub.description = description;
    sub.user = user;

    await sub.save();
    return res.json(sub);
  } catch (error) {
    return res.status(500).json({ error: "문제가 발생 했습니다." });
  }
};

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cookie from "cookie";
import { AppDataSource } from "../data-source";
import { User } from "./../entities/User";
import { Request, Response } from "express";
import { isEmpty, validate } from "class-validator";
const mapError = (errors: Object[]) => {
  const returnValue = errors.reduce((prev: any, err: any) => {
    prev[err.property] = Object.entries(err.constraints)[0][1];
    return prev;
  }, {});
  console.log(returnValue);
  return returnValue;
};

export const register = async (req: Request, res: Response) => {
  const { email, username, password } = req.body;

  try {
    let errors: any = {};
    // ! 이메일과 유저이름이 이미 존재하는지 확인
    const users = AppDataSource.getRepository(User);
    const emailUser = await users.findOneBy({ email });
    const usernameUser = await users.findOneBy({ username });

    // ! 이미 있다면 errors 객체에 넣어줌
    if (emailUser) errors.email = "이미 해당 이메일 주소가 사용되었습니다.";
    if (usernameUser) errors.username = "이미 해당 사용자 이름이 사용되었습니다.";

    if (Object.keys(errors).length > 0) {
      return res.status(400).json(errors);
    }

    const user = new User();
    user.email = email;
    user.username = username;
    user.password = password;

    // ! 엔티티에 정해 놓은 조건으로 user 데이터의 유효성 검사를 해줌
    errors = await validate(user);
    if (errors.length > 0) return res.status(400).json(mapError(errors));
    // ! 유저 정보를 user table에 저장
    await users.save(user);
    return res.status(200).json("성공하였습니다");
  } catch (error) {
    console.log(error);
  }
};

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    let errors: any = {};

    // ! 비워져있다면 에러를 프론트엔드로 보내주기
    if (isEmpty(username)) errors.username = "사용자 이름은 비워 둘 수 없습니다.";
    if (isEmpty(password)) errors.password = "비밀번호는 비워 둘 수 없습니다.";

    if (Object.keys(errors).length > 0) {
      return res.status(400).json(errors);
    }

    // ! 유저가 존재하는지 확인
    const users = AppDataSource.getRepository(User);
    const user = await users.findOneBy({ username });

    if (!user) return res.status(404).json({ username: "사용자 이름이 등록되지 않았습니다." });

    // ! 비밀번호가 일치하는지 확인
    const passwordMatches = await bcrypt.compare(password, user.password);

    // ! 비밀번호가 다르다면 에러 보내기
    if (!passwordMatches) {
      return res.status(401).json({ password: "비밀번호가 일치하지 않습니다." });
    }

    // ! 비밀번호가 맞다면 토큰 생성
    const token = jwt.sign({ username }, process.env.JWT_SECRET!);

    // ! 쿠키 저장
    res.set(
      "Set-Cookie",
      cookie.serialize("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 24 * 7,
        path: "/",
      }),
    );

    return res.status(200).json({ user, token });
  } catch (error: any) {
    console.log(error);
    return res.status(500).json(error);
  }
};

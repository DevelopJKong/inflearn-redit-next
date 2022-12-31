import { appDataSource } from '../data-source';
import { User } from './../entities/User';
import { Request, Response, Router } from 'express';
import { validate } from 'class-validator';

const mapError = (errors: Object[]) => {
   const returnValue = errors.reduce((prev: any, err: any) => {
      prev[err.property] = Object.entries(err.constraints)[0][1];
      return prev;
   }, {});
   console.log(returnValue);
   return returnValue;
};

const register = async (req: Request, res: Response) => {
   const { email, username, password } = req.body;

   try {
      let errors: any = {};
      // ! 이메일과 유저이름이 이미 존재하는지 확인
      // const users = appDataSource.getRepository(User);
      const emailUser = await appDataSource.getRepository(User).findOneBy({ email });
      const usernameUser = await appDataSource.getRepository(User).findOneBy({ username });

      // ! 이미 있다면 errors 객체에 넣어줌
      if (emailUser) errors.email = '이미 해당 이메일 주소가 사용되었습니다.';
      if (usernameUser) errors.username = '이미 해당 사용자 이름이 사용되었습니다.';

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
      await appDataSource.getRepository(User).save(user);

      return;
   } catch (error) {
      console.log(error);
   }
};

const router = Router();
router.post('/register', register);

export default router;

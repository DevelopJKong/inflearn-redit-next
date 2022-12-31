import React, { FormEvent, useState } from 'react';
import { Button, Container, ContentWrapper, Form, LinkTag, SmallText, Title } from './register';
import InputGroup from '../components/InputGroup';
import { useRouter } from 'next/router';
import axios from 'axios';

const Login = () => {
   let router = useRouter();
   const [username, setUsername] = useState('');
   const [password, setPassword] = useState('');
   const [errors, setErrors] = useState<any>({});

   const handleSubmit = async (event: FormEvent) => {
      event.preventDefault();
      try {
         const { data } = await axios.post(
            '/auth/login',
            {
               username,
               password,
            },
            {
               withCredentials: true,
            },
         );

         console.log(data);
      } catch (error: any) {
         console.log(error);
         setErrors(error?.response?.data || {});
      }
   };

   return (
      <Container>
         <ContentWrapper>
            <Title>로그인</Title>
            <Form onSubmit={handleSubmit}>
               <InputGroup placeholder='Username' type={'text'} value={username} setValue={setUsername} error={errors.username} />
               <InputGroup
                  placeholder='Password'
                  type={'password'}
                  value={password}
                  setValue={setPassword}
                  error={errors.password}
               />
               <Button>로그인</Button>
            </Form>
            <SmallText>
               아직 가입 하지 않으셨나요? &nbsp;
               <LinkTag href={'/register'}>회원가입</LinkTag>
            </SmallText>
         </ContentWrapper>
      </Container>
   );
};

export default Login;

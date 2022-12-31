import Link from 'next/link';
import React, { FormEvent, useState } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import InputGroup from '../components/InputGroup';
import { useRouter } from 'next/router';
import axios from 'axios';

const Container = styled.div`
   ${tw`bg-white`}
`;

const ContentWrapper = styled.div`
   ${tw`flex flex-col items-center justify-center h-screen p-6`}
`;

const Content = styled.div`
   ${tw`w-10/12 mx-auto md:w-96`}
`;

const Title = styled.h1`
   ${tw`mb-2 text-lg font-medium`}
`;
const Form = styled.form``;
const Button = styled.button`
   ${tw`w-full py-2 mb-1 text-xs font-bold text-white uppercase bg-gray-400 border border-gray-400 rounded`}
`;
const SmallText = styled.small``;

const LinkTag = styled(Link)`
   ${tw`ml-1 text-blue-500 uppercase`}
`;

const Register = () => {
   const [email, setEmail] = useState('');
   const [username, setUsername] = useState('');
   const [password, setPassword] = useState('');
   const [errors, setErrors] = useState<any>({});
   const router = useRouter();

   const handleSubmit = async (event: FormEvent) => {
      event.preventDefault();
      try {
         const res = await axios.post('/auth/register', {
            email,
            password,
            username,
         });

         console.log(res);
         router.push('/login');
      } catch (error: any) {
         console.log('error', error);
         setErrors(error?.response?.data || {});
      }
   };

   return (
      <Container>
         <ContentWrapper>
            <Content>
               <Title>회원가입</Title>
               <Form onSubmit={handleSubmit}>
                  <InputGroup placeholder='Email' type='email' value={email} setValue={setEmail} error={errors.email} />
                  <InputGroup
                     placeholder='Username'
                     type='text'
                     value={username}
                     setValue={setUsername}
                     error={errors.username}
                  />
                  <InputGroup
                     placeholder='Password'
                     type='password'
                     value={password}
                     setValue={setPassword}
                     error={errors.password}
                  />
                  <Button>회원가입</Button>
               </Form>
               <SmallText>
                  이미 가입 하셨나요? &nbsp;
                  <LinkTag href={'/login'}>로그인&nbsp;&rarr;</LinkTag>
               </SmallText>
            </Content>
         </ContentWrapper>
      </Container>
   );
};

export default Register;

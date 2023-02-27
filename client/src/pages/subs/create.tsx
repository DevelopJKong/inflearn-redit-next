import React, { FormEvent, useState } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import InputGroup from "../../components/InputGroup";
import { useRouter } from "next/router";
import { authClient } from "../../request.method.api";
import axios, { AxiosError } from "axios";
import { GetServerSideProps } from "next/types";

const Container = styled.div`
  ${tw`flex flex-col justify-center pt-16`}
`;

const Content = styled.div`
  ${tw`w-10/12 mx-auto md:w-96`}
`;

const Title = styled.h1`
  ${tw`mb-2 text-lg font-medium`}
`;

const Form = styled.form``;

const List = styled.div`
  ${tw`my-6`}
`;

const FormTitle = styled.p`
  ${tw`font-medium`}
`;

const FormSubText = styled.p`
  ${tw`mb-2 text-xs text-gray-400`}
`;

const ButtonWrapper = styled.div`
  ${tw`flex justify-end`}
`;
const Button = styled.button`
  ${tw`px-4 py-1 text-sm font-semibold rounded text-white bg-gray-400 border`}
`;

const SubCreate = () => {
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState<any>({});

  const router = useRouter();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    console.log("handleSubmit");
    try {
      const { data } = await authClient.post("/subs", { name, title, description });
      console.log(data);

      router.push(`/r/${data?.name}`);
    } catch (error) {
      let typedError;
      if (axios.isAxiosError(error)) {
        typedError = error as AxiosError;
        if (typedError.response) {
          setErrors(typedError.response.data);
        }
      } else {
        typedError = error as Error;
        if (typedError.message) {
          setErrors(typedError.message);
        }
      }
    }
  };

  return (
    <Container>
      <Content>
        <Title>커뮤니티 만들기</Title>
        <hr />
        <Form onSubmit={handleSubmit}>
          <List>
            <FormTitle>Name</FormTitle>
            <FormSubText>커뮤니티 이름은 변경할 수 없습니다.</FormSubText>
            <InputGroup placeholder='이름' value={name} setValue={setName} error={errors?.name} />
          </List>
          <List>
            <FormTitle>Title</FormTitle>
            <FormSubText>주제를 나타냅니다. 언제든지 변경할 수 있습니다.</FormSubText>
            <InputGroup placeholder='주제' value={title} setValue={setTitle} error={errors?.title} />
          </List>
          <List>
            <FormTitle>Description</FormTitle>
            <FormSubText>해당 커뮤니티에 대한 설명입니다.</FormSubText>
            <InputGroup placeholder='이름' value={description} setValue={setDescription} error={errors?.description} />
          </List>
          <ButtonWrapper>
            <Button>커뮤니티 만들기</Button>
          </ButtonWrapper>
        </Form>
      </Content>
    </Container>
  );
};

export default SubCreate;

export const getServerSideProps: GetServerSideProps = async ({ req, res }): Promise<any> => {
  try {
    const cookie = req.headers.cookie;

    // ! 쿠기가 없다면 에러를 보내기

    if (!cookie) {
      throw new Error("Missing auth token cookie");
    }

    // ! 쿠키가 있다면 그 쿠키를 이용해서 백엔드에서 인증 확인하기

    await axios.get("/auth/me", { headers: { cookie } });

    return { props: {} };
  } catch (error) {
    // ! 백엔드에서 요청에서 던져준 쿠키를 이용해 인증 처리할 때 에러가 나면 /login 페이지로 이동
    res.writeHead(307, { Location: "/login" }).end();
  }
};

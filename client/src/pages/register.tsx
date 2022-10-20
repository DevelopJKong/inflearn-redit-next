import React from 'react';
import styled from 'styled-components';

const Container = styled.div.attrs(() => {
  return {
    className: 'bg-white',
  };
})``;

const Content = styled.div.attrs(() => {
  return {
    className: 'flex flex-col items-center justify-center h-screen p-6',
  };
})``;

const register = () => {
  return (
    <Container>
      <Content>hello</Content>
    </Container>
  );
};

export default register;

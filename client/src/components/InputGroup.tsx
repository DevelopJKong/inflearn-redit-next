import React from "react";
import styled from "styled-components";
import tw from "twin.macro";
import cls from "classnames";

interface InputGroupProps {
  className?: string;
  type?: string;
  placeholder?: string;
  value?: string;
  error?: string | undefined;
  setValue: (str: string) => void;
}

interface IClassName {
  className?: string;
  type?: string;
  style?: object;
}

const Container = styled.div.attrs(({ className }) => {
  return {
    className,
  };
})``;

const Input = styled.input.attrs<IClassName>(({ className, type }) => {
  return {
    type,
    className,
  };
})<IClassName>``;

const SmallText = styled.small.attrs(({ className }) => {
  return {
    className,
  };
})``;

const InputGroup: React.FC<InputGroupProps> = ({
  className = "mb-2",
  type = "text",
  placeholder = "",
  error,
  value,
  setValue,
}) => {
  return (
    <Container className={className}>
      <Input
        type={type}
        value={value}
        className={cls(
          `w-full p-3 transition duration-200 border border-gray-400 rounded bg-gray-50 focus:bg-white hover:bg-white`,
          {
            "border-red-500": error,
          },
        )}
        style={{ minWidth: 300 }}
        placeholder={placeholder}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
      />
      <SmallText className='font-medium text-red-500'>{error}</SmallText>
    </Container>
  );
};

export default InputGroup;

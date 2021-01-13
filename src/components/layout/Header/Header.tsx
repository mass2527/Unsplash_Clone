import React from 'react';
import styled from 'styled-components';

const S = {
  Header: styled.div`
    height: 60px;
    background-color: #686de0;
    position: sticky;
    top: 0;
    z-index: 2;
    display: flex;
    justify-content: center;
    align-items: center;
  `,

  HeaderMiddle: styled.div`
    max-width: 1320px;
    width: 100%;
    padding: 0px 12px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
  `,

  Title: styled.h2`
    color: white;
    cursor: pointer;
    margin-right: 15px;
  `,

  Form: styled.form`
    display: none;

    @media (max-width: 768px) {
      height: 30px;
      flex: 1;
      display: block;
    }
  `,

  Input: styled.input`
    border: none;
    padding: 0px 0px 0px 10px;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    background-color: transparent;
    color: white;
    cursor: pointer;
    font-size: 15px;
    transition: border-color 0.1s ease-in-out;
    border-bottom: 2px solid transparent;
    margin-top: 2px;

    :focus {
      outline: none;
      border-bottom: 2px solid white;
    }

    ::placeholder {
      color: white;
    }
  `,
};

interface Props {}

const Header: React.FC<Props> = () => {
  return (
    <S.Header>
      <S.HeaderMiddle>
        <S.Title>Unsplash</S.Title>
        <S.Form>
          <S.Input type="text" placeholder="Search free high-resolution photos" />
        </S.Form>
      </S.HeaderMiddle>
    </S.Header>
  );
};

export default Header;

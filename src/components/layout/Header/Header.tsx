import React, { FormEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

const S = {
  Header: styled.div`
    height: 60px;
    background-color: white;
    position: sticky;
    top: 0;
    z-index: 2;
    display: flex;
    justify-content: center;
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
    color: black;
    cursor: pointer;
    margin-right: 15px;
  `,

  Form: styled.form`
    height: 30px;
    flex: 1;
    display: block;
  `,

  Input: styled.input`
    border: none;
    padding: 0px 0px 0px 10px;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    background-color: transparent;
    color: black;
    font-size: 15px;
    transition: border-color 0.1s ease-in-out;
    border-bottom: 2px solid transparent;
    margin-top: 2px;

    :focus {
      outline: none;
      border-bottom: 2px solid black;
    }

    ::placeholder {
      color: black;
    }
  `,
};

const Header: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const history = useHistory();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    history.push(`/s/photos/${searchTerm.replaceAll(' ', '-')}`, {
      searchTerm,
    });

    setSearchTerm('');
  }

  return (
    <S.Header>
      <S.HeaderMiddle>
        <S.Title onClick={() => history.push('/')}>DH KIM</S.Title>
        <S.Form onSubmit={handleSubmit}>
          <S.Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.currentTarget.value)}
            type="text"
            placeholder="Search free high-resolution photos"
          />
        </S.Form>
      </S.HeaderMiddle>
    </S.Header>
  );
};

export default Header;

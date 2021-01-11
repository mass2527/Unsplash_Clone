import React from 'react';
import styled from 'styled-components';

const S = {
  Header: styled.div`
    height: 60px;
    background-color: #686de0;
  `,
};

interface Props {}

const Header: React.FC<Props> = () => {
  return <S.Header></S.Header>;
};

export default Header;

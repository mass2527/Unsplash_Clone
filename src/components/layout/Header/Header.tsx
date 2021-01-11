import React from 'react';
import styled from 'styled-components';

const S = {
  Header: styled.div`
    height: 60px;
    background-color: #686de0;
    position: sticky;
    top: 0;
    z-index: 1;
  `,
};

interface Props {}

const Header: React.FC<Props> = () => {
  return <S.Header></S.Header>;
};

export default Header;

import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/layout/Header/Header';
import Modal from '../components/layout/Modal/Modal';
import styled from 'styled-components';
import SearchMain from '../components/layout/SearchMain.tsx/SearchMain';

const S = {
  Search: styled.div``,
};

interface LocationProps {
  photoId: string;
}

const Search: React.FC = () => {
  const location = useLocation<LocationProps>();

  return (
    <S.Search>
      <Header />
      <SearchMain />
      {location.state?.photoId && <Modal />}
    </S.Search>
  );
};

export default Search;

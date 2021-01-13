import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/layout/Header/Header';
import Main from '../components/layout/Main/Main';
import Modal from '../components/layout/Modal/Modal';
import styled from 'styled-components';
import Banner from '../components/layout/Banner/Banner';

const S = {
  Home: styled.div``,
};

interface Props {}

interface LocationProps {
  photoId: string;
}

const Home: React.FC<Props> = () => {
  const location = useLocation<LocationProps>();

  return (
    <S.Home>
      <Header />
      <Banner />
      <Main />
      {location.state?.photoId && <Modal />}
    </S.Home>
  );
};

export default Home;

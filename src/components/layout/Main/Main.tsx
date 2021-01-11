import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { unsplashApi } from '../../../axios/axios';
import Photo from '../../shared/Photo/Photo';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';

const S = {
  Main: styled.main`
    padding: 30px 0px;
  `,

  MainCenter: styled.div`
    max-width: 1320px;
    padding: 0px 12px;
    box-sizing: border-box;
    margin: 0px auto;

    @media (max-width: 768px) {
      padding: 0px;
    }
  `,
};

interface Props {}

const Main: React.FC<Props> = () => {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    async function getUnsplashLatestPhotos() {
      const { data } = await unsplashApi.getLatestPhotos();
      console.log(data);
      setPhotos(data);
    }
    getUnsplashLatestPhotos();
  }, []);

  return (
    <S.Main>
      <S.MainCenter>
        <ResponsiveMasonry columnsCountBreakPoints={{ 0: 1, 768: 2, 992: 3 }}>
          <Masonry gutter="24px">
            {photos.map(
              ({
                id,
                urls: { full },
                user: {
                  profile_image: { large },
                  name,
                  username,
                },
              }: {
                id: string;
                urls: { full: string };
                user: {
                  profile_image: { large: string };
                  name: string;
                  username: string;
                };
              }) => (
                <Photo key={id} imageURL={full} userImageURL={large} userName={name} accountName={username} />
              )
            )}
          </Masonry>
        </ResponsiveMasonry>
        )
      </S.MainCenter>
    </S.Main>
  );
};

export default Main;

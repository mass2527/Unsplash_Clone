import React, { useEffect, useRef, useState } from 'react';
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
  const divRef = useRef<HTMLDivElement | null>(null);

  const options = {
    threshold: 0,
  };

  let callback = (entries: any, observer: any) => {
    if (!photos) return;
    entries.forEach((entry: any) => {
      alert('work');
    });
  };

  const observer = new IntersectionObserver(callback, options);

  useEffect(() => {
    async function getUnsplashLatestPhotos() {
      const { data } = await unsplashApi.getLatestPhotos();
      console.log(data);
      setPhotos(data);
    }
    getUnsplashLatestPhotos();
  }, []);

  useEffect(() => {
    if (!divRef.current) return;
    observer.observe(divRef.current);

    return () => observer.disconnect();
  }, [photos]);

  return (
    <S.Main>
      <S.MainCenter>
        <ResponsiveMasonry columnsCountBreakPoints={{ 0: 1, 768: 2, 992: 3 }}>
          <Masonry gutter="24px">
            {photos.map(
              (
                {
                  id,
                  urls: { full },
                  user: {
                    profile_image: { large },
                    name,
                    username,
                    bio,
                    portfolio_url,
                  },
                }: {
                  id: string;
                  urls: { full: string };
                  user: {
                    profile_image: { large: string };
                    name: string;
                    username: string;
                    bio: string;
                    portfolio_url: string;
                  };
                },
                index,
                array
              ) => (
                <>
                  <div>
                    <Photo
                      key={id}
                      imageURL={full}
                      userImageURL={large}
                      userName={name}
                      accountName={username}
                      bio={bio}
                      portfolio_url={portfolio_url}
                      id={id}
                    />
                  </div>
                  {(index + 1) % array.length === 0 && <div ref={divRef}></div>}
                </>
              )
            )}
          </Masonry>
        </ResponsiveMasonry>
      </S.MainCenter>
    </S.Main>
  );
};

export default Main;

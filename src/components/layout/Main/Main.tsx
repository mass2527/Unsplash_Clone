import React, { createContext, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { getLatestPhotosByPage, unsplashApi } from '../../../axios/axios';
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

const PhotoContext = createContext({});

const Main: React.FC = () => {
  const [photos, setPhotos] = useState([]);
  const divRef = useRef<HTMLDivElement | null>(null);
  const [currentPage, setCurrentPage] = useState(2);

  const options = {
    threshold: 1,
    rootMargin: '100%',
  };

  useEffect(() => {
    async function getUnsplashLatestPhotos() {
      const { data } = await unsplashApi.getLatestPhotos();

      setPhotos(data);
    }

    getUnsplashLatestPhotos();
  }, []);

  useEffect(() => {
    if (!divRef.current) return;

    const callback = (entries: any, observer: any) => {
      entries.forEach(async (entry: any) => {
        if (!entry.isIntersecting) return;

        const { data } = await getLatestPhotosByPage(currentPage);
        console.log('data>>>', data);
        setPhotos((photos) => photos.concat(data));
        setCurrentPage((crr) => crr + 1);
      });
    };

    const observer = new IntersectionObserver(callback, options);
    observer.observe(divRef.current);

    return () => {
      observer.disconnect();
    };
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
                  urls: { raw },
                  user: {
                    profile_image: { large },
                    name,
                    username,
                    bio,
                    portfolio_url,
                  },
                  color,
                },
                index,
                array
              ) => (
                <>
                  {index + 1 !== array.length ? (
                    <PhotoContext.Provider value="123">
                      <Photo
                        key={id}
                        imageURL={raw}
                        userImageURL={large}
                        userName={name}
                        accountName={username}
                        bio={bio}
                        portfolio_url={portfolio_url}
                        id={id}
                        color={color}
                      />
                    </PhotoContext.Provider>
                  ) : (
                    <div ref={divRef}>
                      <Photo
                        key={id}
                        imageURL={raw}
                        userImageURL={large}
                        userName={name}
                        accountName={username}
                        bio={bio}
                        portfolio_url={portfolio_url}
                        id={id}
                        color={color}
                      />
                    </div>
                  )}
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

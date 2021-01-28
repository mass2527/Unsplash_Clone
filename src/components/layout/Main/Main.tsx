import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { unsplashApi } from '../../../axios/axios';
import Photo from '../../shared/Photo/Photo';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { PhotoContext } from '../../../Context/Context';

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

const Main: React.FC = () => {
  const [photos, setPhotos] = useState([]);
  const divRef = useRef<HTMLDivElement | null>(null);
  const currentPage = useRef(1);

  const options = {
    threshold: 0,
    rootMargin: '700px',
  };

  useEffect(() => {
    async function getUnsplashLatestPhotos() {
      const { data } = await unsplashApi.getLatestPhotos(1);

      setPhotos(data);
    }

    getUnsplashLatestPhotos();
    currentPage.current++;
  }, []);

  useEffect(() => {
    if (!divRef.current) return;
    console.log('working');
    const callback = (entries: any, observer: any) => {
      entries.forEach(async (entry: any) => {
        if (!entry.isIntersecting) return;

        const { data } = await unsplashApi.getLatestPhotosByPage(currentPage.current);
        console.log(data);
        setPhotos((photos) => photos.concat(data));
        currentPage.current++;
      });
    };

    const observer = new IntersectionObserver(callback, options);
    observer.observe(divRef.current);

    return () => {
      observer.disconnect();
    };
    // eslint-disable-next-line
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
                <PhotoContext.Provider
                  value={{
                    userImageURL: large,
                    userName: name,
                    accountName: username,
                    bio: bio,
                    portfolio_url: portfolio_url,
                  }}
                >
                  {index + 1 !== array.length ? (
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
                </PhotoContext.Provider>
              )
            )}
          </Masonry>
        </ResponsiveMasonry>
      </S.MainCenter>
    </S.Main>
  );
};

export default Main;

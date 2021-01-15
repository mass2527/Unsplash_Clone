import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { getPhotoBySearchTerm } from '../../../axios/axios';
import Photo from '../../shared/Photo/Photo';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { PhotoContext } from '../../../Context/Context';
import { useLocation } from 'react-router-dom';

const S = {
  SearchMain: styled.main`
    padding: 30px 0px;
  `,

  SearchMainCenter: styled.div`
    max-width: 1320px;
    padding: 0px 12px;
    box-sizing: border-box;
    margin: 0px auto;

    @media (max-width: 768px) {
      padding: 0px;
    }
  `,

  Title: styled.h1`
    font-size: 46px;
    color: #111111;
    margin-bottom: 16px;
  `,
};

interface LocationProps {
  searchTerm: string;
}

const SearchMain: React.FC = () => {
  const [photos, setPhotos] = useState([]);
  const divRef = useRef<HTMLDivElement | null>(null);
  const currentPage = useRef(1);
  const location = useLocation<LocationProps>();

  const options = {
    threshold: 0,
    rootMargin: '700px',
  };

  useEffect(() => {
    setPhotos([]);

    async function fetchData() {
      try {
        const {
          data: { results },
        } = await getPhotoBySearchTerm(location.state.searchTerm, 1);

        setPhotos(results);
      } catch (error) {}
    }

    fetchData();
    currentPage.current = 2;
    // eslint-disable-next-line
  }, [location.state?.searchTerm]);

  useEffect(() => {
    if (!divRef.current) return;

    const callback = (entries: any, observer: any) => {
      entries.forEach(async (entry: any) => {
        if (!entry.isIntersecting) return;

        const {
          data: { results },
        } = await getPhotoBySearchTerm(location.state.searchTerm, currentPage.current);

        setPhotos((photos) => photos.concat(results));
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
    <S.SearchMain>
      <S.SearchMainCenter>
        <S.Title>{location.state?.searchTerm[0].toUpperCase() + location.state?.searchTerm.slice(1)}</S.Title>
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
      </S.SearchMainCenter>
    </S.SearchMain>
  );
};

export default SearchMain;

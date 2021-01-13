import React, { useEffect, useState, MouseEvent, useRef, memo } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import UserImageAndName from '../UserImageAndName/UserImageAndName';

const S = {
  Photo: styled.div<{ color: string; isLoading: boolean }>`
    cursor: zoom-in;
    position: relative;
    background-color: ${({ isLoading, color }) => (isLoading ? color : 'transparent')};
  `,

  Image: styled.img<{ isLoading: boolean }>`
    width: 100%;
    object-fit: contain;
    display: block;
    opacity: ${({ isLoading }) => (isLoading ? '0' : '1')};
  `,

  Overlay: styled.div<{ isLoading: boolean }>`
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.4));
    opacity: 0;
    transition: opacity 0.1s ease-in-out;
    display: ${({ isLoading }) => (isLoading ? 'none' : 'grid')};
    place-items: end start;

    :hover {
      opacity: 1;
    }

    @media (max-width: 768px) {
      :hover {
        opacity: 0;
      }
    }
  `,
};

interface Props {
  imageURL: string;
  userImageURL: string;
  userName: string;
  accountName?: string;
  bio?: string;
  portfolio_url?: string;
  id: string;
  color: string;
}

const Photo: React.FC<Props> = ({ imageURL, userImageURL, userName, accountName, bio, portfolio_url, id, color }) => {
  const [windowInnerWidth, setWindowInnerWidth] = useState(window.innerWidth);
  const photoRef = useRef<HTMLDivElement | null>(null);
  const history = useHistory();
  const imageRef = useRef<HTMLImageElement | null>(null);
  const [loading, setLoading] = useState(true);

  function handleResize() {
    setWindowInnerWidth(window.innerWidth);
  }

  function handleLoad() {
    setLoading(false);
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    imageRef.current?.addEventListener('load', handleLoad);

    return () => {
      window.removeEventListener('resize', handleResize);
      imageRef.current?.removeEventListener('load', handleLoad);
    };
  }, []);

  function clickPhoto(e: MouseEvent<HTMLDivElement>) {
    if (e.target !== photoRef.current) return;

    history.push(`/photos/${id}`, {
      photoId: id,
    });
  }

  return (
    <>
      {windowInnerWidth <= 768 && (
        <UserImageAndName
          userImageURL={userImageURL}
          userName={userName}
          accountName={accountName}
          profileOption
          bio={bio}
          portfolio_url={portfolio_url}
        />
      )}

      <S.Photo isLoading={loading} color={color} onClick={clickPhoto}>
        <S.Image isLoading={loading} ref={imageRef} className="Image" src={imageURL} />
        <S.Overlay isLoading={loading} ref={photoRef}>
          {windowInnerWidth > 768 && (
            <UserImageAndName
              userImageURL={userImageURL}
              userName={userName}
              accountName={accountName}
              profileOption
              bio={bio}
              portfolio_url={portfolio_url}
            />
          )}
        </S.Overlay>
      </S.Photo>
    </>
  );
};

export default memo(Photo);

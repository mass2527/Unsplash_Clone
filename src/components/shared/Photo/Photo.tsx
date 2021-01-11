import React, { useEffect, useState, MouseEvent, useRef, memo } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import UserImageAndName from '../UserImageAndName/UserImageAndName';

const S = {
  Photo: styled.div`
    cursor: zoom-in;
    position: relative;
  `,

  Image: styled.img`
    width: 100%;
    object-fit: contain;
    display: block;
  `,

  Overlay: styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.4));
    opacity: 0;
    transition: opacity 0.1s ease-in-out;
    display: grid;
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
}

const Photo: React.FC<Props> = ({ imageURL, userImageURL, userName, accountName, bio, portfolio_url, id }) => {
  const [windowInnerWidth, setWindowInnerWidth] = useState(window.innerWidth);
  const photoRef = useRef<HTMLDivElement | null>(null);
  const history = useHistory();

  function handleResize() {
    setWindowInnerWidth(window.innerWidth);
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
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
      <S.Photo onClick={clickPhoto}>
        <S.Image src={imageURL} />
        <S.Overlay ref={photoRef}>
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

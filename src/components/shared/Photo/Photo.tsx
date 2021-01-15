import React, { useEffect, useState, MouseEvent, useRef, memo } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
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

  Overlay: styled.div<{ isLoading: boolean; noHeaderOption: boolean | undefined }>`
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
        opacity: ${({ noHeaderOption }) => (noHeaderOption ? '1' : '0')};
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
  noHeaderOption?: boolean;
}

interface locationProps {
  searchTerm: string;
}

const Photo: React.FC<Props> = ({ imageURL, id, color, noHeaderOption }) => {
  const [windowInnerWidth, setWindowInnerWidth] = useState(window.innerWidth);
  const [loading, setLoading] = useState(true);
  const photoRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const history = useHistory();
  const location = useLocation<locationProps>();

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
    };
  }, []);

  function clickPhoto(e: MouseEvent<HTMLDivElement>) {
    if (e.target !== photoRef.current) return;

    history.push(`/photos/${id}`, {
      photoId: id,
      searchTerm: location.state?.searchTerm,
    });
  }

  return (
    <>
      {windowInnerWidth <= 768 && !noHeaderOption && <UserImageAndName profileOption />}

      <S.Photo isLoading={loading} color={color} onClick={clickPhoto}>
        <S.Image isLoading={loading} ref={imageRef} className="Image" src={imageURL} />
        <S.Overlay noHeaderOption={noHeaderOption} isLoading={loading} ref={photoRef}>
          {windowInnerWidth > 768 && <UserImageAndName profileOption />}
          {windowInnerWidth <= 768 && noHeaderOption && <UserImageAndName profileOption />}
        </S.Overlay>
      </S.Photo>
    </>
  );
};

export default memo(Photo);

import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const S = {
  ImageWrapper: styled.div<{ isLoading: boolean; color: string | undefined }>`
    background-color: ${({ isLoading, color }) => isLoading && color};
  `,

  Image: styled.img<{ isLoading: boolean }>`
    max-width: 100%;
    object-fit: contain;
    max-height: 770px;
    opacity: ${(props) => (props.isLoading ? '0' : '1')};

    @media (max-width: 768px) {
      width: 100%;
      max-height: none;
      height: auto;
    }
  `,

  PhotoMiddle: styled.div`
    padding: 10px 16px;
    display: grid;
    place-items: center center;
    border: 2px solid red;

    @media (max-width: 768px) {
      padding: 0px;
    }
  `,
};

interface Props {
  color: string;
  imageURL: string;
  alt_description: string;
}

const PhotoMiddle: React.FC<Props> = ({ color, imageURL, alt_description }) => {
  const imageRef = useRef<HTMLImageElement | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    imageRef.current?.addEventListener('load', handleLoad);
  }, []);

  function handleLoad() {
    setLoading(false);
  }

  return (
    <S.PhotoMiddle>
      <S.ImageWrapper isLoading={loading} color={color}>
        <S.Image isLoading={loading} ref={imageRef} src={imageURL} alt={alt_description} />
      </S.ImageWrapper>
    </S.PhotoMiddle>
  );
};

export default PhotoMiddle;

import React, { memo, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const S = {
  PhotoMiddle: styled.div<{ isZoomIn: boolean }>`
    padding: ${({ isZoomIn }) => (isZoomIn ? '10px 0px' : '10px 16px')};
    display: grid;
    place-items: center center;

    @media (max-width: 768px) {
      padding: 0px;
    }
  `,

  ImageWrapper: styled.div<{ isLoading: boolean; color: string | undefined }>`
    background-color: ${({ isLoading, color }) => isLoading && color};
  `,

  Image: styled.img<{ isLoading: boolean; isZoomIn: boolean }>`
    max-width: 100%;
    object-fit: contain;
    max-height: ${({ isZoomIn }) => (isZoomIn ? 'none' : '770px')};
    opacity: ${(props) => (props.isLoading ? '0' : '1')};
    cursor: ${({ isZoomIn }) => (isZoomIn ? 'zoom-out' : 'zoom-in')};

    @media (max-width: 768px) {
      width: 100%;
      max-height: none;
      height: auto;
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
  const [zoomIn, setZoomIn] = useState(false);

  useEffect(() => {
    imageRef.current?.addEventListener('load', handleLoad);
  }, []);

  function handleLoad() {
    setLoading(false);
  }

  return (
    <S.PhotoMiddle isZoomIn={zoomIn}>
      <S.ImageWrapper isLoading={loading} color={color}>
        <S.Image
          onClick={() => setZoomIn((zoomIn) => !zoomIn)}
          isLoading={loading}
          isZoomIn={zoomIn}
          ref={imageRef}
          src={imageURL}
          alt={alt_description}
        />
      </S.ImageWrapper>
    </S.PhotoMiddle>
  );
};

export default memo(PhotoMiddle);

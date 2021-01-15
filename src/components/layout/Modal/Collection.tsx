import React, { memo, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const S = {
  Collection: styled.div`
    width: calc(33.3333333% - 16px);

    box-sizing: border-box;
    display: flex;
    flex-direction: column;

    :nth-child(2) {
      margin: 0px 24px;
    }

    @media (max-width: 990px) {
      width: calc(50% - 12px);

      :nth-child(2) {
        margin: 0px 0px 0px 24px;
      }
    }

    @media (max-width: 768px) {
      width: 100%;

      :nth-child(2) {
        margin: 0px;
      }
    }
  `,

  Photos: styled.div`
    display: flex;
    overflow: hidden;
    border-radius: 8px;
    margin-bottom: 10px;
    max-height: 300px;
    height: 20vw;
    cursor: pointer;

    :hover {
      opacity: 0.8;
    }

    @media (max-width: 990px) {
      height: 28vw;
    }

    @media (max-width: 768px) {
      height: 67vw;
      max-height: none;
    }
  `,

  PhotoLeft: styled.div<{ isLoading: boolean }>`
    flex: 3;
    margin-right: 2px;
    background-color: ${({ isLoading }) => isLoading && 'lightgray'};
  `,

  PhotoRight: styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
  `,

  Photo: styled.div<{ isLoading: boolean }>`
    flex: 1;
    background-color: ${({ isLoading }) => isLoading && 'lightgray'};

    :nth-child(1) {
      margin-bottom: 1px;
    }

    :nth-child(2) {
      margin-top: 1px;
    }
  `,

  Image: styled.img<{ isLoading: boolean }>`
    width: 100%;
    height: 100%;
    display: block;
    object-fit: cover;
    object-position: center center;
    opacity: ${({ isLoading }) => (isLoading ? '0' : '1')};
  `,

  CollectionMiddle: styled.div`
    display: flex;
    flex-direction: column;
  `,

  Title: styled.span`
    font-size: 18px;
    color: #111111;
    font-weight: bold;
  `,

  NumberOfPhotosAndCurator: styled.div`
    display: flex;
    font-size: 14px;
    color: #767676;
    white-space: nowrap;
    margin-top: 5px;
    margin-bottom: 15px;
  `,

  NumberOfPhotos: styled.span`
    margin-right: 10px;
    text-overflow: ellipsis;
    overflow: hidden;
  `,

  Curator: styled.span`
    text-overflow: ellipsis;
    overflow: hidden;
  `,

  CollectionFooter: styled.div`
    margin-bottom: 20px;
  `,

  Tag: styled.span`
    color: #767676;
    background-color: #eeeeee;
    padding: 0px 8px;
    font-size: 14px;
    margin-right: 8px;
  `,
};

interface Props {
  collectionName: string;
  numberOfPhotos: number;
  curator: string;
  tags: {
    title: string;
  }[];
  previewPhotos: {
    id: string;
    urls: { small: string; regular: string };
  }[];
}

const Collection: React.FC<Props> = ({ collectionName, numberOfPhotos, curator, tags, previewPhotos }) => {
  const imageRef = useRef<HTMLImageElement | null>(null);
  const [loading, setLoading] = useState(true);
  const [width, setWidth] = useState(window.innerWidth);

  function handleResize() {
    setWidth(window.innerWidth);
  }

  function handleLoad() {
    setLoading(false);
  }

  useEffect(() => {
    const currentImageRef = imageRef.current;
    if (!currentImageRef) return;
    window.addEventListener('resize', handleResize);
    currentImageRef.addEventListener('load', handleLoad);

    return () => {
      currentImageRef.addEventListener('load', handleLoad);
      window.addEventListener('resize', handleResize);
    };
  }, []);

  return (
    <S.Collection>
      <S.Photos>
        <S.PhotoLeft isLoading={loading}>
          <S.Image
            isLoading={loading}
            ref={imageRef}
            src={width <= 768 ? previewPhotos[0].urls.regular : previewPhotos[0].urls.small}
          />
        </S.PhotoLeft>
        <S.PhotoRight>
          {previewPhotos.slice(1, 3).map(({ id, urls: { small, regular } }) => (
            <S.Photo isLoading={loading} key={id}>
              <S.Image isLoading={loading} src={width <= 768 ? regular : small} />
            </S.Photo>
          ))}
        </S.PhotoRight>
      </S.Photos>
      <S.CollectionMiddle>
        <S.Title>{collectionName}</S.Title>
        <S.NumberOfPhotosAndCurator>
          <S.NumberOfPhotos>{numberOfPhotos} photos</S.NumberOfPhotos>
          <S.Curator>Curated by {curator}</S.Curator>
        </S.NumberOfPhotosAndCurator>
      </S.CollectionMiddle>
      <S.CollectionFooter>
        {tags.slice(0, 3).map(({ title }: { title: string }) => (
          <S.Tag key={title}>{title}</S.Tag>
        ))}
      </S.CollectionFooter>
    </S.Collection>
  );
};

export default memo(Collection);

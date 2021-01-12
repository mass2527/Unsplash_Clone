import React from 'react';
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
    border-radius: 5px;
    max-height: 290px;

    margin-bottom: 10px;
  `,

  PhotoLeft: styled.div`
    flex: 3;
  `,

  PhotoRight: styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
  `,

  Photo: styled.div`
    flex: 1;
  `,

  Image: styled.img`
    width: 100%;
    height: 100%;
    display: block;
    object-fit: cover;
    object-position: center center;
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
    urls: { full: string };
  }[];
}

const Collection: React.FC<Props> = ({ collectionName, numberOfPhotos, curator, tags, previewPhotos }) => {
  return (
    <S.Collection>
      <S.Photos>
        <S.PhotoLeft>
          <S.Image src={previewPhotos[0].urls.full} />
        </S.PhotoLeft>
        <S.PhotoRight>
          {previewPhotos.slice(1, 3).map(({ id, urls: { full } }) => (
            <S.Photo key={id}>
              <S.Image src={full} />
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
          <S.Tag>{title}</S.Tag>
        ))}
      </S.CollectionFooter>
    </S.Collection>
  );
};

export default Collection;

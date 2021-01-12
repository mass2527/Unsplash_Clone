import React, { memo } from 'react';
import styled from 'styled-components';
import Collection from './Collection';

const S = {
  RelatedCollections: styled.div`
    max-width: 1320px;
    width: 100%;
    margin: 0px auto;
  `,

  Header: styled.header`
    height: 28px;
    margin: 12px;
    padding-top: 60px;
    padding-bottom: 16px;
  `,

  Title: styled.span`
    font-size: 18px;
    font-weight: 500;
    color: #111111;
  `,

  Main: styled.main`
    padding: 0px 12px;
    display: flex;
    flex-wrap: wrap;
  `,
};

interface Props {
  collections: {
    id: string;
    title: string;
    total_photos: number;
    user: { name: string };
    tags: { title: string }[];
    preview_photos: {
      id: string;
      urls: { full: string };
    }[];
  }[];
}

const RelatedCollections: React.FC<Props> = ({ collections }) => {
  return (
    <S.RelatedCollections>
      <S.Header>
        <S.Title>Rlated Collections</S.Title>
      </S.Header>
      <S.Main>
        {console.log(collections)}
        {collections.map(
          ({
            id,
            title,
            total_photos,
            user: { name },
            tags,
            preview_photos,
          }: {
            id: string;
            title: string;
            total_photos: number;
            user: { name: string };
            tags: { title: string }[];
            preview_photos: {
              id: string;
              urls: { full: string };
            }[];
          }) => (
            <Collection
              key={id}
              collectionName={title}
              numberOfPhotos={total_photos}
              curator={name}
              tags={tags}
              previewPhotos={preview_photos}
            />
          )
        )}
      </S.Main>
    </S.RelatedCollections>
  );
};

export default memo(RelatedCollections);

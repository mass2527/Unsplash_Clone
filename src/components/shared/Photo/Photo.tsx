import React from 'react';
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
  `,
};

interface Props {
  imageURL: string;
  userImageURL: string;
  userName: string;
  accountName?: string;
}

const Photo: React.FC<Props> = ({ imageURL, userImageURL, userName, accountName }) => {
  return (
    <S.Photo>
      <S.Image src={imageURL} />
      <S.Overlay>
        <UserImageAndName userImageURL={userImageURL} userName={userName} accountName={accountName} profileOption />
      </S.Overlay>
    </S.Photo>
  );
};

export default Photo;

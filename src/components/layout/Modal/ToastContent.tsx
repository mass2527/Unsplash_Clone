import React from 'react';
import styled from 'styled-components';

const S = {
  Container: styled.div`
    display: flex;
    height: 176px;
  `,

  ContainerLeft: styled.div`
    width: 120px;
  `,

  Image: styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center center;
  `,

  ContainerRight: styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #111111;
    padding: 15px;
  `,

  Title: styled.h4`
    font-size: 18px;
  `,

  Greet: styled.p`
    font-size: 15px;
    text-align: center;
  `,
};

interface Props {
  imageURL: string;
  altDescription: string;
  userName: string;
}

const ToastContent: React.FC<Props> = ({ imageURL, altDescription, userName }) => {
  return (
    <S.Container>
      <S.ContainerLeft>
        <S.Image src={imageURL} alt={altDescription} />
      </S.ContainerLeft>
      <S.ContainerRight>
        <S.Title>Say thanks 🙌</S.Title>
        <S.Greet>Give a shoutout to {userName} </S.Greet>
      </S.ContainerRight>
    </S.Container>
  );
};

export default ToastContent;

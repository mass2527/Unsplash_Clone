import React from 'react';
import styled from 'styled-components';

const S = {
  PhotoFooter: styled.div`
    display: flex;
    flex-direction: column;
    font-size: 12px;
    padding: 9px 12px;
    height: 62px;
  `,

  Location: styled.span`
    color: #111111;
    padding: 4px;
    font-weight: 500;
  `,

  Description: styled.span`
    color: #767676;
    padding: 4px;
  `,
};

interface Props {
  location: string;
  description: string;
}

const PhotoFooter: React.FC<Props> = ({ location, description }) => {
  return (
    <S.PhotoFooter>
      <S.Location>{location}</S.Location>
      <S.Description>{description}</S.Description>
    </S.PhotoFooter>
  );
};

export default PhotoFooter;

import React, { memo, useContext, useState } from 'react';
import styled from 'styled-components';
import { PhotoContext, PhotoContextProps } from '../../../Context/Context';
import UserProfile from './UserProfile';

const S = {
  UserImageAndName: styled.div`
    padding: 20px;
    display: flex;
    align-items: center;
    position: relative;

    @media (max-width: 768px) {
      padding: 10px;
    }
  `,

  UserImage: styled.img`
    width: 32px;
    height: 32px;
    object-fit: contained;
    border-radius: 100%;
    background-color: #0000001a;
    margin-right: 10px;
    cursor: pointer;
  `,

  UserName: styled.span<{ isBlack: boolean | undefined }>`
    color: ${({ isBlack }) => (isBlack ? '#111111' : 'rgba(255, 255, 255, 0.8)')};
    font-size: 15px;
    cursor: pointer;
    font-weight: 500;

    :hover {
      color: ${({ isBlack }) => (isBlack ? 'black' : 'white')};
    }

    @media (max-width: 768px) {
      color: #111111;
      :hover {
        color: black;
      }
    }
  `,
};

interface Props {
  profileOption?: boolean;
  blackOption?: boolean;
  url?: string;
  name?: string;
}

const UserImageAndName: React.FC<Props> = ({ profileOption, blackOption, url, name }) => {
  const [oepnProfile, setOpenProfile] = useState(false);
  const { userImageURL, userName } = useContext<PhotoContextProps>(PhotoContext);

  return (
    <S.UserImageAndName>
      {profileOption && (
        <UserProfile
          handleMouseEnter={() => setOpenProfile(true)}
          handleMouseLeave={() => setOpenProfile(false)}
          oepnProfile={oepnProfile}
        />
      )}

      <S.UserImage
        onMouseEnter={() => setOpenProfile(true)}
        onMouseLeave={() => setOpenProfile(false)}
        src={userImageURL || url}
        alt={userName || name}
      />

      <S.UserName
        isBlack={blackOption}
        onMouseEnter={() => setOpenProfile(true)}
        onMouseLeave={() => setOpenProfile(false)}
      >
        {userName || name}
      </S.UserName>
    </S.UserImageAndName>
  );
};

export default memo(UserImageAndName);

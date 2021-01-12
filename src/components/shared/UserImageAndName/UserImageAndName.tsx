import React, { memo, useState } from 'react';
import styled from 'styled-components';
import UserProfile from './UserProfile';

const S = {
  UserImageAndName: styled.div`
    padding: 20px;
    display: flex;
    align-items: center;
    position: relative;
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
  userImageURL: string;
  userName: string;
  profileOption?: boolean;
  accountName?: string;
  bio?: string;
  portfolio_url?: string;
  blackOption?: boolean | undefined;
}

const UserImageAndName: React.FC<Props> = ({
  userImageURL,
  userName,
  accountName,
  profileOption,
  bio,
  portfolio_url,
  blackOption,
}) => {
  const [oepnProfile, setOpenProfile] = useState(false);

  return (
    <S.UserImageAndName>
      {profileOption && (
        <UserProfile
          handleMouseEnter={() => setOpenProfile(true)}
          handleMouseLeave={() => setOpenProfile(false)}
          oepnProfile={oepnProfile}
          userImageURL={userImageURL}
          userName={userName}
          accountName={accountName}
          bio={bio}
          portfolio_url={portfolio_url}
        />
      )}

      <S.UserImage
        onMouseEnter={() => setOpenProfile(true)}
        onMouseLeave={() => setOpenProfile(false)}
        src={userImageURL}
        alt={userName}
      />

      <S.UserName
        isBlack={blackOption}
        onMouseEnter={() => setOpenProfile(true)}
        onMouseLeave={() => setOpenProfile(false)}
      >
        {userName}
      </S.UserName>
    </S.UserImageAndName>
  );
};

export default memo(UserImageAndName);

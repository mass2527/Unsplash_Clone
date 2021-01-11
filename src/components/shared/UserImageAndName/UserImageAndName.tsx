import React, { useState } from 'react';
import styled from 'styled-components';

const S = {
  UserImageAndName: styled.div`
    padding: 20px;
    display: flex;
    align-items: center;
    position: relative;
  `,

  UserLargeImage: styled.img`
    width: 64px;
    height: 64px;
    border-radius: 100%;
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

  UserName: styled.span`
    color: rgba(255, 255, 255, 0.8);
    font-size: 15px;
    cursor: pointer;

    :hover {
      color: white;
    }
  `,

  ProfileBoxWrapper: styled.div<{ open: boolean }>`
    position: absolute;
    bottom: 40px;
    width: 350px;
    height: 200px;
    cursor: default;
    display: grid;
    place-items: center center;
    pointer-events: ${({ open }) => !open && 'none'};
  `,

  ProfileBox: styled.div<{ open: boolean }>`
    width: 350px;
    height: 150px;
    padding: 20px;
    box-sizing: border-box;
    background-color: white;
    border: 1px solid rgba(0, 0, 0, 0.5);
    border-radius: 5px;
    transition: opacity 0.3s ease-in-out;

    opacity: ${({ open }) => (open ? '1' : '0')};
  `,
};

interface Props {
  userImageURL: string;
  userName: string;
  profileOption?: boolean;
  accountName?: string;
}

const UserImageAndName: React.FC<Props> = ({ userImageURL, userName, accountName, profileOption }) => {
  const [oepnProfile, setOpenProfile] = useState(false);

  return (
    <S.UserImageAndName>
      {profileOption && (
        <S.ProfileBoxWrapper
          open={oepnProfile}
          onMouseEnter={() => setOpenProfile(true)}
          onMouseLeave={() => setOpenProfile(false)}
        >
          <S.ProfileBox open={oepnProfile}>
            <S.UserLargeImage src={userImageURL} alt={userName} />
          </S.ProfileBox>
        </S.ProfileBoxWrapper>
      )}

      <S.UserImage
        onMouseEnter={() => setOpenProfile(true)}
        onMouseLeave={() => setOpenProfile(false)}
        src={userImageURL}
        alt={userName}
      />

      <S.UserName onMouseEnter={() => setOpenProfile(true)} onMouseLeave={() => setOpenProfile(false)}>
        {userName}
      </S.UserName>
    </S.UserImageAndName>
  );
};

export default UserImageAndName;

import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '../Material-UI/Button';

const S = {
  UserProfile: styled.div<{ open: boolean }>`
    position: absolute;
    bottom: 40px;
    width: 280px;
    cursor: default;
    display: grid;
    place-items: end center;
    padding: 20px 0px;
    pointer-events: ${({ open }) => !open && 'none'};
    z-index: 1;
  `,

  Profile: styled.div<{ open: boolean }>`
    width: 280px;
    padding: 20px;
    box-sizing: border-box;
    background-color: white;
    border: 1px solid rgba(0, 0, 0, 0.5);
    border-radius: 5px;
    transition: opacity 0.3s ease-in-out;
    opacity: ${({ open }) => (open ? '1' : '0')};
    display: flex;
    flex-direction: column;
  `,

  ProfileTop: styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 10px;
  `,

  UserLargeImage: styled.img`
    width: 64px;
    height: 64px;
    border-radius: 100%;
    margin-right: 10px;
  `,

  NameAndAccount: styled.div`
    display: flex;
    flex-direction: column;
  `,

  Name: styled.span`
    font-size: 18px;
    color: #111111;
    font-weight: 500;
  `,

  Account: styled.span`
    font-size: 15px;
    color: #767676;
  `,

  ProfileMiddle: styled.div`
    flex: 1;
    padding-bottom: 15px;
  `,

  ProfileBottom: styled.div`
    display: flex;
    flex-direction: column;
  `,

  Bio: styled.span`
    color: #111111;
    font-size: 14px;
  `,

  Link: styled.a`
    all: unset;
  `,
};

interface Props {
  oepnProfile: boolean;
  handleMouseEnter: () => void;
  handleMouseLeave: () => void;
  userImageURL: string;
  userName: string;
  accountName: string | undefined;
  bio: string | undefined;
  portfolio_url: string | undefined;
}

const UserProfile: React.FC<Props> = ({
  oepnProfile,
  handleMouseEnter,
  handleMouseLeave,
  userImageURL,
  userName,
  accountName,
  bio,
  portfolio_url,
}) => {
  return (
    <S.UserProfile open={oepnProfile} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <S.Profile open={oepnProfile}>
        <S.ProfileTop>
          <S.UserLargeImage src={userImageURL} alt={userName} />
          <S.NameAndAccount>
            <S.Name>{userName}</S.Name>
            <S.Account>@{accountName}</S.Account>
          </S.NameAndAccount>
        </S.ProfileTop>
        <S.ProfileMiddle>
          <S.Bio>{bio}</S.Bio>
        </S.ProfileMiddle>
        <S.ProfileBottom>
          <S.Link target="_blank" href={portfolio_url}>
            <Button portfolio_url={portfolio_url} />
          </S.Link>
        </S.ProfileBottom>
      </S.Profile>
    </S.UserProfile>
  );
};

export default UserProfile;

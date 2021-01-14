import React from 'react';
import styled from 'styled-components';

const S = {
  Banner: styled.div`
    position: relative;
    height: 560px;
    border: 1px solid black;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;

    @media (max-width: 768px) {
      height: 310px;
    }

    @media (min-width: 400px) {
      background-image: url('https://images.unsplash.com/photo-1609910276422-d1892a5c6463?ixid=MXwxMjA3fDB8MHxwaG90by1vZi10aGUtZGF5fHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&dpr=1&auto=format%2Ccompress&fit=crop&w=399&h=230');
    }

    @media (min-width: 600px) {
      background-iamge: url('https://images.unsplash.com/photo-1609910276422-d1892a5c6463?ixid=MXwxMjA3fDB8MHxwaG90by1vZi10aGUtZGF5fHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&dpr=2&auto=format%2Ccompress&fit=crop&w=599&h=310');
    }

    @media (min-width: 800px) {
      background-image: url('https://images.unsplash.com/photo-1609910276422-d1892a5c6463?ixid=MXwxMjA3fDB8MHxwaG90by1vZi10aGUtZGF5fHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&dpr=1&auto=format%2Ccompress&fit=crop&w=799&h=594');
    }

    @media (min-width: 1000px) {
      background-image: url('https://images.unsplash.com/photo-1609910276422-d1892a5c6463?ixid=MXwxMjA3fDB8MHxwaG90by1vZi10aGUtZGF5fHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&dpr=2&auto=format%2Ccompress&fit=crop&w=999&h=594');
    }

    @media (min-width: 1200px) {
      background-image: url('https://images.unsplash.com/photo-1609910276422-d1892a5c6463?ixid=MXwxMjA3fDB8MHxwaG90by1vZi10aGUtZGF5fHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&dpr=1&auto=format%2Ccompress&fit=crop&w=1199&h=594');
    }

    @media (min-width: 1400px) {
      background-image: url('https://images.unsplash.com/photo-1609910276422-d1892a5c6463?ixid=MXwxMjA3fDB8MHxwaG90by1vZi10aGUtZGF5fHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&dpr=2&auto=format%2Ccompress&fit=crop&w=1399&h=594');
    }

    @media (min-width: 1600px) {
      background-image: url('https://images.unsplash.com/photo-1609910276422-d1892a5c6463?ixid=MXwxMjA3fDB8MHxwaG90by1vZi10aGUtZGF5fHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&dpr=2&auto=format%2Ccompress&fit=crop&w=1599&h=594');
    }

    @media (min-width: 1800px) {
      background-image: url('https://images.unsplash.com/photo-1609910276422-d1892a5c6463?ixid=MXwxMjA3fDB8MHxwaG90by1vZi10aGUtZGF5fHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&dpr=1&auto=format%2Ccompress&fit=crop&w=1799&h=594');
    }
  `,

  BannerMain: styled.div`
    padding: 144px 12px 152px 12px;
    max-width: 1320px;
    margin: 0px auto;
    width: 100%;
    box-sizing: border-box;
    height: 500px;
    display: grid;
    place-items: center center;

    @media (max-width: 768px) {
      padding: 80px 12px 64px 12px;
      height: 250px;
    }
  `,

  ContentWrapper: styled.article`
    max-width: 864px;
    width: 100%;
    display: flex;
    flex-direction: column;
    color: white;
    z-index: 1;
  `,

  Content: styled.div`
    margin: 0px auto;
  `,

  Title: styled.h1`
    font-size: 46px;

    @media (max-width: 768px) {
      font-size: 24px;
    }
  `,

  Description: styled.p`
    font-size: 18px;
    font-weight: 500;

    margin-top: 16px;
    margin-bottom: 24px;

    @media (max-width: 768px) {
      font-size: 14px;
      margin-top: 8px;
    }
  `,

  Form: styled.form`
    height: 52px;
    flex: 1;
    padding: 1px 2px 1px 12px;
    background-color: white;
    border-radius: 5px;

    @media (max-width: 768px) {
      display: none;
    }
  `,

  Input: styled.input`
    border: none;
    padding: 0px 0px 0px 10px;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    background-color: transparent;
    color: rgba(0, 0, 0, 0.6);
    font-size: 15px;

    :focus {
      outline: none;
    }

    ::placeholder {
      color: rgba(0, 0, 0, 0.6);
    }
  `,

  BannerFooter: styled.div`
    padding: 20px;
    height: 60px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
  `,

  Photographer: styled.span`
    font-size: 13px;
    color: rgba(255, 255, 255, 0.7);
    z-index: 1;
    cursor: pointer;

    :hover {
      color: white;
    }
  `,

  LogoWrapper: styled.div`
    z-index: 1;
  `,

  Logo: styled.img`
    height: 100%;
    width: 150px;
    opacity: 0.8;
    cursor: pointer;

    :hover {
      opacity: 1;
    }
  `,

  Overlay: styled.div`
    position: absolute;
    background-color: rgba(0, 0, 0, 0.5);
    width: 100%;
    height: 100%;
    top: 0;
  `,
};

const Banner: React.FC = () => {
  return (
    <S.Banner>
      <S.BannerMain>
        <S.ContentWrapper>
          <S.Content>
            <S.Title>Unslpash</S.Title>
            <S.Description>
              The internet’s source of freely-usable images.
              <br />
              Powered by creators everywhere.
            </S.Description>
            <S.Form>
              <S.Input type="text" placeholder="Search free high-resolution photos" />
            </S.Form>
          </S.Content>
        </S.ContentWrapper>
      </S.BannerMain>
      <S.BannerFooter>
        <S.Photographer>Photo of the Day by Bradley Dunn</S.Photographer>
        <S.LogoWrapper>
          <a
            target="_blank"
            href="https://www.squarespace.com/website-design?channel=directdisplay&subchannel=unsplashdirect&campaign=us_unsplashhomepageheader_1x1&subcampaign=na&source=national&utm_source=unsplash&utm_medium=directdisplay&utm_campaign=us_display&utm_term=na&utm_content=na"
          >
            <S.Logo src="https://images.unsplash.com/file-1606177908946-d1eed1cbe4f5image" alt="SQUARESPACE" />
          </a>
        </S.LogoWrapper>
      </S.BannerFooter>
      <S.Overlay />
    </S.Banner>
  );
};

export default Banner;

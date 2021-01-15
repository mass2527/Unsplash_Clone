import React, { useEffect, MouseEvent, useRef, useState, memo } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { downloadImageFromURL, trackPhotoDownload, unsplashApi } from '../../../axios/axios';
import DrowdownMenu from '../../shared/Material-UI/DropdownMenu';
import UserImageAndName from '../../shared/UserImageAndName/UserImageAndName';
import PhotoFooter from './PhotoFooter';
import PhotoMiddle from './PhotoMiddle';
import RelatedCollections from './RelatedCollections';
import { ToastContainer, toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { PhotoContext } from '../../../Context/Context';
import Photo from '../../shared/Photo/Photo';

const S = {
  Modal: styled.div<{ top: number }>`
    position: absolute;
    top: ${({ top }) => top}px;
    z-index: 2;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    overflow-y: scroll;
    overflow-x: hidden;
    box-sizing: border-box;
    padding: 40px 120px;
    cursor: zoom-out;

    @media (max-width: 1400px) {
      padding: 40px 70px;
    }
    @media (max-width: 768px) {
      padding: 0px;
    }
  `,

  ModalBox: styled.div`
    width: 100%;
    background-color: white;
    min-height: 120%;
    border-radius: 3px;
    cursor: default;
    display: flex;
    flex-direction: column;
  `,

  PhotoHeader: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: sticky;
    top: -40px;
    background-color: white;
    z-index: 1;

    @media (max-width: 768px) {
      top: 0px;
    }
  `,

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

  RelatedPhotos: styled.div`
    padding: 0px 12px;
  `,

  RelatedPhotoTitle: styled.h4`
    padding-top: 60px;
    padding-bottom: 16px;
    font-weight: 500;
    color: #111111;
    font-size: 18px;
  `,

  RelatedPhotoMain: styled.div``,
};

interface LocationProps {
  photoId: string;
  searchTerm: string;
}

interface PhotoProps {
  id: string;
  user: {
    profile_image: { small: string };
    name: string;
  };
  urls: { full: string; regular: string; small: string; thumb: string };
  color: string;
  alt_description: string;
  location: { title: string };
  description: string;
  related_collections: {
    results: {
      id: string;
      title: string;
      total_photos: number;
      user: { name: string };
      tags: { title: string }[];
      preview_photos: {
        id: string;
        urls: { small: string; regular: string };
      }[];
    }[];
  };
}

const Modal: React.FC = () => {
  const [scrollTop, setScrollTop] = useState(() => window.scrollY);
  const [photo, setPhoto] = useState<PhotoProps>();
  const [relatedPhotos, setRelatedPhotos] = useState([]);
  const [width, setWidth] = useState(window.innerWidth);
  const history = useHistory();
  const modalRef = useRef<HTMLDivElement | null>(null);
  const location = useLocation<LocationProps>();

  useEffect(() => {
    document.body.style.overflowY = 'hidden';

    setScrollTop(window.scrollY);

    async function getUnsplashPhotoById() {
      const { data } = await unsplashApi.getPhotoById(location.state.photoId);
      const {
        data: { results },
      } = await unsplashApi.getRelatedPhotosById(location.state.photoId);
      console.log('realtedPhotos>>>', results);
      setPhoto(data);
      setRelatedPhotos(results);
    }
    getUnsplashPhotoById();

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('resize', () => handleResize(window.scrollY));
    return () => {
      window.removeEventListener('resize', () => handleResize(window.scrollY));
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflowY = 'scroll';
    };
    // eslint-disable-next-line
  }, [location.state.photoId]);

  function handleResize(n: number) {
    setScrollTop(n);
    setWidth(window.innerWidth);
  }

  function handleKeyDown(e: KeyboardEvent) {
    if (e.key !== 'Escape') return;
    if (!location.state?.searchTerm) {
      history.push('/');
    } else {
      // history.push(`/s/photos/${location.state.searchTerm.replaceAll(' ', '-')}`);
      history.goBack();
    }
  }

  function handleModalClick(e: MouseEvent<HTMLDivElement>) {
    if (e.target !== modalRef.current) return;
    if (!location.state?.searchTerm) {
      history.push('/');
    } else {
      // history.push(`/s/photos/${location.state.searchTerm.replaceAll(' ', '-')}`);
      history.goBack();
    }
  }

  async function downloadImage(size: string) {
    if (!photo) return;

    let downloadURL;

    if (size === 'full') {
      downloadURL = photo.urls.full;
    } else if (size === 'regular') {
      downloadURL = photo.urls.regular;
    } else {
      downloadURL = photo.urls.small;
    }

    try {
      await downloadImageFromURL(downloadURL, photo.alt_description, photo.user.name);

      toast(
        <S.Container>
          <S.ContainerLeft>
            <S.Image src={photo.urls.small} alt={photo.alt_description} />
          </S.ContainerLeft>
          <S.ContainerRight>
            <S.Title>Say thanks 🙌</S.Title>
            <S.Greet>Give a shoutout to {photo.user.name} </S.Greet>
          </S.ContainerRight>
        </S.Container>
      );
    } catch (error) {
      alert(error);
    } finally {
      // Unsplash recommends API user to send request for increasing number of downloads of the picture
      trackPhotoDownload(photo.id);
    }
  }

  return (
    <S.Modal ref={modalRef} onClick={handleModalClick} top={scrollTop}>
      <S.ModalBox>
        <S.PhotoHeader>
          {photo && (
            <>
              <UserImageAndName url={photo.user.profile_image.small} name={photo.user.name} blackOption />
              <DrowdownMenu downloadImage={downloadImage} />
            </>
          )}
        </S.PhotoHeader>
        {photo && (
          <PhotoMiddle imageURL={photo.urls.full} color={photo.color} alt_description={photo.alt_description} />
        )}
        {photo && <PhotoFooter location={photo.location.title} description={photo.description} />}

        {relatedPhotos.length !== 0 && (
          <S.RelatedPhotos>
            <S.RelatedPhotoTitle>Rleated photos</S.RelatedPhotoTitle>
            <S.RelatedPhotoMain>
              <ResponsiveMasonry columnsCountBreakPoints={{ 0: 2, 1157: 3 }}>
                <Masonry gutter={width <= 768 ? '12px' : '24px'}>
                  {relatedPhotos
                    .slice(0, 18)
                    .map(
                      ({
                        id,
                        urls: { raw },
                        user: {
                          profile_image: { large },
                          name,
                          username,
                          bio,
                          portfolio_url,
                        },
                        color,
                      }) => (
                        <PhotoContext.Provider
                          value={{
                            userImageURL: large,
                            userName: name,
                            accountName: username,
                            bio: bio,
                            portfolio_url: portfolio_url,
                          }}
                        >
                          <Photo
                            key={id}
                            imageURL={raw}
                            userImageURL={large}
                            userName={name}
                            accountName={username}
                            bio={bio}
                            portfolio_url={portfolio_url}
                            id={id}
                            color={color}
                            noHeaderOption
                          />
                        </PhotoContext.Provider>
                      )
                    )}
                </Masonry>
              </ResponsiveMasonry>
            </S.RelatedPhotoMain>
          </S.RelatedPhotos>
        )}

        {photo && <RelatedCollections collections={photo.related_collections.results} />}

        <ToastContainer
          position="bottom-center"
          autoClose={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          limit={1}
          transition={Zoom}
        />
      </S.ModalBox>
    </S.Modal>
  );
};

export default memo(Modal);

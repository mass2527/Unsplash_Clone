import React, { useCallback, useEffect, MouseEvent, useRef, useState, memo } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { unsplashApi } from '../../../axios/axios';
import UserImageAndName from '../../shared/UserImageAndName/UserImageAndName';
import PhotoFooter from './PhotoFooter';
import PhotoMiddle from './PhotoMiddle';
import RelatedCollections from './RelatedCollections';

const S = {
  Modal: styled.div<{ top: number }>`
    position: absolute;
    top: ${({ top }) => top}px;
    z-index: 2;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    overflow-y: scroll;
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
    border-radius: 3px;
    cursor: default;
    display: flex;
    flex-direction: column;
  `,

  PhotoHeader: styled.div`
    position: sticky;
    top: -40px;
    background-color: white;

    @media (max-width: 768px) {
      top: 0px;
    }
  `,
};

interface Props {}

interface LocationProps {
  photoId: string;
}

interface PhotoProps {
  user: {
    profile_image: { small: string };
    name: string;
  };
  urls: { full: string };
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
        urls: { full: string };
      }[];
    }[];
  };
}

const Modal: React.FC<Props> = () => {
  const [scrollTop, setScrollTop] = useState(() => window.scrollY);
  const [photo, setPhoto] = useState<PhotoProps>();
  const history = useHistory();
  const modalRef = useRef<HTMLDivElement | null>(null);
  const location = useLocation<LocationProps>();

  const handleResize = useCallback(
    (n: number) => {
      setScrollTop(n);
    },
    [setScrollTop]
  );

  useEffect(() => {
    async function getUnsplashPhotoById() {
      const { data } = await unsplashApi.getPhotoById(location.state.photoId);

      setPhoto(data);
    }
    getUnsplashPhotoById();

    document.body.style.overflowY = 'hidden';

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('resize', () => handleResize(window.scrollY));
    return () => {
      window.removeEventListener('resize', () => handleResize(window.scrollY));
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflowY = 'scroll';
    };
  }, []);

  function handleKeyDown(e: KeyboardEvent) {
    if (e.key !== 'Escape') return;
    history.goBack();
  }

  function handleModalClick(e: MouseEvent<HTMLDivElement>) {
    if (e.target !== modalRef.current) return;
    history.goBack();
  }

  return (
    <S.Modal ref={modalRef} onClick={handleModalClick} top={scrollTop}>
      <S.ModalBox>
        <S.PhotoHeader>
          {photo && (
            <UserImageAndName userImageURL={photo.user.profile_image.small} userName={photo.user.name} blackOption />
          )}
        </S.PhotoHeader>
        {photo && (
          <PhotoMiddle imageURL={photo.urls.full} color={photo.color} alt_description={photo.alt_description} />
        )}
        {photo && <PhotoFooter location={photo.location.title} description={photo.description} />}
        {photo && <RelatedCollections collections={photo.related_collections.results} />}
      </S.ModalBox>
    </S.Modal>
  );
};

export default memo(Modal);

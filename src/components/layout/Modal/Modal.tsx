import React, { useCallback, useEffect, MouseEvent, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

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
    height: 100%;
    background-color: white;
    border-radius: 3px;
    cursor: default;
    display: flex;
    flex-direction: column;
  `,

  PhotoHeader: styled.div``,
};

interface Props {}

const Modal: React.FC<Props> = () => {
  const [scrollTop, setScrollTop] = useState(() => window.scrollY);
  const history = useHistory();
  const modalRef = useRef<HTMLDivElement | null>(null);

  const handleResize = useCallback(
    (n: number) => {
      setScrollTop(n);
    },
    [setScrollTop]
  );

  useEffect(() => {
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
        <S.PhotoHeader></S.PhotoHeader>
      </S.ModalBox>
    </S.Modal>
  );
};

export default Modal;

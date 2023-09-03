import React, { useEffect } from 'react';
import { Overlay, ModalContainer } from './Modal.styled';

export function Modal({ src, alt, onClose }) {
  useEffect(() => {
    const handleKeyPress = evt => {
      if (evt.code === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [onClose]);

  const handleCloseClick = evt => {
    if (evt.target === evt.currentTarget) {
      onClose();
    }
  };

  return (
    <Overlay onClick={handleCloseClick}>
      <ModalContainer>
        <img src={src} alt={alt} />
      </ModalContainer>
    </Overlay>
  );
}

// ImageGalleryItem.jsx
import {
  ImageGalleryItemContainer,
  ImageGalleryItemImage,
} from './ImageGalleryItem.styled'; // Імпортуємо стилі

export function ImageGalleryItem({ src, alt, onClick }) {
  return (
    <ImageGalleryItemContainer>
      <ImageGalleryItemImage src={src} alt={alt} onClick={onClick} />
    </ImageGalleryItemContainer>
  );
}

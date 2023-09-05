import { ImageGalleryContainer } from './ImageGallery.styled';

import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';

export function ImageGallery({ images, handleImageClick }) {
  return (
    <ImageGalleryContainer>
      {images.map(image => (
        <ImageGalleryItem
          key={image.id}
          src={image.webformatURL}
          alt={image.id}
          onClick={() => handleImageClick(image.largeImageURL)}
        />
      ))}
    </ImageGalleryContainer>
  );
}

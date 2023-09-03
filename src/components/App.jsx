import { Wrapper } from './App.styled';

import React, { Component } from 'react';
import { Element, scroller } from 'react-scroll';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';
import { Loader } from './Loader/Loader';
import { fetchImages } from './Api';

export class App extends Component {
  state = {
    query: '',
    images: [],
    page: 1,
    selectedImage: null,
    isLoading: false,
  };

  handleSubmit = query => {
    const timestamp = Date.now();
    const uniqueQuery = `${timestamp}/${query}`;
    this.setState({
      query: uniqueQuery,
      images: [],
      page: 1,
    });
  };

  handleLoadMore = () => {
    this.setState(
      prevState => ({
        page: prevState.page + 1,
      }),
      () => {
        // Отримуємо поточне положення галереї
        const currentGalleryPosition = window.scrollY;

        // Після оновлення сторінки, прокручуйте до нових картинок
        scroller.scrollTo('image-gallery', {
          duration: 800, // тривалість прокрутки в мілісекундах
          smooth: 'easeInOutQuart', // тип прокрутки
          offset: currentGalleryPosition + 700, // прокручувати на поточне положення галереї
        });
      }
    );
  };

  handleImageClick = selectedImage => {
    this.setState({ selectedImage });
  };

  handleCloseModal = () => {
    this.setState({ selectedImage: null });
  };

  async componentDidUpdate(prevProps, prevState) {
    if (
      prevState.query !== this.state.query ||
      prevState.page !== this.state.page
    ) {
      this.setState({ isLoading: true });

      try {
        const images = await fetchImages(this.state.query, this.state.page);
        this.setState(prevState => ({
          images: [...prevState.images, ...images],
        }));
      } catch (error) {
        console.error('Error fetching images:', error);
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  render() {
    const { images, selectedImage, isLoading } = this.state;

    return (
      <Wrapper>
        <Searchbar onSubmit={this.handleSubmit} />
        <Element name="image-gallery">
          <ImageGallery>
            {images.map(image => (
              <ImageGalleryItem
                key={image.id}
                src={image.webformatURL}
                alt={image.id}
                onClick={() => this.handleImageClick(image.largeImageURL)}
              />
            ))}
          </ImageGallery>
        </Element>
        {isLoading && <Loader />}
        {images.length > 0 && <Button onClick={this.handleLoadMore} />}
        {selectedImage && (
          <Modal
            src={selectedImage}
            alt={selectedImage}
            onClose={this.handleCloseModal}
          />
        )}
      </Wrapper>
    );
  }
}

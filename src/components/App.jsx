import { Wrapper } from './App.styled';

import React, { Component } from 'react';
import { Element, scroller } from 'react-scroll';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
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
    randomId: null,
  };

  handleSubmit = query => {
    const randomId = Math.random();
    this.setState({
      query: `${randomId}/${query}`,
      images: [],
      page: 1,
      randomId: randomId,
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
      prevState.page !== this.state.page ||
      prevState.randomId !== this.state.randomId // Додано перевірку randomID
    ) {
      this.setState({ isLoading: true });

      try {
        const { hits, totalHits } = await fetchImages(
          this.state.query,
          this.state.page
        );

        this.setState(prevState => ({
          images: [...prevState.images, ...hits],
          totalHits: totalHits,
        }));
      } catch (error) {
        console.error('Error fetching images:', error);
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  render() {
    const { images, selectedImage, isLoading, totalHits } = this.state;

    return (
      <Wrapper>
        <Searchbar onSubmit={this.handleSubmit} />
        <Element name="image-gallery">
          <ImageGallery
            images={images}
            handleImageClick={this.handleImageClick}
          ></ImageGallery>
        </Element>
        {isLoading && <Loader />}
        {images.length > 0 && images.length < totalHits && (
          <Button onClick={this.handleLoadMore} />
        )}

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

import React, { Component } from 'react';
import { Overlay, ModalContainer } from './Modal.styled';

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyPress);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyPress);
  }

  handleKeyPress = evt => {
    if (evt.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleCloseClick = evt => {
    if (evt.target === evt.currentTarget) {
      this.props.onClose();
    }
  };

  render() {
    const { src, alt } = this.props;

    return (
      <Overlay onClick={this.handleCloseClick}>
        <ModalContainer>
          <img src={src} alt={alt} />
        </ModalContainer>
      </Overlay>
    );
  }
}

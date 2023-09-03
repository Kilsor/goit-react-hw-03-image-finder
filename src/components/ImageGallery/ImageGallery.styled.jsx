import styled from 'styled-components';

export const ImageGalleryContainer = styled.ul`
  display: grid;
  max-width: calc(100% - 496px);
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  grid-gap: 16px;
  margin-top: 8px;
  margin-bottom: 0;
  padding: 0;
  list-style: none;
  margin-left: auto;
  margin-right: auto;
`;

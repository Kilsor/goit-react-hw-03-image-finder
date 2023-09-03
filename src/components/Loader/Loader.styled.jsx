import styled from 'styled-components';

export const StyledLoader = styled.div`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  display: block;
  margin: 15px auto;
  position: relative;
  background: #000000;
  box-shadow: -24px 0 #000000, 24px 0 #000000;
  box-sizing: border-box;
  animation: shadowPulse 2s linear infinite;

  @keyframes shadowPulse {
    33% {
      background: #000000;
      box-shadow: -24px 0 #ff3d00, 24px 0 #000000;
    }
    66% {
      background: #ff3d00;
      box-shadow: -24px 0 #000000, 24px 0 #000000;
    }
    100% {
      background: #000000;
      box-shadow: -24px 0 #000000, 24px 0 #ff3d00;
    }
  }
`;

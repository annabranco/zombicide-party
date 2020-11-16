import styled from '@emotion/styled';
import { css, keyframes } from '@emotion/core';

export const MenuScreen = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 100vh;
  width: 100%;
  background: #232222;

  ${({ img, position = 'center top' }) => css`
    background-image: ${`url(${img})`};
    background-position: ${position};
    background-size: 100%;
    background-repeat: no-repeat;
  `}
`;
MenuScreen.displayName = 'MenuScreen';

export const MainTitle = styled.h1`
  z-index: 5;
  margin: 80px auto 30px;
  font-size: 5rem;
  color: white;
  text-shadow: 0 0 2px black;
`;
MenuScreen.displayName = 'MenuScreen';

export const ActionButton = styled.button`
  z-index: 5;
  margin: 20px auto;
  width: 300px;
  padding: 10px 25px;
  font-family: 'Grandstander', cursive;
  font-size: 2.5rem;
  background: red;
  cursor: pointer;
`;
ActionButton.displayName = 'ActionButton';

const ThunderFlash = keyframes`
  5% {
   background: rgba(255, 255, 255, 0.5);
  }
  6% {
    background: rgba(255, 255, 255, 0.7);
  }
  7% {
   background: rgba(255, 255, 255, 0.9);
  }
  8% {
   background: rgba(255, 255, 255, 0.7);
  }
  9% {
    background: rgba(255, 255, 255, 0.5);
  }
  10% {
   background: none;
  }
  11% {
   background: none;
  }
  12% {
   background: rgba(255, 255, 255, 0.7);
  }
  13% {
    background: rgba(255, 255, 255, 0.8);
  }
  14% {
   background: rgba(255, 255, 255, 0.9);
  }
  15% {
   background: rgba(255, 255, 255, 0.8);
  }
  16% {
    background: rgba(255, 255, 255, 0.7);
  }
  17% {
   background: none;
  }
  59% {
   background: none;
  }
  60% {
   background: rgba(255, 255, 255, 0.7);
  }
  61% {
    background: rgba(255, 255, 255, 0.8);
  }
  62% {
   background: rgba(255, 255, 255, 0.9);
  }
  63% {
   background: rgba(255, 255, 255, 0.8);
  }
  64% {
    background: rgba(255, 255, 255, 0.7);
  }
  65% {
   background: none;
  }



`;

export const ThunderOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  animation-name: ${({ testSound }) => testSound && ThunderFlash};
  animation-duration: 20s;
  animation-iteration-count: infinite;
  animation-fill-mode: forwards;
`;
ThunderOverlay.displayName = 'ThunderOverlay';

export const Version = styled.p`
  position: absolute;
  bottom: 50px;
  right: 100px;
  font-size: 0.8rem;
  color: white;
`;
Version.displayName = 'Version';

export const TestButton = styled(ActionButton)`
  font-size: 1rem;
  padding: 5px;
  background: white;
`;
TestButton.displayName = 'TestButton';

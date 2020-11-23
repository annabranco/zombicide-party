import styled from '@emotion/styled';
import { css, keyframes } from '@emotion/core';
import { Link } from 'react-router-dom';

const ThunderFlash = keyframes`
  3% {
   background: rgba(255, 255, 255, 0.4);
  }
  4% {
   background: rgba(255, 255, 255, 0.6);
  }
  5% {
    background: rgba(255, 255, 255, 0.4);
  }
  6% {
   background: none;
  }
  7% {
   background: rgba(255, 255, 255, 0.5);
  }
  8% {
    background: rgba(255, 255, 255, 0.6);
  }
  9% {
   background: rgba(255, 255, 255, 0.7);
  }
  11% {
   background: rgba(255, 255, 255, 0.6);
  }
  12% {
    background: rgba(255, 255, 255, 0.5);
  }
  13% {
   background: none;
  }
  53% {
   background: none;
  }
  54% {
   background: rgba(255, 255, 255, 0.7);
  }
  55% {
    background: rgba(255, 255, 255, 0.8);
  }
  56% {
   background: rgba(255, 255, 255, 0.9);
  }
  57% {
   background: rgba(255, 255, 255, 0.8);
  }
  58% {
    background: rgba(255, 255, 255, 0.7);
  }
  59% {
   background: none;
  }
`;

export const ActionButton = styled.button`
  label: ActionButton;
  margin: 20px auto;
  width: 300px;
  padding: 10px 25px;
  font-family: 'Grandstander', cursive;
  font-size: 2.5rem;
  background: red;
  cursor: pointer;
`;
ActionButton.displayName = 'ActionButton';

export const MenuScreen = styled.div`
  label: MenuScreen;
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
  label: MainTitle;
  z-index: 5;
  margin: 80px auto 30px;
  font-size: 5rem;
  color: white;
  text-shadow: 0 0 2px black;
`;
MenuScreen.displayName = 'MenuScreen';

export const StyledLink = styled(Link)`
  label: StyledLink;
  z-index: 5;
`;
StyledLink.displayName = 'Link';

export const TestButton = styled(ActionButton)`
  label: TestButton;
  z-index: 5;
  font-size: 1rem;
  padding: 5px;
  background: white;
`;
TestButton.displayName = 'TestButton';

export const ThunderOverlay = styled.div`
  label: ThunderOverlay;
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
  label: Version;
  position: absolute;
  bottom: 50px;
  right: 100px;
  font-size: 0.8rem;
  color: white;
`;
Version.displayName = 'Version';

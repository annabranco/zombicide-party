import styled from '@emotion/styled';
import { css, keyframes } from '@emotion/core';
import { Link } from 'react-router-dom';
import { Appear } from '../../styles';

const ThunderFlash = keyframes`
  3% {
   background: rgba(255, 255, 255, 0.3);
  }
  4% {
   background: rgba(255, 255, 255, 0.5);
  }
  5% {
    background: rgba(255, 255, 255, 0.3);
  }
  6% {
   background: none;
  }
  7% {
   background: rgba(255, 255, 255, 0.3);
  }
  8% {
    background: rgba(255, 255, 255, 0.4);
  }
  9% {
   background: rgba(255, 255, 255, 0.5);
  }
  11% {
   background: rgba(255, 255, 255, 0.4);
  }
  12% {
    background: rgba(255, 255, 255, 0.3);
  }
  13% {
   background: none;
  }
  53% {
   background: none;
  }
  54% {
   background: rgba(255, 255, 255, 0.5);
  }
  55% {
    background: rgba(255, 255, 255, 0.6);
  }
  56% {
   background: rgba(255, 255, 255, 0.7);
  }
  57% {
   background: rgba(255, 255, 255, 0.6);
  }
  58% {
    background: rgba(255, 255, 255, 0.5);
  }
  59% {
   background: none;
  }
`;

export const ButtonsArea = styled.div`
  label: ButtonsArea;
  z-index: 5;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  ${({ delay }) =>
    delay &&
    css`
      animation-name: ${Appear};
      animation-delay: 3s;
      animation-duration: 3s;
      animation-iteration-count: 1;
      animation-fill-mode: both;
    `}
`;
ButtonsArea.displayName = 'ButtonsArea';

export const LogoArea = styled.div`
  label: LogoArea;
  position: absolute;
  top: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
`;
LogoArea.displayName = 'LogoArea';

export const MenuScreen = styled.div`
  label: MenuScreen;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  height: 100vh;
  width: 100%;
  background: #232222;
  filter: ${({ type }) => type === 'main' && 'brightness(0.7) contrast(2)'};

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
  z-index: 10;
  margin-top: -35px;
  margin-right: 10px;
  font-size: 3.5rem;
  color: white;
  text-shadow: 0 0 2px black;
  font-family: Crackhouse;
  text-shadow: 0 0 2px red;
`;
MenuScreen.displayName = 'MenuScreen';

export const SelectionButton = styled.button`
  label: SelectionButton;
  margin: 20px auto;
  width: 300px;
  padding: 10px 25px;
  font-family: 'Grandstander', cursive;
  font-size: 2.5rem;
  border-radius: 20px;
  background: red;
  cursor: pointer;
`;
SelectionButton.displayName = 'SelectionButton';

export const StyledLink = styled(Link)`
  label: StyledLink;
  z-index: 5;
`;
StyledLink.displayName = 'Link';

export const TestButton = styled(SelectionButton)`
  label: TestButton;
  z-index: 5;
  font-size: 1rem;
  padding: 5px;
  background: white;
  height: 20px;
  width: 120px;
  border-radius: 10px;
  line-height: 0.5;
`;
TestButton.displayName = 'TestButton';

export const ThunderOverlay = styled.div`
  label: ThunderOverlay;
  z-index: 4;
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

export const ZombicideLogo = styled.img`
  label: ZombicideLogo;
  width: 500px;
  display: block;
`;
ZombicideLogo.displayName = 'ZombicideLogo';

export const ZombieIntro = styled.img`
  label: ZombieIntro;
  position: absolute;
  top: 60px;
  width: 500px;
  animation-name: ${Appear};
  animation-duration: 4s;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
`;
ZombieIntro.displayName = 'ZombieIntro';

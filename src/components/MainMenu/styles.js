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
      animation-delay: 2s;
      animation-duration: 3s;
      animation-iteration-count: 1;
      animation-fill-mode: both;
    `}
  @media all and (min-width: 768px) {
    flex-direction: row;
  }
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
  width: 80%;

  @media all and (min-width: 768px) {
    align-items: flex-end;
    justify-content: center;
    width: auto;
  }
`;
LogoArea.displayName = 'LogoArea';

export const MainTitle = styled.h1`
  label: MainTitle;
  margin-top: -25px;
  margin-right: 10px;
  font-size: 2rem;
  color: white;
  text-shadow: 0 0 2px black;
  font-family: Crackhouse;
  text-shadow: 0 0 2px red;

  @media all and (min-width: 768px) {
    margin-top: -35px;
    font-size: 3.5rem;
  }
`;
MainTitle.displayName = 'MenuScreen';

export const MenuScreen = styled.div`
  label: MenuScreen;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  height: ${`${window.innerHeight}px`};
  width: 100%;
  background: #232222;
  filter: ${({ type }) => type === 'main' && 'brightness(0.7) contrast(2)'};

  ${({ img, position = 'center top' }) => css`
    background-image: ${`url(${img})`};
    background-position: ${position};
    background-size: auto 100%;
    background-repeat: no-repeat;

    @media all and (min-width: 768px) {
      height: 100vh;
      background-size: 100% 100%;
    }
  `}
`;
MenuScreen.displayName = 'MenuScreen';

export const SelectionButton = styled.button`
  label: SelectionButton;
  margin: 10px auto;
  width: 250px;
  padding: 2px 25px;
  font-family: Crackhouse, 'Grandstander', cursive;
  font-size: 2rem;
  border-radius: 20px;
  background: red;
  cursor: pointer;
  text-transform: uppercase;

  @media all and (min-width: 768px) {
    width: 300px;
    background-size: 100% 100%;
    margin: 20px 40px;
    padding: 10px 25px;
    font-size: 2.5rem;
  }

  &: hover {
    color: yellow;
    folter: brightness(1.8);
  }
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
  font-size: 0.8rem;
  padding: 5px;
  background: white;
  height: 20px;
  width: 120px;
  border-radius: 10px;
  line-height: 0.5;
  font-family: 'Grandstander', cursive;

  @media all and (min-width: 768px) {
    width: 180px;
    font-size: 1rem;
    line-height: 0.2;
  }
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
  bottom: 10px;
  right: 10px;
  font-size: 0.9rem;
  color: white;

  @media all and (min-width: 768px) {
    bottom: 20px;
    right: 40px;
  }
`;
Version.displayName = 'Version';

export const ZombicideLogo = styled.img`
  label: ZombicideLogo;
  width: 100%;
  display: block;

  @media all and (min-width: 768px) {
    width: 400px;
  }
`;
ZombicideLogo.displayName = 'ZombicideLogo';

export const ZombieIntro = styled.img`
  label: ZombieIntro;
  position: absolute;
  top: 60px;
  width: 300px;
  animation-name: ${Appear};
  animation-duration: 4s;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;

  @media all and (min-width: 768px) {
    top: 40px;
    width: 400px;
  }
  @media all and (min-width: 1500px) {
    top: 60px;
    width: 500px;
  }
`;
ZombieIntro.displayName = 'ZombieIntro';

import styled from '@emotion/styled';
import { css, keyframes } from '@emotion/core';
import { Link } from 'react-router-dom';
import { Appear, Shadow } from '../../styles';

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
  z-index: 12;
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

  ${({ blockedScreen }) =>
    blockedScreen &&
    css`
      margin-top: -40px;
      margin-right: -300px;
      font-size: 3.5rem;
    `}

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
  background: linear-gradient(red, tomato, maroon);
  cursor: pointer;
  text-transform: uppercase;
  outline: none;
  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.6),
    inset 1px 1px 3px rgba(255, 0, 0, 0.5);
  border: 1px solid black;

  @media all and (min-width: 768px) {
    width: 200px;
    background-size: 100% 100%;
    margin: 20px 40px;
    padding: 10px 25px;
  }

  @media all and (min-width: 1200px) {
    width: 180px;
    font-size: 1.6rem;
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
  box-shadow: 0 1px 10px 0 rgba(0, 0, 0, 0.6),
    inset 1px 1px 3px rgba(255, 0, 0, 0.5);

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

  ${({ blockedScreen }) =>
    blockedScreen &&
    css`
      margin-top: -70px;
      width: 60%;
    `}

  @media all and (min-width: 768px) {
    width: 400px;
  }
`;
ZombicideLogo.displayName = 'ZombicideLogo';

export const ZombieIntro = styled.img`
  label: ZombieIntro;
  z-index: 11;
  position: absolute;
  top: 60px;
  width: 300px;
  animation-name: ${Appear};
  animation-duration: 4s;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;

  @media all and (min-width: 768px) {
    top: 150px;
    width: 576px;
  }

  /* @media all and (min-height: 1000px) {
    top: 15%;
    width: 75%;
  } */

  @media all and (min-width: 1024px) {
    top: 100px;
    width: 400px;
  }

  @media all and (min-width: 1200px) {
    top: 40px;
    width: 400px;
  }

  @media all and (min-width: 1500px) {
    top: 60px;
    width: 500px;
  }
`;
ZombieIntro.displayName = 'ZombieIntro';

export const ZombieIntroShadow = styled(ZombieIntro)`
  label: ZombieIntroShadow;
  position: absolute;
  z-index: 10;
  top: 60px;
  width: 300px;
  margin: 60px 0 0 -60px;

  animation-name: ${Appear};
  animation-duration: 4s;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
  ${Shadow}

  @media all and (min-width: 768px) {
    top: 460px;
    height: 480px;
    width: 576px;
    margin: 0 0 0 -75px;
  }

  /* @media all and (min-height: 1000px) {
    top: 17%;
    width: 75%;
    margin: 100px 0 0 -105px;
  } */

  @media all and (min-width: 1024px) {
    top: 100px;
    width: 400px;
    margin: 85px 0 0 -82px;
  }

  @media all and (min-width: 1200px) {
    top: 260px;
    height: 340px;
    width: 400px;
    margin: 0 0 0 -50px;
  }

  @media all and (min-width: 1500px) {
    top: 360px;
    height: 390px;
    width: 500px;
    margin: 0 0 0 -60px;
  }
`;
ZombieIntroShadow.displayName = 'ZombieIntroShadow';

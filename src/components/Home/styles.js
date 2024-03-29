import styled from '@emotion/styled';
import { css, keyframes } from '@emotion/core';
import { Link } from 'react-router-dom';
import { Appear, Shadow, TourHighlight } from '../../styles';
import { DEFEAT, VICTORY } from '../../constants';

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
  z-index: 20;
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
  z-index: 13;
  position: absolute;
  top: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  width: 80%;

  ${({ nightShift }) =>
    nightShift &&
    css`
      top: -10px;
      animation-name: ${Appear};
      animation-delay: 4s;
      animation-duration: 3s;
      animation-iteration-count: 1;
      animation-fill-mode: both;
    `}

  @media all and (min-width: 701px) {
    align-items: flex-end;
    justify-content: center;
    width: auto;

    ${({ nightShift }) =>
      nightShift &&
      css`
        top: 10px;
      `}
  }

  @media all and (min-width: 1200px) {
    ${({ nightShift }) =>
      nightShift &&
      css`
        top: 0;
      `}
  }

  @media all and (min-width: 1400px) {
    ${({ nightShift }) =>
      nightShift &&
      css`
        top: 20px;
      `}
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
  z-index: 66;
  top: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  height: ${`${window.innerHeight - 1}px`};
  width: 100%;
  background: #232222;
  overflow: hidden;

  filter: ${({ type }) => {
    if (type === 'main') {
      return 'brightness(0.7) contrast(2)';
    }
    if (type === VICTORY) {
      return 'brightness(0.9) contrast(1.5)  grayscale(0.5)';
    }
    if (type === DEFEAT) {
      return 'brightness(0.7) grayscale(0.6) contrast(2);';
    }
    return 'none';
  }};

  ${({ img, position = 'center top' }) => css`
    background-image: ${`url(${img})`};
    background-position: ${position};
    background-size: auto 100%;
    background-repeat: no-repeat;

    @media all and (min-width: 701px) {
      background-size: 100% 100%;
    }
  `}

  ${({ dynamic }) =>
    dynamic &&
    css`
      position: fixed;
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
    filter: brightness(1.2);
  }

  ${({ disabled }) =>
    disabled &&
    css`
      &: hover {
        color: lightgray;
        filter: none;
      }
    `}

  ${({ tourMode }) =>
    tourMode &&
    css`
      ${TourHighlight};
    `}
`;
SelectionButton.displayName = 'SelectionButton';

export const StyledLink = styled(Link)`
  label: StyledLink;
  z-index: 5;
`;
StyledLink.displayName = 'Link';

export const TestButton = styled(SelectionButton)`
  label: TestButton;
  z-index: 15;
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

  &:hover {
    color: green;
  }

  ${({ tourMode }) =>
    tourMode &&
    css`
      ${TourHighlight};
    `}

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
  font-family: 'Grandstander', cursive;
  font-size: 0.9rem;
  color: white;

  @media all and (min-width: 768px) {
    bottom: 55px;
    right: unset;
    left: 50%;
    transform: translate(-50%, 0);
  }
`;
Version.displayName = 'Version';

export const WarningButton = styled.div`
  label: WarningButton;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 10px 10px;
  min-height: 40px;
  width: 60%;
  background: gray;
  padding: 5px 15px;
  background: red;
  box-shadow: 0 1px 10px 0 rgba(0, 0, 0, 0.6),
    inset 1px 1px 3px rgba(255, 0, 0, 0.5);
  text-transform: uppercase;
  font-size: 1.3rem;
  font-weight: 700;
  color: black;
  font-family: 'Grandstander', cursive;
  transition: all ease 0.2s;
  cursor: pointer;

  &: hover {
    color: yellow;
    filter: brightness(1.2);
  }
`;
WarningButton.displayName = 'WarningButton';

export const WarningMessage = styled.p`
  label: WarningMessage;
  width: 100%;
  margin-bottom: 30px;
  font-size: 1.2rem;
  font-weight: 700;
  color: black;
  text-shadow: 0 0 2px white;
  text-align: center;
  line-height: 2;
  font-family: 'Cairo', sans-serif;
`;
WarningMessage.displayName = 'WarningMessage';

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

export const ZombieImage = styled.img`
  label: ZombieImage;
  z-index: 15;
  position: absolute;
  top: 10%;
  width: 300px;
  animation-duration: 4s;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;

  ${({ nightShift }) =>
    !nightShift &&
    css`
      animation-name: ${Appear};
    `}

  @media (min-width: 320px) and (min-height: 640px) {
    top: 20%;
    width: 90%;
  }

  @media all and (min-width: 701px) {
    top: 150px;
    width: 576px;
  }

  @media all and (min-width: 1024px) {
    top: unset;
    bottom: 5%;
    width: 450px;
  }

  @media (min-width: 320px) and (min-height: 1300px) {
    top: 5%;
    width: 80%;
  }

  @media all and (min-width: 1200px) {
    top: 40px;
    width: 400px;
  }

  @media (min-width: 1300px) and (min-height: 1024px) {
    top: 160px;
    width: 600px;
  }

  @media all and (min-width: 1400px) {
    top: unset;
    bottom: 10%;
    width: 500px;
  }
`;
ZombieImage.displayName = 'ZombieImage';

export const ZombieImageShadow = styled(ZombieImage)`
  label: ZombieImageShadow;
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

  ${({ nightShift }) =>
    nightShift &&
    css`
      top: unset;
      bottom: -270px;
      width: 320px;
      transform: skew(10deg, -7deg) rotate(7deg) scaleY(0.4) scaleX(0.85)
        rotateX(180deg);
    `}

  @media (min-width: 320px) and (min-height: 640px) {
    top: 10%;
    height: 30%;
    width: 90%;
    margin: 230px 0 0 -50px;

    ${({ nightShift }) =>
      nightShift &&
      css`
        top: unset;
        bottom: 11%;
        width: 400px;
        margin: 0 0 0 8px;
      `}
  }

  @media all and (min-width: 701px) {
    top: 460px;
    height: 480px;
    width: 576px;
    margin: 0 0 0 -75px;

    ${({ nightShift }) =>
      nightShift &&
      css`
        top: unset;
        bottom: -160px;
        width: 540px;
        margin: 0 0 0 14px;
      `}
  }

  @media all and (min-width: 1024px) {
    top: 100px;
    width: 400px;
    margin: 85px 0 0 -82px;

    ${({ nightShift }) =>
      nightShift &&
      css`
        top: unset;
        bottom: -25%;
        width: 540px;
        margin: 0 0 0 14px;
      `}
  }

  /* ipad pro */
  @media (min-width: 1024px) and (min-height: 1300px) {
    top: 5%;
    height: 480px;
    width: 80%;
    margin: 595px 0 0 -82px;
  }

  @media all and (min-width: 1200px) {
    top: 260px;
    height: 340px;
    width: 400px;
    margin: 0 0 0 -50px;

    ${({ nightShift }) =>
      nightShift &&
      css`
        top: unset;
        bottom: -130px;
        width: 540px;
        margin: 0 0 0 14px;
      `}
  }

  @media (min-width: 1300px) and (min-height: 1024px) {
    top: unset;
    bottom: 60px;
    width: 500px;
    margin: 0 0 0 -60px;

    ${({ nightShift }) =>
      nightShift &&
      css`
        top: unset;
        bottom: -60px;
        width: 640px;
        margin: 0 0 0 14px;
      `}
  }

  @media all and (min-width: 1400px) {
    top: 360px;
    height: 390px;
    width: 500px;
    margin: 0 0 0 -60px;
    ${({ nightShift }) =>
      nightShift &&
      css`
        top: unset;
        bottom: -60px;
        width: 640px;
        margin: 0 0 0 14px;
      `}
  }
`;
ZombieImageShadow.displayName = 'ZombieImageShadow';

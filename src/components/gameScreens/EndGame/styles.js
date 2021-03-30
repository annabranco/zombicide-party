import styled from '@emotion/styled';
import { css, keyframes } from '@emotion/core';
import { Appear } from '../../../styles';
import { VICTORY } from '../../../constants';

/**
 *  Blood Dripping effect adapted by the original from Betsy
 *  https://codepen.io/bpopek/details/eYJYzPV
 */

const Drip = keyframes`
  0% { top: 70px; }
  100% { top: 600px; }
`;

export const ComeIn = keyframes`
  0% {
    transform: translate(100vw, 0);
    opacity: 0;
  }
  100% {
        transform: none;
    opacity: 1;
  }
`;

export const Blood = styled.div`
  label: Blood;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, 0%);
  width: 40%;
  height: 10px;
`;
Blood.displayName = 'Blood';

export const BloodDrop = styled.div`
  label: BloodDrop;
  position: absolute;
  z-index: 14;
  width: 11px;
  height: 11px;
  top: 0px;
  margin: 0;
  background-color: crimson;
  border-radius: 50%;
  animation: ${Drip} 3s cubic-bezier(1, 0, 0.91, 0.19) infinite;
  -webkit-animation: ${Drip} 3s cubic-bezier(1, 0, 0.91, 0.19) infinite;
  -moz-animation: ${Drip} 3s cubic-bezier(1, 0, 0.91, 0.19) infinite;
  -o-animation: ${Drip} 3s cubic-bezier(1, 0, 0.91, 0.19) infinite;

  &:before {
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-bottom: 23px solid crimson;
    top: -20px;
    left: 1px;
  }

  &:nth-of-type(1) {
    position: absolute;
    left: 59%;
    top: 0px;
    animation-delay: 1s;
    animation-iteration-count: infinite;
    animation-fill-mode: backwards;
  }
  &:nth-of-type(2) {
    position: absolute;
    left: 18%;
    top: 0px;
    animation-delay: 3s;
    animation-iteration-count: infinite;
    animation-fill-mode: backwards;
  }
  &:nth-of-type(3) {
    position: absolute;
    left: 26%;
    top: 0px;
    animation-delay: 4s;
    animation-iteration-count: infinite;
    animation-fill-mode: backwards;
  }
  &:nth-of-type(4) {
    position: absolute;
    left: 1%;
    top: 0px;
    animation-delay: 5.5s;
    animation-iteration-count: infinite;
    animation-fill-mode: backwards;
  }
  &:nth-of-type(5) {
    position: absolute;
    left: 41%;
    top: 0px;
    animation-delay: 4.5s;
    animation-iteration-count: infinite;
    animation-fill-mode: backwards;
  }
  &:nth-of-type(6) {
    position: absolute;
    left: 9%;
    top: 0px;
    animation-delay: 3.2s;
    animation-iteration-count: infinite;
    animation-fill-mode: backwards;
  }
  &:nth-of-type(7) {
    position: absolute;
    left: 62%;
    top: 0px;
    animation-delay: 4.8s;
    animation-iteration-count: infinite;
    animation-fill-mode: backwards;
  }
  &:nth-of-type(8) {
    position: absolute;
    left: 78%;
    top: 0px;
    animation-delay: 2s;
    animation-iteration-count: infinite;
    animation-fill-mode: backwards;
  }
  &:nth-of-type(9) {
    position: absolute;
    left: 91%;
    top: 0px;
    animation-delay: 1s;
    animation-iteration-count: infinite;
    animation-fill-mode: backwards;
  }
  &:nth-of-type(10) {
    position: absolute;
    left: 98%;
    top: 65px;
    animation-delay: 2.2s;
    animation-iteration-count: infinite;
    animation-fill-mode: backwards;
  }
`;
BloodDrop.displayName = 'BloodDrop';

export const EndingCharacterImage = styled.img`
  label: EndingCharacterImage;
  animation-duration: 4s;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
  opacity: 0;
  animation-name: ${ComeIn};
  margin: 0 -7px;
  max-width: 300px;

  ${({ number }) =>
    number &&
    css`
      width: calc(100vw / ${number});
    `}
  &:nth-of-type(1) {
    animation-delay: 3s;
  }
  &:nth-of-type(2) {
    animation-delay: 5s;
  }
  &:nth-of-type(3) {
    animation-delay: 7s;
  }
  &:nth-of-type(4) {
    animation-delay: 9s;
  }
  &:nth-of-type(5) {
    animation-delay: 11s;
  }
  &:nth-of-type(6) {
    animation-delay: 13s;
  }
  &:nth-of-type(7) {
    animation-delay: 15s;
  }
  &:nth-of-type(8) {
    animation-delay: 17s;
  }
  &:nth-of-type(9) {
    animation-delay: 19s;
  }
  &:nth-of-type(10) {
    animation-delay: 21s;
  }

  @media all and (min-width: 701px) {
    margin: 0 -45px;
  }
`;
EndingCharacterImage.displayName = 'EndingCharacterImage';

export const EndingCharacters = styled.div`
  label: EndingCharacters;
  z-index: 14;
  position: absolute;
  top: 10%;
  transform: translate(0, -50%);
  width: 90%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  @media all and (min-width: 701px) {
    top: 50%;
  }
`;
EndingCharacters.displayName = 'EndingCharacters';

export const EndGameText = styled.div`
  label: EndGameText;
  z-index: 25;
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: none;
  font-family: Crackhouse, 'Grandstander', cursive;
  text-transform: uppercase;
  font-size: 6rem;
  width: 40%;
  text-align: center;
  color: crimson;
  text-shadow: -2px -2px 2px rgba(255, 255, 255, 0.9),
    -2px 0 2px rgba(255, 255, 255, 0.9), -2px 2px 2px rgba(255, 255, 255, 0.9),
    0 -2px 2px rgba(255, 255, 255, 0.9), 0 0 2px rgba(255, 255, 255, 0.9),
    0 2px 2px rgba(255, 255, 255, 0.9), 2px -2px 2px rgba(255, 255, 255, 0.9),
    2px 0 2px rgba(255, 255, 255, 0.9), 2px 2px 2px rgba(255, 255, 255, 0.9);
  -webkit-text-stroke: 2px black;
  filter: brightness(2);

  ${({ type }) =>
    type === VICTORY &&
    css`
      top: 55%;
    `}
`;
EndGameText.displayName = 'EndGameText';

export const ExitButton = styled.img`
  label: ExitButton;
  z-index: 20;
  position: absolute;
  bottom: 100px;
  left: 50%;
  transform: translate(-50%, 0);
  width: 80px;
  cursor: pointer;
  box-shadow: 0 0 6px 0 black;
  -webkit-text-stroke: 1px black;
  opacity: 0;
  animation-name: ${Appear};
  animation-duration: 10s;
  animation-delay: ${({ delay }) => (delay ? `${delay * 2 + 5}s` : '5s')};
  animation-iteration-count: 1;
  animation-fill-mode: forwards;

  ${({ type }) =>
    type === VICTORY &&
    css`
      bottom: 10px;
    `}

  @media all and (min-width: 1200px) {
    width: 120px;
  }
`;
ExitButton.displayName = 'ExitButton';

export const GameInfo = styled.p`
  label: GameInfo;
  z-index: 20;
  position: absolute;
  bottom: 20px;
  right: 50px;
  text-align: right;
  -webkit-text-stroke: 1px black;
  opacity: 0;
  animation-name: ${Appear};
  animation-duration: 10s;
  animation-delay: ${({ delay }) => (delay ? `${delay * 2 + 5}s` : '5s')};
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
  font-family: 'Grandstander', cursive;
  font-size: 1.5rem;
  color: white;
`;
GameInfo.displayName = 'GameInfo';

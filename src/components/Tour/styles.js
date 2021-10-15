import styled from '@emotion/styled';
import { css, keyframes } from '@emotion/core';
import { BOTTOM, CENTER, LEFT, RIGHT, TOP } from '../../constants';
import { ModalMessage } from '../SetupModal/styles';

export const InstructionsArrow = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  &::before {
    position: absolute;
    font-size: 3rem;
    color: red;
  }

  ${({ arrow }) => {
    if (arrow[0] === BOTTOM) {
      if (arrow[1] === CENTER) {
        return css`
          bottom: 0;
          &::before {
            left: 48%;
            bottom: -30px;
            content: '🡇';
          }
        `;
      }
      if (arrow[1] === RIGHT) {
        return css`
          bottom: 0;
          &::before {
            left: 78%;
            bottom: -30px;
            content: '🡇';
          }
        `;
      }
      if (arrow[1] === LEFT) {
        return css`
          bottom: 0;
          &::before {
            left: 18%;
            bottom: -30px;
            content: '🡇';
          }
        `;
      }
    }
    if (arrow[0] === TOP) {
      if (arrow[1] === CENTER) {
        return css`
          top: 0;
          &::before {
            left: 48%;
            top: -30px;
            content: '🡅';
          }
        `;
      }
      if (arrow[1] === RIGHT) {
        return css`
          top: 0;
          &::before {
            left: 80%;
            top: -30px;
            content: '🡅';
          }
        `;
      }
      if (arrow[1] === LEFT) {
        return css`
          top: 0;
          &::before {
            left: 15%;
            top: -30px;
            content: '🡅';
          }
        `;
      }
    }
    if (arrow[0] === RIGHT) {
      if (arrow[1] === CENTER) {
        return css`
          top: 0;
          right: 0;
          &::before {
            top: 42%;
            right: -30px;
            content: '🡆';
          }
        `;
      }
      if (arrow[1] === TOP) {
        return css`
          bottom: 0;
          &::before {
            top: 20%;
            right: -30px;
            content: '🡆';
          }
        `;
      }
      if (arrow[1] === BOTTOM) {
        return css`
          bottom: 0;
          &::before {
            top: 70%;
            right: -30px;
            content: '🡆';
          }
        `;
      }
    }
    if (arrow[0] === LEFT) {
      if (arrow[1] === CENTER) {
        return css`
          bottom: 0;
          &::before {
            top: 42%;
            left: -30px;
            content: '🡄';
          }
        `;
      }
      if (arrow[1] === TOP) {
        return css`
          bottom: 0;
          &::before {
            top: 20%;
            left: -30px;
            content: '🡄';
          }
        `;
      }
      if (arrow[1] === BOTTOM) {
        return css`
          bottom: 0;
          &::before {
            top: 70%;
            left: -30px;
            content: '🡄';
          }
        `;
      }
    }
    return null;
  }};
`;
InstructionsArrow.displayName = 'InstructionsArrow';

export const InstructionsWrapper = styled.div`
  z-index: 50;
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 50px;
  border: 2px solid black;
  border-radius: 15px;
  background: rgba(255, 255, 255, 0.85);
  box-shadow: 0 0 10px 10px rgba(0, 0, 0, 0.6);
  top: 0;
  height: auto;
  max-width: 40%;

  ${({ positionX, positionY }) => {
    if (positionX === CENTER && positionY === CENTER) {
      return css`
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      `;
    }
    if (positionX === CENTER) {
      return css`
        top: ${positionY === TOP ? '10%' : 'unset'};
        bottom: ${positionY === BOTTOM ? '15%' : 'unset'};
        left: 50%;
        transform: translate(-50%, 0);
      `;
    }
    if (positionY === CENTER) {
      return css`
        left: ${positionX === LEFT ? '5%' : 'unset'};
        right: ${positionX === RIGHT ? '5%' : 'unset'};
        top: 50%;
        transform: translate(0, -50%);
      `;
    }

    return css`
      left: ${positionX === LEFT ? '5%' : 'unset'};
      right: ${positionX === RIGHT ? '5%' : 'unset'};
      top: ${positionY === TOP ? '10%' : 'unset'};
      bottom: ${positionY === BOTTOM ? '15%' : 'unset'};
    `;
  }};

  ${({ large }) =>
    large &&
    css`
      min-width: 50vw;
      max-height: 100vh;
    `}
`;
InstructionsWrapper.displayName = 'InstructionsWrapper';

const Grrrr = keyframes`
  0%, 70%, 100%, {
    transform: none;
  }
  40%, 50%, 60% {
    transform: rotate(-8deg);
  }
  45%, 55%, 65% {
    transform: rotate(8deg);
  }
`;

export const TourButton = styled.div`
  z-index: 10000;
  position: fixed;
  right: 5px;
  bottom: 80px;
  display: none;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: 30px;
  height: 46px;
  width: 220px;
  color: white;
  font-weight: 700;
  font-family: 'Grandstander', cursive;
  background: #80858c;
  cursor: pointer;

  &:hover {
    color: yellow;

    & img {
      animation-name: ${Grrrr};
      animation-duration: 1s;
      animation-iteration-count: infinite;
    }
  }

  @media all and (min-width: 1200px) {
    display: flex;
    right: 20px;
    bottom: 15px;
  }
`;
TourButton.displayName = 'TourButton';

export const TourButtonIcon = styled.img`
  width: 16%;
  margin: 0 10px 0 -10px;
`;
TourButtonIcon.displayName = 'TourButtonIcon';

export const TourText = styled(ModalMessage)`
  width: auto;
  @media all and (min-width: 768px) {
    width: auto;
  }
  @media all and (min-width: 1400px) {
    width: auto;
    margin-top: 0;
  }
`;
TourText.displayName = 'TourText';

import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { MOBILE } from '../../../constants';
import { TEXT_FONT } from '../../../styles';
import { MovementIcon } from '../MovementsBar/styles';

export const HighestXpTag = styled.span`
  label: HighestXpTag;
  z-index: 15;
  position: absolute;
  top: 10px;
  left: 50%;
  transform: translate(-50%, 0);
  font-family: ${TEXT_FONT};
  text-transform: uppercase;
  font-size: 0.5rem;
  color: black;
  font-weight: 900;
  user-select: none;

  @media all and (min-width: 701px) {
    top: 20px;
    font-size: 0.7rem;
    color: white;

    ${({ xp }) =>
      xp <= 4 &&
      css`
        font-size: 0.5rem;
        top: -8px;
      `}
  }
`;
HighestXpTag.displayName = 'HighestXpTag';

export const XpIcon = styled(MovementIcon)`
  label: XpIcon;
  width: 25px;
  left: 0;
  user-select: none;
  /* color: black; */
  color: black;
  font-size: ${({ currentXp, device, highestXp }) => {
    if (device === MOBILE) {
      if (currentXp) {
        return '1.1rem';
      }
      if (highestXp) {
        return '0.6rem';
      }
    } else if (currentXp || highestXp) {
      return '1.1rem';
    }
    return null;
  }};
  line-height: ${({ currentXp, highestXp }) =>
    currentXp || highestXp ? '1' : '1.2'};

  background: ${({ activeColor }) => activeColor && activeColor};
  opacity: ${({ activeColor }) => activeColor && 1};
  height: ${({ currentXp, highestXp }) =>
    currentXp || highestXp ? '18px' : '14px'};
  width: ${({ currentXp, highestXp, size }) =>
    currentXp || highestXp
      ? `calc(100% / ${size} + 10px) `
      : `calc(100% / ${size} )`};

  &:not(:first-of-type) {
    margin-left: 8px;
  }

  &:after {
    content: '';
    position: absolute;
    left: 100%;
    width: 6px;
    height: ${({ currentXp, highestXp }) =>
      currentXp || highestXp ? '18px' : '14px'};
    clip-path: polygon(50% 50%, -50% -50%, 0 100%);
    background: ${({ activeColor }) => activeColor && activeColor};
  }
  &:before {
    content: '';
    position: absolute;
    /* left: 10px; */
    top: 0;
    width: 6px;
    height: ${({ currentXp, highestXp }) =>
      currentXp || highestXp ? '18px' : '14px'};
    clip-path: polygon(100% 0, 100% 100%, 0% 100%, 50% 50%, 0% 0%);
    transform: translateX(-100%);
    background: ${({ activeColor }) => activeColor && activeColor};
  }

  &:first-of-type:before {
    clip-path: none;
  }
  &:last-of-type:after {
    clip-path: none;
  }

  ${({ setupMode }) =>
    setupMode &&
    css`
      cursor: pointer;
    `}

  @media all and (min-width: 701px) {
  }
`;
XpIcon.displayName = 'XPIcon';

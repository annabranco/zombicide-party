import styled from '@emotion/styled';
import { css } from '@emotion/core';

export const ActionIcon = styled.i`
  z-index: 5;
  label: ActionIcon;
  height: 50px;
  width: 50px;
  background: ${({ isActive }) =>
    isActive ? 'yellow' : 'rgba(255, 255, 255, 0.8)'};
  border: 1px solid black;
  padding: 7px;
  border-radius: 15px;
  cursor: ${({ isActive }) => (isActive ? 'not-allowed' : 'pointer')};
  transition: background ease 5s opacity ease 5s;
  opacity: ${({ isActive }) => (isActive ? 0.2 : 1)};
  font-size: ${({ iconSize }) => (iconSize ? '2.5rem' : '3rem')};
  line-height: ${({ iconSize }) =>
    // eslint-disable-next-line no-nested-ternary
    iconSize === 'medium' ? '1.4' : iconSize ? '1.2' : '1'};
  text-align: center;
  color: black;
  text-shadow: none;

  &:hover {
    color: ${({ isActive }) => (isActive ? 'red' : 'yellow')};
    text-shadow: 0 0 2px black;
  }

  ${({ actionType }) => {
    if (actionType === 'search') {
      return css`
        background: none;
        position: absolute;
        left: 50%;
        transform: translate(-50%, 0);
        padding: 0;
        line-height: 0.9;
        border: none;
        font-size: 4rem;
        color: rgba(255, 255, 255, 0.7);
        -webkit-text-stroke: 1px black;
      `;
    }
    if (actionType === 'endTurn') {
      return css`
        color: black;
        &:hover {
          color: darkred;
        }
      `;
    }
    if (actionType === 'combine') {
      return css`
        display: none;
        background: none;
        position: absolute;
        top: 80px;
        left: 50%;
        transform: translate(-50%, 0);
        width: auto;
        padding: 0;
        line-height: 0.9;
        border: none;
        font-size: 7rem;
        color: rgba(255, 255, 255, 0.85);
        -webkit-text-stroke: 1px black;
      `;
    }
    return null;
  }}

  ${({ combineItemSelected, combinePair }) => {
    if (combineItemSelected) {
      return css`
        display: block;
        -webkit-text-stroke: 0;
        color: rgba(255, 255, 255, 0.4);

        &:hover {
          color: rgba(255, 255, 255, 0.4);
          text-shadow: none;
          cursor: initial;
        }
      `;
    }
    if (combinePair) {
      return css`
        display: block;
        color: rgba(50, 205, 50, 0.5);
      `;
    }
    return null;
  }}
`;
ActionIcon.displayName = 'ActionIcon';

export const CarActionIcon = styled.i`
  label: CarActionIcon;
  margin-top: 5px;
  font-size: 1.8rem;
  line-height: 0.3;
  transform: ${({ actionType }) =>
    actionType === 'car-enter' && 'rotateY(180deg)'};
`;
CarActionIcon.displayName = 'CarActionIcon';

export const CarIcon = styled.i`
  label: CarIcon;
  margin-left: 2px;
  font-size: 2.5rem;
  line-height: 1;
  text-align: center;
`;
CarIcon.displayName = 'CarIcon';

export const CarIconWrapper = styled.div`
  label: CarIconWrapper;
  height: 66px;
  width: 66px;
  background: ${({ isActive }) =>
    isActive ? 'yellow' : 'rgba(255, 255, 255, 0.8)'};
  border: 1px solid black;
  padding: 7px;
  border-radius: 15px;
  cursor: ${({ isActive }) => (isActive ? 'not-allowed' : 'pointer')};
  transition: all ease 5s;
  opacity: ${({ isActive }) => (isActive ? 0.2 : 1)};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  text-align: center;
  &:hover {
    & > i {
      color: ${({ isActive }) => (isActive ? 'red' : 'yellow')};
      text-shadow: 0 0 2px black;
      color: yellow;
    }
  }
`;
CarIconWrapper.displayName = 'CarIconWrapper';

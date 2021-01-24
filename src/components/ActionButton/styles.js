import styled from '@emotion/styled';
import { css } from '@emotion/core';
import {
  CAR_ENTER_ACTION,
  COMBINE_ACTION,
  END_TURN_ACTION,
  MOVE_ACTION,
  OBJECTIVE_ACTION,
  RELOAD_ACTION,
  SEARCH_ACTION
} from '../../constants';

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
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.5);

  cursor: ${({ isActive }) => (isActive ? 'not-allowed' : 'pointer')};
  transition: background ease 5s opacity ease 5s;
  opacity: ${({ isActive }) => (isActive ? 0.2 : 1)};
  font-size: ${({ iconSize }) => (iconSize ? '2rem' : '2.5rem')};
  line-height: ${({ iconSize }) =>
    // eslint-disable-next-line no-nested-ternary
    iconSize === 'medium' ? '1.4' : iconSize ? '1.2' : '1.3'};
  text-align: center;
  color: black;
  text-shadow: none;

  &:hover {
    color: ${({ isActive }) => (isActive ? 'red' : 'yellow')};
    text-shadow: 0 0 2px black;
  }

  ${({ actionType, isActive, type }) => {
    if (actionType === SEARCH_ACTION || actionType === RELOAD_ACTION) {
      return css`
        z-index: 10;
        background: none;
        position: absolute;
        top: -70px;
        left: 42%;
        transform: translate(-50%, 0);
        padding: 0;
        line-height: 0.9;
        border: none;
        font-size: 4rem;
        color: rgba(255, 255, 255, 0.7);
        -webkit-text-stroke: 1px black;

        @media all and (min-width: 768px) {
          cursor: ${isActive ? 'not-allowed' : 'pointer'};
          z-index: 10;
          background: none;
          position: absolute;
          top: ${type === 'center' ? '100px' : 'initial'};
          left: 50%;
          transform: translate(-50%, 0);
          padding: 0;
          line-height: 0.9;
          border: none;
          font-size: 4rem;
          color: rgba(255, 255, 255, 0.7);
          -webkit-text-stroke: 1px black;

          ${'' /* ${({ type }) => {
            if (type === 'center') {
              return css`
                top: 80px;
              `;
            }
            return null;
          }} */}
        }
      `;
    }
    if (actionType === MOVE_ACTION) {
      return css`
        font-size: 2.2rem;
        line-height: 1.4;
      `;
    }

    if (actionType === END_TURN_ACTION) {
      return css`
        color: maroon;
        font-size: 3rem;
        line-height: 1;
        &:hover {
          color: red;
        }
      `;
    }
    if (actionType === OBJECTIVE_ACTION) {
      return css`
        color: darkgreen;
        &:hover {
          color: limegreen;
        }
      `;
    }
    if (actionType === COMBINE_ACTION) {
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

  ${({ manyButtons }) =>
    manyButtons &&
    css`
      height: 40px;
      width: 40px;
      font-size: 2rem;
    `}

  ${({ type }) => {
    if (type === 'center') {
      return css`
        top: 30px;
      `;
    }
    return null;
  }}

  @media (min-width: 1024px) and (min-height: 1300px) {
    height: 60px;
    width: 60px;
    font-size: 3rem;
  }
`;
ActionIcon.displayName = 'ActionIcon';

export const CarActionIcon = styled.i`
  label: CarActionIcon;
  margin-top: 5px;
  font-size: 1.8rem;
  line-height: 0.3;
  transform: ${({ actionType }) =>
    actionType === CAR_ENTER_ACTION && 'rotateY(180deg)'};

  ${({ manyButtons }) =>
    manyButtons &&
    css`
      font-size: 1.5rem;
    `}

  @media (min-width: 1024px) and (min-height: 1300px) {
    font-size: 2rem;
  }
`;
CarActionIcon.displayName = 'CarActionIcon';

export const CarIcon = styled.i`
  label: CarIcon;
  margin-left: 2px;
  font-size: 2.5rem;
  line-height: 1;
  text-align: center;

  ${({ manyButtons }) =>
    manyButtons &&
    css`
      font-size: 2rem;
    `}

  @media (min-width: 1024px) and (min-height: 1300px) {
    font-size: 2.7rem;
  }
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
  transition: background ease 5s;
  opacity: ${({ isActive }) => (isActive ? 0.2 : 1)};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  text-align: center;

  @media all and (min-width: 768px) {
    cursor: ${({ isActive }) => (isActive ? 'not-allowed' : 'pointer')};
  }

  &:hover {
    & > i {
      color: ${({ isActive }) => (isActive ? 'red' : 'yellow')};
      text-shadow: 0 0 2px black;
      color: yellow;
    }
  }

  @media (min-width: 1024px) and (min-height: 1300px) {
    height: 76px;
    width: 76px;
  }

  ${({ manyButtons }) =>
    manyButtons &&
    css`
      height: 56px;
      width: 55px;
      font-size: 2rem;
    `}
`;
CarIconWrapper.displayName = 'CarIconWrapper';

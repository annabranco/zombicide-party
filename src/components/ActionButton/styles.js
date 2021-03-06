import styled from '@emotion/styled';
import { css } from '@emotion/core';
import {
  CAR_ATTACK_ACTION,
  CAR_ENTER_ACTION,
  CAR_EXIT_ACTION,
  CAR_MOVE_ACTION,
  COMBINE_ACTION,
  END_TURN_ACTION,
  EXPLOSION_ACTION,
  GIVE_ORDERS_ACTION,
  LEAVE_GAME_ACTION,
  MOVE_ACTION,
  OBJECTIVE_ACTION,
  OPEN_DOOR_ACTION,
  RELOAD_ACTION,
  SEARCH_ACTION,
  SEARCH_ZOMBIE_ACTION
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
        height: 100%;
        width: 100%;
        top: -70px;
        left: 52%;
        transform: translate(-50%, 0);
        padding: 0;
        line-height: 3.1;
        border: none;
        font-size: 5rem;
        color: rgba(255, 255, 255, 0.7);
        -webkit-text-stroke: 1px black;
        border: 0;
        box-shadow: none;

        @media all and (min-width: 701px) {
          cursor: ${isActive ? 'not-allowed' : 'pointer'};
          z-index: 10;
          background: none;
          position: absolute;
          top: ${type === 'center' ? '100px' : 'initial'};
          left: 50%;
          transform: translate(-50%, 0);
          padding: 0;
          line-height: 3.4;
          border: none;
          font-size: 5rem;
          color: rgba(255, 255, 255, 0.7);
          -webkit-text-stroke: 1px black;
        }
      `;
    }
    if (actionType === MOVE_ACTION) {
      return css`
        font-size: 2.2rem;
        line-height: 1.4;
      `;
    }

    if (actionType === OPEN_DOOR_ACTION) {
      return css`
        font-size: 2.2rem;
        line-height: 1.4;
      `;
    }

    if (actionType === SEARCH_ZOMBIE_ACTION) {
      return css`
        font-size: 2.6rem;
        line-height: 1.3;
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
        top: 5vh;
        left: 50%;
        transform: translate(-50%, 0);
        width: auto;
        padding: 0;
        line-height: 0.9;
        border: none;
        font-size: 5rem;
        color: rgba(255, 255, 255, 0.85);
        -webkit-text-stroke: 1px black;
        border: 0;
        box-shadow: none;
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

  ${({ actionType }) =>
    actionType === RELOAD_ACTION &&
    css`
      top: -70px;

      @media all and (min-width: 701px) {
        top: -20px;
      }
    `}

  ${({ disabled }) =>
    disabled &&
    css`
      color: gray;
      cursor: not-allowed;
      &:hover {
        color: gray;
        font-size: 2.5rem;
        line-height: 1.3;
        text-shadow: none;
      }
    `}

  ${({ special, actionType, manyButtons }) => {
    if (special) {
      if (actionType === EXPLOSION_ACTION) {
        return css`
          position: absolute;
          left: 0;
          opacity: 0.65;
        `;
      }
      if (actionType === END_TURN_ACTION && manyButtons) {
        return css`
          position: absolute;
          right: 15vw;
          line-height: 1.3;
        `;
      }
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

export const DoubleIconWrapper = styled.div`
  label: DoubleIconWrapper;
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

  &:hover {
    & > i {
      color: ${({ isActive }) => (isActive ? 'red' : 'yellow')};
      text-shadow: 0 0 2px black;
      color: yellow;
    }
  }

  ${({ disabled }) =>
    disabled &&
    css`
      color: gray;
      cursor: not-allowed;
      &:hover {
        & > i {
          color: gray;
          text-shadow: none;
        }
      }
    `}

  ${({ manyButtons }) =>
    manyButtons &&
    css`
      height: 56px;
      width: 55px;
      font-size: 2rem;
    `}

  @media all and (min-width: 768px) {
    cursor: ${({ isActive }) => (isActive ? 'not-allowed' : 'pointer')};
    ${({ disabled }) =>
      disabled &&
      css`
        color: gray;
        cursor: not-allowed;
        &:hover {
          & > i {
            color: gray;
            text-shadow: none;
          }
        }
      `}
  }

  @media (min-width: 1024px) and (min-height: 1300px) {
    height: 76px;
    width: 76px;
  }
`;
DoubleIconWrapper.displayName = 'DoubleIconWrapper';

export const PrimaryIcon = styled.i`
  label: PrimaryIcon;
  z-index: 6;
  margin-left: 2px;
  font-size: 2.5rem;
  line-height: 1;
  text-align: center;

  ${({ manyButtons }) =>
    manyButtons &&
    css`
      font-size: 2rem;
    `}

  ${({ actionType }) => {
    if (actionType === CAR_ATTACK_ACTION) {
      return css`
        transform: rotate(2deg);
      `;
    }
    if (actionType === CAR_MOVE_ACTION) {
      return css`
        color: gray;
      `;
    }
    if (actionType === GIVE_ORDERS_ACTION) {
      return css`
        font-size: 3rem;
        margin-left: -10px;
      `;
    }
    if (actionType === LEAVE_GAME_ACTION) {
      return css`
        font-size: 2rem;
        transform: rotateY(180deg);
      `;
    }
    return null;
  }}

  @media (min-width: 1024px) and (min-height: 1300px) {
    font-size: 2.7rem;
  }
`;
PrimaryIcon.displayName = 'PrimaryIcon';

export const SecondaryIcon = styled.i`
  label: SecondaryIcon;
  margin-top: 5px;
  font-size: 1.8rem;
  line-height: 0.3;

  ${({ actionType }) => {
    if (actionType === CAR_EXIT_ACTION) {
      return css`
        color: darkslateblue;
      `;
    }
    if (actionType === CAR_ENTER_ACTION) {
      return css`
        transform: rotateY(180deg);
        color: darkslateblue;
      `;
    }
    if (actionType === CAR_ATTACK_ACTION) {
      return css`
        transform: rotate(10deg) rotateY(29deg) translate(-13px, -2px);
        margin-right: -13px;
        color: darkred;
      `;
    }
    if (actionType === CAR_MOVE_ACTION) {
      return css`
        z-index: 7;
        margin-left: -10px;
      `;
    }
    if (actionType === GIVE_ORDERS_ACTION) {
      return css`
        z-index: 7;
        margin-top: -2px;
        margin-left: -35px;
        font-size: 1.6rem;
      `;
    }
    if (actionType === LEAVE_GAME_ACTION) {
      return css`
        transform: rotateY(180deg);
        margin-left: -2px;
      `;
    }
    return null;
  }}

  ${({ manyButtons }) =>
    manyButtons &&
    css`
      font-size: 1.5rem;
    `}

  @media (min-width: 1024px) and (min-height: 1300px) {
    font-size: 2rem;
  }
`;
SecondaryIcon.displayName = 'SecondaryIcon';

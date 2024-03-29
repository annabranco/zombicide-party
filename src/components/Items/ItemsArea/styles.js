import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { IN_RESERVE, WOUND } from '../../../constants';
import { AppButton } from '../../Sections/PlayersSection/styles';
import IconRanged from '../../../assets/images/ranged-icon.png';
import IconMelee from '../../../assets/images/melee-icon.png';
import IconBlood from '../../../assets/images/bloodSplash.png';
import { TourHighlight } from '../../../styles';

export const ActionButtonIcon = styled.i`
  label: ActionButtonIcon;
  padding: 6px 1px;
  font-size: 1.2rem;
  /* color: ${({ type }) => (type === 'drop' ? 'firebrick' : 'green')}; */
  &:hover {
    color: ${({ type }) => (type === 'drop' ? 'red' : 'lawngreen')};
  }
  @media all and (min-width: 768px) {
    font-size: 3rem;
  }
`;
ActionButtonIcon.displayName = 'ActionButtonIcon';

export const ActionButtonsWrapper = styled.div`
  label: ActionButtonsWrapper;
  z-index: 5;
  position: absolute;
  top: 1px;
  display: none;
  flex-direction: rows;
  align-items: flex-start;
  justify-content: space-around;
  width: 100%;

  ${({ trade }) =>
    trade &&
    css`
      top: 55px;
      left: -38px;
    `}

  ${({ mobile, slotType }) => {
    if (mobile && slotType === IN_RESERVE) {
      return css`
        top: -35px;
        left: 50%;
        transform: translate(-50%, 0);
        display: flex;
      `;
    }
    if (mobile) {
      return css`
        top: unset;
        bottom: -35px;
        left: 50%;
        transform: translate(-50%, 0);
        display: flex;
      `;
    }
    return null;
  }}

  @media all and (min-width: 701px) {
    top: 50%;
  }

  ${({ visible }) =>
    visible &&
    css`
      display: flex;
      top: 50%;
      transform: translate(0, -50%);
    `}
`;
ActionButtonsWrapper.displayName = 'ActionButtonsWrapper';

export const Item = styled.div`
  label: Item;
  border: ${({ damageMode }) => !damageMode && '2px solid black'};
  border-radius: 14px;
  height: 100px;
  width: 65px;
  overflow: hidden;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.5);

  ${({ trade }) =>
    trade &&
    css`
      margin: -30px 0 0;
      height: 80px;
      width: 60px;
    `}

  @media all and (min-width: 360px) {
    height: 110px;
    width: 85px;
  }

  @media all and (min-width: 701px) {
    height: 270px;
    width: 200px;

    ${({ trade }) =>
      trade &&
      css`
        height: 220px;
        width: 180px;
      `}
  }

  @media all and (min-width: 1024px) {
    ${({ trade }) =>
      trade &&
      css`
        height: 200px;
        width: 150px;
      `}
  }

  @media (min-width: 1024px) and (min-height: 1300px) {
    height: 370px;
    width: 260px;

    ${({ trade }) =>
      trade &&
      css`
        height: 300px;
        width: 200px;
      `}
  }

  @media all and (min-width: 1400px) {
    height: 320px;
    width: 240px;

    ${({ trade }) =>
      trade &&
      css`
        height: 240px;
        width: 180px;
      `}
  }
`;
Item.displayName = 'Item';

export const ItemBlank = styled.div`
  label: ItemBlank;
  z-index: 3;
  display: ${({ allSlotsAreEmpty, damageMode }) =>
    damageMode && !allSlotsAreEmpty ? 'none' : 'flex'};
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100px;
  /* width: 70px; */
  background: rgba(255, 255, 255, 0.25);
  font-family: 'Grandstander', cursive;
  font-size: 0.9rem;
  font-weight: 500;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.5);
  text-shadow: 0 0 12px black;
  text-align: center;
  box-shadow: inset 1px 1px 15px rgba(0, 0, 0, 0.4);

  &:hover {
    background: ${({ allSlotsAreEmpty, damageMode }) =>
      damageMode && allSlotsAreEmpty
        ? 'rgba(255, 16, 16, 0.3)'
        : 'rgba(255, 255, 255, 0.2)'};
    & > i {
      display: block;
      position: absolute;
      opacity: 0.8;
    }
  }

  & > i {
    display: none;
  }

  ${({ isSelected }) =>
    isSelected &&
    css`
      background: rgba(29, 211, 72, 0.4);
      transition: all ease 0.2s;
      &:hover {
        background: rgba(29, 211, 72, 0.4);
      }
    `}

  ${({ allSlotsAreEmpty, damageMode, canSearch, setupMode, trade }) => {
    if (damageMode || canSearch) {
      return css`
        cursor: pointer;
      `;
    }
    if (!canSearch && !trade && !setupMode) {
      return css`
        cursor: not-allowed;
      `;
    }
    return css`
      cursor: pointer;
    `;
  }}


  @media all and (min-width: 360px) {
    height: 110px;
    font-size: 1.1rem;
  }

  @media all and (min-width: 701px) {
    height: 270px;
    width: 200px;

    ${({ trade }) =>
      trade &&
      css`
        height: 220px;
        width: 180px;
      `}
  }

  @media (min-width: 1024px) and (min-height: 1300px) {
    height: 370px;
    width: 260px;

    ${({ trade }) =>
      trade &&
      css`
        height: 300px;
        width: 200px;
      `}
  }

  @media all and (min-width: 1400px) {
    height: 320px;
    width: 240px;
    ${({ trade }) =>
      trade &&
      css`
        height: 240px;
        width: 180px;
      `}
  }
`;
ItemBlank.displayName = 'ItemBlank';

export const ItemWrapper = styled.div`
  label: ItemWrapper;
  z-index: 4;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 50px 5px 0;

  ${({ slotType, isActive, isSelected, type }) => {
    if (isActive && type === WOUND) {
      return css`
        z-index: 5;
        filter: none;
        transition: all ease 0.3s;
      `;
    }
    if (isActive) {
      return css`
        z-index: 5;
        filter: none;
        transition: all ease 0.3s;

        & > div {
          display: flex;
        }
      `;
    }
    if (slotType === IN_RESERVE) {
      return css`
        z-index: 3;
        filter: contrast(0.6);
        transition: all ease 0.3s;
      `;
    }
    return null;
  }}

  ${({ numItems }) =>
    numItems > 3 &&
    css`
      margin: 50px -5px 0;
    `}

@media all and (min-width: 360px) {
    ${({ numItems }) =>
      numItems > 3 &&
      css`
        margin: 50px -10px 0;
      `}
  }

  @media all and (min-width: 701px) {
    margin: 50px 10px 0;
    ${({ numItems }) =>
      numItems > 3 &&
      css`
        margin: 50px -30px 0;
      `}
  }

  @media all and (min-width: 1024px) {
    margin: 50px 20px 0;

    ${({ numItems }) =>
      numItems > 3 &&
      css`
        margin: 50px 0 0;
      `}
  }

  @media (min-width: 1024px) and (min-height: 1300px) {
    ${({ numItems }) =>
      numItems > 3 &&
      css`
        margin: 50px -30px 0;
      `}
  }

  @media all and (min-width: 1600px) and (min-height: 900px) {
    margin: 50px 40px 0;
    ${({ numItems }) =>
      numItems > 3 &&
      css`
        margin: 50px 20px 0;
      `}
  }
  ${({ tourMode }) =>
    tourMode &&
    css`
      ${TourHighlight};
    `}
`;
ItemWrapper.displayName = 'ItemWrapper';

export const KillButton = styled(AppButton)`
  label: KillButton;
  position: absolute;
  top: 25%;
  left: 50%;
  transform: translate(-50%, 0);
  color: red;
  margin: 0 3px;
  border-radius: 50%;
  height: 40px;
  width: 40px;
  opacity: 0.9;
  outline: none;
  visibility: hidden;
  background: red;
  box-shadow: 0 0 10px 3px rgba(255, 255, 255, 0.8);
  cursor: ${({ attack }) =>
    attack === 'ranged'
      ? `url(${IconRanged}) 12 12, auto`
      : `url(${IconMelee}) 12 12, auto`};
  ${({ visible }) =>
    visible &&
    css`
      visibility: visible;
    `}

  @media all and (min-width: 701px) {
    position: initial;
  }

  ${({ tourMode }) =>
    tourMode &&
    css`
      ${TourHighlight};
    `}
`;
KillButton.displayName = 'KillButton';

export const KillButtonIcon = styled.img`
  label: KillButtonIcon;
  width: 50px;
  margin: -10px 0 0 -16px;
`;
KillButtonIcon.displayName = 'KillButtonIcon';

export const KillButtonsWrapper = styled.div`
  label: KillButtonsWrapper;
  z-index: 20;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: row;
  flex-flow: wrap;
  align-items: center;
  justify-content: center;
  padding: 50px 1px 50px;
  height: 100%;
  width: 100%;
  cursor: pointer;

  ${({ displaySplash }) =>
    displaySplash &&
    css`
      cursor: url(${IconBlood}) 12 12, auto;
    `}

  @media all and (min-width: 701px) {
    top: unset;
    left: unset;
    height: auto;
    width: auto;
  }

  @media all and (min-width: 1200px) {
    left: 15%;
  }
`;
KillButtonsWrapper.displayName = 'KillButtonsWrapper';

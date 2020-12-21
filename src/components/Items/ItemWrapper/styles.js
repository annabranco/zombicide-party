import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { IN_BACKPACK } from '../../../constants';
import { AppButton } from '../../Sections/PlayersSection/styles';

export const ActionButtonIcon = styled.i`
  label: ActionButtonIcon;
  padding: 6px 1px;
  font-size: 1.2rem;
  /* color: ${({ type }) => (type === 'drop' ? 'firebrick' : 'green')}; */
  &:hover {
    color: ${({ type }) => (type === 'drop' ? 'red' : 'lawngreen')};
  }
`;
ActionButtonIcon.displayName = 'ActionButtonIcon';

export const ActionButtonsWrapper = styled.div`
  label: ActionButtonsWrapper;
  z-index: 5;
  position: absolute;
  top: 10px;
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
`;
ActionButtonsWrapper.displayName = 'ActionButtonsWrapper';

export const Item = styled.div`
  label: Item;
  border: ${({ damageMode }) => !damageMode && '2px solid black'};
  border-radius: 14px;
  height: 273px;
  width: 200px;
  overflow: hidden;

  ${({ trade }) =>
    trade &&
    css`
      margin: -30px 0 0;
      height: 120px;
      width: 120px;
    `}
`;
Item.displayName = 'Item';

export const ItemBlank = styled.div`
  label: ItemBlank;
  z-index: 3;
  display: ${({ allSlotsAreEmpty, damageMode }) =>
    damageMode && !allSlotsAreEmpty ? 'none' : 'flex'};
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 273px;
  width: 200px;
  background: rgba(255, 255, 255, 0.2);
  padding-top: 50px;
  font-family: 'Grandstander', cursive;
  font-size: 1.1rem;
  font-weight: 500;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.5);
  text-shadow: 0 0 12px black;
  cursor: ${({ allSlotsAreEmpty, damageMode, canSearch, setupMode, trade }) =>
    (damageMode && !allSlotsAreEmpty) || (!canSearch && !trade && !setupMode)
      ? 'not-allowed'
      : 'pointer'};

  & > i {
    display: none;
  }

  &:hover {
    background: ${({ allSlotsAreEmpty, damageMode }) =>
      damageMode && allSlotsAreEmpty
        ? 'rgba(255, 16, 16, 0.3)'
        : 'rgba(255, 255, 255, 0.2)'};
    & > i {
      display: block;
      position: absolute;
      top: 40%;
      opacity: 0.8;
    }
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
  margin: 50px 20px 0;

  ${({ slotType, isActive, isSelected, type }) => {
    if (isActive && type === 'wound') {
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
    if (slotType === IN_BACKPACK) {
      return css`
        z-index: 3;
        filter: contrast(0.6);
        transition: all ease 0.3s;
      `;
    }
    return null;
  }}
`;
ItemWrapper.displayName = 'ItemWrapper';

export const KillButton = styled(AppButton)`
  label: KillButton;
  color: red;
  margin: 5px;
  border-radius: 50%;
  height: 60px;
  width: 60px;
  opacity: 0.8;
  outline: none;
`;
KillButton.displayName = 'KillButton';

export const KillButtonIcon = styled(ActionButtonIcon)`
  label: KillButtonIcon;
  font-size: 1.8rem;
  color: red;
`;
KillButtonIcon.displayName = 'KillButtonIcon';

export const KillButtonsWrapper = styled.div`
  label: KillButtonsWrapper;
  position: absolute;
  display: flex;
  flex-direction: row;
  flex-flow: wrap;
  align-items: center;
  justify-content: space-around;
  margin-top: 10px;
  height: 100%;
  width: 100%;
`;
KillButtonsWrapper.displayName = 'KillButtonsWrapper';

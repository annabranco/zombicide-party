import styled from '@emotion/styled';
import { css } from '@emotion/core';

export const ActionButtonsWrapper = styled.div`
  label: ActionButtonsWrapper;
  z-index: 5;
  position: absolute;
  top: 55px;
  display: none;
  flex-direction: rows;
  align-items: flex-start;
  justify-content: space-around;
  width: 95%;
`;
ActionButtonsWrapper.displayName = 'ActionButtonsWrapper';

export const Item = styled.div`
  label: Item;
  border: ${({ damageMode }) => !damageMode && '2px solid black'};
  border-radius: 14px;
  margin: 10px 20px;
  height: 273px;
  width: 200px;
  overflow: hidden;
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
  cursor: ${({ allSlotsAreEmpty, damageMode }) =>
    damageMode && !allSlotsAreEmpty ? 'not-allowed' : 'pointer'};

  &:hover {
    background: ${({ allSlotsAreEmpty, damageMode }) =>
      damageMode && allSlotsAreEmpty
        ? 'rgba(255, 16, 16, 0.3)'
        : 'rgba(255, 255, 255, 0.2)'};
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
  margin-top: 50px;

  ${({ slotType, isActive, type }) => {
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
    if (slotType === 'inBackpack') {
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

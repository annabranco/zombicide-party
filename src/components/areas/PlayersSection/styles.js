import styled from '@emotion/styled';
import { css } from '@emotion/core';

export const CharacterSheet = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 80px);
  width: 90%;
  background: #232222;
`;
CharacterSheet.displayName = 'CharacterSheet';

export const CharName = styled.h1`
  margin: 20px auto;
  font-size: 1.2rem;
  color: white;
`;
CharName.displayName = 'CharName';

export const CharItems = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 90%;
`;
CharItems.displayName = 'CharItems';

export const Item = styled.div`
  border: 1px solid white;
  margin: 10px 20px;
  height: auto;
  width: 200px;
`;
Item.displayName = 'Item';

export const ItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
ItemWrapper.displayName = 'ItemWrapper';

export const SelectorModal = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  transform: translate(-50%, 0);
  height: 100%;
  width: 100%;
  background: #232222;
`;
SelectorModal.displayName = 'SelectorModal';

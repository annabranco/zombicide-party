import styled from '@emotion/styled';
import { css } from '@emotion/core';

export const ActionButtonsWrapper = styled.div`
  display: flex;
  flex-direction: rows;
  align-items: flex-start;
  justify-content: space-around;
  width: 80%;
`;
ActionButtonsWrapper.displayName = 'ActionButtonsWrapper';

export const ActionButton = styled.button`
  z-index: 3;
  border: 1px solid black;
  border-radius: 5px;
  padding: 2px 10px;
  background: rgba(0, 0, 0, 0.7);
  font-family: 'Cairo', sans-serif;
  color: rgba(255, 255, 255, 0.7);
  font-weight: 700;
  font-size: 0.7rem;
  line-height: 1.5;
`;
ActionButton.displayName = 'ActionButton';

export const CharacterOverlay = styled.div`
  z-index: 2;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: #232222;
  opacity: 0.6;

  ${({ img, position = 'center top' }) => css`
    background-image: ${`url(${img})`};
    background-position: ${position};
    background-size: 100%;
    background-repeat: no-repeat;
  `}
`;

export const CharacterSheet = styled.div`
  z-index: 1;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 80px);
  width: 90%;
  background: black;
`;
CharacterSheet.displayName = 'CharacterSheet';

export const CharName = styled.h1`
  z-index: 3;
  position: absolute;
  top: 0;
  right: 80px;
  margin: 20px auto;
  border-radius: 50px;
  font-size: 3rem;
  color: rgba(255, 255, 255, 0.8);
  text-shadow: 0 0 4px black;
  line-height: 1.2;
  text-transform: uppercase;
  /* transform: translate(200px, -100px); */
`;
CharName.displayName = 'CharName';

export const CharItems = styled.div`
  z-index: 3;
  position: absolute;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 90%;
`;
CharItems.displayName = 'CharItems';

export const Item = styled.div`
  border: 2px solid black;
  border-radius: 14px;
  margin: 10px 20px;
  height: 273px;
  width: 200px;
  overflow: hidden;
`;
Item.displayName = 'Item';

export const ItemBlank = styled.div`
  z-index: 3;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  background: rgba(255, 255, 255, 0.2);
  height: 273px;
  width: 200px;
  padding-top: 50px;
  font-family: 'Grandstander', cursive;
  font-size: 1.1rem;
  font-weight: 500;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.5);
  text-shadow: 0 0 12px black;
  cursor: pointer;

  /* opacity: 0.2; */
`;
ItemBlank.displayName = 'ItemBlank';

export const ItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 50px;
`;
ItemWrapper.displayName = 'ItemWrapper';

export const NextButton = styled(ActionButton)`
  z-index: 3;
  position: absolute;
  bottom: 20px;
  right: 20px;
`;
NextButton.displayName = 'NextButton';

import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { ActionButton } from '../MainMenu/styles';

export const CharacterArea = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
`;
CharacterArea.displayName = 'CharacterArea';

export const CharImage = styled.img`
  filter: sepia(1) opacity(0.3);
  width: 100%;

  ${({ active }) =>
    active
      ? css`
          filter: brightness(1.3);
        `
      : css`
          &:hover {
            filter: sepia(0.3) brightness(1.4) opacity(0.4);
          }
        `}
`;
CharImage.displayName = 'CharImage';

export const CharName = styled.h1`
  position: absolute;
  bottom: 0;
  left: -25px;
  margin: 20px auto 30px;
  width: calc(90vw / 6);
  font-size: 1.5rem;
  color: white;
  text-shadow: 0 0 3px black;
  text-align: center;
  text-transform: uppercase;
`;
CharName.displayName = 'CharName';

export const PlayerTag = styled.div`
  z-index: 6;
  position: absolute;
  top: 15px;
  right: -3px;

  height: 20px;
  min-width: 40px;
  border: 1px solid black;
  box-shadow: 0 0 3px white;
  border-radius: 10px;
  padding: 2px 10px;
  background: ${({ color }) => color || 'black'};
  /* cursor: pointer; */
  font-family: 'Grandstander', cursive;
  text-align: center;
  font-size: 1rem;
  line-height: 1.1;
  text-transform: uppercase;
  color: white;
`;
PlayerTag.displayName = 'PlayerTag';

export const Selector = styled.div`
  position: relative;
  width: calc(90vw / 6);
  margin: 0 -25px;
  cursor: pointer;
`;
Selector.displayName = 'Selector';

export const SelectorButton = styled(ActionButton)`
  margin: 30px auto;
  width: 200px;
  padding: 5px 15px;
  font-family: 'Grandstander', cursive;
  font-size: 1.3rem;

  ${({ active }) =>
    !active &&
    css`
      background: gray;
      color: silver;
      cursor: not-allowed;
    `}
`;
SelectorButton.displayName = 'SelectorButton';

export const SelectorTitle = styled.h1`
  margin: 20px auto 30px;
  font-size: 2rem;
  color: white;
  text-shadow: 0 0 2px black;
`;
SelectorTitle.displayName = 'SelectorTitle';

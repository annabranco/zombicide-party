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
  overflow: hidden;
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

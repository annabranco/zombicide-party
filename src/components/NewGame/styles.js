import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { SelectionButton } from '../MainMenu/styles';
import { activeImage, inactiveImage } from '../../styles';

export const CharacterArea = styled.div`
  label: CharacterArea;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;

  ${({ dynamic }) =>
    dynamic &&
    css`
      z-index: 15;
      position: absolute;
      background: rgba(0, 0, 0, 0.8);
    `}
`;
CharacterArea.displayName = 'CharacterArea';

export const CharImage = styled.img`
  label: CharImage;
  ${inactiveImage}
  width: 100%;

  ${({ dynamic }) =>
    dynamic &&
    css`
      filter: sepia(1) opacity(0.7);
      &:hover {
        filter: sepia(0.3) brightness(1.4) opacity(0.7) contrast(1.1)
          saturate(2);
      }
    `}

  ${({ active }) =>
    active &&
    css`
      ${activeImage}
    `}
`;
CharImage.displayName = 'CharImage';

export const CharName = styled.h1`
  label: CharName;
  position: absolute;
  bottom: 0;
  left: -25px;
  margin: 20px auto 30px;
  width: calc(90vw / 6);
  font-size: 1.5rem;
  color: rgba(255, 255, 255, 0.5);
  text-shadow: 0 0 3px black;
  text-align: center;
  text-transform: uppercase;

  ${({ active }) =>
    active &&
    css`
      color: white;
    `}
`;
CharName.displayName = 'CharName';

export const PlayerTag = styled.div`
  label: PlayerTag;
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
  label: Selector;
  position: relative;
  width: calc(90vw / 6);
  margin: 0 -25px;
  cursor: pointer;
`;
Selector.displayName = 'Selector';

export const SelectorButton = styled(SelectionButton)`
  label: SelectorButton;
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
  label: SelectorTitle;
  margin: 20px auto 30px;
  font-size: 2rem;
  color: white;
  text-shadow: 0 0 2px black;

  ${({ dynamic }) =>
    dynamic &&
    css`
      z-index: 16;
      position: absolute;
      top: 50px;
      font-size: 3rem;
    `}
`;
SelectorTitle.displayName = 'SelectorTitle';

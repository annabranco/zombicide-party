import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { SelectionButton } from '../MainMenu/styles';
import { activeImage, inactiveImage } from '../../styles';

export const CharacterArea = styled.div`
  label: CharacterArea;
  /* display: flex; */
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  height: 100%;
  width: 100%;

  @media all and (min-width: 768px) {
    margin: 0 25px;
    ${({ number }) => {
      if (number >= 8) {
        return css`
          ${'' /* position: absolute; */}
          margin-top: 20px;
          display: grid;
          width: 90%;
          grid-template-columns: repeat(4, 150px);
          grid-template-rows: repeat(auto-fill, 1fr);
          ${'' /* & div:nth-child(n + 5) {
            margin-left: 5px;
          } */}
          justify-items: center;
          align-items: start;
        `;
      }
      if (number) {
        return css`
          display: grid;
          width: 90%;
          grid-template-columns: repeat(${number}, 1fr);
        `;
      }
      return null;
    }}
  }

  @media all and (min-width: 1200px) {
    ${({ number }) => {
      if (number >= 8) {
        return css`
          ${'' /* position: absolute; */}
          top: 200px;
          display: grid;
          width: 90%;
          grid-template-columns: repeat(8, 120px);
          grid-template-rows: repeat(auto-fill, 100px);
          & div:nth-child(n + 9) {
            ${'' /* margin-left: 30px; */}
          }
        `;
      }
      if (number) {
        return css`
          display: grid;
          width: 90%;
          grid-template-columns: repeat(${number}, 1fr);
        `;
      }
      return null;
    }}
  }
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
        filter: sepia(0.3) brightness(1.4) opacity(1) contrast(1.1) saturate(2);
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
  bottom: -40px;
  margin: 20px auto 30px;
  width: calc(90vw / 6);
  font-size: 1.5rem;
  color: rgba(255, 255, 255, 0.5);
  text-shadow: 0 0 3px black;
  text-align: center;
  text-transform: uppercase;

  @media all and (min-width: 768px) {
    bottom: 0;
    left: -10%;

    ${({ number }) =>
      number > 8 &&
      css`
        bottom: unset;
        top: 40px;
        left: -30%;
      `}
  }

  @media all and (min-width: 1024px) {
    bottom: 0;
    left: -15%;

    ${({ number }) =>
      number > 8 &&
      css`
        bottom: unset;
        top: 40px;
        left: -30%;
      `}
  }

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
  bottom: -10px;
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

  @media all and (min-width: 768px) {
    bottom: unset;
    top: 15px;
  }
`;
PlayerTag.displayName = 'PlayerTag';

export const Selector = styled.div`
  label: Selector;
  position: relative;
  width: ${({ number }) => number && `calc(100vw / ${number} + 30px)`};
  margin: 0 20px;
  cursor: pointer;

  @media all and (min-width: 768px) {
    margin: 0 -25px;
  }
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

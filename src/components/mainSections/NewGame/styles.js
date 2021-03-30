import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { SelectionButton } from '../MainMenu/styles';
import { activeImage, inactiveImage, TITLE_FONT } from '../../../styles';

export const CharacterArea = styled.div`
  label: CharacterArea;
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
          margin-top: 20px;
          display: grid;
          width: 90%;
          grid-template-columns: repeat(4, 150px);
          grid-template-rows: repeat(auto-fill, 1fr);
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
          top: 200px;
          display: grid;
          grid-template-columns: repeat(8, 1fr);
          grid-template-rows: repeat(auto-fill, 100px);
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

  @media all and (min-width: 1600px) {
    ${({ number }) => {
      if (number >= 8) {
        return css`
          top: 200px;
          display: grid;
          grid-template-columns: repeat(10, 1fr);
          grid-template-rows: repeat(auto-fill, 100px);
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

export const CharacterImage = styled.img`
  label: CharacterImage;
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

@media all and (min-width: 1600px) {
    margin: 0 -20px;
  }
`;
CharacterImage.displayName = 'CharacterImage';

export const CharacterName = styled.h1`
  label: CharacterName;
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translate(-50%, 0);
  width: calc(90vw / 6);
  font-size: 1.5rem;
  color: rgba(255, 255, 255, 0.95);
  text-shadow: 0 0 3px black;
  text-align: center;
  text-transform: uppercase;

  ${({ active }) =>
    active &&
    css`
      color: rgba(255, 255, 255, 0.5);
      bottom: -30px;
    `}

  @media all and (min-width: 768px) {
    bottom: 0;
    left: -10%;
    transform: none;
    margin: 20px auto 30px;
    color: rgba(255, 255, 255, 0.75);

    ${({ number }) =>
      number > 8 &&
      css`
        bottom: unset;
        top: 40px;
        left: -30%;
      `}

    ${({ active }) =>
      active &&
      css`
        color: white;
        font-size: 1.5rem;
      `}
  }

  @media all and (min-width: 1024px) {
    bottom: 0;
    left: -15%;
    color: rgba(255, 255, 255, 0.8);

    ${({ number }) =>
      number > 8 &&
      css`
        bottom: unset;
        top: 40px;
        left: -30%;
      `}
    ${({ active }) =>
      active &&
      css`
        color: white;
        font-size: 2rem;
      `}
  }

  @media all and (min-width: 1600px) {
    top: unset;
    bottom: 0;
    left: -40%;
    font-size: 2.4rem;
    color: rgba(255, 255, 255, 0.8);
  }
`;
CharacterName.displayName = 'CharacterName';

export const PlayerTag = styled.div`
  label: PlayerTag;
  z-index: 6;
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translate(-50%, 0);

  height: 20px;
  min-width: 40px;
  border: 1px solid black;
  box-shadow: 0 0 3px white;
  border-radius: 10px;
  padding: 2px 10px;
  background: ${({ color }) => color || 'black'};
  /* cursor: pointer; */
  font-family: ${TITLE_FONT};
  text-align: center;
  font-size: 1rem;
  line-height: 1.1;
  text-transform: uppercase;
  color: white;

  @media all and (min-width: 768px) {
    bottom: unset;
    top: 15px;
    left: unset;
    right: -5px;
    transform: none;
  }
`;
PlayerTag.displayName = 'PlayerTag';

export const Selector = styled.div`
  label: Selector;
  position: relative;
  width: ${({ number }) => number && `calc(100vw / ${number} + 30px)`};
  margin: 0 20px;
  cursor: pointer;
  max-width: 300px;

  @media all and (min-width: 701px) {
    margin: 0 -25px;
  }
`;
Selector.displayName = 'Selector';

export const SelectorButton = styled(SelectionButton)`
  label: SelectorButton;
  margin: 30px auto;
  width: 200px;
  padding: 5px 15px;
  font-family: ${TITLE_FONT};
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
      z-index: 14;
      position: absolute;
      top: 2px;
      font-size: 1.8rem;
      transform: translate(0, -50%);

      @media all and (min-width: 1200px) {
        top: 20px;
        font-size: 3rem;
      }
    `}
`;
SelectorTitle.displayName = 'SelectorTitle';

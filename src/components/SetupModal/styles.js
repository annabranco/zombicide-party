import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { SelectionButton } from '../MainMenu/styles';

export const ButtonsArea = styled.div`
  label: ButtonsArea;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 70px;
  width: 95%;
  background: rgba(0, 0, 0, 0.6);
  box-shadow: 0 0 20px black;
  text-align: center;
`;
ButtonsArea.displayName = 'ButtonsArea';

export const FacesWrapper = styled.div`
  label: FacesWrapper;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  width: 80%;
`;
FacesWrapper.displayName = 'FacesWrapper';

export const ModalButton = styled(SelectionButton)`
  label: ModalButton;
  margin: 10px 10px;
  min-height: 40px;
  width: 150px;
  background: gray;
  padding: 5px 15px;
  font-size: 1.1rem;
  font-weight: 700;
  color: black;
  font-family: 'Grandstander', cursive;
  box-shadow: 0 1px 10px 0 rgba(0, 0, 0, 0.6),
    inset 1px 1px 3px rgba(255, 0, 0, 0.5);

  &: hover {
    color: yellow;
    filter: brightness(1.2);
  }

  ${({ type }) => {
    if (type === 'go-on') {
      return css`
        background: red;
      `;
    }
    if (type === 'confirm') {
      return css`
        background: lightgreen;
      `;
    }
    if (type === 'option') {
      return css`
        min-height: 50px;
        background: lightgray;
        font-size: 1.15rem;
        font-family: 'Grandstander', cursive;

        &: hover {
          color: purple;
          filter: brightness(1.2);
        }
      `;
    }
    return null;
  }}
  ${({ inactive }) =>
    inactive &&
    css`
      color: #707070;
      cursor: not-allowed;
    `}

@media all and (min-width: 360px) {
    ${({ type }) => {
      if (type === 'option') {
        return css`
          min-height: 50px;
          font-size: 1.15rem;
        `;
      }
      return null;
    }}
  }

  @media all and (min-width: 768px) {
    width: 200px;
    background-size: 100% 100%;
    margin: 20px 40px 100px;
    padding: 10px 25px;
    font-size: 1.5rem;

    ${({ type }) => {
      if (type === 'option') {
        return css`
          min-height: 70px;
          font-size: 1.4rem;
        `;
      }
      return null;
    }}
  }

  @media all and (min-width: 1200px) {
    width: 200px;
    background-size: 100% 100%;
    margin: 20px 40px 100px;
    padding: 10px 25px;
    font-size: 1.3rem;

    ${({ type }) => {
      if (type === 'option') {
        return css`
          min-height: 60px;
          font-size: 1.3rem;
        `;
      }
      return null;
    }}
  }

  @media all and (min-width: 1400px) {
    ${({ type }) => {
      if (type === 'option') {
        return css`
          margin-bottom: 130px;
        `;
      }
      return null;
    }}
  }
`;
ModalButton.displayName = 'ModalButton';

export const ModalCharFace = styled.img`
  label: ModalCharFace;
  margin: -50px auto 0;
  width: 160px;

  @media all and (min-width: 768px) {
    margin: -300px auto 0;
    width: 200px;
  }

  @media all and (min-width: 1200px) {
    margin: -100px auto 0;
    width: 140px;
  }

  @media all and (min-width: 1400px) {
    margin: -120px auto 0;
    width: 180px;
  }
`;
ModalCharFace.displayName = 'ModalCharFace';

export const ModalMessage = styled.p`
  label: ModalMessage;
  font-size: 1.2rem;
  color: white;
  text-shadow: 0 0 2px white;
  text-align: center;
  line-height: 2;
  font-family: 'Cairo', sans-serif;
  white-space: auto;
  width: 100%;

  ${({ type }) =>
    type === 'option' &&
    css`
      height: 160px;
      white-space: normal;
      font-size: 1.3rem;
      color: yellow;
    `}

  ${({ small }) =>
    small &&
    css`
      position: absolute;
      top: 90px;
    `}

  @media all and (min-width: 768px) {
    width: 60%;

    ${({ small }) =>
      small &&
      css`
        position: absolute;
        top: 120px;
      `}
  }

  @media all and (min-width: 1400px) {
    margin-top: -50px;
    width: 40%;

    ${({ small }) =>
      small &&
      css`
        position: initial;
      `}
  }
`;
ModalMessage.displayName = 'ModalMessage';

export const ModalMessageWrapper = styled.div`
  label: ModalMessageWrapper;
  margin: -50px auto;
  height: 160px;
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
ModalMessageWrapper.displayName = 'ModalMessageWrapper';

export const ModalMessageSecondary = styled.p`
  label: ModalMessageSecondary;
  font-size: 1.3rem;
  font-style: italic;
  text-transform: none;
  color: #b3f0ff;
`;
ModalMessageSecondary.displayName = 'ModalMessageSecondary';

export const ModalTitle = styled.h1`
  label: ModalTitle;
  /* position: absolute;
  top: 0; */
  margin: 0 auto;
  padding-top: 40px;
  height: 100px;
  width: 100%;
  background: rgba(0, 0, 0, 0.5);
  /* line-height: 2.5; */
  text-align: center;
  font-size: 3rem;
  color: red;
  font-family: Crackhouse, 'Grandstander', cursive;
  text-transform: uppercase;

  @media all and (min-width: 768px) {
    font-size: 5rem;
  }

  ${({ uppercase }) =>
    uppercase &&
    css`
      text-transform: uppercase;
    `}

  ${({ type }) =>
    type === 'Warning' &&
    css`
      font-size: 5rem;
    `}

        @media all and (min-width: 701px) {
    margin: 0 auto 50px;
  }
`;
ModalTitle.displayName = 'ModalTitle';

export const ModalWindow = styled.div`
  label: ModalWindow;
  z-index: 15;
  display: none;
  position: absolute;
  top: 50%;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  border-radius: 15px;
  height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 0.9);
  overflow: hidden;
  transform: translate(0, -50%);

  ${({ visible }) =>
    visible &&
    css`
      display: flex;
    `}

  ${({ type }) => {
    if (type === 'newChar') {
      return css`
        border-radius: 0;
      `;
    }
    if (type === 'config') {
      return css`
        z-index: 16;
        background: black;
      `;
    }
    return null;
  }}
  ${({ inFront }) =>
    inFront &&
    css`
      z-index: 20;
    `}
`;
ModalWindow.displayName = 'ModalWindow';

export const Player = styled.div`
  label: Player;
  position: relative;
  margin: 20px;
  height: 40px;
  min-width: 100px;
  border: 1px solid white;
  border-radius: 10px;
  padding: 5px 10px;
  background: green;
  cursor: pointer;
  font-family: 'Grandstander', cursive;
  text-align: center;
  font-size: 2rem;
  line-height: 1.1;
  text-transform: uppercase;
  color: white;

  ${({ active, dynamic }) => {
    if (dynamic) {
      return css`
        background: gray;
        color: black;
        &:hover {
          background: yellow;
        }
      `;
    }
    if (!active) {
      return css`
        border: 1px solid #707070;
        background: gray;
        color: #707070;
      `;
    }
    return null;
  }}

  ${({ showRemovePlayer }) =>
    showRemovePlayer &&
    css`
      background: red;
      color: #707070;
    `}
`;
Player.displayName = 'Player';

export const PlayerActionButtonsArea = styled.div`
  label: PlayerActionButtonsArea;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
PlayerActionButtonsArea.displayName = 'PlayerActionButtonsArea';

export const PlayerNew = styled.div`
  label: PlayerNew;
  height: 30px;
  width: 30px;
  border: 1px solid black;
  border-radius: 50%;
  background: #0099ff;
  font-family: 'Grandstander', cursive;
  text-align: center;
  font-size: 2rem;
  line-height: 1.1;
  color: white;
  cursor: pointer;
`;
PlayerNew.displayName = 'PlayerNew';

export const PlayerNewConfirmName = styled(PlayerNew)`
  label: PlayerNewConfirmName;
  margin-left: 20px;
  text-align: center;
  background: green;
  font-size: 1.3rem;
  font-weight: 600;
  line-height: 1.5;
  display: inline;
`;
PlayerNewConfirmName.displayName = 'PlayerNewConfirmName';

export const PlayerNewInput = styled.input`
  label: PlayerNewInput;
  height: 30px;
  width: 150px;
  border: 1px solid gray;
  background: white;
  font-family: 'Grandstander', cursive;
  text-align: center;
  font-size: 1rem;
  line-height: 1.1;
  color: black;
  text-transform: uppercase;
  display: inline;
`;
PlayerNewInput.displayName = 'PlayerNewInput';

export const PlayerNewInputWrapper = styled.div`
  label: PlayerNewInputWrapper;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
PlayerNewInputWrapper.displayName = 'PlayerNewInputWrapper';

export const PlayerOrderTag = styled.div`
  label: PlayerOrderTag;
  position: absolute;
  top: -10px;
  right: -10px;
  font-size: 0.9rem;
  line-height: 1.2;
  height: 15px;
  width: 15px;
  border-radius: 50%;
  background: crimson;
  color: white;
`;
PlayerOrderTag.displayName = 'PlayerOrderTag';

export const PlayerRemove = styled.div`
  label: PlayerRemove;
  z-index: 10;
  position: absolute;
  top: -10px;
  right: -10px;
  height: 20px;
  width: 20px;
  border: 1px solid black;
  border-radius: 50%;
  background: #ff0000;
  font-family: 'Cairo', sans-serif;
  text-align: center;
  font-size: 1.2rem;
  line-height: 1.1;
  color: black;
  cursor: pointer;
`;
PlayerRemove.displayName = 'PlayerRemove';

export const PlayerRemoveToggle = styled(PlayerNew)`
  label: PlayerRemoveToggle;
  margin-left: 20px;
  background: red;
  font-size: 1.3rem;
  font-weight: 600;
  line-height: 1.5;

  ${({ active }) =>
    active &&
    css`
      background: green;
      font-weight: 900;
      font-size: 1.2rem;
      line-height: 1.8;
    `}
`;
PlayerRemoveToggle.displayName = 'PlayerRemoveToggle';

export const PlayersArea = styled.div`
  label: PlayersArea;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: 50px auto;
  height: auto;
  max-width: 100%;
  flex-wrap: wrap;
  text-transform: uppercase;
`;
PlayersArea.displayName = 'PlayersArea';

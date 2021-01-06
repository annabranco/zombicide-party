import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { SelectionButton } from '../MainMenu/styles';

export const ButtonsArea = styled.div`
  label: ButtonsArea;
  position: absolute;
  bottom: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 70px;
  width: 100%;
  background: rgba(0, 0, 0, 0.6);
  box-shadow: 0 0 20px black;
  padding: 0;
  text-align: center;
`;
ButtonsArea.displayName = 'ButtonsArea';

export const ModalButton = styled(SelectionButton)`
  label: ModalButton;
  margin: 10px 40px;
  min-height: 40px;
  width: 190px;
  background: gray;
  padding: 5px 15px;
  font-size: 1.1rem;
  font-weight: 700;
  color: black;
  font-family: 'Grandstander', cursive;

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
        min-height: 80px;
        background: lightgray;
        font-size: 1.15rem;
        font-family: 'Grandstander', cursive;

        &: hover {
          color: purple;
          filter: brightness(1.2);
          font-size: 1.2rem;
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
`;
ModalButton.displayName = 'ModalButton';

export const ModalCharFace = styled.img`
  label: ModalCharFace;
  margin: -50px auto;
  width: 160px;
`;
ModalCharFace.displayName = 'ModalCharFace';

export const ModalMessage = styled.p`
  label: ModalMessage;
  font-size: 1.2rem;
  color: white;
  text-shadow: 0 0 2px white;
  text-align: center;
  line-height: 2;
  white-space: pre;
  font-family: 'Cairo', sans-serif;
  ${({ type }) =>
    type === 'option' &&
    css`
      height: 160px;
      white-space: normal;
      font-size: 1.3rem;
      color: yellow;
    `}
`;
ModalMessage.displayName = 'ModalMessage';

export const ModalMessageWrapper = styled.div`
  label: ModalMessageWrapper;
  margin: -50px auto;
  height: 160px;
  width: 80%;
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
  position: absolute;
  top: 0;
  margin: 0 auto 50px;
  height: 60px;
  width: 100%;
  background: rgba(0, 0, 0, 0.7);
  line-height: 2.5;
  text-align: center;
  font-size: 2rem;
  color: red;
  text-shadow: 0 0 2px white;

  ${({ uppercase }) =>
    uppercase &&
    css`
      text-transform: uppercase;
    `}
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
  justify-content: space-around;
  border-radius: 15px;
  height: 120%;
  width: 120%;
  background: rgba(0, 0, 0, 0.75);
  overflow: hidden;
  transform: translate(0, -50%);

  ${({ visible }) =>
    visible &&
    css`
      display: flex;
    `}

  ${({ type }) =>
    type === 'newChar' &&
    css`
      border-radius: 0;
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
`;
PlayerNew.displayName = 'PlayerNew';

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
  height: 40px;
  width: auto;
  text-transform: uppercase;
`;
PlayersArea.displayName = 'PlayersArea';

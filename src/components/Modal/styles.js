import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { ActionButton } from '../MainMenu/styles';

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

export const ModalButton = styled(ActionButton)`
  label: ModalButton;
  margin: 0 40px;
  width: 190px;
  background: gray;
  padding: 5px 15px;
  font-family: 'Grandstander', cursive;
  font-size: 0.9rem;
  font-weight: 700;
  color: black;

  ${({ type }) =>
    type === 'go-on' &&
    css`
      background: red;
    `}
  ${({ inactive }) =>
    inactive &&
    css`
      color: #707070;
      cursor: not-allowed;
    `}
`;
ModalButton.displayName = 'ModalButton';

export const ModalMessage = styled.p`
  label: ModalMessage;
  font-size: 1.2rem;
  color: white;
  text-shadow: 0 0 2px white;
  text-align: center;
  line-height: 2;
  white-space: pre;
`;
ModalMessage.displayName = 'ModalMessage';

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
`;
ModalTitle.displayName = 'ModalTitle';

export const ModalWindow = styled.div`
  label: ModalWindow;
  z-index: 10;
  display: none;
  position: absolute;
  top: 50%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 15px;
  height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 0.7);
  overflow: hidden;
  transform: translate(0, -50%);

  ${({ visible }) =>
    visible &&
    css`
      display: flex;
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

  ${({ active }) =>
    !active &&
    css`
      border: 1px solid #707070;
      background: gray;
      color: #707070;
    `}

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
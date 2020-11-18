import React, { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { bool, func, instanceOf, node } from 'prop-types';
import {
  ModalWindow,
  ModalMessage,
  ModalButton,
  ButtonsArea,
  ModalTitle,
  Player,
  PlayersArea,
  PlayerNew,
  PlayerNewInput,
  PlayerRemove,
  PlayerRemoveToggle,
  PlayerActionButtonsArea,
  ModalMessageSecondary
} from './styles';

const Modal = ({ loadedGame, activePlayers, setActivePlayers }) => {
  const [visible, toggleVisible] = useState(false);
  const [message, setMessage] = useState({ buttons: [] });
  const [players, updatePlayers] = useState(new Set(['Anya', 'Cris']));
  const [showInput, toggleInput] = useState(false);
  const [showRemovePlayer, toggleRemovePlayer] = useState(false);

  const history = useHistory();

  useEffect(() => {
    if (loadedGame) {
      setMessage({
        title: 'Warning',
        text:
          'You have a preloaded game.\nCreating a new game will erase the previous data.\n\nCreate a new game anyway?',
        buttons: [
          {
            text: 'Cancel',
            onClick: () => history.push('/'),
            type: 'cancel'
          },
          {
            text: 'Go on',
            onClick: onClickGoOn,
            type: 'go-on'
          }
        ]
      });
      toggleVisible(true);
    } else {
      openPlayerWindow();
    }
    toggleInput(false);
  }, [history, loadedGame]);

  const openPlayerWindow = () => {
    setMessage({
      title: 'Manage Players',
      text: 'Who is gonna play?',
      buttons: [
        {
          text: 'OK',
          onClick: onClickOkButton,
          type: 'accept'
        }
      ]
    });
    toggleVisible(true);
  };

  const onClickOkButton = () => {
    localStorage.setItem('ZombicideParty Players', JSON.stringify(players));
    toggleVisible(false);
  };

  const onClickGoOn = () => {
    toggleVisible(false);
    openPlayerWindow();
  };

  const onSelectPlayer = event => {
    const selectedPlayer = event.currentTarget.getAttribute('name');
    const playersSet = new Set(activePlayers);
    if (playersSet.has(selectedPlayer)) {
      playersSet.delete(selectedPlayer);
    } else {
      playersSet.add(selectedPlayer);
    }
    setActivePlayers(playersSet);
  };

  const onClickEnter = event => {
    if (event.key === 'Enter') {
      const playersSet = new Set(players);
      const activePlayerSet = new Set(activePlayers);
      const newPlayer = event.target.value;
      if (newPlayer) {
        playersSet.add(newPlayer);
        activePlayerSet.add(newPlayer);
        updatePlayers(playersSet);
        setActivePlayers(activePlayerSet);
        document.removeEventListener('keydown', onClickEnter);
      }
      toggleInput(false);
    }
  };

  const onAddPlayer = () => {
    toggleRemovePlayer(false);
    toggleInput(true);
    document.addEventListener('keydown', onClickEnter);
  };

  const onClickRemovePlayer = event => {
    const playersSet = new Set(players);
    const activePlayerSet = new Set(activePlayers);
    const player = event.currentTarget.getAttribute('name');
    playersSet.delete(player);
    activePlayerSet.delete(player);
    updatePlayers(playersSet);
    setActivePlayers(activePlayerSet);
  };

  return (
    <ModalWindow visible={visible}>
      <ModalTitle>{message.title}</ModalTitle>
      <ModalMessage>{message.text}</ModalMessage>
      {message.title === 'Manage Players' && (
        <>
          <PlayersArea>
            {players.size > 0 ? (
              [...players].map(player => (
                <>
                  <Player
                    key={player}
                    name={player}
                    active={activePlayers.has(player)}
                    onClick={
                      showRemovePlayer ? onClickRemovePlayer : onSelectPlayer
                    }
                    showRemovePlayer={showRemovePlayer}
                  >
                    {player}
                    {showRemovePlayer && (
                      <PlayerRemove onClick={onClickRemovePlayer}>
                        x
                      </PlayerRemove>
                    )}
                  </Player>
                </>
              ))
            ) : (
              <ModalMessageSecondary>
                No players on database. Please create one or more.
              </ModalMessageSecondary>
            )}
          </PlayersArea>
          {showInput ? (
            <PlayerNewInput type="text" placeholder="name" autoFocus />
          ) : (
            <PlayerActionButtonsArea>
              <PlayerNew onClick={onAddPlayer}>+</PlayerNew>
              {players.size > 0 && (
                <PlayerRemoveToggle
                  active={showRemovePlayer}
                  onClick={() => toggleRemovePlayer(!showRemovePlayer)}
                >
                  {showRemovePlayer ? '✓' : 'x'}
                </PlayerRemoveToggle>
              )}
            </PlayerActionButtonsArea>
          )}
        </>
      )}
      <ButtonsArea>
        {message.buttons.map(button => (
          <ModalButton
            key={`modal_button_${button.type}`}
            onClick={button.onClick}
            type={button.type}
            inactive={
              (button.type === 'accept' && activePlayers.size === 0) ||
              showInput
            }
            disabled={
              (button.type === 'accept' && activePlayers.size === 0) ||
              showInput
            }
          >
            {button.text}
          </ModalButton>
        ))}
      </ButtonsArea>
    </ModalWindow>
  );
};

Modal.propTypes = {
  loadedGame: bool.isRequired,
  activePlayers: instanceOf(Set).isRequired,
  setActivePlayers: func.isRequired
};

export default Modal;

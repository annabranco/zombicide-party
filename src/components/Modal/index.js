import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { bool, func, instanceOf } from 'prop-types';
import { useStateWithLabel } from '../../utils/hooks';
import {
  ButtonsArea,
  ModalButton,
  ModalMessage,
  ModalMessageSecondary,
  ModalTitle,
  ModalWindow,
  OverlayScreen,
  Player,
  PlayerActionButtonsArea,
  PlayerNew,
  PlayerNewInput,
  PlayerRemove,
  PlayerRemoveToggle,
  PlayersArea
} from './styles';

const Modal = ({ activePlayers, loadedGame, setActivePlayers }) => {
  const [visible, toggleVisible] = useStateWithLabel(false, 'visible');
  const [message, setMessage] = useStateWithLabel({ buttons: [] }, 'message');
  const [players, updatePlayers] = useStateWithLabel(
    new Set(['Anya', 'Cris']),
    'players'
  );
  const [showInput, toggleInput] = useStateWithLabel(false, 'showInput');
  const [showRemovePlayer, toggleRemovePlayer] = useStateWithLabel(
    false,
    'showRemovePlayer'
  );

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
                <Player
                  active={activePlayers.has(player)}
                  key={player}
                  name={player}
                  onClick={
                    showRemovePlayer ? onClickRemovePlayer : onSelectPlayer
                  }
                  showRemovePlayer={showRemovePlayer}
                >
                  {player}
                  {showRemovePlayer && (
                    <PlayerRemove onClick={onClickRemovePlayer}>x</PlayerRemove>
                  )}
                </Player>
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
            disabled={
              (button.type === 'accept' && activePlayers.size === 0) ||
              showInput
            }
            inactive={
              (button.type === 'accept' && activePlayers.size === 0) ||
              showInput
            }
            key={`modal_button_${button.type}`}
            onClick={button.onClick}
            type={button.type}
          >
            {button.text}
          </ModalButton>
        ))}
      </ButtonsArea>
    </ModalWindow>
  );
};

Modal.propTypes = {
  activePlayers: instanceOf(Set).isRequired,
  loadedGame: bool.isRequired,
  setActivePlayers: func.isRequired
};

export default Modal;
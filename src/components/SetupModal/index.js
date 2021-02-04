import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { bool, func, instanceOf, string } from 'prop-types';
import { useStateWithLabel } from '../../utils/hooks';
import {
  CANCEL,
  GO_ON,
  NEW_GAME_WARNING,
  MANAGE_PLAYERS,
  CHOOSE_PLAYER_DYNAMIC,
  CHOOSE_PLAYER,
  OK,
  PLAYERS_DB_EMPTY,
  WARNING,
  LOCAL_STORAGE_PLAYERS_KEY,
  GENERAL
} from '../../constants';
import {
  ButtonsArea,
  ModalButton,
  ModalMessage,
  ModalMessageSecondary,
  ModalTitle,
  ModalWindow,
  Player,
  PlayerActionButtonsArea,
  PlayerNew,
  PlayerNewInput,
  PlayerRemove,
  PlayerRemoveToggle,
  PlayersArea
} from './styles';

const SetupModal = ({
  activePlayers,
  addPlayer,
  dynamic,
  loadedGame,
  setActivePlayers,
  type
}) => {
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
  const [visible, toggleVisible] = useStateWithLabel(false, 'visible');

  const history = useHistory();

  useEffect(() => {
    if (loadedGame) {
      setMessage({
        title: WARNING,
        text: NEW_GAME_WARNING,
        buttons: [
          {
            text: CANCEL,
            onClick: () => history.push('/'),
            type: 'cancel'
          },
          {
            text: GO_ON,
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
      title: !dynamic && MANAGE_PLAYERS,
      text: dynamic ? CHOOSE_PLAYER_DYNAMIC : CHOOSE_PLAYER,
      buttons: dynamic
        ? []
        : [
            {
              text: OK,
              onClick: onClickOkButton,
              type: 'accept'
            }
          ]
    });
    toggleVisible(true);
  };

  const onClickOkButton = () => {
    localStorage.setItem(LOCAL_STORAGE_PLAYERS_KEY, JSON.stringify(players));
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

  const onClickName = (player, event) => {
    if (dynamic) {
      addPlayer(player);
      toggleVisible(false);
    } else if (showRemovePlayer) {
      onClickRemovePlayer(event);
    } else {
      onSelectPlayer(event);
    }
  };

  return (
    <ModalWindow visible={visible} type={type}>
      <ModalTitle type={message.title || GENERAL}>{message.title}</ModalTitle>
      <ModalMessage>{message.text}</ModalMessage>
      {(message.title === MANAGE_PLAYERS || !message.title) && (
        <>
          <PlayersArea>
            {players.size > 0 ? (
              [...players].map(player => (
                <Player
                  active={activePlayers.has(player)}
                  dynamic={dynamic}
                  key={player}
                  name={player}
                  onClick={event => onClickName(player, event)}
                  showRemovePlayer={showRemovePlayer}
                >
                  {player}
                  {showRemovePlayer && (
                    <PlayerRemove onClick={onClickRemovePlayer}>x</PlayerRemove>
                  )}
                </Player>
              ))
            ) : (
              <ModalMessageSecondary>{PLAYERS_DB_EMPTY}</ModalMessageSecondary>
            )}
          </PlayersArea>
          {showInput ? (
            <PlayerNewInput type="text" placeholder="name" autoFocus />
          ) : (
            <PlayerActionButtonsArea>
              <PlayerNew onClick={onAddPlayer}>+</PlayerNew>
              {players.size > 0 && !dynamic && (
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
      <ButtonsArea delay>
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

SetupModal.propTypes = {
  addPlayer: func,
  activePlayers: instanceOf(Set).isRequired,
  dynamic: bool,
  loadedGame: bool,
  setActivePlayers: func.isRequired,
  type: string
};

SetupModal.defaultProps = {
  addPlayer: () => null,
  dynamic: false,
  loadedGame: null,
  type: null
};

export default SetupModal;

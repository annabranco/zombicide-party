import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { bool, func, instanceOf, number, string } from 'prop-types';
import { useStateWithLabel } from '../../utils';
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
  PlayerNewConfirmName,
  PlayerNewInput,
  PlayerNewInputWrapper,
  PlayerOrderTag,
  PlayerRemove,
  PlayerRemoveToggle,
  PlayersArea
} from './styles';

const SetupModal = ({
  activePlayers,
  addPlayer,
  dynamic,
  goToNextTourStep,
  loadedGame,
  playIntro,
  setActivePlayers,
  tourMode,
  type
}) => {
  const [message, setMessage] = useStateWithLabel({ buttons: [] }, 'message');
  const [newPlayerName, updateNewPlayerName] = useStateWithLabel(
    '',
    'newPlayerName'
  );

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
    if (loadedGame && !tourMode) {
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
    } else if (!tourMode || tourMode <= 5) {
      openPlayerWindow();
    }
    toggleInput(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history, loadedGame, tourMode]);

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
    localStorage.setItem(
      LOCAL_STORAGE_PLAYERS_KEY,
      JSON.stringify([...players])
    );

    toggleVisible(false);

    if (playIntro) {
      playIntro();
    }
    if (tourMode === 5) {
      goToNextTourStep();
    }
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
    if (tourMode === 4 && playersSet.size > 1) {
      goToNextTourStep();
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onConfirmPlayerName = event => {
    if (event.key === 'Enter' || !event.key) {
      // !event.key if it is fired from mouse click
      const playersSet = new Set(players);
      const activePlayerSet = new Set(activePlayers);
      const newPlayer = newPlayerName;

      if (newPlayer) {
        playersSet.add(newPlayer);
        activePlayerSet.add(newPlayer);
        updatePlayers(playersSet);
        setActivePlayers(activePlayerSet);
        document.removeEventListener('keydown', onConfirmPlayerName);
      }
      toggleInput(false);
      updateNewPlayerName('');
      if (tourMode === 3) {
        goToNextTourStep();
      }
    }
  };

  const onAddPlayer = () => {
    toggleRemovePlayer(false);
    toggleInput(true);
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
    if (tourMode === 3 || tourMode === 5) {
      return;
    }
    if (dynamic) {
      addPlayer(player);
      toggleVisible(false);
    } else if (showRemovePlayer) {
      onClickRemovePlayer(event);
    } else {
      onSelectPlayer(event);
    }
  };

  useEffect(() => {
    document.removeEventListener('keydown', onConfirmPlayerName);
    document.addEventListener('keydown', onConfirmPlayerName);
  }, [newPlayerName, onConfirmPlayerName]);

  return (
    <ModalWindow
      inFront={message.title === WARNING}
      type={type}
      visible={visible}
    >
      <ModalTitle type={message.title || GENERAL}>{message.title}</ModalTitle>
      <ModalMessage>{message.text}</ModalMessage>
      {(message.title === MANAGE_PLAYERS || !message.title) && (
        <>
          <PlayersArea>
            {players.size > 0 ? (
              [...players].map((player, index) => (
                <Player
                  active={activePlayers.has(player)}
                  dynamic={dynamic}
                  key={player}
                  name={player}
                  onClick={event => onClickName(player, event)}
                  showRemovePlayer={showRemovePlayer}
                  tourMode={tourMode === 4 && (index === 0 || index === 1)}
                >
                  {player}
                  {[...activePlayers].includes(player) && (
                    <PlayerOrderTag>
                      {[...activePlayers].indexOf(player) + 1}
                    </PlayerOrderTag>
                  )}
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
            <PlayerNewInputWrapper>
              <PlayerNewInput
                autoFocus
                defaultValue={newPlayerName}
                placeholder="name"
                type="text"
                onChange={event => updateNewPlayerName(event.target.value)}
              />
              <PlayerNewConfirmName onClick={onConfirmPlayerName}>
                ✓
              </PlayerNewConfirmName>
            </PlayerNewInputWrapper>
          ) : (
            <PlayerActionButtonsArea>
              {(!tourMode || tourMode !== 5) && (
                <PlayerNew onClick={onAddPlayer} tourMode={tourMode === 3}>
                  +
                </PlayerNew>
              )}
              {players.size > 0 && !dynamic && !tourMode && (
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
              showInput ||
              tourMode === 4
            }
            inactive={
              (button.type === 'accept' && activePlayers.size === 0) ||
              showInput
            }
            key={`modal_button_${button.type}`}
            onClick={button.onClick}
            tourMode={tourMode === 5}
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
  goToNextTourStep: func,
  loadedGame: bool,
  playIntro: func,
  setActivePlayers: func.isRequired,
  tourMode: number,
  type: string
};

SetupModal.defaultProps = {
  addPlayer: () => null,
  dynamic: false,
  goToNextTourStep: () => null,
  loadedGame: null,
  playIntro: null,
  tourMode: null,
  type: null
};

export default SetupModal;

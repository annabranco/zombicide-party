import React, { useContext, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { arrayOf, bool, func, number } from 'prop-types';
import { cloneDeep } from 'lodash';
import ConfigGame from '../ConfigGame';
import { AppContext } from '../../setup/context';
import {
  getCharacterColor,
  getMediaQuery,
  logger,
  useStateWithLabel
} from '../../utils';
import SetupModal from '../SetupModal';
import BG from '../../assets/images/background/background.jpg';
import Intro from '../../assets/sounds/music/TheHorrorShowShort.mp3';
import IntroEnd from '../../assets/sounds/intro/ding.mp3';
import {
  CLICK_NEW_GAME,
  LOG_TYPE_CORE,
  ADD_NEW_PLAYER,
  CHARACTERS_TEXT,
  CHARACTER_TEXT,
  CLEAR_LS,
  LOCAL_STORAGE_KEY,
  LOG_TYPE_EXTENDED,
  LOG_TYPE_INFO,
  MOBILE,
  PLAYER_NAMES,
  START_GAME,
  LOCAL_STORAGE_ROUNDS_KEY
} from '../../constants';
import { CharacterType } from '../../interfaces/types';
import { MenuScreen } from '../Home/styles';
import {
  CharacterImage,
  CharacterName,
  CharacterArea,
  PlayerTag,
  Selector,
  SelectorButton,
  SelectorTitle
} from './styles';

const NewGame = ({
  currentChars,
  dynamic,
  goToNextTourStep,
  loadedGame,
  setInitialCharacters,
  setNewChar,
  tourMode
}) => {
  const [activePlayers, setActivePlayers] = useStateWithLabel(
    new Set(),
    'activePlayers'
  );
  const [characters, setCharacters] = useStateWithLabel([], 'characters');
  const [charactersSelected, updateSelectedCharacters] = useStateWithLabel(
    new Map(),
    'charactersSelected'
  );
  const [config, toggleConfig] = useStateWithLabel(!dynamic, 'config');
  const [newPlayer, setNewPlayer] = useStateWithLabel(null, 'newPlayer');
  const [playerWasSelected, selectPlayer] = useStateWithLabel(
    null,
    'playerWasSelected'
  );

  const { context } = useContext(AppContext);
  const intro = useRef(new Audio(Intro));
  const introEnd = useRef(new Audio(IntroEnd));

  const playIntro = () => {
    intro.current.currentTime = 0;
    intro.current.volume = 0.4;
    intro.current.loop = true;
    intro.current.play();
  };

  const stopIntro = () => {
    if (navigator.userAgent.match(/iPad|iPhone/i)) {
      intro.current.pause();
      introEnd.current.currentTime = 0;
      introEnd.current.volume = 0.2;
      introEnd.current.play();
    } else {
      const fadeInterval = setInterval(() => {
        if (intro.current.volume < 0.1) {
          clearInterval(fadeInterval);
          intro.current.pause();
        } else if (intro.current.volume > 0) {
          intro.current.volume -= 0.05;
        }
      }, 500);
      setTimeout(() => {
        introEnd.current.currentTime = 0;
        introEnd.current.volume = 0.2;
        introEnd.current.play();
      }, 3500);
    }
  };

  const addPlayer = newPlayerSelected => {
    setNewPlayer(newPlayerSelected);
    logger(LOG_TYPE_EXTENDED, ADD_NEW_PLAYER, newPlayerSelected);
    selectPlayer(true);
  };

  const onClickConfirm = () => {
    logger(LOG_TYPE_INFO, CLEAR_LS);
    localStorage.removeItem(LOCAL_STORAGE_ROUNDS_KEY);
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    window.debuggerLog = [];
    const newgameCharacters = [];
    charactersSelected.forEach((player, name) => {
      newgameCharacters.push(characters.find(char => char.name === name));
    });
    logger(LOG_TYPE_CORE, START_GAME, cloneDeep(newgameCharacters));
    logger(LOG_TYPE_INFO, PLAYER_NAMES, [...activePlayers].toString());
    stopIntro();
    setInitialCharacters(newgameCharacters);
    if (tourMode === 9) {
      goToNextTourStep();
    }
  };

  const onSelect = event => {
    if (dynamic) {
      const character = event.currentTarget.getAttribute('name');
      const currentCharacters = cloneDeep(currentChars);
      const selectedChar = characters.find(char => char.name === character);
      selectedChar.player = newPlayer;
      currentCharacters.push(selectedChar);
      setNewChar(currentCharacters);
    } else {
      const character = event.currentTarget.getAttribute('name');
      let updatedChars = new Map(charactersSelected);

      if (updatedChars.has(character)) {
        updatedChars = new Map(
          [...updatedChars].filter(([name, player]) => name !== character)
        );
      } else {
        const charWithPlayer = [character];
        if (activePlayers.size >= 1) {
          const orderedPlayers = new Set(activePlayers);
          const currentPlayer = activePlayers.values().next().value;

          orderedPlayers.delete(currentPlayer);
          orderedPlayers.add(currentPlayer);
          setActivePlayers(orderedPlayers);
          charWithPlayer.push(currentPlayer);
          updatedChars.set(...charWithPlayer);
        }
      }
      updateSelectedCharacters(updatedChars);
      orderCharacters(updatedChars);

      if (tourMode === 6 || tourMode === 7 || tourMode === 8) {
        goToNextTourStep();
      }
    }
  };

  const orderCharacters = updatedChars => {
    let allCharacters = [...characters];
    const orderedSelected = new Map(updatedChars);
    const orderedCharacters = [];

    allCharacters.forEach(char =>
      orderedSelected.set(char.name, orderedSelected.get(char.name))
    );

    orderedSelected.forEach((player, name) => {
      let found = false;
      allCharacters = allCharacters.filter(char => {
        if (!found && char.name === name) {
          const newChar = { ...char };
          newChar.player = player;
          orderedCharacters.push(newChar);
          found = true;
          return false;
        }
        return true;
      });
      setCharacters(orderedCharacters);
    });
  };

  useEffect(() => {
    if (context.characters) {
      setCharacters(context.characters);
    }
  }, [context.characters, setCharacters]);

  useEffect(() => {
    if (currentChars && dynamic) {
      const currentCharacters = new Set();
      currentChars.forEach(char => currentCharacters.add(char.name));
      const updatedChars = context.characters.filter(
        char => !currentCharacters.has(char.name)
      );
      setCharacters(updatedChars);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentChars]);

  useEffect(() => {
    if (tourMode === 1) {
      setTimeout(() => {
        goToNextTourStep();
      }, 1000);
    }
  }, [goToNextTourStep, tourMode]);

  useEffect(() => {
    logger(LOG_TYPE_EXTENDED, CLICK_NEW_GAME);
  }, []);

  return (
    <MenuScreen dynamic={dynamic} img={BG} type="newChar">
      {config && (
        <ConfigGame
          goToNextTourStep={goToNextTourStep}
          toggleConfig={toggleConfig}
          tourMode={tourMode}
        />
      )}
      <SetupModal
        activePlayers={activePlayers}
        addPlayer={addPlayer}
        dynamic={dynamic}
        goToNextTourStep={goToNextTourStep}
        loadedGame={loadedGame}
        playIntro={playIntro}
        setActivePlayers={setActivePlayers}
        tourMode={tourMode}
        type="newChar"
      />
      <SelectorTitle dynamic={dynamic}>
        CHOOSE {dynamic ? CHARACTER_TEXT : CHARACTERS_TEXT}
      </SelectorTitle>
      {((dynamic && playerWasSelected) || !dynamic) && (
        <CharacterArea dynamic={dynamic} number={characters.length}>
          {characters.map(char => (
            <Selector
              key={char.name}
              name={char.name}
              number={characters.length}
              onClick={
                (tourMode === 6 && char.name !== 'Amy') ||
                (tourMode === 7 && char.name !== 'Doug') ||
                (tourMode === 8 && char.name !== 'Wanda') ||
                tourMode === 9
                  ? () => null
                  : onSelect
              }
              tourMode={
                (tourMode === 6 && char.name === 'Amy') ||
                (tourMode === 7 && char.name === 'Doug') ||
                (tourMode === 8 && char.name === 'Wanda')
              }
            >
              <CharacterImage
                active={charactersSelected.has(char.name)}
                dynamic={dynamic}
                src={getMediaQuery() === MOBILE ? char.face : char.selector}
              />
              <CharacterName
                active={charactersSelected.has(char.name)}
                number={characters.length}
              >
                {char.name}
              </CharacterName>
              {charactersSelected.get(char.name) && (
                <PlayerTag
                  color={getCharacterColor(char.name, context.characters)}
                >
                  {charactersSelected.get(char.name)}
                </PlayerTag>
              )}
            </Selector>
          ))}
        </CharacterArea>
      )}
      {!dynamic && (
        <Link to={charactersSelected.size > 0 ? '/play' : ''}>
          <SelectorButton
            active={charactersSelected.size > 0}
            disabled={
              charactersSelected.size === 0 ||
              (tourMode && charactersSelected.size !== 3)
            }
            onClick={onClickConfirm}
            tourMode={tourMode === 9}
          >
            Confirm
          </SelectorButton>
        </Link>
      )}
    </MenuScreen>
  );
};

NewGame.propTypes = {
  currentChars: arrayOf(CharacterType),
  dynamic: bool,
  goToNextTourStep: func,
  loadedGame: bool,
  setInitialCharacters: func,
  setNewChar: func,
  tourMode: number
};

NewGame.defaultProps = {
  currentChars: null,
  dynamic: false,
  goToNextTourStep: () => null,
  loadedGame: null,
  setInitialCharacters: () => null,
  setNewChar: () => null,
  tourMode: null
};

export default NewGame;

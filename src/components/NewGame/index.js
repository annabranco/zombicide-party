import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { arrayOf, bool, func } from 'prop-types';
import { cloneDeep } from 'lodash';
import { useStateWithLabel } from '../../utils/hooks';
import { getMediaQuery } from '../../utils/devices';
import { getCharacterColor } from '../../utils/players';
import { CHARACTERS } from '../../setup/characters';
import SetupModal from '../SetupModal';
import BG from '../../assets/images/background/background.jpg';
import {
  CHARACTER_TEXT,
  CHARACTERS_TEXT,
  LOCAL_STORAGE_KEY,
  MOBILE
} from '../../constants';
import { CharacterType } from '../../interfaces/types';
import {
  CharacterImage,
  CharacterName,
  CharacterArea,
  PlayerTag,
  Selector,
  SelectorButton,
  SelectorTitle
} from './styles';
import { MenuScreen } from '../MainMenu/styles';

const NewGame = ({
  currentChars,
  dynamic,
  loadedGame,
  setInitialCharacters,
  setNewChar
}) => {
  const [activePlayers, setActivePlayers] = useStateWithLabel(
    new Set(),
    'activePlayers'
  );
  const [characters, setCharacters] = useStateWithLabel(
    CHARACTERS,
    'characters'
  );
  const [charactersSelected, updateSelectedCharacters] = useStateWithLabel(
    new Map(),
    'charactersSelected'
  );
  const [newPlayer, setNewPlayer] = useStateWithLabel(null, 'newPlayer');
  const [playerWasSelected, selectPlayer] = useStateWithLabel(
    null,
    'playerWasSelected'
  );

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

  const onClickConfirm = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    const newgameCharacters = [];
    charactersSelected.forEach((player, name) => {
      newgameCharacters.push(characters.find(char => char.name === name));
    });
    setInitialCharacters(newgameCharacters);
  };

  const addPlayer = newPlayerSelected => {
    setNewPlayer(newPlayerSelected);
    selectPlayer(true);
  };

  useEffect(() => {
    if (currentChars) {
      const currentCharacters = new Set();
      currentChars.forEach(char => currentCharacters.add(char.name));
      const updatedChars = characters.filter(
        char => !currentCharacters.has(char.name)
      );
      setCharacters(updatedChars);
    }
  }, [currentChars]);

  return (
    <MenuScreen dynamic={dynamic} img={BG} type="newChar">
      <SetupModal
        activePlayers={activePlayers}
        addPlayer={addPlayer}
        dynamic={dynamic}
        loadedGame={loadedGame}
        setActivePlayers={setActivePlayers}
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
              onClick={onSelect}
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
                <PlayerTag color={getCharacterColor(char.name)}>
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
            disabled={charactersSelected.size === 0}
            onClick={onClickConfirm}
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
  loadedGame: bool,
  setInitialCharacters: func,
  setNewChar: func
};

NewGame.defaultProps = {
  currentChars: null,
  dynamic: false,
  loadedGame: null,
  setInitialCharacters: () => null,
  setNewChar: () => null
};

export default NewGame;

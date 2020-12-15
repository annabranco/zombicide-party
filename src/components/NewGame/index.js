import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { bool, func } from 'prop-types';
import { cloneDeep } from 'lodash';
import { getCharacterColor } from '../../utils/players';
import { useStateWithLabel } from '../../utils/hooks';
import Modal from '../Modal';
import BG from '../../assets/images/background/background.jpg';
import { CHARACTERS } from '../../setup/characters';
import {
  CharImage,
  CharName,
  CharacterArea,
  PlayerTag,
  Selector,
  SelectorButton,
  SelectorTitle
} from './styles';
import { MenuScreen } from '../MainMenu/styles';
import { characterTypes } from '../../interfaces/types';

const NewGame = ({
  currentChars,
  dynamic,
  loadedGame,
  setInitialCharacters,
  setNewChar
}) => {
  const [characters, setCharacters] = useStateWithLabel(
    CHARACTERS,
    'characters'
  );
  const [charactersSelected, updateSelectedCharacters] = useStateWithLabel(
    new Map(),
    'charactersSelected'
  );
  const [activePlayers, setActivePlayers] = useStateWithLabel(
    new Set(),
    'activePlayers'
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
    localStorage.removeItem('ZombicideParty');
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
  }, [currentChars, characters, setCharacters]);

  return (
    <MenuScreen img={BG} type="newChar">
      <Modal
        addPlayer={addPlayer}
        dynamic={dynamic}
        loadedGame={loadedGame}
        activePlayers={activePlayers}
        setActivePlayers={setActivePlayers}
        type="newChar"
      />
      <SelectorTitle dynamic={dynamic}>
        CHOOSE {dynamic ? 'CHARACTER' : 'CHARACTERS'}
      </SelectorTitle>
      {((dynamic && playerWasSelected) || !dynamic) && (
        <CharacterArea dynamic={dynamic}>
          {characters.map(char => (
            <Selector key={char.name} name={char.name} onClick={onSelect}>
              <CharImage
                active={charactersSelected.has(char.name)}
                dynamic={dynamic}
                src={char.selector}
              />
              <CharName active={charactersSelected.has(char.name)}>
                {char.name}
              </CharName>
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
  currentChars: characterTypes,
  dynamic: bool,
  loadedGame: bool.isRequired,
  setInitialCharacters: func.isRequired,
  setNewChar: func
};

NewGame.defaultProps = {
  currentChars: null,
  dynamic: false,
  setNewChar: () => null
};

export default NewGame;

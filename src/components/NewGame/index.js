import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { bool, func } from 'prop-types';
import { MenuScreen } from '../MainMenu/styles';
import BG from '../../assets/images/background/background.jpg';
import { CHARACTERS } from '../../setup/characters';
import {
  CharacterArea,
  Selector,
  SelectorTitle,
  SelectorButton,
  CharImage,
  CharName,
  PlayerTag
} from './styles';
import Modal from '../Modal';
import { getCharacterColor } from '../../utils/players';

const NewGame = ({ loadedGame, setInitialCharacters }) => {
  const [characters, setCharacters] = useState(CHARACTERS);
  const [charactersSelected, updateSelectedCharacters] = useState(new Map());
  const [activePlayers, setActivePlayers] = useState(new Set());

  const onSelect = event => {
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
    const newgameCharacters = [];
    charactersSelected.forEach((player, name) => {
      newgameCharacters.push(characters.find(char => char.name === name));
    });
    setInitialCharacters(newgameCharacters);
  };

  return (
    <MenuScreen img={BG}>
      <Modal
        loadedGame={loadedGame}
        activePlayers={activePlayers}
        setActivePlayers={setActivePlayers}
      />
      <SelectorTitle>CHOOSE PLAYERS</SelectorTitle>
      <CharacterArea>
        {characters.map(char => (
          <Selector key={char.name} name={char.name} onClick={onSelect}>
            <CharImage
              src={char.selector}
              active={charactersSelected.has(char.name)}
            />
            {charactersSelected.has(char.name) && (
              <CharName>{char.name}</CharName>
            )}
            {charactersSelected.get(char.name) && (
              <PlayerTag color={getCharacterColor(char.name)}>
                {charactersSelected.get(char.name)}
              </PlayerTag>
            )}
          </Selector>
        ))}
      </CharacterArea>
      <Link to={charactersSelected.size > 0 && '/play'}>
        <SelectorButton
          active={charactersSelected.size > 0}
          disabled={charactersSelected.size === 0}
          onClick={onClickConfirm}
        >
          Confirm
        </SelectorButton>
      </Link>
    </MenuScreen>
  );
};

NewGame.propTypes = {
  loadedGame: bool.isRequired,
  setInitialCharacters: func.isRequired
};

export default NewGame;

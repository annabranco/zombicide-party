import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { bool, func } from 'prop-types';
import {
  MainTitle,
  MenuScreen,
  TestButton,
  ThunderOverlay,
  Version
} from '../MainMenu/styles';
import BG from '../../assets/images/background/background.jpg';
import { CHARACTERS } from '../../setup/characters';
import {
  CharacterArea,
  Selector,
  SelectorTitle,
  SelectorButton,
  CharImage,
  CharName
} from './styles';

const NewGame = ({ loadedGame, setInitialCharacters }) => {
  const [charactersSelected, updateCharacters] = useState([]);
  const [characters, setCharacters] = useState(CHARACTERS);

  console.log('$$$ characters', characters);

  const orderCharacters = selectedChars => {
    let allCharacters = [...characters];
    const orderedSelected = new Set(selectedChars);
    const orderedCharacters = [];

    allCharacters.forEach(char => orderedSelected.add(char.name));

    orderedSelected.forEach(name => {
      let found = false;
      allCharacters = allCharacters.filter(char => {
        if (!found && char.name === name) {
          orderedCharacters.push(char);
          found = true;
          return false;
        }
        return true;
      });
      setCharacters(orderedCharacters);
    });
  };

  const onSelect = event => {
    const character = event.currentTarget.getAttribute('name');
    let selectedChars = [...charactersSelected];
    if (selectedChars.includes(character)) {
      selectedChars = selectedChars.filter(name => name !== character);
    } else {
      selectedChars.push(character);
    }
    updateCharacters(selectedChars);
    orderCharacters(selectedChars);
  };

  const onClickConfirm = () => {
    const newgameCharacters = [];
    charactersSelected.forEach(name => {
      newgameCharacters.push(characters.find(char => char.name === name));
    });
    setInitialCharacters(newgameCharacters);
  };

  return (
    <MenuScreen img={BG}>
      <SelectorTitle>CHOOSE PLAYERS</SelectorTitle>
      <CharacterArea>
        {characters.map(char => (
          <Selector key={char.name} name={char.name} onClick={onSelect}>
            <CharImage
              src={char.selector}
              active={charactersSelected.includes(char.name)}
            />
            {charactersSelected.includes(char.name) && (
              <CharName>{char.name}</CharName>
            )}
          </Selector>
        ))}
      </CharacterArea>
      <Link to={charactersSelected.length > 0 && '/play'}>
        <SelectorButton
          active={charactersSelected.length > 0}
          disabled={charactersSelected.length === 0}
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

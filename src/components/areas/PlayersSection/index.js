import React, { useEffect, useRef, useState } from 'react';
import { string } from 'prop-types';
import SoundBlock from '../SoundBlock';
import { WEAPONS } from '../../../utils/itemsReference';
import {
  CharacterSheet,
  CharItems,
  CharName,
  Item,
  ItemWrapper,
  ItemBlank,
  ActionButtonsWrapper,
  ActionButton,
  NextButton,
  CharacterOverlay,
  PlayerTag
} from './styles';
import { CHARACTERS } from '../../../setup/characters';
import { getCharacterColor, getPlayerObject } from '../../../utils/players';
import ItemsSelectorModal from '../../ItemsSelectorModal';

const PlayersSection = ({ initialCharacters, loadedGame }) => {
  const [character, changeCharacter] = useState({});
  const [charIndex, changeCharIndex] = useState(0);

  const [weapons, updateWeapons] = useState(['', '']);
  const [slot, selectSlot] = useState();
  const [characters, updateCharacters] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);

  const prevCharIndex = useRef();
  const prevWeapons = useRef();

  const changeWeapon = (selectedItem, activeSlot = slot - 1) => {
    const newItems = [...weapons];
    newItems[activeSlot] = selectedItem;
    updateWeapons(newItems);
    selectSlot();
  };

  const changeToNextPlayer = () => {
    const nextPlayerIndex =
      charIndex + 1 === characters.length ? 0 : charIndex + 1;
    changeCharIndex(nextPlayerIndex);
  };

  useEffect(() => {
    if (!dataLoaded) {
      const updatedCharacters = (initialCharacters.length > 0 && [
        ...initialCharacters
      ]) ||
        (loadedGame && [...loadedGame]) || [...CHARACTERS];
      updatedCharacters.forEach(char => {
        if (char.weapons.length === 0) {
          // eslint-disable-next-line no-param-reassign
          char.weapons = [undefined, undefined];
        } else if (char.weapons.length === 1) {
          // eslint-disable-next-line no-param-reassign
          char.weapons = [undefined, ...char.weapons];
        }
      });
      updateCharacters(updatedCharacters);
      prevCharIndex.current = charIndex;
    }
  }, [charIndex, dataLoaded, initialCharacters, loadedGame]);

  useEffect(() => {
    if (characters) {
      const nextChar = characters[charIndex];
      if (nextChar && (charIndex !== prevCharIndex.current || !dataLoaded)) {
        const playerItems = [nextChar.weapons[0], nextChar.weapons[1]];
        changeCharacter(nextChar);
        updateWeapons(playerItems);
        prevCharIndex.current = charIndex;
        prevWeapons.current = nextChar.weapons.join('-');

        if (!dataLoaded) {
          setDataLoaded(true);
          prevWeapons.current = weapons.join('-');
        }
      }
    }
  }, [charIndex, characters, dataLoaded, weapons]);

  useEffect(() => {
    if (dataLoaded && weapons.join('-') !== prevWeapons.current) {
      const allCharacters = [...characters];
      const currentCharacter = getPlayerObject(character, weapons);
      allCharacters[charIndex] = currentCharacter;
      updateCharacters(allCharacters);
      localStorage.setItem('ZombicideParty', JSON.stringify(allCharacters));
    }
  }, [weapons]);

  return (
    <CharacterSheet>
      <CharacterOverlay img={character.img} />
      <CharName>{character.name}</CharName>
      <PlayerTag color={getCharacterColor(character.name)}>
        {character.player}
      </PlayerTag>
      <CharItems>
        {weapons.map((item, index) => (
          <ItemWrapper key={`${'BaseballBat'}-${index + 1}`}>
            <Item>
              {item ? (
                <SoundBlock
                  name={item}
                  img={WEAPONS[item].img}
                  type="weapons"
                />
              ) : (
                <ItemBlank onClick={() => selectSlot(index + 1)}>
                  Item in hand
                </ItemBlank>
              )}
            </Item>
            {item && (
              <ActionButtonsWrapper>
                <ActionButton
                  type="button"
                  onClick={() => selectSlot(index + 1)}
                >
                  CHANGE
                </ActionButton>

                <ActionButton
                  type="button"
                  onClick={() => changeWeapon('', index)}
                >
                  CLEAR
                </ActionButton>
              </ActionButtonsWrapper>
            )}
          </ItemWrapper>
        ))}
      </CharItems>
      {slot && <ItemsSelectorModal changeWeapon={changeWeapon} />}
      {characters.length > 1 && (
        <NextButton type="button" onClick={changeToNextPlayer}>
          NEXT
        </NextButton>
      )}
    </CharacterSheet>
  );
};

PlayersSection.propTypes = {
  initialCharacters: string,
  loadedGame: string
};

PlayersSection.defaultProps = {
  initialCharacters: null,
  loadedGame: null
};

export default PlayersSection;

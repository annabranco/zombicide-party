import React, { useEffect, useRef } from 'react';
import { string } from 'prop-types';
import {
  CharacterSheet,
  CharItems,
  CharName,
  NextButton,
  CharacterOverlay,
  PlayerTag
} from './styles';
import { CHARACTERS } from '../../../setup/characters';
import { getCharacterColor, updatePlayerObject } from '../../../utils/players';
import { characterCanOpenDoors } from '../../../utils/items';
import ItemsSelectorModal from '../../ItemsSelectorModal';
import OpenDoor from '../../OpenDoor';
import { useStateWithLabel } from '../../../utils/hooks';
import ItemsArea from '../../ItemWrapper';

const PlayersSection = ({ initialCharacters, loadedGame }) => {
  const [character, changeCharacter] = useStateWithLabel({}, 'character');
  const [charIndex, changeCharIndex] = useStateWithLabel(0, 'charIndex');

  const [inHand, updateInHand] = useStateWithLabel(['', ''], 'inHand');
  const [inBackpack, updateInBackpack] = useStateWithLabel(
    ['', '', ''],
    'inBackpack'
  );

  const [slot, selectSlot] = useStateWithLabel(null, 'slot');
  const [characters, updateCharacters] = useStateWithLabel([], 'characters');
  const [dataLoaded, setDataLoaded] = useStateWithLabel(false, 'dataLoaded');
  const [canOpenDoor, setCanOpenDoor] = useStateWithLabel(false, 'canOpenDoor');

  const prevCharIndex = useRef();
  const prevInHand = useRef();
  const prevInBackpack = useRef();

  const changeInHand = (name, currentSlot = slot - 1) => {
    const newItems = [...inHand];
    const openDoors = characterCanOpenDoors(newItems);
    console.log('$$$ openDoors', newItems, openDoors);
    newItems[currentSlot] = name;
    updateInHand(newItems);
    setCanOpenDoor(openDoors);
    selectSlot();
  };

  const changeInBackpack = (name, currentSlot = slot - 3) => {
    const newItems = [...inBackpack];
    const openDoors = characterCanOpenDoors(newItems);

    newItems[currentSlot] = name;
    updateInBackpack(newItems);
    setCanOpenDoor(openDoors);
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
        // Keeps initial items on the right side of the card, for viewing purposes (makes the character image completely seen on the begining)
        const inHandItems = char.inHand.filter(item => item);
        const inBackpackItems = char.inBackpack.filter(item => item);

        if (inHandItems.length === 0) {
          char.inHand = [null, null]; // eslint-disable-line no-param-reassign
        } else if (inHandItems.length === 1) {
          char.inHand = [null, ...char.inHand]; // eslint-disable-line no-param-reassign
        }
        if (inBackpackItems.length === 0) {
          char.inBackpack = [null, null, null]; // eslint-disable-line no-param-reassign
        } else if (inBackpackItems.length === 1) {
          char.inBackpack = [null, null, ...inBackpackItems]; // eslint-disable-line no-param-reassign
        } else if (inBackpackItems.length === 2) {
          char.inBackpack = [null, ...inBackpackItems]; // eslint-disable-line no-param-reassign
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
        const charInHand = [nextChar.inHand[0], nextChar.inHand[1]];
        const charInBackpack = [
          nextChar.inBackpack[0],
          nextChar.inBackpack[1],
          nextChar.inBackpack[2]
        ];
        const openDoors =
          characterCanOpenDoors(charInHand) ||
          characterCanOpenDoors(charInBackpack);

        changeCharacter(nextChar);
        updateInHand(charInHand);
        updateInBackpack(charInBackpack);
        setCanOpenDoor(openDoors);

        prevCharIndex.current = charIndex;
        prevInHand.current = nextChar.inHand.join('-');
        prevInBackpack.current = nextChar.inBackpack.join('-');

        if (!dataLoaded) {
          setDataLoaded(true);
          prevInHand.current = inHand.join('-');
          prevInBackpack.current = inBackpack.join('-');
        }
      }
    }
  }, [charIndex, characters, dataLoaded, inHand]);

  useEffect(() => {
    if (
      dataLoaded &&
      (inHand.join('-') !== prevInHand.current ||
        inBackpack.join('-') !== prevInBackpack.current)
    ) {
      const allCharacters = [...characters];
      const currentCharacter = updatePlayerObject(
        character,
        inHand,
        inBackpack
      );
      const openDoors =
        characterCanOpenDoors(inHand) || characterCanOpenDoors(inBackpack);

      setCanOpenDoor(openDoors);
      allCharacters[charIndex] = currentCharacter;
      updateCharacters(allCharacters);
      localStorage.setItem('ZombicideParty', JSON.stringify(allCharacters));
    }
  }, [inHand, inBackpack]);

  return (
    <CharacterSheet>
      <CharacterOverlay img={character.img} />
      <CharName>{character.name}</CharName>
      <PlayerTag color={getCharacterColor(character.name)}>
        {character.player}
      </PlayerTag>
      {canOpenDoor && <OpenDoor type={canOpenDoor} />}
      <CharItems slotType="inHand">
        {inHand.map((item, index) => (
          <ItemsArea
            slotType="inHand"
            key={`${item}-${index + 1}`}
            item={item}
            index={index}
            selectSlot={selectSlot}
            onClickDrop={changeInHand}
          />
        ))}
      </CharItems>
      <CharItems slotType="inBackpack">
        {inBackpack.map((item, index) => (
          <ItemsArea
            slotType="inBackpack"
            key={`${item}-${index + 3}`}
            item={item}
            index={index}
            selectSlot={selectSlot}
            onClickDrop={changeInBackpack}
            noAudio
          />
        ))}
      </CharItems>
      {slot && slot <= 2 && (
        <ItemsSelectorModal slotType="inHand" onSelect={changeInHand} />
      )}
      {slot && slot >= 3 && (
        <ItemsSelectorModal slotType="inBackpack" onSelect={changeInBackpack} />
      )}
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

import React, { useEffect, useRef } from 'react';
import { cloneDeep } from 'lodash';
import { arrayOf, bool, func } from 'prop-types';
import { useHistory } from 'react-router-dom';
import { CHARACTERS } from '../../../setup/characters';
import { getCharacterColor } from '../../../utils/players';
import { getActionColor } from '../../../utils/actions';
import { characterCanOpenDoors, checkForNoise } from '../../../utils/items';
import { useStateWithLabel, useTurnsCounter } from '../../../utils/hooks';
import ItemsSelectorModal from '../../Items/ItemsSelectorModal';
import ActionButton from './actions';
import ItemsArea from '../../Items/ItemWrapper';
import Blood from '../../../assets/images/blood.png';
import Exit from '../../../assets/images/exit.png';
import Noise from '../../../assets/images/noise.png';
import FirstPlayer from '../../../assets/images/firstPlayer.jpg';

import {
  ActionsWrapper,
  CharItems,
  CharName,
  CharacterOverlay,
  CharacterSheet,
  ModalSignButton,
  NextButton,
  PlayerTag,
  PreviousButton,
  SelectButton,
  WoundedSign,
  ModalSign,
  AddNewChar,
  NoiseWrapper,
  NoiseIcon,
  MovementIndicators,
  MovementIcon,
  FinishedTurnTag,
  FirstPlayerToken,
  WoundedWrapper,
  FirstPlayerWrapper,
  FirstPlayerStar,
  ModalSignExitButton
} from './styles';
import { characterTypes } from '../../../interfaces/types';
import { SOUNDS_PATH } from '../../../setup/endpoints';
import TradeArea from '../../TradeArea';
import NewGame from '../../NewGame';

const PlayersSection = ({
  damageMode,
  initialCharacters,
  loadGame,
  loadedGame,
  toggleDamageMode
}) => {
  const [character, changeCharacter] = useStateWithLabel({}, 'character');
  const [charIndex, changeCharIndex] = useStateWithLabel(0, 'charIndex');
  const [selectCharOverlay, toggleSelectCharOverlay] = useStateWithLabel(
    false,
    'selectCharOverlay'
  );
  const [slot, selectSlot] = useStateWithLabel(null, 'slot');
  const [turnEnded, endTurn] = useStateWithLabel(null, 'turnEnded');

  const [characters, updateCharacters] = useStateWithLabel([], 'characters');
  const [dataLoaded, setDataLoaded] = useStateWithLabel(false, 'dataLoaded');
  const [canOpenDoor, setCanOpenDoor] = useStateWithLabel(false, 'canOpenDoor');
  const [car, startCar] = useStateWithLabel(false, 'car');
  const [newChar, addNewChar] = useStateWithLabel(false, 'newChar');
  const [firstPlayer, changeFirstPlayer] = useStateWithLabel(
    null,
    'firstPlayer'
  );

  const [trade, startTrade] = useStateWithLabel(false, 'trade');
  const [noise, setNoise] = useStateWithLabel(0, 'noise');
  const [actionsCount, updateActionsCount] = useStateWithLabel(
    [],
    'actionsCount'
  );

  const history = useHistory();
  const noiseDebounce = useRef();
  const prevCharIndex = useRef();

  const {
    generalActions,
    extraMovementActions,
    extraAttackActions,
    searchActions,
    spendAction,
    finishedTurn,
    canMove,
    canAttack,
    canSearch,
    message
  } = useTurnsCounter(
    (character && (character.actionsLeft || character.actions)) || [3, 0, 0, 0]
  );
  window.character = character;

  const enterCar = enter => {
    const updatedCharacter = cloneDeep(character);
    const updatedCharacters = cloneDeep(characters);
    if (enter) {
      updatedCharacter.location = 'car';
    } else {
      updatedCharacter.location = null;
    }

    updatedCharacters.forEach(char => {
      if (char.name === updatedCharacter.name) {
        char.location = updatedCharacter.location; // eslint-disable-line no-param-reassign
      }
    });
    changeCharacter(updatedCharacter);
    updateCharacters(updatedCharacters);
  };

  const changeInHand = (name, currentSlot = slot - 1) => {
    const updatedCharacter = cloneDeep(character);
    const updatedCharacters = cloneDeep(characters);
    const newItems = [...updatedCharacter.inHand];
    newItems[currentSlot] = name;
    const openDoors = characterCanOpenDoors(newItems);
    // updateInHand(newItems);
    setCanOpenDoor(openDoors);
    updatedCharacter.inHand = newItems;
    updatedCharacters.forEach(char => {
      if (char.name === updatedCharacter.name) {
        char.inHand = newItems; // eslint-disable-line no-param-reassign
      }
    });
    changeCharacter(updatedCharacter);
    updateCharacters(updatedCharacters);
    selectSlot();
    localStorage.setItem('ZombicideParty', JSON.stringify(updatedCharacters));
  };

  const changeInBackpack = (name, currentSlot = slot - 3) => {
    const updatedCharacter = cloneDeep(character);
    const updatedCharacters = cloneDeep(characters);
    const newItems = [...updatedCharacter.inBackpack];
    newItems[currentSlot] = name;
    const openDoors = characterCanOpenDoors(newItems);

    // updateInBackpack(newItems);
    setCanOpenDoor(openDoors);
    updatedCharacter.inBackpack = newItems;
    updatedCharacters.forEach(char => {
      if (char.name === updatedCharacter.name) {
        char.inBackpack = newItems; // eslint-disable-line no-param-reassign
      }
    });
    changeCharacter(updatedCharacter);
    updateCharacters(updatedCharacters);
    selectSlot();
    localStorage.setItem('ZombicideParty', JSON.stringify(updatedCharacters));
  };

  const changeToNextPlayer = () => {
    const remainingCharacters = characters.filter(
      char => char.wounded !== 'killed'
    );
    const actionsLeft = [
      generalActions,
      extraMovementActions,
      extraAttackActions,
      searchActions
    ];
    const nextPlayerIndex =
      charIndex + 1 >= remainingCharacters.length ? 0 : charIndex + 1;

    remainingCharacters.forEach(char => {
      if (char.name === character.name) {
        // eslint-disable-next-line no-param-reassign
        char.actionsLeft = actionsLeft;
      }
    });
    setNoise(0);
    updateCharacters(remainingCharacters);
    changeCharIndex(nextPlayerIndex);
  };

  const changeToPreviousPlayer = () => {
    const remainingCharacters = characters.filter(
      char => char.wounded !== 'killed'
    );
    const actionsLeft = [
      generalActions,
      extraMovementActions,
      extraAttackActions,
      searchActions
    ];
    const nextPlayerIndex =
      charIndex - 1 < 0 ? remainingCharacters.length - 1 : charIndex - 1;

    remainingCharacters.forEach(char => {
      if (char.name === character.name) {
        // eslint-disable-next-line no-param-reassign
        char.actionsLeft = actionsLeft;
      }
    });
    setNoise(0);
    updateCharacters(remainingCharacters);
    changeCharIndex(nextPlayerIndex);
  };

  const makeNoise = item => {
    if (checkForNoise(item) && !noiseDebounce.current) {
      noiseDebounce.current = true;
      setTimeout(() => {
        noiseDebounce.current = false;
      }, 1000);
      setNoise(noise + 1);
    }
  };

  const causeDamage = selectedSlot => {
    const woundedCharacter = cloneDeep(character);
    const updatedCharacters = cloneDeep(characters);
    const [attacker, oneActionKill] = damageMode.split('-');
    let remainingCharacters = characters.filter(
      char => char.wounded !== 'killed'
    );

    let damage = 'hit';
    if (woundedCharacter.wounded || oneActionKill) {
      remainingCharacters = characters.filter(
        char => char.name !== woundedCharacter.name
      );

      updatedCharacters.forEach(char => {
        if (char.name === woundedCharacter.name) {
          char.wounded = 'killed'; // eslint-disable-line no-param-reassign
        }
      });
      woundedCharacter.wounded = 'killed';
      damage = 'kill';

      if (remainingCharacters.length === 0) {
        updateCharacters(remainingCharacters);
      } else {
        updateCharacters(updatedCharacters);
      }
    } else if (selectedSlot <= 2) {
      woundedCharacter.wounded = true;
      woundedCharacter.inHand[selectedSlot - 1] = 'Wounded';
      updatedCharacters.forEach(char => {
        if (char.name === woundedCharacter.name) {
          char.wounded = true; // eslint-disable-line no-param-reassign
          char.inHand[selectedSlot - 1] = 'Wounded'; // eslint-disable-line no-param-reassign
        }
      });
    } else {
      woundedCharacter.wounded = true;
      woundedCharacter.inBackpack[selectedSlot - 3] = 'Wounded';
      updatedCharacters.forEach(char => {
        if (char.name === woundedCharacter.name) {
          char.wounded = true; // eslint-disable-line no-param-reassign
          char.inBackpack[selectedSlot - 3] = 'Wounded'; // eslint-disable-line no-param-reassign
        }
      });
    }

    const filename = `${SOUNDS_PATH}/attacks/${
      character.voice
    }-${damage}-${attacker.toLowerCase()}.mp3`;
    const sound = new Audio(filename);
    sound.currentTime = 0;
    sound.play();
    updateCharacters(updatedCharacters);
    changeCharacter(woundedCharacter);
    toggleDamageMode(false);
    localStorage.setItem('ZombicideParty', JSON.stringify(updatedCharacters));
  };

  const selectCharacter = () => {
    toggleSelectCharOverlay(false);
    return character;
  };

  const allSlotsAreEmpty = () =>
    character.inHand.every(item => !item) &&
    character.inBackpack.every(item => !item);

  const exitGame = () => {
    localStorage.removeItem('ZombicideParty');
    loadGame();
    history.push('/');
  };

  const confirmTrade = (updatedCharacter, updatedCharacters) => {
    changeCharacter(updatedCharacter);
    updateCharacters(updatedCharacters);
    localStorage.setItem('ZombicideParty', JSON.stringify(updatedCharacters));
  };

  const setNewChar = updatedCharacters => {
    addNewChar(false);
    updateCharacters(updatedCharacters);
    localStorage.setItem('ZombicideParty', JSON.stringify(updatedCharacters));
  };

  const checkIfRoundHasFinished = () => {
    if (
      characters.every(char => {
        return (
          char.actionsLeft && char.actionsLeft.reduce((a, b) => a + b, 0) <= 0
        );
      })
    ) {
      endTurn(true);
      localStorage.setItem('ZombicideParty', JSON.stringify(characters));
    } else if (turnEnded) {
      endTurn(false);
    }
  };

  const nextRound = () => {
    const updatedCharacters = cloneDeep(characters);
    let nextFirstPlayer;

    updatedCharacters.forEach((char, index) => {
      char.actionsLeft = char.actions; // eslint-disable-line no-param-reassign
      if (char.name === firstPlayer) {
        if (index + 1 === characters.length) {
          nextFirstPlayer = 0;
        } else {
          nextFirstPlayer = index + 1;
        }
      }
    });
    changeFirstPlayer(characters[nextFirstPlayer].name);
    updateCharacters(updatedCharacters);
    changeCharIndex(nextFirstPlayer);
  };

  useEffect(() => {
    if (!dataLoaded) {
      const updatedCharacters =
        (initialCharacters.length > 0 && [...initialCharacters]) ||
        (loadedGame && cloneDeep(loadedGame)) ||
        cloneDeep(CHARACTERS);
      updateCharacters(updatedCharacters);
      prevCharIndex.current = charIndex;
      changeFirstPlayer(updatedCharacters[0].name);
    }
  }, [charIndex, dataLoaded, initialCharacters, loadedGame]);

  useEffect(() => {
    const count = [];
    // eslint-disable-next-line no-plusplus
    for (let i = 1; i <= generalActions; i++) {
      count.push(i);
    }
    // eslint-disable-next-line no-plusplus
    for (let i = 1; i <= extraMovementActions; i++) {
      count.push('free move');
    }
    // eslint-disable-next-line no-plusplus
    for (let i = 1; i <= extraAttackActions; i++) {
      count.push('free attack');
    }
    // eslint-disable-next-line no-plusplus
    for (let i = 1; i <= searchActions; i++) {
      count.push('free search');
    }
    updateActionsCount(count);
  }, [
    generalActions,
    extraMovementActions,
    extraAttackActions,
    searchActions,
    updateActionsCount
  ]);

  useEffect(() => {
    if (characters) {
      checkIfRoundHasFinished();

      const nextChar = characters[charIndex];
      if (
        nextChar &&
        (charIndex !== prevCharIndex.current ||
          !dataLoaded ||
          nextChar.name !== character.name)
      ) {
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
        setCanOpenDoor(openDoors);
        prevCharIndex.current = charIndex;
        localStorage.setItem('ZombicideParty', JSON.stringify(characters));

        if (!dataLoaded) {
          setDataLoaded(true);
        }
      }
    }
  }, [charIndex, characters, dataLoaded]);

  // useEffect(() => {
  //   console.log('$$$ change char', character);
  // }, [character]);

  return (
    <>
      <CharacterSheet>
        {!trade && (
          <MovementIndicators>
            {actionsCount.map(action => (
              <MovementIcon
                color={getActionColor(action)}
                key={action}
                type={action}
              >
                {action}
              </MovementIcon>
            ))}
          </MovementIndicators>
        )}
        {trade ? (
          <TradeArea
            character={character}
            characters={characters}
            confirmTrade={confirmTrade}
            spendAction={spendAction}
            startTrade={startTrade}
          />
        ) : (
          <>
            <CharacterOverlay damageMode={damageMode} img={character.img} />
            <AddNewChar type="button" onClick={() => addNewChar(true)}>
              <i className="fas fa-user-plus" />
            </AddNewChar>
            {firstPlayer === character.name && (
              <FirstPlayerWrapper>
                <FirstPlayerToken src={FirstPlayer} alt="First Player Token" />
              </FirstPlayerWrapper>
            )}
            <CharName>
              {firstPlayer === character.name && (
                <FirstPlayerStar>⭐</FirstPlayerStar>
              )}
              {character.name}
            </CharName>
            <PlayerTag color={getCharacterColor(character.name)}>
              {character.player}
            </PlayerTag>
            <ActionsWrapper>
              {canMove && (
                <ActionButton
                  actionType={
                    // eslint-disable-next-line no-nested-ternary
                    character.location === 'car' ? 'car-exit' : 'car-enter'
                  }
                  callback={() => spendAction('move')}
                  car={car}
                  enterCar={enterCar}
                  startCar={startCar}
                  type={character.location !== 'car' && !car && 'start'}
                />
              )}
              {canMove && character.location === 'car' && (
                <>
                  <ActionButton
                    actionType="car-move"
                    callback={() => spendAction('move')}
                  />
                  <ActionButton
                    actionType="car-attack"
                    callback={() => spendAction('move')}
                  />
                </>
              )}

              {canMove && character.location !== 'car' && (
                <ActionButton
                  actionType="move"
                  callback={() => spendAction('move')}
                  type={character.movement}
                />
              )}
              {/* {canSearch && (
                <ActionButton
                  actionType="search"
                  callback={() => spendAction('search')}
                  type={character.voice}
                />
              )} */}
              {canOpenDoor && !damageMode && generalActions && (
                <ActionButton
                  actionType="open-door"
                  callback={spendAction}
                  noise={noise}
                  setNoise={setNoise}
                  type={canOpenDoor}
                />
              )}
            </ActionsWrapper>
            {character.wounded && (
              <WoundedWrapper>
                <WoundedSign src={Blood} />
              </WoundedWrapper>
            )}
            {finishedTurn && (
              <FinishedTurnTag>
                {`${character.name}'s turn has finished`}
              </FinishedTurnTag>
            )}
            {turnEnded && <ModalSign noOverlay>Zombies round ➡</ModalSign>}
            <ModalSignButton noOverlay onClick={nextRound}>
              START NEXT ROUND
            </ModalSignButton>
            {character.wounded === 'killed' && (
              <>
                <ModalSign>
                  {!characters || characters.length === 0
                    ? 'All characters are dead'
                    : `${character.name} has been killed`}
                </ModalSign>
                {characters.length === 0 && (
                  <ModalSignExitButton onClick={exitGame} src={Exit} />
                )}
              </>
            )}
            <CharItems slotType="inHand">
              {character.inHand &&
                character.inHand.map((item, index) => (
                  <ItemsArea
                    actionsLeft={generalActions}
                    allSlotsAreEmpty={allSlotsAreEmpty()}
                    callback={spendAction}
                    canAttack={canAttack}
                    canSearch={canSearch}
                    causeDamage={causeDamage}
                    charVoice={character.voice}
                    index={index}
                    damageMode={damageMode}
                    item={item}
                    key={`${item}-${index + 1}`}
                    makeNoise={makeNoise}
                    onClickDrop={changeInHand}
                    selectSlot={selectSlot}
                    slotType="inHand"
                    startTrade={startTrade}
                    wounded={character.wounded}
                  />
                ))}
            </CharItems>
            <CharItems slotType="inBackpack">
              {character.inBackpack &&
                character.inBackpack.map((item, index) => (
                  <ItemsArea
                    actionsLeft={generalActions}
                    allSlotsAreEmpty={allSlotsAreEmpty()}
                    callback={spendAction}
                    canSearch={canSearch}
                    causeDamage={causeDamage}
                    charVoice={character.voice}
                    damageMode={damageMode}
                    index={index}
                    item={item}
                    key={`${item}-${index + 3}`}
                    makeNoise={makeNoise}
                    noAudio
                    onClickDrop={changeInBackpack}
                    selectSlot={selectSlot}
                    slotType="inBackpack"
                    startTrade={startTrade}
                    wounded={character.wounded}
                  />
                ))}
            </CharItems>
            {slot && slot <= 2 && (
              <ItemsSelectorModal
                onSelect={changeInHand}
                selectSlot={selectSlot}
                slotType="inHand"
              />
            )}
            {slot && slot >= 3 && (
              <ItemsSelectorModal
                onSelect={changeInBackpack}
                selectSlot={selectSlot}
                slotType="inBackpack"
              />
            )}

            {(characters.length > 1 || prevCharIndex.current === null) && (
              <>
                <PreviousButton
                  damageMode={damageMode}
                  onClick={changeToPreviousPlayer}
                  type="button"
                >
                  PREVIOUS
                </PreviousButton>
                <NextButton
                  damageMode={damageMode}
                  onClick={changeToNextPlayer}
                  type="button"
                >
                  NEXT
                </NextButton>
              </>
            )}
            {selectCharOverlay && (
              <SelectButton onClick={selectCharacter} type="button">
                SELECT
              </SelectButton>
            )}
          </>
        )}
        {!trade && (
          <NoiseWrapper>
            {Array.from({ length: noise }, (_, index) => index).map(key => (
              <NoiseIcon key={key} src={Noise} />
            ))}
          </NoiseWrapper>
        )}
        {newChar && (
          <NewGame currentChars={characters} dynamic setNewChar={setNewChar} />
        )}
      </CharacterSheet>
    </>
  );
};

PlayersSection.propTypes = {
  damageMode: bool.isRequired,
  initialCharacters: arrayOf(characterTypes),
  loadGame: func.isRequired,
  loadedGame: arrayOf(characterTypes),
  toggleDamageMode: func.isRequired
};

PlayersSection.defaultProps = {
  initialCharacters: null,
  loadedGame: null
};

export default PlayersSection;

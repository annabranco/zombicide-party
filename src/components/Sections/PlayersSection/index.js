import React, { useEffect, useRef } from 'react';
import { cloneDeep } from 'lodash';
import { arrayOf, bool, func } from 'prop-types';
import { useHistory } from 'react-router-dom';
import { CHARACTERS } from '../../../setup/characters';
import { getCharacterColor } from '../../../utils/players';
import {
  checkIfHasAnyActionLeft,
  getActionColor
} from '../../../utils/actions';
import {
  checkIfCharacterCanOpenDoors,
  checkForNoise,
  checkIfCharacterHasFlashlight,
  checkIfCharCanCombineItems,
  checkIfAllSlotsAreEmpty,
  getCombiningReference
} from '../../../utils/items';
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
  IndicatorsWrapper,
  MovementIcon,
  FinishedTurnTag,
  FirstPlayerToken,
  WoundedWrapper,
  FirstPlayerWrapper,
  FirstPlayerStar,
  ModalSignExitButton,
  ModalSignText,
  XpIcon,
  HishestXpTag
} from './styles';
import { characterTypes } from '../../../interfaces/types';
import { SOUNDS_PATH } from '../../../setup/endpoints';
import TradeArea from '../../TradeArea';
import NewGame from '../../NewGame';
import {
  KILLED,
  KILLED_EM_ALL,
  LOCAL_STORAGE_KEY,
  TURN_FINISHED,
  WEAPONS
} from '../../../constants';
import { calculateXpBar, getXpColor } from '../../../utils/xp';
import { WEAPONS_S1 } from '../../../setup/weapons';

const PlayersSection = ({
  damageMode,
  initialCharacters,
  loadGame,
  loadedGame,
  setZombiesTurn,
  toggleDamageMode
}) => {
  const [character, changeCharacter] = useStateWithLabel({}, 'character');
  const [charIndex, changeCharIndex] = useStateWithLabel(0, 'charIndex');
  const [selectCharOverlay, toggleSelectCharOverlay] = useStateWithLabel(
    false,
    'selectCharOverlay'
  );
  const [slot, selectSlot] = useStateWithLabel(null, 'slot');
  const [roundEnded, endRound] = useStateWithLabel(null, 'roundEnded');
  const [setupMode, toggleSetupMode] = useStateWithLabel(true, 'setupMode');

  const [characters, updateCharacters] = useStateWithLabel([], 'characters');
  const [dataLoaded, setDataLoaded] = useStateWithLabel(false, 'dataLoaded');
  const [canOpenDoor, setCanOpenDoor] = useStateWithLabel(false, 'canOpenDoor');
  const [car, startCar] = useStateWithLabel(false, 'car');
  const [newChar, addNewChar] = useStateWithLabel(false, 'newChar');
  const [firstPlayer, changeFirstPlayer] = useStateWithLabel(
    null,
    'firstPlayer'
  );
  const [canUseFlashlight, changeCanUseFlashlight] = useStateWithLabel(
    false,
    'canUseFlashlight'
  );
  const [combiningItem, setCombiningItem] = useStateWithLabel(
    null,
    'combiningItem'
  );
  const [trade, startTrade] = useStateWithLabel(false, 'trade');
  const [noise, setNoise] = useStateWithLabel(0, 'noise');
  const [canCombine, toggleCanCombine] = useStateWithLabel(false, 'canCombine');
  const [xpCounter, updateXpCounter] = useStateWithLabel(
    calculateXpBar(0, 0),
    'xpCounter'
  );
  const [highestXp, updateHighestXp] = useStateWithLabel(
    { name: '', xp: 0 },
    'highestXp'
  );

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
    character && character.name,
    character.actionsLeft || character.actions || []
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
    const openDoors = checkIfCharacterCanOpenDoors(newItems);
    const hasFlashlight = checkIfCharacterHasFlashlight(newItems);
    const charCanCombineItems = checkIfCharCanCombineItems([
      ...newItems,
      ...updatedCharacter.inBackpack
    ]);
    setCanOpenDoor(openDoors);
    changeCanUseFlashlight(hasFlashlight);
    toggleCanCombine(charCanCombineItems);
    updatedCharacter.inHand = newItems;
    updatedCharacters.forEach(char => {
      if (char.name === updatedCharacter.name) {
        char.inHand = newItems; // eslint-disable-line no-param-reassign
      }
    });
    changeCharacter(updatedCharacter);
    updateCharacters(updatedCharacters);
    selectSlot();
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedCharacters));
  };

  const changeInBackpack = (name, currentSlot = slot - 3) => {
    const updatedCharacter = cloneDeep(character);
    const updatedCharacters = cloneDeep(characters);
    const newItems = [...updatedCharacter.inBackpack];
    newItems[currentSlot] = name;
    const openDoors = checkIfCharacterCanOpenDoors(newItems);
    const hasFlashlight = checkIfCharacterHasFlashlight(newItems);
    const charCanCombineItems = checkIfCharCanCombineItems([
      ...newItems,
      ...updatedCharacter.inHand
    ]);
    setCanOpenDoor(openDoors);
    changeCanUseFlashlight(hasFlashlight);
    toggleCanCombine(charCanCombineItems);
    updatedCharacter.inBackpack = newItems;
    updatedCharacters.forEach(char => {
      if (char.name === updatedCharacter.name) {
        char.inBackpack = newItems; // eslint-disable-line no-param-reassign
      }
    });
    changeCharacter(updatedCharacter);
    updateCharacters(updatedCharacters);
    selectSlot();
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedCharacters));
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

  const handleSearch = () => {
    if (canUseFlashlight && canSearch && !character.hasUsedFlashlight) {
      const updatedCharacter = cloneDeep(character);
      const updatedCharacters = cloneDeep(characters);
      updatedCharacter.hasUsedFlashlight = true;
      updatedCharacters.forEach(char => {
        if (char.name === updatedCharacter.name) {
          char.hasUsedFlashlight = true; // eslint-disable-line no-param-reassign
        }
      });
      changeCharacter(updatedCharacter);
      updateCharacters(updatedCharacters);
    } else if (canSearch) {
      spendAction('search');
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
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedCharacters));
  };

  const selectCharacter = () => {
    toggleSelectCharOverlay(false);
    return character;
  };

  const exitGame = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    loadGame();
    history.push('/');
  };

  const confirmTrade = (updatedCharacter, updatedCharacters) => {
    const newItems = [
      ...updatedCharacter.inHand,
      ...updatedCharacter.inBackpack
    ];
    const openDoors = checkIfCharacterCanOpenDoors(newItems);
    const hasFlashlight = checkIfCharacterHasFlashlight(newItems);
    const charCanCombineItems = checkIfCharCanCombineItems(newItems);

    toggleCanCombine(charCanCombineItems);
    changeCharacter(updatedCharacter);
    updateCharacters(updatedCharacters);
    setCanOpenDoor(openDoors);
    changeCanUseFlashlight(hasFlashlight);

    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedCharacters));
  };

  const setNewChar = updatedCharacters => {
    addNewChar(false);
    updateCharacters(updatedCharacters);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedCharacters));
  };

  const checkIfRoundHasFinished = () => {
    if (
      characters.every(
        char => char.actionsLeft && !checkIfHasAnyActionLeft(char.actionsLeft)
      )
    ) {
      endRound(true);
      setZombiesTurn(true);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(characters));
    } else if (roundEnded) {
      endRound(false);
      setZombiesTurn(false);
    }
  };

  const onClickMainButton = () => {
    if (setupMode) {
      toggleSetupMode(false);
    } else {
      const updatedCharacters = cloneDeep(characters);
      if (roundEnded) {
        let nextFirstPlayer;

        updatedCharacters.forEach((char, index) => {
          char.actionsLeft = char.actions; // eslint-disable-line no-param-reassign
          char.hasUsedFlashlight = false; // eslint-disable-line no-param-reassign
          if (char.name === firstPlayer) {
            if (index + 1 === characters.length) {
              nextFirstPlayer = 0;
            } else {
              nextFirstPlayer = index + 1;
            }
          }
        });
        setNoise(0);
        changeFirstPlayer(updatedCharacters[nextFirstPlayer].name);
        updateCharacters(updatedCharacters);
        if (charIndex === nextFirstPlayer) {
          changeCharacter(updatedCharacters[nextFirstPlayer]);
        } else {
          changeCharIndex(nextFirstPlayer);
        }
      } else {
        const currentCharacter = cloneDeep(character);

        updatedCharacters.forEach((char, index) => {
          char.actionsLeft = []; // eslint-disable-line no-param-reassign
        });
        currentCharacter.actionsLeft = [];

        updateCharacters(updatedCharacters);
        changeCharIndex(charIndex);
        changeCharacter(currentCharacter);
      }
    }
  };

  const onClickEndTurn = () => {
    const updatedCharacter = cloneDeep(character);
    updatedCharacter.actionsLeft = [];
    changeCharacter(updatedCharacter);
  };

  const onClickObjectiveEndTurn = () => {
    gainXp(5);
    spendAction('general');
  };

  const onClickCombine = ([item, itemSlot], event) => {
    event.stopPropagation();
    if (combiningItem) {
      const { firstSlot, pair, finalItem } = combiningItem;
      if (item === pair) {
        const updatedCharacter = cloneDeep(character);
        const secondSlot = itemSlot;

        if (firstSlot <= 2) {
          updatedCharacter.inHand[firstSlot - 1] = '';
        } else {
          updatedCharacter.inBackpack[firstSlot - 3] = '';
        }
        if (secondSlot <= 2) {
          updatedCharacter.inHand[secondSlot - 1] = finalItem;
        } else {
          updatedCharacter.inBackpack[secondSlot - 3] = finalItem;
        }
        changeCharacter(updatedCharacter);
        if (!setupMode) {
          spendAction('general');
        }
        setCombiningItem();
      } else {
        setCombiningItem();
      }
    } else {
      setCombiningItem(getCombiningReference([item, itemSlot]));
      setTimeout(() => setCombiningItem(), 3000);
    }
  };

  const gainXp = (xp = 1) => {
    const updatedCharacter = cloneDeep(character);
    const updatedCharacters = cloneDeep(characters);
    const newXp = updatedCharacter.experience + xp;

    if (newXp > highestXp.xp) {
      updateHighestXp({ name: character.name, xp: newXp });
    }
    updatedCharacter.experience = newXp;
    updatedCharacters.forEach(char => {
      if (char.name === character.name) {
        char.experience = newXp; // eslint-disable-line no-param-reassign
      }
    });
    changeCharacter(updatedCharacter);
    updateCharacters(updatedCharacters);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(characters));
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
    // characters.forEach(char =>
    //   console.log(
    //     '$$$ DEBUG actions',
    //     char.name,
    //     char.actionsLeft,
    //     !!checkIfHasAnyActionLeft(char.actionsLeft || [])
    //   )
    // );
    // console.log('$$$ DEBUG message', message);

    // console.log('$$$ DEBUG canUseFlashlight', canUseFlashlight);
    // console.log('$$$ DEBUG canSearch', canSearch);
  }, [
    character,
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
          checkIfCharacterCanOpenDoors(charInHand) ||
          checkIfCharacterCanOpenDoors(charInBackpack);
        const hasFlashlight = checkIfCharacterHasFlashlight([
          ...charInHand,
          ...charInBackpack
        ]);
        const charCanCombineItems = checkIfCharCanCombineItems([
          ...charInHand,
          ...charInBackpack
        ]);

        changeCharacter(nextChar);
        setCanOpenDoor(openDoors);
        changeCanUseFlashlight(hasFlashlight);
        toggleCanCombine(charCanCombineItems);
        prevCharIndex.current = charIndex;
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(characters));

        if (!dataLoaded) {
          setDataLoaded(true);
        }
      }
    }
  }, [charIndex, characters, dataLoaded]);

  useEffect(() => {
    const newXpBar = calculateXpBar(character.experience);
    updateXpCounter(newXpBar);
  }, [character.experience, updateXpCounter]);

  // useEffect(() => {
  //   console.log('$$$ change char', character);
  // }, [character]);

  return (
    <>
      <CharacterSheet>
        {!trade && character.wounded !== 'killed' && (
          <IndicatorsWrapper header>
            {xpCounter &&
              xpCounter.map((level, index) => (
                <XpIcon
                  activeColor={
                    (level <= character.experience ||
                      xpCounter[index - 1] < character.experience) &&
                    getXpColor(level, xpCounter[index - 1], true)
                  }
                  color={getXpColor(level, xpCounter[index - 1])}
                  currentXp={character.experience === level}
                  highestXp={highestXp.xp === level}
                  key={`xp-${level}-${xpCounter[index - 1]}`}
                  type={level}
                >
                  {level}
                  {highestXp.xp === level &&
                    highestXp.name !== character.name && (
                      <HishestXpTag>{highestXp.name}</HishestXpTag>
                    )}
                </XpIcon>
              ))}
          </IndicatorsWrapper>
        )}
        {!trade && character.wounded !== 'killed' && (
          <IndicatorsWrapper>
            {actionsCount.map(action => (
              <MovementIcon
                color={getActionColor(action)}
                key={action}
                type={action}
              >
                {action}
              </MovementIcon>
            ))}
          </IndicatorsWrapper>
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
            {!damageMode && setupMode && characters.length < CHARACTERS.length && (
              <AddNewChar type="button" onClick={() => addNewChar(true)}>
                <i className="fas fa-user-plus" />
              </AddNewChar>
            )}
            {!damageMode && !setupMode && (
              <AddNewChar type="button" onClick={() => toggleSetupMode(true)}>
                <i className="far fa-edit" />
              </AddNewChar>
            )}
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
            {character.wounded !== 'killed' && (
              <>
                {!damageMode && !setupMode && (
                  <ActionsWrapper>
                    {!finishedTurn && generalActions && (
                      <ActionButton
                        actionType="objective"
                        callback={onClickObjectiveEndTurn}
                      />
                    )}
                    {canMove && (
                      <ActionButton
                        actionType={
                          character.location === 'car'
                            ? 'car-exit'
                            : 'car-enter'
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

                    {canOpenDoor && generalActions && (
                      <ActionButton
                        actionType="open-door"
                        callback={spendAction}
                        noise={noise}
                        setNoise={setNoise}
                        type={canOpenDoor}
                      />
                    )}
                    {!finishedTurn && (
                      <ActionButton
                        actionType="endTurn"
                        callback={onClickEndTurn}
                      />
                    )}
                  </ActionsWrapper>
                )}
              </>
            )}
            {character.wounded && (
              <WoundedWrapper>
                <WoundedSign src={Blood} />
              </WoundedWrapper>
            )}
            {finishedTurn && character.wounded !== 'killed' && (
              <FinishedTurnTag>
                {`${character.name}${TURN_FINISHED}`}
              </FinishedTurnTag>
            )}
            {(setupMode || roundEnded) && (
              <ModalSignButton
                noOverlay
                onClick={onClickMainButton}
                roundEnded={roundEnded}
                setupMode={setupMode}
              >
                {setupMode ? 'FINISH SETUP' : 'START NEXT ROUND'}
              </ModalSignButton>
            )}
            {character.wounded === 'killed' && (
              <>
                <ModalSign killed>
                  {!characters || characters.length === 0 ? (
                    <ModalSignText>{KILLED_EM_ALL}</ModalSignText>
                  ) : (
                    <ModalSignText>
                      {`${character.name} ${KILLED}`}
                    </ModalSignText>
                  )}
                </ModalSign>
                {characters.length === 0 && (
                  <ModalSignExitButton onClick={exitGame} src={Exit} />
                )}
              </>
            )}
            {character.wounded !== 'killed' && (
              <>
                <CharItems slotType="inHand">
                  {character.inHand &&
                    character.inHand.map((item, index) => (
                      <ItemsArea
                        actionsLeft={generalActions}
                        allSlotsAreEmpty={checkIfAllSlotsAreEmpty([
                          ...character.inHand,
                          ...character.inBackpack
                        ])}
                        callback={spendAction}
                        canAttack={canAttack}
                        canCombine={generalActions && canCombine}
                        canSearch={canSearch}
                        causeDamage={causeDamage}
                        combineItemSelected={
                          combiningItem && combiningItem.item === item
                        }
                        combinePair={
                          combiningItem && combiningItem.pair === item
                        }
                        charVoice={character.voice}
                        damageMode={damageMode}
                        dices={WEAPONS_S1[item] && WEAPONS_S1[item].dices}
                        gainXp={gainXp}
                        handleSearch={handleSearch}
                        index={index}
                        item={item}
                        key={`${item}-${index + 1}`}
                        makeNoise={makeNoise}
                        onClickCombine={onClickCombine}
                        onClickDrop={changeInHand}
                        selectSlot={selectSlot}
                        setupMode={setupMode}
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
                        allSlotsAreEmpty={checkIfAllSlotsAreEmpty([
                          ...character.inHand,
                          ...character.inBackpack
                        ])}
                        callback={spendAction}
                        canCombine={generalActions && canCombine}
                        canSearch={canSearch}
                        causeDamage={causeDamage}
                        charVoice={character.voice}
                        combineItemSelected={
                          combiningItem && combiningItem.item === item
                        }
                        combinePair={
                          combiningItem && combiningItem.pair === item
                        }
                        damageMode={damageMode}
                        handleSearch={handleSearch}
                        index={index}
                        item={item}
                        key={`${item}-${index + 3}`}
                        makeNoise={makeNoise}
                        noAudio
                        onClickCombine={onClickCombine}
                        onClickDrop={changeInBackpack}
                        selectSlot={selectSlot}
                        setupMode={setupMode}
                        slotType="inBackpack"
                        startTrade={startTrade}
                        wounded={character.wounded}
                      />
                    ))}
                </CharItems>
              </>
            )}
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
  setZombiesTurn: func.isRequired,
  toggleDamageMode: func.isRequired
};

PlayersSection.defaultProps = {
  initialCharacters: null,
  loadedGame: null
};

export default PlayersSection;

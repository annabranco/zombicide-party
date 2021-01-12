import React, { useEffect, useRef } from 'react';
import { cloneDeep, isEqual } from 'lodash';
import { arrayOf, bool, func } from 'prop-types';
import { useHistory } from 'react-router-dom';
import { CHARACTERS } from '../../../setup/characters';
import { getCharacterColor } from '../../../utils/players';
import { handlePromotionEffects } from '../../../utils/promotions';
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
import ActionButton from '../../ActionButton';
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
  HishestXpTag,
  AbilitiesWrapper,
  Abilities,
  ActionsLabelWrapper,
  TopActionsLabelWrapper
} from './styles';
import { CharacterType } from '../../../interfaces/types';
import TradeArea from '../../TradeArea';
import NewGame from '../../NewGame';
import {
  KILLED,
  KILLED_EM_ALL,
  LOCAL_STORAGE_KEY,
  NEXT,
  PREVIOUS,
  TURN_FINISHED,
  WEAPONS,
  GET_OBJECTIVE,
  ENTER_CAR,
  EXIT_CAR,
  MOVE_CAR,
  RUN_OVER,
  MOVE,
  OPEN_DOOR,
  BREAK_DOOR,
  END_CHAR_TURN,
  ADD_CHARACTER,
  EDIT_CHARACTERS,
  CANCEL,
  OK,
  XP_GAIN,
  XP_GAIN_SELECT,
  LEARNED_NEW_ABILITY,
  BURNEM_ALL
} from '../../../constants';
import {
  blueThreatThresold,
  calculateXpBar,
  getXpColor,
  orangeThreatThresold,
  yellowThreatThresold
} from '../../../utils/xp';
import { WEAPONS_S1 } from '../../../setup/weapons';
import ActionsModal from '../../ActionsModal';
import { SOUNDS } from '../../../assets/sounds';

const PlayersSection = ({
  damageMode,
  initialCharacters,
  loadGame,
  loadedGame,
  setZombiesTurn,
  toggleDamageMode,
  nextGameRound
}) => {
  /* ------- COMPONENT STATES ------- */
  const [actionsCount, updateActionsCount] = useStateWithLabel(
    [],
    'actionsCount'
  );
  const [actionsLabel, changeActionLabel] = useStateWithLabel(
    '',
    'actionsLabel'
  );
  const [canCombine, toggleCanCombine] = useStateWithLabel(false, 'canCombine');
  const [canUseFlashlight, changeCanUseFlashlight] = useStateWithLabel(
    false,
    'canUseFlashlight'
  );
  const [car, startCar] = useStateWithLabel(false, 'car');
  const [canOpenDoor, setCanOpenDoor] = useStateWithLabel(false, 'canOpenDoor');
  const [character, changeCharacter] = useStateWithLabel({}, 'character');
  const [characters, updateCharacters] = useStateWithLabel([], 'characters');
  const [charIndex, changeCharIndex] = useStateWithLabel(0, 'charIndex');
  const [combiningItem, setCombiningItem] = useStateWithLabel(
    null,
    'combiningItem'
  );
  const [dataLoaded, setDataLoaded] = useStateWithLabel(false, 'dataLoaded');
  const [firstPlayer, changeFirstPlayer] = useStateWithLabel(
    null,
    'firstPlayer'
  );
  const [highestXp, updateHighestXp] = useStateWithLabel(
    { name: '', xp: 0 },
    'highestXp'
  );
  const [newChar, addNewChar] = useStateWithLabel(false, 'newChar');
  const [noise, setNoise] = useStateWithLabel(0, 'noise');
  const [roundEnded, endRound] = useStateWithLabel(null, 'roundEnded');
  const [selectCharOverlay, toggleSelectCharOverlay] = useStateWithLabel(
    false,
    'selectCharOverlay'
  );
  const [setupMode, toggleSetupMode] = useStateWithLabel(
    'initial',
    'setupMode'
  );
  const [slot, selectSlot] = useStateWithLabel(null, 'slot');
  const [trade, startTrade] = useStateWithLabel(false, 'trade');
  const [xpCounter, updateXpCounter] = useStateWithLabel([], 'xpCounter');
  const [displayActionsModal, toggleActionsModal] = useStateWithLabel(
    false,
    'displayActionsModal'
  );
  const [topActionsLabel, changeTopActionLabel] = useStateWithLabel(
    '',
    'topActionsLabel'
  );
  /* --- */

  /* ------- OTHER HOOKS ------- */
  const history = useHistory();
  const noiseDebounce = useRef();
  const prevCharIndex = useRef();
  const abilitiesRef = useRef();
  const {
    generalActions,
    extraMovementActions,
    extraAttackActions,
    searchActions,
    spendAction,
    // updateActions,
    finishedTurn,
    canMove,
    canAttack,
    canSearch,
    message
  } = useTurnsCounter(
    character.name,
    character.actionsLeft || character.actions || []
  );
  window.character = character;
  window.actions = [
    generalActions,
    extraMovementActions,
    extraAttackActions,
    searchActions
  ];
  /* --- */

  /* ------- CORE METHODS ------- */
  const updateData = (charWithChangedData = character) => {
    const charOnGlobalList = characters.find(
      char => char.name === charWithChangedData.name
    );

    if (!isEqual(charWithChangedData, character)) {
      changeCharacter(charWithChangedData);
    }
    if (!isEqual(charWithChangedData, charOnGlobalList)) {
      const updatedCharacters = cloneDeep(characters);
      const changedCharIndex = updatedCharacters.findIndex(
        char => char.name === charWithChangedData.name
      );
      updatedCharacters[changedCharIndex] = charWithChangedData;
      updateCharacters(updatedCharacters);
      localStorage.setItem(
        LOCAL_STORAGE_KEY,
        JSON.stringify(updatedCharacters)
      );
    }
  };
  /* --- */

  /* ------- MECHANICS METHODS ------- */
  const advancingLevel = (xp, char) => {
    let updatedChar = cloneDeep(char);
    switch (true) {
      case xp > orangeThreatThresold:
        if (char.abilities.length === 3) {
          toggleActionsModal('red');
        } else if (char.abilities.length !== 4) {
          updatedChar.abilities = [];
          updatedChar.actions = [3, 0, 0, 0];
          updatedChar = handlePromotionEffects(updatedChar, 'blue', [
            3,
            0,
            0,
            0
          ]);
          updatedChar = handlePromotionEffects(
            updatedChar,
            'yellow',
            updatedChar.actionsLeft
          );
          toggleActionsModal('orange');
        }
        abilitiesRef.current = updatedChar.abilities.toString();
        break;

      case xp > yellowThreatThresold:
        if (char.abilities.length === 2) {
          toggleActionsModal('orange');
        } else if (char.abilities.length !== 3) {
          updatedChar.abilities = [];
          updatedChar.actions = [3, 0, 0, 0];
          updatedChar.bonusDices = { combat: 0, melee: 0, ranged: 0 };
          updatedChar = handlePromotionEffects(updatedChar, 'blue', [
            3,
            0,
            0,
            0
          ]);
          updatedChar = handlePromotionEffects(
            updatedChar,
            'yellow',
            updatedChar.actionsLeft
          );
          toggleActionsModal('orange');
        }
        abilitiesRef.current = updatedChar.abilities.toString();
        break;

      case xp > blueThreatThresold:
        if (updatedChar.abilities.length === 1) {
          updatedChar = handlePromotionEffects(updatedChar, 'yellow', [
            generalActions,
            extraMovementActions,
            extraAttackActions,
            searchActions
          ]);
        } else if (updatedChar.abilities.length !== 2) {
          updatedChar.abilities = [];
          updatedChar.actions = [3, 0, 0, 0];
          updatedChar.bonusDices = { combat: 0, melee: 0, ranged: 0 };
          updatedChar = handlePromotionEffects(updatedChar, 'blue', [
            3,
            0,
            0,
            0
          ]);
          updatedChar = handlePromotionEffects(
            updatedChar,
            'yellow',
            updatedChar.actionsLeft
          );
        }
        abilitiesRef.current = updatedChar.abilities.toString();
        break;

      default:
        if (updatedChar.abilities.length === 0) {
          updatedChar = handlePromotionEffects(
            char,
            'blue',
            (char.actionsLeft && [...char.actionsLeft]) || [...char.actions]
          );
        } else if (updatedChar.abilities.length !== 1) {
          updatedChar.abilities = [];
          updatedChar.actions = [3, 0, 0, 0];
          updatedChar.bonusDices = { combat: 0, melee: 0, ranged: 0 };
          updatedChar = handlePromotionEffects(updatedChar, 'blue', [
            3,
            0,
            0,
            0
          ]);
        }
        abilitiesRef.current = updatedChar.abilities.toString();
        break;
    }
    return updatedChar;
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

  const changeToAnotherPlayer = type => {
    const charactersNumber = characters.length;
    const remainingCharacters = characters.filter(
      char => char.wounded !== 'killed'
    );
    let nextPlayerIndex;

    if (charactersNumber !== remainingCharacters.length) {
      updateCharacters(remainingCharacters);
    }

    if (type === NEXT) {
      nextPlayerIndex =
        charIndex + 1 >= remainingCharacters.length ? 0 : charIndex + 1;
    } else if (type === PREVIOUS) {
      nextPlayerIndex =
        charIndex - 1 < 0 ? remainingCharacters.length - 1 : charIndex - 1;
    }
    setNoise(0);
    changeCharIndex(nextPlayerIndex);
  };

  const changeInHand = (name, currentSlot = slot - 1) => {
    const updatedCharacter = cloneDeep(character);
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

    updateData(updatedCharacter);
    selectSlot();
  };

  const changeInBackpack = (name, currentSlot = slot - 3) => {
    const updatedCharacter = cloneDeep(character);
    // const updatedCharacters = cloneDeep(characters);
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

    changeCharacter(updatedCharacter);
    selectSlot();
  };

  const exitGame = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    loadGame();
    history.push('/');
  };

  const generateActionsCountArray = actionsLeft => {
    const actions = {
      gen: (actionsLeft && actionsLeft[0]) || generalActions,
      mov: (actionsLeft && actionsLeft[1]) || extraMovementActions,
      att: (actionsLeft && actionsLeft[2]) || extraAttackActions,
      sea: (actionsLeft && actionsLeft[3]) || searchActions
    };
    const count = [];
    for (let i = 1; i <= actions.gen; i++) {
      count.push(i);
    }
    for (let i = 1; i <= actions.mov; i++) {
      count.push('free move');
    }
    for (let i = 1; i <= actions.att; i++) {
      count.push('free attack');
    }
    for (let i = 1; i <= actions.sea; i++) {
      count.push('free search');
    }
    return count;
  };

  const gainCustomXp = specialSlot => {
    if (specialSlot === 0 || specialSlot === 1) {
      const updatedCharacter = cloneDeep(character);
      updatedCharacter.inHand[specialSlot] = '';
      changeCharacter(updatedCharacter);
    }
    toggleActionsModal('xp');
  };

  const gainXp = (xp = 1) => {
    const updatedCharacter = cloneDeep(character);
    const maxXP = 43;
    const newXp =
      updatedCharacter.experience + xp >= maxXP
        ? maxXP
        : updatedCharacter.experience + xp;

    if (newXp > highestXp.xp) {
      updateHighestXp({ name: character.name, xp: newXp });
    }

    updatedCharacter.experience = newXp;
    updateData(updatedCharacter);
  };

  const learnNewAbility = ({ level, index }) => {
    const updatedChar = handlePromotionEffects(
      character,
      level,
      character.actionsLeft,
      index
    );
    toggleActionsModal(false);
    updateData(updatedChar);
    if (
      updatedChar.experience > orangeThreatThresold &&
      updatedChar.abilities.length === 3
    ) {
      toggleActionsModal('red');
    }
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

  const selectCharacter = () => {
    toggleSelectCharOverlay(false);
    return character;
  };

  const setCustomXp = (newXp, prevXp, nextXp) => {
    let updatedXp = newXp;
    if (newXp === '...') {
      if (prevXp === 19 && nextXp === 43) {
        updatedXp = 20;
      } else if (prevXp === 0 && nextXp === 18) {
        updatedXp = 17;
      } else if (prevXp === 0 && nextXp === 7) {
        updatedXp = 6;
      } else if (prevXp === 7 && nextXp === 19) {
        updatedXp = 8;
      } else if (prevXp === 19 && nextXp === 30) {
        updatedXp = 20;
      } else if (prevXp === 30 && nextXp === 43) {
        updatedXp = 31;
      }
    }
    const updatedCharacter = cloneDeep(character);
    updatedCharacter.experience = updatedXp;

    if (updatedXp > highestXp.xp || highestXp.name === character.name) {
      updateHighestXp({ name: character.name, xp: updatedXp });
    }

    updateData(updatedCharacter);
  };
  /* --- */

  /* ------- ACTION BUTTONS METHODS ------- */

  const causeDamage = selectedSlot => {
    const woundedCharacter = cloneDeep(character);
    const [attacker, oneActionKill] = damageMode.split('-');
    let remainingCharacters = characters.filter(
      char => char.wounded !== 'killed'
    );

    let damage = 'hit';
    if (woundedCharacter.wounded || oneActionKill) {
      remainingCharacters = characters.filter(
        char => char.name !== woundedCharacter.name
      );

      woundedCharacter.wounded = 'killed';
      damage = 'kill';
      if (firstPlayer.includes(woundedCharacter.name)) {
        changeFirstPlayer(`next-${characters[charIndex + 1].name}`);
      }

      if (remainingCharacters.length === 0) {
        updateCharacters(remainingCharacters);
      }
    } else if (selectedSlot <= 2) {
      woundedCharacter.wounded = true;
      woundedCharacter.inHand[selectedSlot - 1] = 'Wounded';
    } else {
      woundedCharacter.wounded = true;
      woundedCharacter.inBackpack[selectedSlot - 3] = 'Wounded';
    }

    const filename =
      SOUNDS[`${character.voice}-${damage}-${attacker.toLowerCase()}`];
    const sound = new Audio(filename);
    sound.currentTime = 0;
    sound.play();

    toggleDamageMode(false);
    updateData(woundedCharacter);

    if (remainingCharacters.length > 0) {
      setTimeout(() => changeToAnotherPlayer(NEXT), 2000);
    }
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

  const handleSearch = () => {
    if (canUseFlashlight && canSearch && !character.hasUsedFlashlight) {
      const updatedCharacter = cloneDeep(character);
      updatedCharacter.hasUsedFlashlight = true;
      updateData(updatedCharacter);
    } else if (canSearch) {
      spendAction('search');
    }
  };

  const interactWithCar = enter => {
    const updatedCharacter = cloneDeep(character);
    if (enter) {
      updatedCharacter.location = 'car';
    } else {
      updatedCharacter.location = null;
    }
    changeCharacter(updatedCharacter);
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
          spendAction('upgrade weapon');
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

  const onClickEdit = () => {
    toggleSetupMode(true);
    changeTopActionLabel('');
  };

  const onClickEndTurn = () => {
    const updatedCharacter = cloneDeep(character);
    const charsStillToAct = characters.filter(
      char =>
        char.name !== updatedCharacter.name &&
        checkIfHasAnyActionLeft(char.actionsLeft || [3])
    );

    updatedCharacter.actionsLeft = [0, 0, 0, 0];
    updateData(updatedCharacter);
    if (charsStillToAct.length > 0) {
      setTimeout(() => changeToAnotherPlayer(NEXT), 800);
    }
  };

  const onClickGainBonusXp = bonusXp => {
    gainXp(Number(bonusXp));
    toggleActionsModal(false);
  };

  const onClickMainButton = () => {
    if (setupMode === 'initial') {
      changeCharIndex(0);
    }
    if (setupMode) {
      toggleSetupMode(false);
      nextGameRound();
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
        if (!nextFirstPlayer && nextFirstPlayer !== 0) {
          const nextPlayerName = firstPlayer.replace('next-', '');
          nextFirstPlayer = updatedCharacters.findIndex(
            char => char.name === nextPlayerName
          );
        }

        setNoise(0);
        changeFirstPlayer(updatedCharacters[nextFirstPlayer].name);
        updateCharacters(updatedCharacters);
        nextGameRound();

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

  const onClickObjective = () => {
    spendAction('get objective');
    gainXp(5);
  };

  const setNewChar = updatedCharacters => {
    addNewChar(false);
    updateCharacters(updatedCharacters);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedCharacters));
  };
  /* --- */

  /* ------- EFFECTS HOOKS ------- */
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
    if (character.name) {
      const updatedCharacter = cloneDeep(character);

      updatedCharacter.actionsLeft = [
        generalActions,
        extraMovementActions,
        extraAttackActions,
        searchActions
      ];

      changeCharacter(updatedCharacter);
      const actionsArray = generateActionsCountArray();

      if (!isEqual(actionsArray, actionsCount)) {
        updateActionsCount(actionsArray);
        updateData(updatedCharacter);
      }
    }
  }, [
    // character.name,
    generalActions,
    extraMovementActions,
    extraAttackActions,
    searchActions
  ]);

  useEffect(() => {
    const actionsArray = generateActionsCountArray(character.actionsLeft);

    if (!isEqual(actionsArray, actionsCount)) {
      updateActionsCount(actionsArray);
    }
  }, [character.actionsLeft]);

  useEffect(() => {
    if (characters) {
      checkIfRoundHasFinished();

      let nextChar = cloneDeep(characters[charIndex]);
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

        if (nextChar.abilities.length === 0) {
          nextChar = advancingLevel(nextChar.experience, nextChar);
        }

        if (nextChar.experience > highestXp.xp) {
          updateHighestXp({ name: nextChar.name, xp: nextChar.experience });
        }

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
    if (character.experience >= 0) {
      const charClone = cloneDeep(character);
      const newXpBar = calculateXpBar(charClone.experience, highestXp.xp);
      const updatedChar = advancingLevel(charClone.experience, charClone);

      updateXpCounter(newXpBar);
      updateData(updatedChar);
    }
  }, [character.experience, updateXpCounter]);

  // useEffect(() => {
  //   console.log('$$$ change char', character);
  // }, [character]);
  /* --- */

  if (message) {
    console.log('$$$ message', message);
  }

  return (
    <>
      <CharacterSheet>
        {/* ----- XP BAR ----- */}
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
                  onClick={
                    setupMode
                      ? () =>
                          setCustomXp(
                            level,
                            xpCounter[index - 1],
                            xpCounter[index + 1]
                          )
                      : () => null
                  }
                  setupMode={setupMode}
                  size={xpCounter.length}
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

        {/* ----- MOVEMENTS BAR ----- */}
        {!trade && character.wounded !== 'killed' && (
          <IndicatorsWrapper>
            {actionsCount.map((action, index) => (
              <MovementIcon
                color={getActionColor(action)}
                key={`${action}-${index}`} // eslint-disable-line react/no-array-index-key
                type={action}
              >
                {action}
              </MovementIcon>
            ))}
          </IndicatorsWrapper>
        )}

        {/* ----- MAIN SECTION ----- */}
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

            {/* ----- TOP BAR ----- */}
            {!damageMode && setupMode && characters.length < CHARACTERS.length && (
              <AddNewChar
                type="button"
                onClick={() => addNewChar(true)}
                onMouseOver={() => changeTopActionLabel(ADD_CHARACTER)}
                onMouseOut={() => changeTopActionLabel('')}
              >
                <i className="fas fa-user-plus" />
              </AddNewChar>
            )}
            {!damageMode && !setupMode && (
              <AddNewChar
                type="button"
                onClick={onClickEdit}
                onMouseOver={() => changeTopActionLabel(EDIT_CHARACTERS)}
                onMouseOut={() => changeTopActionLabel('')}
              >
                <i className="far fa-edit" />
              </AddNewChar>
            )}
            <TopActionsLabelWrapper>{topActionsLabel}</TopActionsLabelWrapper>

            {/* ----- CHAR IDENTIFICATION ----- */}
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

            {/* ----- ACTION BUTTONS ----- */}
            {character.wounded !== 'killed' && (
              <>
                {!damageMode && !setupMode && (
                  <>
                    <ActionsWrapper>
                      {!finishedTurn && generalActions && (
                        <ActionButton
                          actionType="objective"
                          callback={onClickObjective}
                          changeActionLabel={changeActionLabel}
                          label={GET_OBJECTIVE}
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
                          interactWithCar={interactWithCar}
                          startCar={startCar}
                          type={character.location !== 'car' && !car && 'start'}
                          changeActionLabel={changeActionLabel}
                          label={
                            character.location === 'car' ? EXIT_CAR : ENTER_CAR
                          }
                        />
                      )}
                      {canMove && character.location === 'car' && (
                        <>
                          <ActionButton
                            actionType="car-move"
                            callback={() => spendAction('move')}
                            changeActionLabel={changeActionLabel}
                            label={MOVE_CAR}
                          />
                          <ActionButton
                            actionType="car-attack"
                            callback={() => spendAction('move')}
                            changeActionLabel={changeActionLabel}
                            label={RUN_OVER}
                          />
                        </>
                      )}

                      {canMove && character.location !== 'car' && (
                        <ActionButton
                          actionType="move"
                          callback={() => spendAction('move')}
                          type={character.movement}
                          changeActionLabel={changeActionLabel}
                          label={MOVE}
                        />
                      )}

                      {canOpenDoor && generalActions && (
                        <ActionButton
                          actionType="open-door"
                          callback={spendAction}
                          noise={noise}
                          setNoise={setNoise}
                          type={canOpenDoor}
                          changeActionLabel={changeActionLabel}
                          label={noise ? BREAK_DOOR : OPEN_DOOR}
                        />
                      )}
                      {!finishedTurn && (
                        <ActionButton
                          actionType="endTurn"
                          callback={onClickEndTurn}
                          changeActionLabel={changeActionLabel}
                          label={END_CHAR_TURN(character.name)}
                        />
                      )}
                    </ActionsWrapper>
                    {!finishedTurn && (
                      <ActionsLabelWrapper>{actionsLabel}</ActionsLabelWrapper>
                    )}
                  </>
                )}
              </>
            )}

            {/* ----- INDICATORS ON CHAR SHEET ----- */}
            <NoiseWrapper>
              {Array.from({ length: noise }, (_, index) => index).map(key => (
                <NoiseIcon key={key} src={Noise} />
              ))}
            </NoiseWrapper>
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

            {/* ----- ITEMS AREA ----- */}
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
                        bonusDices={character.bonusDices}
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
                        dice={WEAPONS_S1[item] && WEAPONS_S1[item].dice}
                        gainCustomXp={gainCustomXp}
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
                        spendAction={spendAction}
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

            {/* ----- BOTTOM BUTTONS ----- */}
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

            {(characters.length > 1 || prevCharIndex.current === null) && (
              <>
                <PreviousButton
                  damageMode={damageMode}
                  onClick={() => changeToAnotherPlayer(PREVIOUS)}
                  type="button"
                >
                  PREVIOUS
                </PreviousButton>
                <NextButton
                  damageMode={damageMode}
                  onClick={() => changeToAnotherPlayer(NEXT)}
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

            {/* ----- ABILITIES DISPLAY ----- */}
            <AbilitiesWrapper>
              {character &&
                character.abilities &&
                character.abilities.map((ability, index) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <Abilities key={`${character}-${index}-${ability}`}>
                    {ability}
                  </Abilities>
                ))}
            </AbilitiesWrapper>
          </>
        )}

        {/* ----- DYNAMIC MODALS ----- */}

        {/* --- Item selector --- */}
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

        {/* --- Add new character --- */}
        {newChar && (
          <NewGame currentChars={characters} dynamic setNewChar={setNewChar} />
        )}

        {/* --- Select custom XP --- */}
        {displayActionsModal === 'xp' && (
          <ActionsModal
            toggleVisibility={toggleActionsModal}
            visible={displayActionsModal}
            content={{
              data: { maxXp: 43, currentXp: character.experience || 0 },
              title: XP_GAIN,
              text: XP_GAIN_SELECT,
              type: 'slider',
              buttons: [
                {
                  text: BURNEM_ALL,
                  type: 'confirm'
                }
              ]
            }}
            onConfirmModal={onClickGainBonusXp}
          />
        )}

        {/* --- Select promotion ability --- */}
        {(displayActionsModal === 'orange' ||
          displayActionsModal === 'red') && (
          <ActionsModal
            toggleVisibility={toggleActionsModal}
            visible={displayActionsModal}
            content={{
              data: { img: character.face, level: displayActionsModal },
              title: LEARNED_NEW_ABILITY,
              type: 'option',
              buttons: character.promotions[displayActionsModal].map(
                button => ({
                  text: button.name,
                  type: 'option',
                  details: button.description
                })
              )
            }}
            onConfirmModal={learnNewAbility}
          />
        )}
      </CharacterSheet>
    </>
  );
};

PlayersSection.propTypes = {
  damageMode: bool.isRequired,
  initialCharacters: arrayOf(CharacterType),
  loadGame: func.isRequired,
  loadedGame: arrayOf(CharacterType),
  setZombiesTurn: func.isRequired,
  toggleDamageMode: func.isRequired,
  nextGameRound: func.isRequired
};

PlayersSection.defaultProps = {
  initialCharacters: null,
  loadedGame: null
};

export default PlayersSection;

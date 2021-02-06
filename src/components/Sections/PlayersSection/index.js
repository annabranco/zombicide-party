import React, { useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { cloneDeep, isEqual } from 'lodash';
import { arrayOf, bool, func, oneOfType, string } from 'prop-types';
import { useStateWithLabel, useTurnsCounter } from '../../../utils/hooks';
import { ABILITIES_S1 } from '../../../setup/abilities';
import { CHARACTERS } from '../../../setup/characters';
import { ALL_WEAPONS } from '../../../setup/weapons';
import { ALL_ITEMS } from '../../../setup/items';
import {
  checkIfHasAnyActionLeft,
  getActionColor
} from '../../../utils/actions';
import { loadSavedGame } from '../../../utils/characters';
import { getMediaQuery } from '../../../utils/devices';
import {
  checkForNoise,
  checkIfAllSlotsAreEmpty,
  checkIfCharCanCombineItems,
  checkIfCharHasNoItems,
  checkIfCharacterCanOpenDoors,
  checkIfCharacterHasFlashlight,
  getCombiningReference
} from '../../../utils/items';
import { getCharacterColor } from '../../../utils/players';
import { handlePromotionEffects } from '../../../utils/promotions';
import {
  blueThreatThresold,
  calculateXpBar,
  getXpColor,
  orangeThreatThresold,
  yellowThreatThresold
} from '../../../utils/xp';
import ActionsModal from '../../ActionsModal';
import { SOUNDS } from '../../../assets/sounds';
import ItemsSelectorModal from '../../Items/ItemsSelectorModal';
import ItemsArea from '../../Items/ItemsArea';
import ActionButton from '../../ActionButton';
import TradeArea from '../../TradeArea';
import NewGame from '../../NewGame';
import CharacterFace from '../../CharacterFace';
import {
  DEFLECTED,
  DEFLECTED_ONE,
  BLOCKED,
  BLOCKED_ONE,
  ADD_CHARACTER,
  BONUS_ACTION,
  BREAK_DOOR,
  BURNEM_ALL,
  CANCEL,
  CAR,
  CAR_ATTACK_ACTION,
  CAR_ENTER_ACTION,
  CAR_EXIT_ACTION,
  CAR_MOVE_ACTION,
  CHANGE_CHARACTER,
  DESKTOP,
  DROP,
  EDIT_CHARACTERS,
  END_CHAR_TURN,
  END_TURN_ACTION,
  ENTER_CAR,
  EXIT_CAR,
  FINISH_SETUP,
  FIRST_PLAYER_TOKEN,
  FREE_ATTACK,
  FREE_MOVE,
  FREE_SEARCH,
  GENERAL,
  GET_OBJECTIVE,
  GIVE_ORDERS,
  GIVE_ORDERS_ACTION,
  GIVE_ORDERS_CHOOSE,
  HAS_BEEN_KILLED,
  HEAL,
  HEAL_ACTION,
  HEAL_CHOOSE,
  HEAL_WOUND,
  HIT,
  INITIAL,
  IN_HAND,
  IN_RESERVE,
  KILL,
  KILLED,
  KILLED_EM_ALL,
  LEARNED_NEW_ABILITY,
  LOCAL_STORAGE_KEY,
  LOCK_ACTION,
  LOCK_DOOR,
  MAKE_LOUD_NOISE,
  MAKE_NOISE_ACTION,
  MELEE,
  MOBILE,
  MOVE,
  MOVE_ACTION,
  MOVE_CAR,
  NEXT,
  NOISY,
  NONE,
  OBJECTIVE_ACTION,
  OK,
  OPEN_DOOR,
  OPEN_DOOR_ACTION,
  PREVIOUS,
  RANGED,
  RESISTED,
  RESISTED_ONE,
  RUN_OVER,
  SEARCH,
  SEARCH_ZOMBIE,
  SEARCH_ZOMBIE_ACTION,
  SELECT,
  SELECT_DAMAGE,
  START,
  START_NEXT_ROUND,
  TRADE,
  TURN_FINISHED,
  UPGRADE_WEAPON,
  WOUNDED,
  XP,
  XP_GAIN,
  XP_GAIN_SELECT,
  ZOMBIES_ROUND,
  LOST,
  WIN_GAME,
  WON
} from '../../../constants';
import Blood from '../../../assets/images/blood.png';
import ZombieFace from '../../../assets/images/zombieFace.png';
import Noise from '../../../assets/images/noise.png';
import FirstPlayer from '../../../assets/images/firstPlayer.jpg';
import { CharacterType } from '../../../interfaces/types';
import {
  Abilities,
  AbilitiesInnerSeparator,
  AbilitiesWrapper,
  AbilitiesWrapperDesktop,
  ActionsLabelWrapper,
  ActionsWrapper,
  AdmButton,
  ArrowSign,
  CardsActions,
  CardsActionsText,
  CharItems,
  CharacterName,
  CharacterOverlay,
  CharacterOverlayImage,
  CharacterOverlayImageShadow,
  CharacterSheet,
  ExtraActivationButton,
  ExtraActivationImage,
  FirstPlayerToken,
  FirstPlayerWrapper,
  HighestXpTag,
  IndicatorsWrapper,
  LevelIndicator,
  MainButton,
  MidScreenTag,
  ModalSign,
  ModalSignText,
  MovementIcon,
  NavIconsWrapper,
  NextButton,
  NoiseIcon,
  NoiseWrapper,
  PlayerTag,
  PreviousButton,
  PromoWrapper,
  SelectButton,
  TopActionsLabelWrapper,
  WoundedSign,
  WoundedWrapper,
  XpIcon
} from './styles';
import {
  AttackBurronsWrapper,
  AttackInstructions,
  CancelAttackButton,
  ConfirmAttackButton
} from '../ZombiesSection/styles';
import FogEffect from '../../Fog';
import EndGame from '../../EndGame';

const PlayersSection = ({
  damageMode,
  initialCharacters,
  loadGame,
  loadedGame,
  nextGameRound,
  setZombiesRound,
  toggleDamageMode,
  toggleZombiesArePlaying,
  visible,
  zombiesArePlaying,
  zombiesRound
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
  const [
    charsReceivingRadioOrders,
    updateCharsReceivingRadioOrders
  ] = useStateWithLabel([], 'charsReceivingRadioOrders');
  const [combiningItem, setCombiningItem] = useStateWithLabel(
    null,
    'combiningItem'
  );
  const [dataLoaded, setDataLoaded] = useStateWithLabel(false, 'dataLoaded');
  const [displayActionsModal, toggleActionsModal] = useStateWithLabel(
    false,
    'displayActionsModal'
  );
  const [dropMode, toggleDropMode] = useStateWithLabel(false, 'dropMode');
  const [
    dualWeaponEffectIsActive,
    activateDualWeaponEffect
  ] = useStateWithLabel(false, 'dualWeaponEffectIsActive');
  const [extraActivation, toggleExtraActivation] = useStateWithLabel(
    false,
    'extraActivation'
  );
  const [displayEndGameScreen, toggleDisplayEndGameScreen] = useStateWithLabel(
    false,
    'displayEndGameScreen'
  );
  const [firstPlayer, changeFirstPlayer] = useStateWithLabel(
    null,
    'firstPlayer'
  );
  const [forcedKillButtons, toggleForcedKillButtons] = useStateWithLabel(
    null,
    'forcedKillButtons'
  );
  const [gameOver, toggleGameOver] = useStateWithLabel(null, 'gameOver');
  const [highestXp, updateHighestXp] = useStateWithLabel(
    { name: '', xp: 0 },
    'highestXp'
  );
  const [hasKilledZombie, toggleHasKilledZombie] = useStateWithLabel(
    false,
    'hasKilledZombie'
  );
  const [newChar, addNewChar] = useStateWithLabel(false, 'newChar');
  const [resistedAttack, toggleResistedAttack] = useStateWithLabel(
    false,
    'resistedAttack'
  );
  const [roundEnded, endRound] = useStateWithLabel(null, 'roundEnded');
  const [selectCharOverlay, toggleSelectCharOverlay] = useStateWithLabel(
    false,
    'selectCharOverlay'
  );
  const [setupMode, toggleSetupMode] = useStateWithLabel(INITIAL, 'setupMode');
  const [someoneIsWounded, toggleSomeoneIsWounded] = useStateWithLabel(
    false,
    'someoneIsWounded'
  );
  const [slot, selectSlot] = useStateWithLabel(null, 'slot');
  const [startedZombieAttack, toggleStartedZombieAttack] = useStateWithLabel(
    false,
    'startedZombieAttack'
  );
  const [trade, startTrade] = useStateWithLabel(false, 'trade');
  const [xpCounter, updateXpCounter] = useStateWithLabel([], 'xpCounter');
  const [topActionsLabel, changeTopActionLabel] = useStateWithLabel(
    '',
    'topActionsLabel'
  );
  const [zombiesShouldAct, toggleZombiesShouldAct] = useStateWithLabel(
    false,
    'zombiesShouldAct'
  );

  /* --- */

  /* ------- OTHER HOOKS ------- */
  const history = useHistory();
  const noiseDebounce = useRef();
  const prevCharIndex = useRef();
  const abilitiesRef = useRef();
  const device = useRef(getMediaQuery());

  const {
    generalActions,
    extraMovementActions,
    extraAttackActions,
    searchActions,
    spendAction,
    bonusActions,
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
    searchActions,
    bonusActions
  ];
  /* --- */

  /* ------- CORE METHODS ------- */
  const updateData = (charWithChangedData = character, background = false) => {
    const charOnGlobalList = characters.find(
      char => char.name === charWithChangedData.name
    );

    if (!isEqual(charWithChangedData, character) && !background) {
      changeCharacter(charWithChangedData);
    }

    if (!isEqual(charWithChangedData, charOnGlobalList)) {
      const updatedCharacters = cloneDeep(characters);
      const changedCharIndex = updatedCharacters.findIndex(
        char => char.name === charWithChangedData.name
      );

      if (charWithChangedData.wounded === KILLED) {
        const charactersLeft = updatedCharacters.filter(
          char => char.name !== charWithChangedData.name
        );
        updateCharacters(charactersLeft);
        if (charactersLeft.length === 0) {
          console.log('$$$ LS CLEARING LS');
          localStorage.removeItem(LOCAL_STORAGE_KEY);
          return null;
        }
      } else {
        updatedCharacters[changedCharIndex] = charWithChangedData;
        updateCharacters(updatedCharacters);
      }

      console.log('$$$ LS UPDATING DATA', updatedCharacters);
      localStorage.setItem(
        LOCAL_STORAGE_KEY,
        JSON.stringify(updatedCharacters)
      );
    }
    return null;
  };

  const resetInitialState = () => {
    console.log('$$$ Resetting initial state');
    changeActionLabel('');
    toggleCanCombine(false);
    changeCanUseFlashlight(false);
    startCar(false);
    setCanOpenDoor(false);
    setCombiningItem(null);
    toggleActionsModal(false);
    toggleDropMode(false);
    activateDualWeaponEffect(false);
    toggleExtraActivation(false);
    toggleForcedKillButtons(null);
    toggleHasKilledZombie(false);
    addNewChar(false);
    toggleResistedAttack(false);
    // toggleSetupMode(false);
    toggleSomeoneIsWounded(false);
    selectSlot(null);
    toggleStartedZombieAttack(false);
    startTrade(false);
    changeTopActionLabel('');
    toggleZombiesShouldAct(false);
    toggleDamageMode(false);
  };
  /* --- */

  /* ------- MECHANICS METHODS ------- */
  const activateDualEffect = dices => {
    toggleForcedKillButtons(dices);
    setTimeout(() => {
      toggleForcedKillButtons(0);
    }, 2000);
  };

  const advancingLevel = (xp, char) => {
    let updatedChar = cloneDeep(char);

    switch (true) {
      case xp > orangeThreatThresold:
        if (char.abilities.length === 3) {
          toggleActionsModal('red');
        } else if (char.abilities.length !== 4) {
          updatedChar.abilities = [];
          updatedChar.actions = [3, 0, 0, 0, 0];
          updatedChar = handlePromotionEffects(updatedChar, 'blue', [
            3,
            0,
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
          updatedChar.actions = [3, 0, 0, 0, 0];
          updatedChar.bonusDices = { combat: 0, melee: 0, ranged: 0 };
          updatedChar = handlePromotionEffects(updatedChar, 'blue', [
            3,
            0,
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
          updatedChar.actions = [3, 0, 0, 0, 0];
          updatedChar.bonusDices = { combat: 0, melee: 0, ranged: 0 };
          updatedChar = handlePromotionEffects(updatedChar, 'blue', [
            3,
            0,
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
          updatedChar.actions = [3, 0, 0, 0, 0];
          updatedChar.bonusDices = { combat: 0, melee: 0, ranged: 0 };
          updatedChar = handlePromotionEffects(updatedChar, 'blue', [
            3,
            0,
            0,
            0,
            0
          ]);
        }
        abilitiesRef.current = updatedChar.abilities.toString();
        break;
    }
    checkIfCharHasDualEffect(updatedChar.inHand);
    return updatedChar;
  };

  const calculateCharactersOrder = () => {
    const orderedChars = [];

    if (characters.length <= 1) {
      orderedChars.push({
        name: characters[0].name,
        face: characters[0].face,
        index: 0
      });
    } else {
      const charsByName = {};
      const firstPlayerIndex = characters.findIndex(
        char => char.name === firstPlayer
      );
      const charNames = characters
        .reduce((result, char, index) => {
          if (result.name) {
            charsByName[result.name] = result.face;
            charsByName[char.name] = char.face;
            return `${result.name}-${char.name}`;
          }
          charsByName[char.name] = char.face;
          return `${result}-${char.name}`;
        })
        .split('-');

      const updatedCharNames = [...charNames];
      const charsBeforeCurrent = updatedCharNames.splice(0, firstPlayerIndex);

      const currentChar = updatedCharNames.shift();
      const orderedNames = [
        currentChar,
        ...updatedCharNames,
        ...charsBeforeCurrent
      ];

      orderedNames.forEach(name => {
        orderedChars.push({
          name,
          face: charsByName[name],
          index: charNames.indexOf(name)
        });
      });
    }
    return orderedChars;
  };

  const charIfCharHasPlayed = name => {
    let hasPlayed;
    characters.forEach(char => {
      if (char.name === name) {
        hasPlayed = !checkIfHasAnyActionLeft(
          char.actionsLeft || [3, 0, 0, 0, 0]
        );
      }
    });
    return hasPlayed;
  };

  const checkIfRoundHasFinished = () => {
    if (!roundEnded) {
      if (
        characters.every(
          char => char.actionsLeft && !checkIfHasAnyActionLeft(char.actionsLeft)
        )
      ) {
        endRound(true);
        toggleZombiesShouldAct(true);
      }
    }
  };

  const checkIfCharHasDualEffect = weapons => {
    if (
      (weapons[0] === weapons[1] &&
        ALL_WEAPONS[weapons[0]] &&
        ALL_WEAPONS[weapons[0]].dual) ||
      (character.abilities &&
        character.abilities.includes(ABILITIES_S1.AMBIDEXTROUS.name)) ||
      (character.abilities &&
        character.abilities.includes(ABILITIES_S1.SWORDMASTER.name) &&
        ALL_WEAPONS[weapons[0]] &&
        ALL_WEAPONS[weapons[0]].attack === MELEE) ||
      (character.abilities &&
        character.abilities.includes(ABILITIES_S1.GUNSLINGER.name) &&
        ALL_WEAPONS[weapons[0]] &&
        ALL_WEAPONS[weapons[0]].attack === RANGED)
    ) {
      activateDualWeaponEffect(true);
    } else {
      activateDualWeaponEffect();
    }
  };

  const changeToAnotherPlayer = type => {
    const charactersNumber = characters.length;
    const remainingCharacters = characters.filter(
      char => char.wounded !== KILLED
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

    toggleExtraActivation(false);
    changeCharIndex(nextPlayerIndex);
  };

  const changeInHand = (name, currentSlot = slot - 1, preUpdChar) => {
    const updatedCharacter = preUpdChar || cloneDeep(character);
    const newItems = [...updatedCharacter.inHand];
    newItems[currentSlot] = name;
    const openDoors = checkIfCharacterCanOpenDoors(newItems);
    const hasFlashlight = checkIfCharacterHasFlashlight(newItems);
    const charCanCombineItems = checkIfCharCanCombineItems([
      ...newItems,
      ...updatedCharacter.inReserve
    ]);

    setCanOpenDoor(openDoors);
    changeCanUseFlashlight(hasFlashlight);
    toggleCanCombine(charCanCombineItems);
    updatedCharacter.inHand = newItems;

    checkIfCharHasDualEffect(newItems);

    if (
      dropMode &&
      checkIfAllSlotsAreEmpty(updatedCharacter.inHand) &&
      checkIfAllSlotsAreEmpty(updatedCharacter.inReserve)
    ) {
      toggleDropMode(false);
    }

    updateData(updatedCharacter);
    selectSlot();
  };

  const changeInReserve = (name, currentSlot = slot - 3, preUpdChar) => {
    const updatedCharacter = preUpdChar || cloneDeep(character);
    const oldItems = [...updatedCharacter.inReserve];
    const newItems = [...updatedCharacter.inReserve];
    const hasFlashlight = checkIfCharacterHasFlashlight(newItems);
    const charCanCombineItems = checkIfCharCanCombineItems([
      ...newItems,
      ...updatedCharacter.inHand
    ]);
    newItems[currentSlot] = name;

    if (name === ALL_WEAPONS.ExpandableBaton.name.replace(' ', '')) {
      newItems.push(null);
    }

    if (
      oldItems.includes(ALL_WEAPONS.ExpandableBaton.name.replace(' ', '')) &&
      !newItems.includes(ALL_WEAPONS.ExpandableBaton.name.replace(' ', ''))
    ) {
      newItems.splice(currentSlot, 1);
    }

    changeCanUseFlashlight(hasFlashlight);
    toggleCanCombine(charCanCombineItems);
    updatedCharacter.inReserve = newItems;

    if (
      dropMode &&
      checkIfAllSlotsAreEmpty(updatedCharacter.inHand) &&
      checkIfAllSlotsAreEmpty(updatedCharacter.inReserve)
    ) {
      toggleDropMode(false);
    }

    updateData(updatedCharacter);
    selectSlot();
  };

  const generateActionsCountArray = actionsLeft => {
    const actions = {
      gen: (actionsLeft && actionsLeft[0]) || generalActions,
      mov: (actionsLeft && actionsLeft[1]) || extraMovementActions,
      att: (actionsLeft && actionsLeft[2]) || extraAttackActions,
      sea: (actionsLeft && actionsLeft[3]) || searchActions,
      bon: (actionsLeft && actionsLeft[4]) || bonusActions
    };
    const count = [];
    for (let i = 1; i <= actions.gen; i++) {
      count.push(i);
    }
    for (let i = 1; i <= actions.mov; i++) {
      count.push(FREE_MOVE);
    }
    for (let i = 1; i <= actions.att; i++) {
      count.push(FREE_ATTACK);
    }
    for (let i = 1; i <= actions.sea; i++) {
      count.push(FREE_SEARCH);
    }
    for (let i = 1; i <= actions.bon; i++) {
      count.push(BONUS_ACTION);
    }
    return count;
  };

  const spendSingleUseWeapon = (weaponSlot, weapon) => {
    const weaponName = weapon.replace(' ', '');
    if (ALL_WEAPONS[weaponName].useOnce) {
      const updatedCharacter = cloneDeep(character);
      updatedCharacter.inHand[weaponSlot] = '';
      changeCharacter(updatedCharacter);
    }
  };

  const gainCustomXp = () => {
    toggleActionsModal(XP);
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

    toggleHasKilledZombie(true);
    updatedCharacter.experience = newXp;
    updateData(updatedCharacter);
  };

  const getMainButtonText = () => {
    if (setupMode) {
      return FINISH_SETUP;
    }
    if (zombiesShouldAct) {
      return ZOMBIES_ROUND;
    }
    return START_NEXT_ROUND;
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
    if (!character.abilities.includes(ABILITIES_S1.NINJA.name)) {
      if (checkForNoise(item) && !noiseDebounce.current) {
        noiseDebounce.current = true;
        setTimeout(() => {
          noiseDebounce.current = false;
        }, 1000);
        setNoise(1);
      }
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

    toggleHasKilledZombie(true);
    updateData(updatedCharacter);
  };

  const setNoise = (noise = 1) => {
    const updatedCharacter = cloneDeep(character);
    updatedCharacter.noise += noise;
    updateData(updatedCharacter);
  };

  /* --- */

  /* ------- ACTION BUTTONS METHODS ------- */

  const cancelZombieAttack = () => {
    setZombiesRound();
    toggleDamageMode(false);
  };

  const confirmTrade = (updatedCharacter, updatedCharacters) => {
    const newItems = [
      ...updatedCharacter.inHand,
      ...updatedCharacter.inReserve
    ];
    const openDoors = checkIfCharacterCanOpenDoors(updatedCharacter.inHand);
    const hasFlashlight = checkIfCharacterHasFlashlight(newItems);
    const charCanCombineItems = checkIfCharCanCombineItems(newItems);

    toggleCanCombine(charCanCombineItems);
    changeCharacter(updatedCharacter);
    updateCharacters(updatedCharacters);
    setCanOpenDoor(openDoors);
    changeCanUseFlashlight(hasFlashlight);
  };

  const handleSearch = () => {
    if (canUseFlashlight && canSearch && !character.hasUsedFlashlight) {
      const updatedCharacter = cloneDeep(character);
      updatedCharacter.hasUsedFlashlight = true;
      updateData(updatedCharacter);
    }
  };

  const interactWithCar = enter => {
    const updatedCharacter = cloneDeep(character);
    if (enter) {
      updatedCharacter.location = CAR;
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
          if (
            finalItem === ALL_WEAPONS.Molotov.name &&
            character.abilities.includes(ABILITIES_S1.TWO_COCKTAILS.name)
          ) {
            updatedCharacter.inHand[firstSlot - 1] = finalItem;
          } else {
            updatedCharacter.inHand[firstSlot - 1] = '';
          }
        } else if (
          finalItem === ALL_WEAPONS.Molotov.name &&
          character.abilities.includes(ABILITIES_S1.TWO_COCKTAILS.name)
        ) {
          updatedCharacter.inReserve[firstSlot - 3] = finalItem;
        } else {
          updatedCharacter.inReserve[firstSlot - 3] = '';
        }

        if (secondSlot <= 2) {
          updatedCharacter.inHand[secondSlot - 1] = finalItem;
        } else {
          updatedCharacter.inReserve[secondSlot - 3] = finalItem;
        }
        changeCharacter(updatedCharacter);
        if (!setupMode) {
          spendAction(UPGRADE_WEAPON);
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

    updatedCharacter.actionsLeft = [0, 0, 0, 0, 0];
    updateData(updatedCharacter);
    if (charsStillToAct.length > 0) {
      setTimeout(() => changeToAnotherPlayer(NEXT), 800);
    } else {
      endRound(true);
      toggleZombiesShouldAct(true);
    }
  };

  const onClickExtraActivation = () => {
    setZombiesRound();
    toggleZombiesArePlaying(true);
  };

  const onClickGainBonusXp = bonusXp => {
    gainXp(Number(bonusXp));
    toggleActionsModal(false);
  };

  const onClickMainButton = () => {
    if (setupMode === INITIAL) {
      changeCharIndex(0);
      nextGameRound();
    }
    if (setupMode) {
      toggleSetupMode(false);
    } else if (zombiesShouldAct) {
      setZombiesRound();
      toggleZombiesArePlaying(true);
      toggleZombiesShouldAct();
    } else {
      const updatedCharacters = cloneDeep(characters);
      if (roundEnded) {
        let nextFirstPlayer;

        updatedCharacters.forEach((char, index) => {
          const restingBonusActions = char.actionsLeft[4];

          char.hasUsedFlashlight = false; // eslint-disable-line no-param-reassign
          char.abilitiesUsed = []; // eslint-disable-line no-param-reassign
          char.noise = 0; // eslint-disable-line no-param-reassign

          if (
            restingBonusActions &&
            !checkIfHasAnyActionLeft(char.actionsLeft)
          ) {
            char.actionsLeft = [...char.actions]; // eslint-disable-line no-param-reassign
            char.actionsLeft.splice(4, 1, restingBonusActions); // eslint-disable-line no-param-reassign
          } else {
            char.actionsLeft = [...char.actions]; // eslint-disable-line no-param-reassign
          }

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

        changeFirstPlayer(updatedCharacters[nextFirstPlayer].name);
        updateCharacters(updatedCharacters);
        nextGameRound();
        toggleHasKilledZombie();
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
      endRound();
    }
  };

  const onClickObjective = () => {
    spendAction(GET_OBJECTIVE);
    gainXp(5);
  };

  const onFindingItem = change => (item, currentSlot = slot - 1) => {
    const findingSlot = change.name === 'changeInHand' ? slot - 1 : slot - 3;

    if (
      character.abilities.includes(ABILITIES_S1.MATCHING_SET.name) &&
      ALL_WEAPONS[item] &&
      (ALL_WEAPONS[item].dual ||
        (character.abilities.includes(ABILITIES_S1.GUNSLINGER.name) &&
          ALL_WEAPONS[item].attack === RANGED &&
          !ALL_WEAPONS[item].unique &&
          !ALL_WEAPONS[item].cannotBeFound) ||
        (character.abilities.includes(ABILITIES_S1.SWORDMASTER.name) &&
          ALL_WEAPONS[item].attack === MELEE &&
          !ALL_WEAPONS[item].unique &&
          !ALL_WEAPONS[item].cannotBeFound) ||
        (character.abilities.includes(ABILITIES_S1.AMBIDEXTROUS.name) &&
          !ALL_WEAPONS[item].unique &&
          !ALL_WEAPONS[item].cannotBeFound))
    ) {
      const updChar = cloneDeep(character);

      if (currentSlot <= 2) {
        changeInHand(item, currentSlot);
        updChar.inHand[findingSlot] = item;
      } else {
        changeInReserve(item, currentSlot);
        updChar.inReserve[findingSlot] = item;
      }

      setTimeout(() => {
        const pairIndex = [...updChar.inHand, ...updChar.inReserve].findIndex(
          itemInSlot => !itemInSlot || itemInSlot === NONE
        );

        if (pairIndex <= 1) {
          changeInHand(item, pairIndex, updChar);
        } else if (pairIndex > 1) {
          changeInReserve(item, pairIndex - 2, updChar);
        }
        return null;
      }, 1000);
    }
    spendAction(SEARCH);
    return change(item, findingSlot);
  };

  const onGiveOrders = () => {
    const updChar = cloneDeep(character);
    updChar.abilitiesUsed.push(GIVE_ORDERS_ACTION);
    updateData(updChar);

    toggleActionsModal(GIVE_ORDERS_ACTION);

    if (
      [...character.inHand, ...character.inReserve].some(
        item => item === ALL_ITEMS.HandheldTransceiver.name
      )
    ) {
      const updatedCharacters = cloneDeep(characters);
      const radioOrdersDelivered = [];
      updatedCharacters.forEach(char => {
        if (
          char.name !== character.name &&
          [...char.inHand, ...char.inReserve].some(
            item => item === ALL_ITEMS.HandheldTransceiver.name
          )
        ) {
          if (char.actionsLeft && char.actionsLeft.length > 0) {
            char.actionsLeft[4] += 1; // eslint-disable-line no-param-reassign
          } else {
            const newActionsLeft = [...char.actions];
            newActionsLeft[4] += 1;
            char.actionsLeft = newActionsLeft; // eslint-disable-line no-param-reassign
          }
          radioOrdersDelivered.push(char.name);
        }
        if (radioOrdersDelivered.length > 0) {
          updateCharsReceivingRadioOrders(radioOrdersDelivered);
        }
      });
      updateCharacters(updatedCharacters);
    }
  };

  const onHeal = healedCharacter => {
    const updChar = characters.filter(char => char.name === healedCharacter)[0];
    const woundIndex = [...updChar.inHand, ...updChar.inReserve].findIndex(
      itemInSlot => itemInSlot === WOUNDED
    );
    const healingSound = new Audio(
      SOUNDS[`heal${Math.ceil(Math.random() * 3)}`]
    );
    const healedSound = new Audio(SOUNDS[`cured-${updChar.voice}`]);
    updChar.wounded = false;
    spendAction(HEAL_ACTION);

    healingSound.currentTime = 0;
    healedSound.currentTime = 0;
    healingSound.play();
    setTimeout(() => healedSound.play(), 3500);

    toggleActionsModal();
    if (woundIndex <= 1 && woundIndex !== -1) {
      updChar.inHand[woundIndex] = '';
    } else if (woundIndex > 1) {
      updChar.inReserve[woundIndex - 2] = '';
    }

    if (healedCharacter === character.name) {
      // updChar.abilitiesUsed.push(HEAL_ACTION);
      updateData(updChar);
    } else {
      const updHealer = cloneDeep(character);
      updHealer.abilitiesUsed.push(HEAL_ACTION);
      updateData(updChar, true);
      updateData(updHealer);
    }
  };

  const onMakeLoudNoise = () => {
    const updChar = cloneDeep(character);

    updChar.noise += 10;
    updChar.abilitiesUsed.push(MAKE_NOISE_ACTION);
    spendAction(MAKE_LOUD_NOISE);
    updateData(updChar);
  };

  const onReceiveOrders = characterOrdered => {
    if (!charsReceivingRadioOrders.includes(characterOrdered)) {
      const orderedChar = characters.filter(
        char => char.name === characterOrdered
      )[0];

      if (orderedChar.actionsLeft && orderedChar.actionsLeft.length > 0) {
        if (
          [...orderedChar.inHand, ...orderedChar.inReserve].some(
            item => item === ALL_ITEMS.HandheldTransceiver.name
          ) &&
          checkIfHasAnyActionLeft(orderedChar.actionsLeft) &&
          orderedChar.actionsLeft[4] > 1
        ) {
          return null;
        }
        orderedChar.actionsLeft[4] += 1;
      } else {
        const newActionsLeft = [...orderedChar.actions];
        newActionsLeft[4] += 1;
        orderedChar.actionsLeft = newActionsLeft;
      }
      updateData(orderedChar, true);
    }
    toggleActionsModal();
    updateCharsReceivingRadioOrders([]);
    return null;
  };

  const onSearchZombie = () => {
    const updChar = cloneDeep(character);
    const newActionsLeft = [...updChar.actionsLeft];
    const emptySlot =
      [...updChar.inHand, ...updChar.inReserve].findIndex(
        itemInSlot => !itemInSlot || itemInSlot === NONE
      ) + 1;

    newActionsLeft[3] = -1;
    updChar.actionsLeft = newActionsLeft;
    updateData(updChar);
    selectSlot(emptySlot);
  };

  const setNewChar = updatedCharacters => {
    addNewChar(false);
    updateCharacters(updatedCharacters);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedCharacters));
  };

  const takeDamage = selectedSlot => {
    const woundedCharacter = cloneDeep(character);
    const [attacker, oneActionKill] = damageMode.split('-');
    const characterCanResist =
      woundedCharacter.abilities.includes(ABILITIES_S1.TOUGH.name) &&
      !woundedCharacter.abilitiesUsed.includes(RESISTED);
    const characterCanBlock =
      woundedCharacter.inHand[selectedSlot - 1] ===
        ALL_ITEMS.PoliceRiotShield.name &&
      !woundedCharacter.abilitiesUsed.includes(BLOCKED);
    const characterCanDeflect =
      (woundedCharacter.abilities.includes(ABILITIES_S1.ALL_YOUVE_GOT.name) &&
        !checkIfCharHasNoItems([
          ...woundedCharacter.inHand,
          ...woundedCharacter.inReserve
        ])) ||
      (woundedCharacter.inHand[selectedSlot - 1] ===
        ALL_ITEMS.PoliceRiotShield.name &&
        woundedCharacter.abilitiesUsed.includes(BLOCKED));
    const characterIsProtected =
      [...woundedCharacter.inHand, ...woundedCharacter.inReserve][
        selectedSlot - 1
      ] === ALL_ITEMS.GoalieMask.name ||
      [...woundedCharacter.inHand, ...woundedCharacter.inReserve][
        selectedSlot - 1
      ] === ALL_ITEMS.PoliceRiotHelmet.name;
    let remainingCharacters = characters.filter(
      char => char.wounded !== KILLED
    );
    let damage = HIT;
    let someoneIsKilled = false;

    toggleStartedZombieAttack(true);

    if (oneActionKill) {
      if (characterCanResist && !woundedCharacter.wounded) {
        woundedCharacter.abilitiesUsed.push(RESISTED);
        toggleResistedAttack(RESISTED_ONE);
        if (selectedSlot <= 2) {
          woundedCharacter.wounded = true;
          woundedCharacter.inHand[selectedSlot - 1] = WOUNDED;
          toggleSomeoneIsWounded(true);
        } else {
          woundedCharacter.wounded = true;
          woundedCharacter.inReserve[selectedSlot - 3] = WOUNDED;
          toggleSomeoneIsWounded(true);
        }
        setTimeout(() => {
          toggleResistedAttack(false);
        }, 2000);
      } else if (characterCanDeflect || characterIsProtected) {
        if (selectedSlot <= 2) {
          woundedCharacter.inHand[selectedSlot - 1] = '';
        } else {
          woundedCharacter.inReserve[selectedSlot - 3] = '';
        }
        toggleResistedAttack(DEFLECTED_ONE);
        setTimeout(() => {
          toggleResistedAttack(false);
        }, 2000);
        changeCharacter(woundedCharacter);
        toggleDamageMode(attacker);
        return null;
      } else if (characterCanBlock) {
        toggleResistedAttack(BLOCKED_ONE);
        woundedCharacter.abilitiesUsed.push(BLOCKED);
        setTimeout(() => {
          toggleResistedAttack(false);
        }, 2000);
        changeCharacter(woundedCharacter);
        toggleDamageMode(attacker);
        return null;
      } else {
        remainingCharacters = characters.filter(
          char => char.name !== woundedCharacter.name
        );
        console.log('$$$ remainingCharacters', remainingCharacters);
        woundedCharacter.wounded = KILLED;
        damage = KILL;
        someoneIsKilled = true;
        if (
          remainingCharacters.length > 1 &&
          firstPlayer.includes(woundedCharacter.name)
        ) {
          changeFirstPlayer(`next-${characters[charIndex + 1].name}`);
        }

        if (remainingCharacters.length === 0) {
          toggleGameOver(KILLED_EM_ALL);
          toggleZombiesArePlaying();
          toggleStartedZombieAttack();
          updateData(woundedCharacter);
          // localStorage.removeItem(LOCAL_STORAGE_KEY);
          loadGame();
        } else {
          setTimeout(
            () =>
              changeCharIndex(
                charIndex + 1 >= remainingCharacters.length ? 0 : charIndex + 1
              ),
            5000
          );
        }
      }
    } else if (characterCanResist) {
      toggleResistedAttack(RESISTED);
      woundedCharacter.abilitiesUsed.push(RESISTED);
      setTimeout(() => {
        toggleResistedAttack(false);
      }, 2000);
    } else if (characterCanBlock) {
      toggleResistedAttack(BLOCKED);
      woundedCharacter.abilitiesUsed.push(BLOCKED);
      setTimeout(() => {
        toggleResistedAttack(false);
      }, 2000);
    } else if (characterCanDeflect || characterIsProtected) {
      toggleResistedAttack(DEFLECTED);
      setTimeout(() => {
        toggleResistedAttack(false);
      }, 2000);
      if (selectedSlot <= 2) {
        woundedCharacter.inHand[selectedSlot - 1] = '';
      } else {
        woundedCharacter.inReserve[selectedSlot - 3] = '';
      }
    } else if (woundedCharacter.wounded) {
      remainingCharacters = characters.filter(
        char => char.name !== woundedCharacter.name
      );

      someoneIsKilled = true;
      woundedCharacter.wounded = KILLED;
      damage = KILL;
      if (firstPlayer.includes(woundedCharacter.name)) {
        changeFirstPlayer(
          `next-${
            characters[
              charIndex + 1 >= remainingCharacters.length ? 0 : charIndex + 1
            ].name
          }`
        );
      }

      if (remainingCharacters.length === 0) {
        toggleGameOver(KILLED_EM_ALL);
        toggleZombiesArePlaying();
        localStorage.removeItem(LOCAL_STORAGE_KEY);
      }
    } else if (selectedSlot <= 2) {
      woundedCharacter.wounded = true;
      woundedCharacter.inHand[selectedSlot - 1] = WOUNDED;
      toggleSomeoneIsWounded(true);
    } else {
      woundedCharacter.wounded = true;
      woundedCharacter.inReserve[selectedSlot - 3] = WOUNDED;
      toggleSomeoneIsWounded(true);
    }

    const filename =
      SOUNDS[`${character.voice}-${damage}-${attacker.toLowerCase()}`];
    const sound = new Audio(filename);
    sound.currentTime = 0;
    sound.play();

    updateData(woundedCharacter);

    if (
      woundedCharacter.wounded === KILLED &&
      remainingCharacters.length === 0
    ) {
      return null;
    }

    setTimeout(() => changeToAnotherPlayer(NEXT), 5000);

    setTimeout(
      () => {
        toggleStartedZombieAttack();
        toggleDamageMode(false);
        setZombiesRound();
      },
      someoneIsKilled ? 4000 : 2000
    );
    return null;
  };
  /* --- */

  /* ------- EFFECTS HOOKS ------- */
  useEffect(() => {
    if (!dataLoaded) {
      const game = loadSavedGame();
      const updatedCharacters =
        (initialCharacters && [...initialCharacters]) ||
        (loadedGame && cloneDeep(loadedGame)) ||
        game;

      if (!updatedCharacters) {
        history.push('/');
      } else {
        resetInitialState();

        updateCharacters(updatedCharacters);
        prevCharIndex.current = charIndex;
        changeFirstPlayer(updatedCharacters[0].name);

        if (
          updatedCharacters.length === 1 &&
          updatedCharacters[0].actionsLeft &&
          !checkIfHasAnyActionLeft(updatedCharacters[0].actionsLeft)
        ) {
          endRound(true);
        }
        setDataLoaded(true);
      }
    }
  }, [charIndex, dataLoaded, initialCharacters, loadedGame]);

  useEffect(() => {
    if (character.name) {
      const updatedCharacter = cloneDeep(character);
      updatedCharacter.actionsLeft = [
        generalActions,
        extraMovementActions,
        extraAttackActions,
        searchActions,
        bonusActions
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
    searchActions,
    bonusActions
  ]);

  useEffect(() => {
    const actionsArray = generateActionsCountArray(character.actionsLeft);

    if (!isEqual(actionsArray, actionsCount)) {
      updateActionsCount(actionsArray);
    }
  }, [character.actionsLeft]);

  useEffect(() => {
    if (characters) {
      let nextChar = cloneDeep(characters[charIndex]);

      if (!damageMode && setupMode !== INITIAL) {
        checkIfRoundHasFinished();
      }

      if (
        nextChar &&
        (charIndex !== prevCharIndex.current ||
          !dataLoaded ||
          nextChar.name !== character.name)
      ) {
        const charInHand = [...nextChar.inHand];
        const charinReserve = [...nextChar.inReserve];
        const openDoors = checkIfCharacterCanOpenDoors(charInHand);
        const hasFlashlight = checkIfCharacterHasFlashlight([
          ...charInHand,
          ...charinReserve
        ]);
        const charCanCombineItems = checkIfCharCanCombineItems([
          ...charInHand,
          ...charinReserve
        ]);

        if (nextChar.abilities.length === 0) {
          nextChar = advancingLevel(nextChar.experience, nextChar);
        }

        if (nextChar.experience > highestXp.xp) {
          updateHighestXp({ name: nextChar.name, xp: nextChar.experience });
        }

        toggleSomeoneIsWounded(characters.some(char => char.wounded));
        changeCharacter(nextChar);
        checkIfCharHasDualEffect(charInHand);
        setCanOpenDoor(openDoors);
        changeCanUseFlashlight(hasFlashlight);
        toggleCanCombine(charCanCombineItems);
        toggleHasKilledZombie();
        changeActionLabel('');
        prevCharIndex.current = charIndex;
      }
    }
  }, [charIndex, characters]);

  useEffect(() => {
    if (character.experience >= 0) {
      const charClone = cloneDeep(character);
      const newXpBar = calculateXpBar(
        charClone.experience,
        highestXp.xp,
        device.current
      );
      const updatedChar = advancingLevel(charClone.experience, charClone);

      updateXpCounter(newXpBar);
      updateData(updatedChar);
    }
  }, [character.experience, updateXpCounter]);

  useEffect(() => {
    if (zombiesArePlaying && extraActivation) {
      toggleExtraActivation(false);
    }
  }, [extraActivation, toggleExtraActivation, zombiesArePlaying]);

  useEffect(() => {
    if (message) {
      console.log('$$$ message', message);
    }
  }, [message]);

  useEffect(() => {
    if (gameOver) {
      setTimeout(() => {
        toggleDisplayEndGameScreen(LOST);
      }, 5000);
    }
  }, [gameOver]);

  /* --- */

  return (
    <CharacterSheet visible={visible}>
      {/* ----- XP BAR ----- */}
      {!trade && character.wounded !== KILLED && (
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
                device={device.current}
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
                    <HighestXpTag xp={highestXp.xp}>
                      {highestXp.name}
                    </HighestXpTag>
                  )}
              </XpIcon>
            ))}
        </IndicatorsWrapper>
      )}

      {/* ----- MOVEMENTS BAR ----- */}
      {!trade && character.wounded !== KILLED && (
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
          device={device.current}
          spendAction={spendAction}
          startTrade={startTrade}
        />
      ) : (
        <>
          <CharacterOverlay
            color={getCharacterColor(character.name)}
            damageMode={damageMode}
          >
            <CharacterOverlayImage src={character.img} />
            <CharacterOverlayImageShadow src={character.img} />
          </CharacterOverlay>
          <FogEffect inChar={character.name} />
          {/* ----- TOP BAR ----- */}
          {!damageMode && setupMode && characters.length < CHARACTERS.length && (
            <AdmButton
              type="button"
              onClick={() => addNewChar(true)}
              onMouseOver={() => changeTopActionLabel(ADD_CHARACTER)}
              onMouseOut={() => changeTopActionLabel('')}
            >
              <i className="fas fa-user-plus" />
            </AdmButton>
          )}
          {!damageMode &&
            !setupMode &&
            !roundEnded &&
            character.wounded !== KILLED && (
              <AdmButton
                type="button"
                onClick={onClickEdit}
                onMouseOver={() => changeTopActionLabel(EDIT_CHARACTERS)}
                onMouseOut={() => changeTopActionLabel('')}
              >
                <i className="far fa-edit" />
              </AdmButton>
            )}
          <TopActionsLabelWrapper>{topActionsLabel}</TopActionsLabelWrapper>

          {/* ----- CHAR IDENTIFICATION ----- */}
          {firstPlayer === character.name && (
            <FirstPlayerWrapper>
              <FirstPlayerToken src={FirstPlayer} alt={FIRST_PLAYER_TOKEN} />
            </FirstPlayerWrapper>
          )}
          {character.wounded !== KILLED && (
            <>
              <CharacterName>{character.name}</CharacterName>
              <PlayerTag>{character.player}</PlayerTag>
            </>
          )}

          {/* ----- ACTION BUTTONS ----- */}
          {character.wounded !== KILLED && !dropMode && (
            <>
              {!damageMode && !setupMode && !slot && (
                <>
                  <ActionsWrapper>
                    {!!generalActions && (
                      <ActionButton
                        actionType={WIN_GAME}
                        callback={() => toggleDisplayEndGameScreen(WON)}
                        changeActionLabel={changeActionLabel}
                        isMobile={device.current === MOBILE}
                        label={WIN_GAME}
                        manyButtons={character.location === CAR}
                      />
                    )}
                    {!!generalActions &&
                      character.abilities.includes(
                        ABILITIES_S1.HOLD_YOUR_NOSE.name
                      ) &&
                      hasKilledZombie && (
                        <ActionButton
                          actionType={SEARCH_ZOMBIE_ACTION}
                          callback={onSearchZombie}
                          changeActionLabel={changeActionLabel}
                          disabled={!canSearch}
                          isMobile={device.current === MOBILE}
                          label={SEARCH_ZOMBIE}
                          manyButtons={character.location === CAR}
                          type={character.voice}
                        />
                      )}

                    {!!generalActions &&
                      character.abilities.includes(
                        ABILITIES_S1.BORN_LEADER.name
                      ) && (
                        <ActionButton
                          actionType={GIVE_ORDERS_ACTION}
                          callback={onGiveOrders}
                          changeActionLabel={changeActionLabel}
                          disabled={character.abilitiesUsed.includes(
                            GIVE_ORDERS_ACTION
                          )}
                          isMobile={device.current === MOBILE}
                          label={GIVE_ORDERS}
                          manyButtons={character.location === CAR}
                          type={character.voice}
                          type2={
                            [...character.inHand, ...character.inReserve].some(
                              item =>
                                item === ALL_ITEMS.HandheldTransceiver.name
                            ) && 'radio'
                          }
                        />
                      )}

                    {!!generalActions &&
                      character.abilities.includes(ABILITIES_S1.LOUD.name) && (
                        <ActionButton
                          actionType={MAKE_NOISE_ACTION}
                          callback={onMakeLoudNoise}
                          changeActionLabel={changeActionLabel}
                          disabled={character.abilitiesUsed.includes(
                            MAKE_NOISE_ACTION
                          )}
                          isMobile={device.current === MOBILE}
                          label={MAKE_LOUD_NOISE}
                          manyButtons={character.location === CAR}
                        />
                      )}

                    {!!generalActions &&
                      character.abilities.includes(
                        ABILITIES_S1.LOCK_IT_DOWN.name
                      ) && (
                        <ActionButton
                          actionType={LOCK_ACTION}
                          callback={() => spendAction(LOCK_ACTION)}
                          changeActionLabel={changeActionLabel}
                          isMobile={device.current === MOBILE}
                          label={LOCK_DOOR}
                          manyButtons={character.location === CAR}
                        />
                      )}

                    {!!generalActions &&
                      character.abilities.includes(ABILITIES_S1.MEDIC.name) && (
                        <ActionButton
                          actionType={HEAL_ACTION}
                          callback={
                            someoneIsWounded
                              ? () => {
                                  toggleActionsModal(HEAL_ACTION);
                                }
                              : () => null
                          }
                          changeActionLabel={changeActionLabel}
                          disabled={
                            !someoneIsWounded ||
                            character.abilitiesUsed.includes(HEAL_ACTION)
                          }
                          isMobile={device.current === MOBILE}
                          label={HEAL}
                          manyButtons={character.location === CAR}
                        />
                      )}

                    {!finishedTurn && generalActions && (
                      <ActionButton
                        actionType={OBJECTIVE_ACTION}
                        callback={onClickObjective}
                        changeActionLabel={changeActionLabel}
                        isMobile={device.current === MOBILE}
                        label={GET_OBJECTIVE}
                        manyButtons={character.location === CAR}
                      />
                    )}
                    {canMove && (
                      <ActionButton
                        actionType={
                          character.location === CAR
                            ? CAR_EXIT_ACTION
                            : CAR_ENTER_ACTION
                        }
                        callback={() => spendAction(MOVE)}
                        car={car}
                        changeActionLabel={changeActionLabel}
                        interactWithCar={interactWithCar}
                        isMobile={device.current === MOBILE}
                        label={
                          character.location === CAR ? EXIT_CAR : ENTER_CAR
                        }
                        manyButtons={character.location === CAR}
                        startCar={startCar}
                        type={
                          character.location !== CAR && !car ? START : GENERAL
                        }
                      />
                    )}
                    {canMove && character.location === CAR && (
                      <>
                        <ActionButton
                          actionType={CAR_MOVE_ACTION}
                          callback={() => spendAction(MOVE)}
                          changeActionLabel={changeActionLabel}
                          isMobile={device.current === MOBILE}
                          label={MOVE_CAR}
                          manyButtons={character.location === CAR}
                        />
                        <ActionButton
                          actionType={CAR_ATTACK_ACTION}
                          callback={() => spendAction(MOVE)}
                          changeActionLabel={changeActionLabel}
                          isMobile={device.current === MOBILE}
                          label={RUN_OVER}
                          manyButtons={character.location === CAR}
                        />
                      </>
                    )}

                    {canMove && character.location !== CAR && (
                      <ActionButton
                        actionType={MOVE_ACTION}
                        callback={() => spendAction(MOVE)}
                        changeActionLabel={changeActionLabel}
                        isMobile={device.current === MOBILE}
                        label={MOVE}
                        manyButtons={character.location === CAR}
                        type={character.movement}
                      />
                    )}

                    {canOpenDoor && generalActions && (
                      <ActionButton
                        actionType={OPEN_DOOR_ACTION}
                        callback={spendAction}
                        changeActionLabel={changeActionLabel}
                        isMobile={device.current === MOBILE}
                        label={
                          ALL_WEAPONS[canOpenDoor] &&
                          ALL_WEAPONS[canOpenDoor].canOpenDoor === NOISY
                            ? BREAK_DOOR
                            : OPEN_DOOR
                        }
                        manyButtons={character.location === CAR}
                        setNoise={
                          character.abilities.includes(ABILITIES_S1.NINJA.name)
                            ? () => null
                            : setNoise
                        }
                        toggleExtraActivation={toggleExtraActivation}
                        type={canOpenDoor}
                      />
                    )}
                    {!finishedTurn && (
                      <ActionButton
                        actionType={END_TURN_ACTION}
                        callback={onClickEndTurn}
                        changeActionLabel={changeActionLabel}
                        isMobile={device.current === MOBILE}
                        label={END_CHAR_TURN(character.name)}
                        manyButtons={
                          device.current === MOBILE &&
                          character.location === CAR
                        }
                      />
                    )}
                  </ActionsWrapper>
                  {!finishedTurn && device.current === DESKTOP && (
                    <ActionsLabelWrapper>{actionsLabel}</ActionsLabelWrapper>
                  )}
                </>
              )}
            </>
          )}

          {/* ----- INDICATORS ON CHAR SHEET ----- */}
          {character.wounded !== KILLED && !setupMode && !damageMode && (
            <NoiseWrapper>
              {Array.from({ length: character.noise }, (_, index) => index).map(
                key => (
                  <NoiseIcon key={key} src={Noise} />
                )
              )}
            </NoiseWrapper>
          )}
          {character.wounded && (
            <WoundedWrapper>
              <WoundedSign src={Blood} />
            </WoundedWrapper>
          )}
          {finishedTurn && character.wounded !== KILLED && !damageMode && (
            <MidScreenTag>{`${character.name}${TURN_FINISHED}`}</MidScreenTag>
          )}

          {resistedAttack && <MidScreenTag>{resistedAttack}</MidScreenTag>}

          {extraActivation && (
            <ExtraActivationButton>
              <ExtraActivationImage
                onClick={onClickExtraActivation}
                src={ZombieFace}
              />
            </ExtraActivationButton>
          )}

          {character.wounded === KILLED && (
            <>
              <ModalSign killed>
                {gameOver ? (
                  <ModalSignText>{gameOver}</ModalSignText>
                ) : (
                  <ModalSignText>{`${character.name} ${HAS_BEEN_KILLED}`}</ModalSignText>
                )}
              </ModalSign>
            </>
          )}

          {/* ----- ITEMS AREA ----- */}
          {character.wounded !== KILLED && (
            <>
              {!slot &&
                !dropMode &&
                character.actionsLeft &&
                checkIfHasAnyActionLeft(character.actionsLeft) && (
                  <CardsActions>
                    <CardsActionsText onClick={startTrade}>
                      {TRADE}
                    </CardsActionsText>
                  </CardsActions>
                )}
              <CharItems slotType={IN_HAND}>
                {character.inHand &&
                  character.inHand.map((item, index) => {
                    const itemName = item && item.replace(' ', '');
                    return (
                      <ItemsArea
                        actionsLeft={generalActions}
                        activateDualEffect={activateDualEffect}
                        allSlotsAreEmpty={checkIfAllSlotsAreEmpty([
                          ...character.inHand,
                          ...character.inReserve
                        ])}
                        bonusDices={character.bonusDices}
                        callback={spendAction}
                        canAttack={canAttack}
                        canBeDeflected={
                          (character.abilities.includes(
                            ABILITIES_S1.ALL_YOUVE_GOT.name
                          ) &&
                            item !== '' &&
                            item !== NONE &&
                            item !== WOUNDED) ||
                          item === ALL_ITEMS.PoliceRiotShield.name
                        }
                        canCombine={!!generalActions && canCombine}
                        canSearch={canSearch}
                        causeDamage={takeDamage}
                        combineItemSelected={
                          combiningItem && combiningItem.item === itemName
                        }
                        combinePair={
                          combiningItem && combiningItem.pair === itemName
                        }
                        charCanDeflect={
                          (character.abilities.includes(
                            ABILITIES_S1.ALL_YOUVE_GOT.name
                          ) &&
                            !checkIfCharHasNoItems([
                              ...character.inHand,
                              ...character.inReserve
                            ])) ||
                          character.inHand.some(
                            inHandItem =>
                              inHandItem === ALL_ITEMS.PoliceRiotShield.name
                          )
                        }
                        charVoice={character.voice}
                        damageMode={damageMode}
                        device={device.current}
                        dice={
                          ALL_WEAPONS[itemName] && ALL_WEAPONS[itemName].dice
                        }
                        dropMode={dropMode}
                        dualWeaponEffect={dualWeaponEffectIsActive}
                        forcedKillButtons={forcedKillButtons}
                        gainCustomXp={gainCustomXp}
                        gainXp={gainXp}
                        handleSearch={handleSearch}
                        index={index}
                        item={itemName}
                        key={`${itemName}-${index + 1}`}
                        makeNoise={makeNoise}
                        onClickCombine={onClickCombine}
                        onClickDrop={changeInHand}
                        selectSlot={selectSlot}
                        setupMode={setupMode}
                        slotType={IN_HAND}
                        spendAction={spendAction}
                        spendSingleUseWeapon={spendSingleUseWeapon}
                        startTrade={startTrade}
                        wounded={character.wounded}
                      />
                    );
                  })}
              </CharItems>
              <CharItems
                numItems={character.inReserve && character.inReserve.length}
                slotType={IN_RESERVE}
              >
                {character.inReserve &&
                  character.inReserve.map((item, index) => {
                    const itemName = item && item.replace(' ', '');
                    return (
                      <ItemsArea
                        actionsLeft={generalActions}
                        allSlotsAreEmpty={checkIfAllSlotsAreEmpty([
                          ...character.inHand,
                          ...character.inReserve
                        ])}
                        callback={spendAction}
                        canBeDeflected={
                          character.abilities.includes(
                            ABILITIES_S1.ALL_YOUVE_GOT.name
                          ) &&
                          item !== '' &&
                          item !== NONE &&
                          item !== WOUNDED
                        }
                        canCombine={!!generalActions && canCombine}
                        canSearch={canSearch}
                        causeDamage={takeDamage}
                        charCanDeflect={
                          character.abilities.includes(
                            ABILITIES_S1.ALL_YOUVE_GOT.name
                          ) &&
                          checkIfCharHasNoItems([
                            ...character.inHand,
                            ...character.inReserve
                          ])
                        }
                        charVoice={character.voice}
                        combineItemSelected={
                          combiningItem && combiningItem.item === itemName
                        }
                        combinePair={
                          combiningItem && combiningItem.pair === itemName
                        }
                        damageMode={damageMode}
                        device={device.current}
                        dropMode={dropMode}
                        handleSearch={handleSearch}
                        index={index}
                        item={itemName}
                        key={`${itemName}-${index + 3}`}
                        makeNoise={makeNoise}
                        noAudio
                        numItems={
                          character.inReserve && character.inReserve.length
                        }
                        onClickCombine={onClickCombine}
                        onClickDrop={changeInReserve}
                        selectSlot={selectSlot}
                        setupMode={setupMode}
                        slotType={IN_RESERVE}
                        startTrade={startTrade}
                        wounded={character.wounded}
                      />
                    );
                  })}
              </CharItems>
              {!slot &&
                !damageMode &&
                character.inHand &&
                character.inReserve &&
                !checkIfCharHasNoItems([
                  ...character.inHand,
                  ...character.inReserve
                ]) && (
                  <CardsActions drop dropMode={dropMode}>
                    <CardsActionsText onClick={() => toggleDropMode(!dropMode)}>
                      {dropMode ? OK : DROP}
                    </CardsActionsText>
                  </CardsActions>
                )}
            </>
          )}

          {/* ----- BOTTOM BUTTONS ----- */}
          {(setupMode || roundEnded) &&
            !slot &&
            !damageMode &&
            !zombiesArePlaying && (
              <MainButton
                noOverlay
                onClick={onClickMainButton}
                roundEnded={roundEnded}
                setupMode={setupMode}
                zombiesRound={zombiesShouldAct}
              >
                {getMainButtonText()}
              </MainButton>
            )}

          {device.current === DESKTOP &&
            !slot &&
            characters.length > 0 &&
            !startedZombieAttack && (
              <NavIconsWrapper>
                {calculateCharactersOrder().map(char => {
                  if (
                    characters.find(
                      charac =>
                        charac.name === char.name && charac.wounded !== KILLED
                    )
                  ) {
                    return (
                      <CharacterFace
                        alt={`${CHANGE_CHARACTER(char.name)}`}
                        currentChar={character.name === char.name}
                        damageMode={damageMode}
                        key={`charNav-${char.name}`}
                        onClick={() => changeCharIndex(char.index)}
                        played={charIfCharHasPlayed(char.name)}
                        src={char.face}
                        wounded={characters.some(
                          charac => charac.name === char.name && charac.wounded
                        )}
                      />
                    );
                  }
                  return null;
                })}
              </NavIconsWrapper>
            )}

          {((device.current !== MOBILE &&
            (characters.length > 1 || prevCharIndex.current === null)) ||
            (device.current === MOBILE && !dropMode)) &&
            !startedZombieAttack && (
              <>
                <PreviousButton
                  damageMode={damageMode}
                  onClick={() => changeToAnotherPlayer(PREVIOUS)}
                  type="button"
                >
                  <ArrowSign className="fas fa-caret-left" />
                </PreviousButton>
                <NextButton
                  damageMode={damageMode}
                  numOfChars={device.current === DESKTOP && characters.length}
                  onClick={() => changeToAnotherPlayer(NEXT)}
                  type="button"
                >
                  <ArrowSign className="fas fa-caret-right" />
                </NextButton>
              </>
            )}
          {selectCharOverlay && (
            <SelectButton onClick={selectCharacter} type="button">
              {SELECT}
            </SelectButton>
          )}

          {damageMode && zombiesArePlaying && !startedZombieAttack && (
            <>
              <AttackInstructions>{SELECT_DAMAGE}</AttackInstructions>
              <AttackBurronsWrapper>
                <CancelAttackButton onClick={cancelZombieAttack}>
                  {CANCEL}
                </CancelAttackButton>
                {device.current === MOBILE && (
                  <ConfirmAttackButton onClick={() => null}>
                    {OK}
                  </ConfirmAttackButton>
                )}
              </AttackBurronsWrapper>
            </>
          )}

          {/* ----- ABILITIES DISPLAY ----- */}
          {character.wounded !== KILLED && (
            <AbilitiesWrapper
              number={character.abilities && character.abilities.length}
            >
              {character &&
                character.abilities &&
                device.current !== DESKTOP &&
                character.abilities.map((ability, index) => (
                  <Abilities
                    // eslint-disable-next-line react/no-array-index-key
                    key={`${character}-${index}-${ability}`}
                    level={index}
                  >
                    {!(index % 2) && <LevelIndicator level={index} />}
                    {ability}
                    {Boolean(index % 2) && <LevelIndicator level={index} />}
                  </Abilities>
                ))}
            </AbilitiesWrapper>
          )}
          {character &&
            character.abilities &&
            character.promotions &&
            character.wounded !== KILLED &&
            device.current === DESKTOP && (
              <AbilitiesWrapperDesktop>
                <AbilitiesInnerSeparator>
                  <PromoWrapper
                    active={
                      character.abilities &&
                      character.abilities[0] === character.promotions.blue.name
                    }
                  >
                    <LevelIndicator level={0} />
                    {character.promotions.blue.name}
                  </PromoWrapper>
                </AbilitiesInnerSeparator>
                <AbilitiesInnerSeparator>
                  <PromoWrapper
                    active={
                      character.abilities &&
                      character.abilities[1] ===
                        character.promotions.yellow.name
                    }
                  >
                    <LevelIndicator level={1} />
                    {character.promotions.yellow.name}
                  </PromoWrapper>
                </AbilitiesInnerSeparator>
                <AbilitiesInnerSeparator>
                  {character.promotions.orange.map(promo => (
                    <PromoWrapper
                      active={
                        character.abilities &&
                        character.abilities[2] === promo.name
                      }
                      key={`promo-orange-${promo.name.replace(' ', '-')}`}
                    >
                      <LevelIndicator level={2} />
                      {promo.name}
                    </PromoWrapper>
                  ))}
                </AbilitiesInnerSeparator>
                <AbilitiesInnerSeparator>
                  {character.promotions.red.map(promo => (
                    <PromoWrapper
                      active={
                        character.abilities &&
                        character.abilities[3] === promo.name
                      }
                      key={`promo-orange-${promo.name.replace(' ', '-')}`}
                    >
                      <LevelIndicator level={3} />
                      {promo.name}
                    </PromoWrapper>
                  ))}
                </AbilitiesInnerSeparator>
              </AbilitiesWrapperDesktop>
            )}
        </>
      )}

      {/* ----- DYNAMIC MODALS ----- */}

      {/* --- Item selector --- */}
      {slot && slot <= 2 && (
        <ItemsSelectorModal
          device={device.current}
          onSelect={onFindingItem(changeInHand)}
          selectSlot={selectSlot}
          slotType={IN_HAND}
        />
      )}
      {slot && slot >= 3 && (
        <ItemsSelectorModal
          device={device.current}
          onSelect={onFindingItem(changeInReserve)}
          selectSlot={selectSlot}
          slotType={IN_RESERVE}
        />
      )}

      {/* --- Add new character --- */}
      {newChar && (
        <NewGame currentChars={characters} dynamic setNewChar={setNewChar} />
      )}

      {/* --- Select custom XP --- */}
      {displayActionsModal === XP && (
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

      {/* --- Heal Modal --- */}
      {displayActionsModal === HEAL_ACTION && (
        <ActionsModal
          toggleVisibility={toggleActionsModal}
          visible={displayActionsModal}
          content={{
            data: characters.filter(char => char.wounded),
            title: HEAL_WOUND,
            text: HEAL_CHOOSE,
            type: 'faces',
            buttons: [
              {
                text: CANCEL,
                type: 'cancel'
              }
            ]
          }}
          onConfirmModal={onHeal}
        />
      )}

      {displayActionsModal === GIVE_ORDERS_ACTION && (
        <ActionsModal
          toggleVisibility={toggleActionsModal}
          visible={displayActionsModal}
          content={{
            data: characters.filter(char => char.name !== character.name),
            title: GIVE_ORDERS,
            text: GIVE_ORDERS_CHOOSE,
            type: 'faces',
            buttons: []
          }}
          onConfirmModal={onReceiveOrders}
        />
      )}

      {/* --- Select promotion ability --- */}
      {(displayActionsModal === 'orange' || displayActionsModal === 'red') && (
        <ActionsModal
          toggleVisibility={toggleActionsModal}
          visible={displayActionsModal}
          content={{
            data: { img: character.face, level: displayActionsModal },
            title: LEARNED_NEW_ABILITY,
            type: 'option',
            buttons: character.promotions[displayActionsModal].map(button => ({
              text: button.name,
              type: 'option',
              details: button.description
            }))
          }}
          isMobile={device.current === MOBILE}
          onConfirmModal={learnNewAbility}
        />
      )}
      {displayEndGameScreen && (
        <EndGame
          characters={characters}
          loadGame={loadGame}
          type={displayEndGameScreen}
        />
      )}
    </CharacterSheet>
  );
};

PlayersSection.propTypes = {
  damageMode: oneOfType([string, bool]).isRequired,
  initialCharacters: arrayOf(CharacterType),
  loadGame: func.isRequired,
  loadedGame: arrayOf(CharacterType),
  nextGameRound: func.isRequired,
  setZombiesRound: func.isRequired,
  toggleDamageMode: func.isRequired,
  toggleZombiesArePlaying: func.isRequired,
  visible: bool.isRequired,
  zombiesArePlaying: bool.isRequired,
  zombiesRound: bool.isRequired
};

PlayersSection.defaultProps = {
  initialCharacters: null,
  loadedGame: null
};

export default PlayersSection;

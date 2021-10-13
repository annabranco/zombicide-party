import React, { useEffect, useRef } from 'react';
import { bool, func, number, string } from 'prop-types';
import { checkForNoiseOpeningDoor, useStateWithLabel } from '../../utils';
import { SOUNDS } from '../../assets/sounds';
import {
  CANNOT_BE_USED,
  CAR_ATTACK_ACTION,
  CAR_ENTER_ACTION,
  CAR_EXIT_ACTION,
  CAR_MOVE_ACTION,
  COMBINE_ACTION,
  END_TURN_ACTION,
  EXPLOSION_ACTION,
  GIVE_ORDERS_ACTION,
  HEAL_ACTION,
  LEAVE_GAME_ACTION,
  LOCK_ACTION,
  MAKE_NOISE_ACTION,
  MOVE_ACTION,
  OBJECTIVE_ACTION,
  OPEN_DOOR,
  OPEN_DOOR_ACTION,
  RELOAD_ACTION,
  SEARCH_ACTION,
  SEARCH_ZOMBIE_ACTION,
  WIN_GAME
} from '../../constants';
import {
  ActionIcon,
  DoubleIconWrapper,
  PrimaryIcon,
  SecondaryIcon
} from './styles';

const ActionButton = ({
  actionType,
  callback,
  carStarted,
  changeActionLabel,
  combineItemSelected,
  combinePair,
  disabled,
  goToNextTourStep,
  interactWithCar,
  isMobile,
  label,
  manyButtons,
  setNoise,
  startCar,
  toggleExtraActivation,
  tourMode,
  type,
  type2
}) => {
  const [iconSize, setIconSize] = useStateWithLabel(false, 'iconSize');
  const [iconType, setIconType] = useStateWithLabel(false, 'iconType');
  const [iconType2, setIconType2] = useStateWithLabel(false, 'iconType2');
  const [isActive, activate] = useStateWithLabel(false, 'isActive');

  const sound = useRef();
  const sound2 = useRef();
  const activateTimeout = useRef();

  const delay = () => {
    switch (actionType) {
      case OPEN_DOOR:
        return 15000;
      case MOVE_ACTION:
        return 500;
      case END_TURN_ACTION:
        return 0;
      default:
        return 2000;
    }
  };

  const onClickIcon = event => {
    if (
      tourMode === 23 ||
      tourMode === 25 ||
      tourMode === 28 ||
      tourMode === 32 ||
      tourMode === 40 ||
      tourMode === 42 ||
      tourMode === 43 ||
      tourMode === 45 ||
      tourMode === 49 ||
      tourMode === 54 ||
      tourMode === 57 ||
      tourMode === 58 ||
      tourMode === 61 ||
      tourMode === 71
    ) {
      goToNextTourStep();
    }

    if (!disabled) {
      activate(true);

      if (actionType === CAR_ENTER_ACTION && !carStarted) {
        startCar(true);
        interactWithCar(true);
      } else if (actionType === CAR_EXIT_ACTION) {
        interactWithCar(false);
      }

      if (actionType === LEAVE_GAME_ACTION) {
        sound2.current = new Audio(SOUNDS[type2]);
        sound.current.currentTime = 0;
        sound2.current.currentTime = 0;
        sound.current.play();
        sound2.current.play();
        setTimeout(() => {
          sound2.current.currentTime = 0;
          sound2.current.play();
        }, 1500);
      } else if (sound.current) {
        sound.current.currentTime = 0;
        sound.current.play();
        if (sound2.current) {
          sound2.current.currentTime = 0;
          setTimeout(() => sound2.current.play(), 3100);
        }
      }

      if (actionType === OPEN_DOOR_ACTION) {
        toggleExtraActivation(true);
        if (checkForNoiseOpeningDoor(type)) {
          setNoise(1);
        }
      }

      activateTimeout.current = setTimeout(() => {
        activate(false);
      }, delay());
      callback(event);
    }
  };

  useEffect(() => {
    switch (actionType) {
      case CAR_ATTACK_ACTION:
        setIconSize('medium');
        setIconType('fas fa-child');
        setIconType2('fas fa-car-side');
        sound.current = new Audio(SOUNDS[`${actionType}`]);
        break;
      case CAR_ENTER_ACTION:
      case CAR_EXIT_ACTION:
        setIconType('fas fa-walking');
        setIconType2('fas fa-car');
        sound.current = new Audio(
          SOUNDS[type ? `car-enter-${type}` : CAR_ENTER_ACTION]
        );
        break;
      case CAR_MOVE_ACTION:
        setIconSize('small');
        setIconType2('fas fa-angle-double-right');
        setIconType('fas fa-car-side');
        sound.current = new Audio(SOUNDS[`${actionType}`]);
        break;
      case COMBINE_ACTION:
        setIconType('fas fa-wrench');
        break;
      case END_TURN_ACTION:
        setIconType('fas fa-ban');
        break;
      case EXPLOSION_ACTION:
        setIconType('fas fa-bahai');
        sound.current = new Audio(SOUNDS[`${actionType}`]);
        break;
      case GIVE_ORDERS_ACTION:
        setIconType2('far fa-comment'); // fas
        setIconType('fas fa-running');
        sound.current = new Audio(
          SOUNDS[`${actionType}${type2 === 'radio' ? '-radio' : ''}-${type}`]
        );
        break;
      case HEAL_ACTION:
        setIconType('fas fa-hand-holding-medical');
        break;
      case LEAVE_GAME_ACTION:
        setIconType2('fas fa-running');
        setIconType('fas fa-sign-out-alt');
        sound.current = new Audio(SOUNDS[`${actionType}-${type}`]);
        sound2.current = new Audio(SOUNDS[type2]);
        break;

      case LOCK_ACTION:
        setIconType('fas fa-lock');
        sound.current = new Audio(SOUNDS[`${actionType}`]);
        break;
      case MAKE_NOISE_ACTION:
        setIconType('fas fa-volume-up');
        sound.current = new Audio(SOUNDS[`${actionType}`]);
        break;
      case MOVE_ACTION:
        setIconType('fas fa-running');
        sound.current = new Audio(SOUNDS[`${actionType}-${type}`]);
        break;
      case OBJECTIVE_ACTION:
        setIconType('far fa-times-circle');
        break;
      case OPEN_DOOR_ACTION:
        setIconSize('small');
        setIconType('fas fa-door-open');
        sound.current = new Audio(SOUNDS[`${actionType}-${type}`]);
        break;
      case RELOAD_ACTION:
        setIconType('fas fa-sync-alt');
        sound.current = new Audio(SOUNDS[`${actionType}`]);
        break;
      case SEARCH_ACTION:
        setIconSize('medium');
        setIconType('fas fa-search');
        sound.current = new Audio(
          SOUNDS[type && `${actionType}${Math.floor(Math.random() * 10)}`]
        );
        sound2.current = new Audio(
          SOUNDS[`found-${type}${Math.ceil(Math.random() * 6)}`]
        );
        break;
      case SEARCH_ZOMBIE_ACTION:
        setIconSize('medium');
        setIconType('fas fa-search');
        sound.current = new Audio(SOUNDS[`${actionType}`]);
        sound2.current = new Audio(
          SOUNDS[`found-${type}${Math.ceil(Math.random() * 6)}`]
        );
        break;
      case WIN_GAME:
        setIconType('fas fa-trophy');
        break;
      default:
        break;
    }
  }, [actionType, type, type2, setIconType, setIconType2, setIconSize]);

  useEffect(() => {
    return () => clearTimeout(activateTimeout.current);
  }, []);

  return (
    <>
      {iconType2 ? (
        <DoubleIconWrapper
          disabled={disabled}
          isActive={isActive}
          onClick={isActive ? () => null : onClickIcon}
          onMouseOut={() => changeActionLabel('')}
          onMouseOver={() =>
            changeActionLabel(
              `${disabled ? 'Cannot be used at this time' : label}`
            )
          }
          manyButtons={isMobile && manyButtons}
        >
          <PrimaryIcon
            actionType={actionType}
            className={iconType2}
            disabled={disabled}
            manyButtons={manyButtons}
          />
          <SecondaryIcon
            actionType={actionType}
            className={iconType}
            disabled={disabled}
            manyButtons={isMobile && manyButtons}
          />
        </DoubleIconWrapper>
      ) : (
        <ActionIcon
          actionType={actionType}
          aria-hidden
          className={iconType}
          combineItemSelected={combineItemSelected}
          combinePair={combinePair}
          disabled={disabled}
          iconSize={iconSize}
          isActive={isActive}
          onClick={isActive ? () => null : event => onClickIcon(event)}
          onMouseOut={() => changeActionLabel('')}
          onMouseOver={() =>
            changeActionLabel(`${disabled ? CANNOT_BE_USED : label}`)
          }
          manyButtons={isMobile && manyButtons}
          special={
            (isMobile && actionType === EXPLOSION_ACTION) ||
            actionType === END_TURN_ACTION
          }
          type={type}
        />
      )}
    </>
  );
};

ActionButton.propTypes = {
  actionType: string.isRequired,
  callback: func,
  carStarted: bool,
  changeActionLabel: func,
  combineItemSelected: bool,
  combinePair: bool,
  disabled: bool,
  goToNextTourStep: func,
  interactWithCar: func,
  isMobile: bool,
  label: string,
  manyButtons: bool,
  setNoise: func,
  startCar: func,
  toggleExtraActivation: func,
  tourMode: number,
  type2: string,
  type: string
};

ActionButton.defaultProps = {
  callback: () => null,
  carStarted: false,
  changeActionLabel: () => null,
  combineItemSelected: false,
  combinePair: false,
  disabled: false,
  goToNextTourStep: () => null,
  interactWithCar: () => null,
  isMobile: null,
  label: null,
  manyButtons: false,
  setNoise: () => null,
  startCar: null,
  toggleExtraActivation: () => null,
  tourMode: null,
  type2: null,
  type: null
};

export default ActionButton;

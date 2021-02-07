import React, { useEffect, useRef } from 'react';
import { bool, func, string } from 'prop-types';
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
  interactWithCar,
  isMobile,
  label,
  manyButtons,
  setNoise,
  startCar,
  toggleExtraActivation,
  type,
  type2
}) => {
  const [iconSize, setIconSize] = useStateWithLabel(false, 'iconSize');
  const [iconType, setIconType] = useStateWithLabel(false, 'iconType');
  const [iconType2, setIconType2] = useStateWithLabel(false, 'iconType2');
  const [isActive, activate] = useStateWithLabel(false, 'isActive');

  const sound = useRef();
  const sound2 = useRef();

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
        setTimeout(() => sound2.current.play(), 700);
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

      setTimeout(() => {
        activate(false);
      }, delay());
      callback(event);
    }
  };

  useEffect(() => {
    switch (actionType) {
      case MOVE_ACTION:
        setIconType('fas fa-running');
        sound.current = new Audio(SOUNDS[`${actionType}-${type}`]);
        break;
      case LEAVE_GAME_ACTION:
        setIconType2('fas fa-running');
        setIconType('fas fa-sign-out-alt');
        sound.current = new Audio(SOUNDS[`${actionType}-${type}`]);
        sound2.current = new Audio(SOUNDS[type2]);
        break;
      case WIN_GAME:
        setIconType('fas fa-trophy');
        break;
      case END_TURN_ACTION:
        setIconType('fas fa-ban');
        break;
      case COMBINE_ACTION:
        setIconType('fas fa-wrench');
        break;
      case OBJECTIVE_ACTION:
        setIconType('far fa-times-circle');
        break;
      case OPEN_DOOR_ACTION:
        setIconSize('small');
        setIconType('fas fa-door-open');
        sound.current = new Audio(SOUNDS[`${actionType}-${type}`]);
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
      case CAR_ATTACK_ACTION:
        setIconSize('medium');
        setIconType('fas fa-child');
        setIconType2('fas fa-car-side');
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
      case GIVE_ORDERS_ACTION:
        setIconType2('far fa-comment'); // fas
        setIconType('fas fa-running');
        sound.current = new Audio(
          SOUNDS[`${actionType}${type2 === 'radio' ? '-radio' : ''}-${type}`]
        );
        break;
      case LOCK_ACTION:
        setIconType('fas fa-lock');
        sound.current = new Audio(SOUNDS[`${actionType}`]);
        break;
      case MAKE_NOISE_ACTION:
        setIconType('fas fa-volume-up');
        sound.current = new Audio(SOUNDS[`${actionType}`]);
        break;
      case RELOAD_ACTION:
        setIconType('fas fa-sync-alt');
        sound.current = new Audio(SOUNDS[`${actionType}`]);
        break;
      case HEAL_ACTION:
        setIconType('fas fa-hand-holding-medical');
        break;
      default:
        break;
    }
  }, [actionType, type, setIconType, setIconType2, setIconSize]);

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
          type={type}
        />
      )}
    </>
  );
};

ActionButton.propTypes = {
  actionType: string.isRequired,
  callback: func.isRequired,
  carStarted: bool,
  changeActionLabel: func,
  combineItemSelected: bool,
  combinePair: bool,
  disabled: bool,
  interactWithCar: func,
  isMobile: bool,
  label: string,
  manyButtons: bool,
  setNoise: func,
  startCar: func,
  toggleExtraActivation: func,
  type: string,
  type2: string
};

ActionButton.defaultProps = {
  carStarted: false,
  changeActionLabel: () => null,
  combineItemSelected: false,
  combinePair: false,
  disabled: false,
  interactWithCar: () => null,
  isMobile: null,
  label: null,
  manyButtons: false,
  setNoise: () => null,
  startCar: null,
  toggleExtraActivation: () => null,
  type: null,
  type2: null
};

export default ActionButton;

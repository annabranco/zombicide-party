import React, { useEffect, useRef } from 'react';
import { bool, func, number, string } from 'prop-types';
import { useStateWithLabel } from '../../utils/hooks';
import { checkForNoiseOpeningDoor } from '../../utils/items';
import { ActionIcon, CarActionIcon, CarIcon, CarIconWrapper } from './styles';
import { SOUNDS } from '../../assets/sounds';
import {
  CAR_ATTACK_ACTION,
  CAR_ENTER_ACTION,
  CAR_EXIT_ACTION,
  CAR_MOVE_ACTION,
  COMBINE_ACTION,
  DESKTOP,
  END_TURN_ACTION,
  GIVE_ORDERS_ACTION,
  HEAL_ACTION,
  LOCK_ACTION,
  MAKE_NOISE_ACTION,
  MOBILE,
  MOVE_ACTION,
  OBJECTIVE_ACTION,
  OPEN_DOOR,
  OPEN_DOOR_ACTION,
  RELOAD_ACTION,
  SEARCH_ACTION
} from '../../constants';

const ActionButton = ({
  actionType,
  callback,
  carStarted,
  combineItemSelected,
  combinePair,
  isMobile,
  interactWithCar,
  noise,
  setNoise,
  startCar,
  type,
  changeActionLabel,
  label,
  manyButtons
}) => {
  const [isActive, activate] = useStateWithLabel(false, 'isActive');
  const [iconType, setIconType] = useStateWithLabel(false, 'iconType');
  const [iconType2, setIconType2] = useStateWithLabel(false, 'iconType2');
  const [iconSize, setIconSize] = useStateWithLabel(false, 'iconSize');

  const sound = useRef();
  const sound2 = useRef();

  // const iconType = useRef();
  // const iconType2 = useRef();
  // const iconSize = useRef();

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
    activate(true);

    if (actionType === CAR_ENTER_ACTION && !carStarted) {
      startCar(true);
      interactWithCar(true);
    } else if (actionType === CAR_EXIT_ACTION) {
      interactWithCar(false);
    }

    if (sound.current) {
      sound.current.currentTime = 0;
      sound.current.play();
      if (sound2.current) {
        sound2.current.currentTime = 0;
        setTimeout(() => sound2.current.play(), 3100);
      }
    }

    if (actionType === SEARCH_ACTION) {
      sound.current = new Audio(
        SOUNDS[type && `${actionType}${Math.floor(Math.random() * 10)}`]
      );
      sound2.current = new Audio(
        SOUNDS[`found-${type}${Math.ceil(Math.random() * 6)}`]
      );
    }

    if (actionType === OPEN_DOOR_ACTION && checkForNoiseOpeningDoor(type)) {
      setNoise(noise + 1);
    }

    setTimeout(() => {
      activate(false);
    }, delay());
    callback(event);
  };

  useEffect(() => {
    switch (actionType) {
      case MOVE_ACTION:
        setIconType('fas fa-running');
        sound.current = new Audio(SOUNDS[`${actionType}-${type}`]);
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
      case GIVE_ORDERS_ACTION:
        setIconType('far fa-comment'); // fa)s
        setIconType2('fas fa-running');
        // sound go go go
        break;
      case LOCK_ACTION:
        setIconType('fas fa-lock');
        // sound lock
        break;
      case MAKE_NOISE_ACTION:
        setIconType('fas fa-volume-up');
        // sound making noise
        break;
      case RELOAD_ACTION:
        setIconType('fas fa-sync-alt');
        // sound reloading
        break;
      case HEAL_ACTION:
        setIconType('fas fa-hand-holding-medical');
        // sound bandaging
        break;
      default:
        break;
    }
  }, [actionType, type, setIconType, setIconType2, setIconSize]);

  return (
    <>
      {iconType2 ? (
        <CarIconWrapper
          isActive={isActive}
          onClick={isActive ? () => null : onClickIcon}
          manyButtons={isMobile && manyButtons}
          onMouseOut={() => changeActionLabel('')}
          onMouseOver={() => changeActionLabel(label)}
        >
          <CarIcon
            actionType={actionType}
            className={iconType2}
            manyButtons={manyButtons}
          />
          <CarActionIcon
            actionType={actionType}
            className={iconType}
            manyButtons={isMobile && manyButtons}
          />
        </CarIconWrapper>
      ) : (
        <ActionIcon
          actionType={actionType}
          aria-hidden
          className={iconType}
          combineItemSelected={combineItemSelected}
          combinePair={combinePair}
          isActive={isActive}
          onClick={isActive ? () => null : event => onClickIcon(event)}
          iconSize={iconSize}
          manyButtons={isMobile && manyButtons}
          onMouseOut={() => changeActionLabel('')}
          onMouseOver={() => changeActionLabel(label)}
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
  combineItemSelected: bool,
  combinePair: bool,
  isMobile: bool,
  interactWithCar: func,
  noise: number,
  setNoise: func,
  startCar: func,
  type: string,
  changeActionLabel: func,
  label: string,
  manyButtons: bool
};

ActionButton.defaultProps = {
  carStarted: false,
  combineItemSelected: false,
  combinePair: false,
  isMobile: null,
  interactWithCar: false,
  noise: 0,
  setNoise: null,
  startCar: null,
  type: null,
  changeActionLabel: () => null,
  label: null,
  manyButtons: false
};

export default ActionButton;

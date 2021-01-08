import React, { useEffect, useRef } from 'react';
import { bool, func, number, string } from 'prop-types';
import { useStateWithLabel } from '../../utils/hooks';
import { checkForNoiseOpeningDoor } from '../../utils/items';
import { ActionIcon, CarActionIcon, CarIcon, CarIconWrapper } from './styles';
import { SOUNDS } from '../../assets/sounds';

const ActionButton = ({
  actionType,
  callback,
  carStarted,
  combineItemSelected,
  combinePair,
  interactWithCar,
  noise,
  setNoise,
  startCar,
  type,
  changeActionLabel,
  label
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
      case 'open-door':
        return 15000;
      case 'move':
        return 500;
      case 'endTurn':
        return 0;
      default:
        return 2000;
    }
  };

  const onClickIcon = event => {
    activate(true);

    if (actionType === 'car-enter' && !carStarted) {
      startCar(true);
      interactWithCar(true);
    } else if (actionType === 'car-exit') {
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

    if (actionType === 'search') {
      sound.current = new Audio(
        SOUNDS[type && `${actionType}${Math.floor(Math.random() * 10)}`]
      );
      sound2.current = new Audio(
        SOUNDS[`found-${type}${Math.ceil(Math.random() * 6)}`]
      );
    }

    if (actionType === 'open-door' && checkForNoiseOpeningDoor(type)) {
      setNoise(noise + 1);
    }

    setTimeout(() => {
      activate(false);
    }, delay());
    callback(event);
  };

  useEffect(() => {
    switch (actionType) {
      case 'move':
        setIconType('fas fa-running');
        sound.current = new Audio(SOUNDS[`${actionType}-${type}`]);
        break;
      case 'endTurn':
        setIconType('fas fa-ban');
        break;
      case 'combine':
        setIconType('fas fa-wrench');
        break;
      case 'objective':
        setIconType('far fa-times-circle');
        break;
      case 'open-door':
        setIconSize('small');
        setIconType('fas fa-door-open');
        sound.current = new Audio(SOUNDS[`${actionType}-${type}`]);
        break;
      case 'car-enter':
      case 'car-exit':
        setIconType('fas fa-walking');
        setIconType2('fas fa-car');
        sound.current = new Audio(
          SOUNDS[type ? `car-enter-${type}` : `car-enter`]
        );
        break;
      case 'car-move':
        setIconSize('medium');
        setIconType('fas fa-car-side');
        sound.current = new Audio(SOUNDS[`${actionType}`]);
        break;
      case 'car-attack':
        setIconSize('medium');
        setIconType('fas fa-car-crash');
        sound.current = new Audio(SOUNDS[`${actionType}`]);
        break;
      case 'search':
        setIconSize('medium');
        setIconType('fas fa-search');
        sound.current = new Audio(
          SOUNDS[type && `${actionType}${Math.floor(Math.random() * 10)}`]
        );
        sound2.current = new Audio(
          SOUNDS[`found-${type}${Math.ceil(Math.random() * 6)}`]
        );
        break;
      case 'give-orders':
        setIconType('far fa-comment'); // fa)s
        setIconType2('fas fa-running');
        // sound go go go
        break;
      case 'lock':
        setIconType('fas fa-lock');
        // sound lock
        break;
      case 'make-noise':
        setIconType('fas fa-volume-up');
        // sound making noise
        break;
      case 'reload':
        setIconType('fas fa-sync-alt');
        // sound reloading
        break;
      case 'heal':
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
          onMouseOut={() => changeActionLabel('')}
          onMouseOver={() => changeActionLabel(label)}
        >
          <CarIcon className={iconType2} />
          <CarActionIcon actionType={actionType} className={iconType} />
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
  interactWithCar: func,
  noise: number,
  setNoise: func,
  startCar: func,
  type: string,
  changeActionLabel: func,
  label: string
};

ActionButton.defaultProps = {
  carStarted: false,
  combineItemSelected: false,
  combinePair: false,
  interactWithCar: false,
  noise: 0,
  setNoise: null,
  startCar: null,
  type: null,
  changeActionLabel: () => null,
  label: null
};

export default ActionButton;

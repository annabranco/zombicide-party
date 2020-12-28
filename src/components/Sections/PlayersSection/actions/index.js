import React from 'react';
import { bool, func, number, string } from 'prop-types';
import { SOUNDS_PATH } from '../../../../setup/endpoints';
import { useStateWithLabel } from '../../../../utils/hooks';
import { checkForNoiseOpeningDoor } from '../../../../utils/items';
import { ActionIcon, CarActionIcon, CarIcon, CarIconWrapper } from './styles';

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
  type
}) => {
  const [isActive, activate] = useStateWithLabel(false, 'isActive');
  const path = `${SOUNDS_PATH}/actions/`;
  let iconType;
  let iconType2;
  let soundName;
  let sound2Name;
  let iconSize;

  switch (actionType) {
    case 'move':
      iconType = 'fas fa-walking';
      soundName = actionType && type && `${path}/${actionType}-${type}.mp3`;
      break;
    case 'endTurn':
      iconType = 'fas fa-hand-paper';
      break;
    case 'combine':
      iconType = 'fas fa-wrench';
      break;
    case 'objective':
      iconType = 'far fa-times-circle';
      break;
    case 'open-door':
      iconSize = 'small';
      iconType = 'fas fa-door-open';
      soundName = actionType && type && `${path}/${actionType}-${type}.mp3`;
      break;
    case 'car-enter':
    case 'car-exit':
      iconType = 'fas fa-walking';
      iconType2 = 'fas fa-car';
      soundName = type
        ? `${path}/car-enter-${type}.mp3`
        : `${path}/car-enter.mp3`;
      break;
    case 'car-move':
      iconSize = 'medium';
      iconType = 'fas fa-car-side';
      soundName = actionType && `${path}/${actionType}.mp3`;
      break;
    case 'car-attack':
      iconSize = 'medium';
      iconType = 'fas fa-car-crash';
      soundName = actionType && `${path}/${actionType}.mp3`;
      break;
    case 'search':
      iconSize = 'medium';
      iconType = 'fas fa-search';
      soundName =
        actionType &&
        type &&
        `${path}/${actionType}${Math.floor(Math.random() * 10)}.mp3`;
      sound2Name =
        actionType &&
        type &&
        `${path}/found-${type}${Math.ceil(Math.random() * 6)}.mp3`;

      break;
    default:
      break;
  }

  const sound = soundName && new Audio(soundName);
  const sound2 = sound2Name && new Audio(sound2Name);

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

    if (sound) {
      sound.currentTime = 0;
      sound.play();
      if (sound2) {
        sound2.currentTime = 0;
        setTimeout(() => sound2.play(), 3100);
      }
    }

    if (actionType === 'open-door' && checkForNoiseOpeningDoor(type)) {
      setNoise(noise + 1);
    }

    setTimeout(() => {
      activate(false);
    }, delay());
    callback(event);
  };

  return (
    <>
      {iconType2 ? (
        <CarIconWrapper
          isActive={isActive}
          onClick={isActive ? () => null : onClickIcon}
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
  type: string
};

ActionButton.defaultProps = {
  carStarted: false,
  combineItemSelected: false,
  combinePair: false,
  interactWithCar: false,
  noise: 0,
  setNoise: null,
  startCar: null,
  type: null
};

export default ActionButton;

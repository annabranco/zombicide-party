import React from 'react';
import { bool, func, string } from 'prop-types';
import { SOUNDS_PATH } from '../../../../setup/endpoints';
import { useStateWithLabel } from '../../../../utils/hooks';
import { ActionIcon, CarActionIcon, CarIcon, CarIconWrapper } from './styles';

const ActionButton = ({ actionType, carStarted, enterCar, startCar, type }) => {
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
    case 'open-door':
      iconSize = 'small';
      iconType = 'fas fa-door-open';
      soundName = actionType && type && `${path}/${actionType}-${type}.mp3`;
      break;
    case 'car-enter':
    case 'car-exit':
      iconType = `fas fa-caret-${actionType === 'car-enter' ? 'down' : 'up'}`;
      iconType2 = 'fas fa-car';
      soundName = type
        ? `${path}/car-enter-${type}.mp3`
        : `${path}/car-enter.mp3`;
      break;
    case 'car-move':
      iconSize = 'medium';
      iconType = 'fas fa-car-side';
      soundName =
        actionType &&
        `${path}/${actionType}${Math.ceil(Math.random() * 1)}.mp3`;
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

  const onClickIcon = () => {
    activate(true);
    if (actionType === 'car-enter' && !carStarted) {
      startCar(true);
      enterCar(true);
    } else if (actionType === 'car-exit') {
      enterCar(false);
    }
    sound.currentTime = 0;
    sound.play();
    if (sound2) {
      sound2.currentTime = 0;
      setTimeout(() => sound2.play(), 3100);
    }
    setTimeout(
      () => {
        activate(false);
      },
      actionType === 'open-door' ? 15000 : 2000
    );
  };

  return (
    <>
      {iconType2 ? (
        <CarIconWrapper
          isActive={isActive}
          onClick={isActive ? () => null : onClickIcon}
        >
          <CarActionIcon className={iconType} />
          <CarIcon className={iconType2} />
        </CarIconWrapper>
      ) : (
        <ActionIcon
          aria-hidden
          className={iconType}
          isActive={isActive}
          onClick={isActive ? () => null : onClickIcon}
          iconSize={iconSize}
        />
      )}
    </>
  );
};

ActionButton.propTypes = {
  actionType: string.isRequired,
  carStarted: bool,
  enterCar: func,
  startCar: func,
  type: string
};

ActionButton.defaultProps = {
  carStarted: false,
  enterCar: false,
  startCar: null,
  type: null
};

export default ActionButton;

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
      iconType = 'fas fa-search';
      soundName = actionType && type && `${path}/${actionType}-${type}.mp3`;
      break;
    default:
      break;
  }

  const sound = soundName && new Audio(soundName);

  console.log('$$$ actionType', actionType);

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

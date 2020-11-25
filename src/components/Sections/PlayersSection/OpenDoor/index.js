import React from 'react';
import { oneOf } from 'prop-types';
import { SOUNDS_PATH } from '../../../../setup/endpoints';
import { useStateWithLabel } from '../../../../utils/hooks';
import OpeningDoor from '../../../../assets/images/OpeningDoor.png';
import { OpenDoorIcon } from './styles';

const OpenDoor = ({ type }) => {
  const [isActive, activate] = useStateWithLabel(false, 'isActive');

  const filename = `${SOUNDS_PATH}/actions/openDoors/${type}.mp3`;
  const sound = new Audio(filename);

  const openDoorSound = () => {
    activate(true);

    sound.currentTime = 0;
    sound.play();
    setTimeout(() => {
      activate(false);
    }, 15000);
  };

  return (
    <OpenDoorIcon
      alt="Open Door"
      isActive={isActive}
      onClick={isActive ? () => null : openDoorSound}
      src={OpeningDoor}
    />
  );
};

OpenDoor.propTypes = {
  type: oneOf(['Chainsaw', 'Crowbar', 'FireAxe'])
};

OpenDoor.defaultProps = {
  type: null
};

export default OpenDoor;

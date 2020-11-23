import React, { useState } from 'react';
import { oneOf } from 'prop-types';
import OpeningDoor from '../../assets/images/OpeningDoor.png';
import { OpenDoorIcon } from './styles';
import { SOUNDS_PATH } from '../../setup/endpoints';

const OpenDoor = ({ type }) => {
  const [isActive, activate] = useState(false);

  const filename = `${SOUNDS_PATH}/actions/${type}.mp3`;
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
      isActive={isActive}
      src={OpeningDoor}
      alt="Open Door"
      onClick={isActive ? () => null : openDoorSound}
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

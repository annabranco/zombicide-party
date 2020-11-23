import React, { useEffect, useState } from 'react';
import { string, number, bool, func } from 'prop-types';
import { Block, PlayImage, PlayIcon, PlayText } from '../styles';
import { ZombieLabel } from '../ZombiesSection/styles';
import { SOUNDS_PATH } from '../../../setup/endpoints';

const SoundBlock = ({ differentSounds, img, label, name, type, test }) => {
  const [isActive, activate] = useState(false);
  const [isHighlighted, highlight] = useState(false);
  const randomNumber = max => Math.floor(Math.random() * max + 1);
  const filename = `${SOUNDS_PATH}${type}/${name}${
    differentSounds ? randomNumber(differentSounds) : ''
  }.mp3`;
  const sound = !test && new Audio(filename);

  const play = () => {
    if (sound) {
      activate(true);
      sound.currentTime = 0;
      sound.play();
      setTimeout(() => {
        activate(false);
      }, 4000);
    }
  };

  return (
    <>
      <Block>
        {(isActive || isHighlighted) && type === 'activations' && (
          <ZombieLabel isActive={isActive}>{name || label}</ZombieLabel>
        )}
        <PlayImage onClick={play} isActive={isActive}>
          {img ? (
            <PlayIcon
              active={isActive}
              src={img}
              type={type}
              onMouseOver={() => highlight(true)}
              onMouseOut={() => highlight(false)}
            />
          ) : (
            <PlayText>{label || name}</PlayText>
          )}
        </PlayImage>
      </Block>
    </>
  );
};

SoundBlock.propTypes = {
  differentSounds: number,
  img: string,
  label: string,
  name: string.isRequired,
  type: string.isRequired,
  test: bool
};

SoundBlock.defaultProps = {
  differentSounds: null,
  img: null,
  label: null,
  test: false
};

export default SoundBlock;

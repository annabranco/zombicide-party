import React, { useEffect, useState } from 'react';
import { string, number, bool } from 'prop-types';
import { Block, PlayButton, PlayIcon } from '../styles';

const soundPath =
  'https://raw.githubusercontent.com/annabranco/zombie-mix/master/src/assets/sounds/';

const SoundBlock = ({ differentSounds, img, name, type, test }) => {
  const [isActive, activate] = useState(false);
  const randomNumber = max => Math.floor(Math.random() * max + 1);
  const filename = `${soundPath}${type}/${name}${
    differentSounds ? randomNumber(differentSounds) : ''
  }.mp3`;
  const sound = !test && new Audio(filename);

  console.log('$$$ filename', filename);
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
    <Block>
      <PlayButton onClick={play} isActive={isActive}>
        {img ? <PlayIcon src={img} type={type} /> : <p>{name}</p>}
      </PlayButton>
    </Block>
  );
};

SoundBlock.propTypes = {
  differentSounds: number.isRequired,
  img: string,
  name: string.isRequired,
  type: string.isRequired,
  test: bool
};

SoundBlock.defaultProps = {
  img: null,
  test: false
};

export default SoundBlock;

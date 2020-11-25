import React from 'react';
import { string, number, bool } from 'prop-types';
import { useStateWithLabel } from '../../utils/hooks';
import { SOUNDS_PATH } from '../../setup/endpoints';
import { Block, PlayImage, PlayIcon, PlayText } from './styles';
import { ZombieLabel } from '../Sections/ZombiesSection/styles';

const SoundBlock = ({
  differentSounds,
  img,
  label,
  name,
  noAudio,
  slotType,
  type
}) => {
  const [isActive, activate] = useStateWithLabel(false, 'isActive');
  const [isHighlighted, highlight] = useStateWithLabel(false, 'isHighlighted');

  const randomNumber = max => Math.floor(Math.random() * max + 1);
  const filename = `${SOUNDS_PATH}${type}/${name}${
    differentSounds ? randomNumber(differentSounds) : ''
  }.mp3`;
  const sound =
    !noAudio &&
    slotType !== 'inBackpack' &&
    type !== 'items' &&
    new Audio(filename);

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
        <PlayImage
          isActive={isActive}
          onClick={play}
          slotType={slotType}
          type={type}
        >
          {img ? (
            <PlayIcon
              active={isActive}
              onMouseOut={() => highlight(false)}
              onMouseOver={() => highlight(true)}
              src={img}
              type={type}
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
  noAudio: bool,
  slotType: string,
  type: string.isRequired
};

SoundBlock.defaultProps = {
  differentSounds: null,
  img: null,
  label: null,
  noAudio: false,
  slotType: null
};

export default SoundBlock;

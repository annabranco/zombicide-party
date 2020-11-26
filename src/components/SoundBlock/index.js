import React from 'react';
import { bool, func, number, string } from 'prop-types';
import { useStateWithLabel } from '../../utils/hooks';
import { SOUNDS_PATH } from '../../setup/endpoints';
import {
  Action,
  Block,
  PlayImageButton,
  PlayIcon,
  PlayText,
  ZombieActions
} from './styles';
import { ZombieLabel } from '../Sections/ZombiesSection/styles';

const SoundBlock = ({
  damageMode,
  differentSounds,
  img,
  label,
  name,
  noAudio,
  onClickCard,
  slotType,
  toggleDamageMode,
  type,
  wounded
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
    type !== 'wound' &&
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
      <Block damageMode={damageMode} type={type} wounded={wounded}>
        {(isActive || isHighlighted) && type === 'activations' && (
          <ZombieLabel isActive={isActive}>{name || label}</ZombieLabel>
        )}
        <PlayImageButton
          isActive={isActive}
          damageMode={damageMode}
          onClick={damageMode ? onClickCard : play}
          slotType={slotType}
          type={type}
        >
          {type === 'activations' && (
            <ZombieActions>
              <Action action="activate">Activate</Action>
              <Action action="attack" onClick={() => toggleDamageMode(true)}>
                Attack survivor!
              </Action>
              {name === 'Runner' && (
                <Action
                  action="kill"
                  onClick={() => toggleDamageMode('instant-kill')}
                >
                  Instant Kill
                </Action>
              )}
              {name === 'Horde' && (
                <Action
                  action="kill"
                  onClick={() => toggleDamageMode('horde-kill')}
                >
                  Feast on survivor
                </Action>
              )}
            </ZombieActions>
          )}

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
        </PlayImageButton>
      </Block>
    </>
  );
};

SoundBlock.propTypes = {
  damageMode: bool,
  differentSounds: number,
  img: string,
  label: string,
  name: string.isRequired,
  noAudio: bool,
  onClickCard: func.isRequired,
  slotType: string,
  toggleDamageMode: func.isRequired,
  type: string.isRequired,
  wounded: bool.isRequired
};

SoundBlock.defaultProps = {
  damageMode: false,
  differentSounds: null,
  img: null,
  label: null,
  noAudio: false,
  slotType: null
};

export default SoundBlock;

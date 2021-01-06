import React, { useRef } from 'react';
import { bool, func, number, string } from 'prop-types';
import { useStateWithLabel } from '../../utils/hooks';
import { checkIfItemCanBeCombined } from '../../utils/items';

import { SOUNDS_PATH } from '../../setup/endpoints';
import {
  Action,
  Block,
  PlayImageButton,
  PlayIcon,
  PlayText,
  ZombieActions,
  ItemIcon
} from './styles';
import { ZombieLabel } from '../Sections/ZombiesSection/styles';
import { IN_BACKPACK, ITEMS, WEAPONS } from '../../constants';
import ActionButton from '../Sections/PlayersSection/actions';

const SoundBlock = ({
  activateKillButtons,
  callback,
  canAttack,
  canCombine,
  combineItemSelected,
  combinePair,
  damageMode,
  differentSounds,
  img,
  isSelected,
  label,
  makeNoise,
  name,
  noAudio,
  onClickCard,
  onClickCombine,
  setupMode,
  slot,
  slotType,
  special,
  toggleDamageMode,
  trade,
  type,
  wounded
}) => {
  const [isActive, activate] = useStateWithLabel(false, 'isActive');
  const [isHighlighted, highlight] = useStateWithLabel(false, 'isHighlighted');

  const quickAttackDebounce = useRef();

  const randomNumber = max => Math.floor(Math.random() * max + 1);
  const filename = name === 'SniperRifle' ? 'Rifle' : name;
  const filePath = `${SOUNDS_PATH}${type}/${filename}${
    differentSounds ? randomNumber(differentSounds) : ''
  }.mp3`;
  const sound =
    !noAudio &&
    slotType !== IN_BACKPACK &&
    type !== ITEMS &&
    type !== 'wound' &&
    new Audio(filePath);

  const play = () => {
    if (type === WEAPONS && !quickAttackDebounce.current) {
      quickAttackDebounce.current = true;
      setTimeout(() => {
        quickAttackDebounce.current = false;
      }, 1000);
      activateKillButtons();
      callback('attack');
    }
    if (sound && ((type === WEAPONS && canAttack) || type !== WEAPONS)) {
      activate(true);
      sound.currentTime = 0;
      sound.play();
      if (makeNoise) {
        makeNoise(name);
      }
      setTimeout(() => {
        activate(false);
      }, 4000);
    }
  };

  const getImage = () => {
    if (trade) {
      return (
        <ItemIcon
          active={isActive}
          onMouseOut={() => highlight(false)}
          onMouseOver={() => highlight(true)}
          img={img}
          isSelected={isSelected}
          name={name}
          type={type}
        />
      );
    }
    if (img) {
      return (
        <PlayIcon
          active={isActive}
          onMouseOut={() => highlight(false)}
          onMouseOver={() => highlight(true)}
          src={img}
          type={type}
        />
      );
    }
    return <PlayText>{label || name}</PlayText>;
  };

  const temp = () => console.log('click temp');

  return (
    <Block damageMode={damageMode} type={type} wounded={wounded}>
      {(isActive || isHighlighted) && type === 'activations' && (
        <ZombieLabel isActive={isActive}>{name || label}</ZombieLabel>
      )}
      <PlayImageButton
        canAttack={canAttack}
        isActive={isActive}
        damageMode={damageMode}
        onClick={damageMode || trade || setupMode ? onClickCard : play}
        setupMode={setupMode}
        slotType={slotType}
        type={type}
      >
        {checkIfItemCanBeCombined(name) && canCombine && (
          <ActionButton
            actionType="combine"
            callback={event => onClickCombine([name, slot], event)}
            combineItemSelected={combineItemSelected}
            combinePair={combinePair}
          />
        )}
        {type === 'activations' && (
          <ZombieActions>
            <Action action="activate">Activate</Action>
            <Action action="attack" onClick={() => toggleDamageMode(name)}>
              Attack survivor!
            </Action>
            {special && (
              <Action
                action="kill"
                onClick={() => toggleDamageMode(`${name}-instant`)}
              >
                {special}
              </Action>
            )}
          </ZombieActions>
        )}

        {getImage()}
      </PlayImageButton>
    </Block>
  );
};

SoundBlock.propTypes = {
  activateKillButtons: func,
  callback: func,
  canAttack: bool,
  canCombine: bool,
  combineItemSelected: bool,
  combinePair: bool,
  damageMode: bool,
  differentSounds: number,
  img: string,
  isSelected: bool,
  label: string,
  makeNoise: func.isRequired,
  name: string.isRequired,
  noAudio: bool,
  onClickCard: func.isRequired,
  onClickCombine: func,
  setupMode: bool.isRequired,
  slot: number,
  slotType: string,
  special: string,
  toggleDamageMode: func.isRequired,
  trade: bool.isRequired,
  type: string.isRequired,
  wounded: bool.isRequired
};

SoundBlock.defaultProps = {
  activateKillButtons: null,
  callback: null,
  canAttack: false,
  canCombine: false,
  combineItemSelected: false,
  combinePair: false,
  damageMode: false,
  differentSounds: null,
  img: null,
  isSelected: false,
  label: null,
  noAudio: false,
  onClickCombine: null,
  slot: null,
  special: null,
  slotType: null
};

export default SoundBlock;

import React, { useEffect, useRef } from 'react';
import { bool, func, number, string } from 'prop-types';
import { useStateWithLabel } from '../../utils/hooks';
import { checkIfItemCanBeCombined } from '../../utils/items';
import {
  Action,
  Block,
  PlayImageButton,
  PlayIcon,
  PlayText,
  ZombieActions,
  ItemIcon
} from './styles';
import {
  ZombieLabel,
  ZombieImageForMobile
} from '../Sections/ZombiesSection/styles';
import {
  ACTIVATE,
  ACTIVATIONS,
  ATTACK,
  COMBINE_ACTION,
  IN_RESERVE,
  IN_HAND,
  ITEMS,
  KILL,
  WEAPONS,
  WOUND
} from '../../constants';
import ActionButton from '../ActionButton';
import { SOUNDS } from '../../assets/sounds';

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
  isMobile,
  isSelected,
  label,
  makeNoise,
  name,
  needsToBeReloaded,
  noAudio,
  onClickCard,
  onClickCombine,
  rows,
  setupMode,
  slot,
  slotType,
  special,
  spendAmmo,
  toggleDamageMode,
  trade,
  type,
  unloaded,
  wounded
}) => {
  const [isActive, activate] = useStateWithLabel(false, 'isActive');
  const [isHighlighted, highlight] = useStateWithLabel(false, 'isHighlighted');

  const quickAttackDebounce = useRef();
  const sound = useRef();

  const randomNumber = max => Math.floor(Math.random() * max + 1);
  const filename =
    !noAudio &&
    slotType !== IN_RESERVE &&
    type !== ITEMS &&
    type !== WOUND &&
    name === 'Sniper Rifle'
      ? 'Rifle'
      : name.replace(' ', '');

  const getImage = () => {
    if (((trade && isMobile) || isMobile) && type !== ACTIVATIONS) {
      return (
        <ItemIcon
          active={isActive}
          onMouseOut={() => highlight(false)}
          onMouseOver={() => highlight(true)}
          img={img}
          isMobile={isMobile}
          isSelected={isSelected}
          name={name}
          slotType={slotType}
          type={type}
          unloaded={unloaded}
        />
      );
    }
    if (img) {
      if (isMobile) {
        return <ZombieImageForMobile name={name} img={img} rows={rows} />;
      }
      return (
        <PlayIcon
          active={isActive}
          isSelected={isSelected}
          onMouseOut={() => highlight(false)}
          onMouseOver={() => highlight(true)}
          unloaded={unloaded}
          src={img}
          type={type}
        />
      );
    }
    return <PlayText>{label || name}</PlayText>;
  };

  const play = () => {
    if (
      type === WEAPONS &&
      slotType === IN_HAND &&
      canAttack &&
      !quickAttackDebounce.current
    ) {
      quickAttackDebounce.current = true;
      setTimeout(() => {
        quickAttackDebounce.current = false;
      }, 1000);
      activateKillButtons();
      callback(ATTACK);
    }
    if (filename && ((type === WEAPONS && canAttack) || type !== WEAPONS)) {
      if (type === ACTIVATIONS) {
        sound.current = new Audio(
          SOUNDS[
            `${filename}${differentSounds ? randomNumber(differentSounds) : ''}`
          ]
        );
      }
      activate(true);
      sound.current.currentTime = 0;
      sound.current.play();

      if (makeNoise) {
        makeNoise(name);
      }

      if (needsToBeReloaded) {
        spendAmmo();
      }

      setTimeout(() => {
        activate(false);
      }, 4000);
    }
  };

  useEffect(() => {
    sound.current = new Audio(
      SOUNDS[
        `${filename}${differentSounds ? randomNumber(differentSounds) : ''}`
      ]
    );
  }, [filename, differentSounds]);

  return (
    <Block damageMode={damageMode} type={type} wounded={wounded}>
      {(isActive || isHighlighted) && type === ACTIVATIONS && (
        <ZombieLabel isActive={isActive}>{name || label}</ZombieLabel>
      )}
      <PlayImageButton
        canAttack={canAttack}
        isActive={isActive}
        isText={!img}
        damageMode={damageMode}
        onClick={damageMode || trade || setupMode ? onClickCard : play}
        setupMode={setupMode}
        slotType={slotType}
        trade={trade}
        type={type}
      >
        {checkIfItemCanBeCombined(name) && canCombine && (
          <ActionButton
            actionType={COMBINE_ACTION}
            callback={event => onClickCombine([name, slot], event)}
            combineItemSelected={combineItemSelected}
            combinePair={combinePair}
            isMobile={isMobile}
          />
        )}
        {type === ACTIVATIONS && (
          <ZombieActions>
            <Action action={ACTIVATE}>Activate</Action>
            <Action action={ATTACK} onClick={() => toggleDamageMode(name)}>
              Attack survivor!
            </Action>
            {special && (
              <Action
                action={KILL}
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
  isMobile: bool.isRequired,
  isSelected: bool,
  label: string,
  makeNoise: func.isRequired,
  name: string.isRequired,
  needsToBeReloaded: bool,
  noAudio: bool,
  onClickCard: func.isRequired,
  onClickCombine: func,
  rows: number,
  setupMode: bool.isRequired,
  slot: number,
  slotType: string,
  special: string,
  spendAmmo: func,
  toggleDamageMode: func.isRequired,
  trade: bool.isRequired,
  type: string.isRequired,
  unloaded: bool,
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
  needsToBeReloaded: false,
  noAudio: false,
  onClickCombine: null,
  rows: null,
  slot: null,
  special: null,
  spendAmmo: () => null,
  slotType: null,
  unloaded: false
};

export default SoundBlock;

import React, { useEffect, useRef } from 'react';
import { bool, func, number, string, oneOfType } from 'prop-types';
import { useStateWithLabel } from '../../utils/hooks';
import { checkIfItemCanBeCombined } from '../../utils/items';
import ActionButton from '../ActionButton';
import { SOUNDS } from '../../assets/sounds';
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
  WOUND,
  ATTACK_SURVIVOR
} from '../../constants';
import { Block, PlayImageButton, PlayIcon, PlayText, ItemIcon } from './styles';
import {
  Action,
  ZombieActions,
  ZombieImageForMobile
} from '../Sections/ZombiesSection/styles';

const SoundBlock = ({
  activateKillButtons,
  callback,
  canAttack,
  canBeDeflected,
  canCombine,
  charCanDeflect,
  combineItemSelected,
  combinePair,
  damageMode,
  differentSounds,
  img,
  isMobile,
  isSelected,
  isTablet,
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
  trade,
  type,
  unloaded,
  wounded,
  zombieAttack
}) => {
  const [isActive, activate] = useStateWithLabel(false, 'isActive');
  const [
    displayZombieAttackButtonsForMobile,
    toggleZombieAttackButtons
  ] = useStateWithLabel(false, 'displayZombieAttackButtonsForMobile');

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
        if (isMobile) {
          toggleZombieAttackButtons(true);
        }
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
      }, 500);

      setTimeout(() => {
        activate(false);
        toggleZombieAttackButtons(false);
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
    <Block
      canBeDeflected={canBeDeflected}
      charCanDeflect={charCanDeflect}
      damageMode={damageMode}
      type={type}
      wounded={wounded}
    >
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
        {type === ACTIVATIONS &&
          ((isMobile && displayZombieAttackButtonsForMobile) || !isMobile) && (
            <ZombieActions>
              {!isMobile && !isTablet && (
                <Action action={ACTIVATE}>{ACTIVATE}</Action>
              )}
              <Action action={ATTACK} onClick={() => zombieAttack(name)}>
                {ATTACK_SURVIVOR}
              </Action>
              {special && (
                <Action
                  action={KILL}
                  onClick={() => zombieAttack(`${name}-instant`)}
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
  canBeDeflected: bool,
  canCombine: bool,
  charCanDeflect: bool,
  combineItemSelected: bool,
  combinePair: bool,
  damageMode: bool,
  differentSounds: number,
  img: string,
  isMobile: bool.isRequired,
  isSelected: bool,
  isTablet: bool,
  label: string,
  makeNoise: func,
  name: string.isRequired,
  needsToBeReloaded: bool,
  noAudio: bool,
  onClickCard: func,
  onClickCombine: func,
  rows: number,
  setupMode: oneOfType([string, bool]),
  slot: number,
  slotType: string,
  special: string,
  spendAmmo: func,
  trade: bool,
  type: string.isRequired,
  unloaded: bool,
  wounded: bool,
  zombieAttack: func
};

SoundBlock.defaultProps = {
  activateKillButtons: null,
  callback: null,
  canAttack: false,
  canBeDeflected: false,
  canCombine: false,
  charCanDeflect: false,
  combineItemSelected: false,
  combinePair: false,
  damageMode: false,
  differentSounds: null,
  img: null,
  isSelected: false,
  isTablet: false,
  label: null,
  makeNoise: () => null,
  needsToBeReloaded: false,
  noAudio: false,
  onClickCard: () => null,
  onClickCombine: null,
  rows: null,
  setupMode: null,
  slot: null,
  slotType: null,
  special: null,
  spendAmmo: () => null,
  trade: false,
  unloaded: false,
  wounded: false,
  zombieAttack: () => null
};

export default SoundBlock;

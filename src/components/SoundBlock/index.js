import React, { useEffect, useRef } from 'react';
import { bool, func, number, string } from 'prop-types';
import { useStateWithLabel } from '../../utils/hooks';
import { checkIfItemCanBeCombined } from '../../utils/items';
import { Block, PlayImageButton, PlayIcon, PlayText, ItemIcon } from './styles';
import {
  Action,
  ZombieActions,
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
  WOUND,
  ATTACK_SURVIVOR
} from '../../constants';
import ActionButton from '../ActionButton';
import { SOUNDS } from '../../assets/sounds';

const SoundBlock = ({
  activateKillButtons,
  callback,
  canAttack,
  canBeAbsorbed,
  canCombine,
  charCanAbsorb,
  combineItemSelected,
  combinePair,
  damageMode,
  differentSounds,
  img,
  isMobile,
  isTablet,
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
  zombieAttack,
  trade,
  type,
  unloaded,
  wounded
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
      canBeAbsorbed={canBeAbsorbed}
      charCanAbsorb={charCanAbsorb}
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
  canBeAbsorbed: bool.isRequired,
  canCombine: bool,
  charCanAbsorb: bool,
  combineItemSelected: bool,
  combinePair: bool,
  damageMode: bool,
  differentSounds: number,
  img: string,
  isMobile: bool.isRequired,
  isSelected: bool,
  isTablet: bool,
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
  zombieAttack: func,
  trade: bool.isRequired,
  type: string.isRequired,
  unloaded: bool,
  wounded: bool.isRequired
};

SoundBlock.defaultProps = {
  activateKillButtons: null,
  charCanAbsorb: false,
  callback: null,
  canAttack: false,
  canCombine: false,
  combineItemSelected: false,
  combinePair: false,
  damageMode: false,
  differentSounds: null,
  img: null,
  isSelected: false,
  isTablet: false,
  label: null,
  needsToBeReloaded: false,
  noAudio: false,
  onClickCombine: null,
  rows: null,
  slot: null,
  special: null,
  spendAmmo: () => null,
  slotType: null,
  unloaded: false,
  zombieAttack: () => null
};

export default SoundBlock;

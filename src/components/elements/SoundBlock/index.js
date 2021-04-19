import React, { useEffect, useRef } from 'react';
import { bool, func, number, oneOfType, string } from 'prop-types';
import { ALL_WEAPONS } from '../../../setup/weapons';
import { checkIfItemCanBeCombined, useStateWithLabel } from '../../../utils';
import ActionButton from '../ActionButton';
import { SOUNDS } from '../../../assets/sounds';
import {
  ACTIVATE,
  ACTIVATIONS,
  ATTACK,
  ATTACK_MELEE,
  ATTACK_RANGED,
  ATTACK_SURVIVOR,
  COMBINE_ACTION,
  IN_HAND,
  IN_RESERVE,
  ITEMS,
  KILL,
  MELEE,
  RANGED,
  WEAPONS,
  WOUND
} from '../../../constants';
import {
  Action,
  ZombieActions,
  ZombieImageForMobile
} from '../../Sections/ZombiesSection/styles';
import { Block, PlayImageButton, PlayIcon, PlayText, ItemIcon } from './styles';

const SoundBlock = ({
  activateKillButtons,
  callback,
  canAttack,
  canBeDeflected,
  canCombine,
  charCanDeflect,
  charName,
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
  round,
  rows,
  secondarySound,
  setupMode,
  slot,
  slotType,
  special,
  specificSound,
  spendAmmo,
  trade,
  type,
  unloaded,
  wounded,
  zombieAttack
}) => {
  const [
    displayZombieAttackButtonsForMobile,
    toggleZombieAttackButtons
  ] = useStateWithLabel(false, 'displayZombieAttackButtonsForMobile');
  const [isActive, activate] = useStateWithLabel(false, 'isActive');
  const [useAlternativeSound, toggleAlternativeSound] = useStateWithLabel(
    false,
    'useAlternativeSound'
  );

  const activateTimeout = useRef();
  const attackButtonsTimeout = useRef();
  const currentRound = useRef();
  const quickAttackDebounce = useRef();
  const quickAttackDebounceTimeout = useRef();
  const sound = useRef();

  const randomNumber = max => Math.ceil(Math.random() * max);
  const filename =
    !noAudio &&
    slotType !== IN_RESERVE &&
    type !== ITEMS &&
    type !== WOUND &&
    (specificSound || name.replace(/[\s']/g, ''));

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
      quickAttackDebounceTimeout.current = setTimeout(() => {
        quickAttackDebounce.current = false;
      }, 1000);
      activateKillButtons();
      if (ALL_WEAPONS[name].attack === MELEE) {
        callback(ATTACK_MELEE);
      } else if (ALL_WEAPONS[name].attack === RANGED) {
        callback(ATTACK_RANGED);
      }
    }

    if (filename && type === WEAPONS && canAttack && useAlternativeSound) {
      sound.current = new Audio(SOUNDS[`${filename}Alt`]);
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

      if (secondarySound && !useAlternativeSound) {
        toggleAlternativeSound(true);
      }

      activateTimeout.current = setTimeout(() => {
        activate(false);
      }, 4000);

      attackButtonsTimeout.current = setTimeout(() => {
        toggleZombieAttackButtons(false);
      }, 4000);
    }
  };

  useEffect(() => {
    if (!sound.current || currentRound.current !== round) {
      sound.current = new Audio(
        SOUNDS[
          `${filename}${differentSounds ? randomNumber(differentSounds) : ''}`
        ]
      );
      currentRound.current = round;
      toggleAlternativeSound(false);
    }
  }, [filename, differentSounds, round, toggleAlternativeSound]);

  useEffect(() => {
    clearTimeout(activateTimeout.current);
    clearTimeout(attackButtonsTimeout.current);
    clearTimeout(quickAttackDebounceTimeout.current);
    activate(false);
    return () => {
      clearTimeout(activateTimeout.current);
      clearTimeout(attackButtonsTimeout.current);
      clearTimeout(quickAttackDebounceTimeout.current);
      activate(false);
    };
  }, [activate, charName]);

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
  charName: string,
  combineItemSelected: bool,
  combinePair: bool,
  damageMode: oneOfType([string, bool]),
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
  round: number,
  rows: number,
  secondarySound: bool,
  setupMode: oneOfType([string, bool]),
  slot: number,
  slotType: string,
  special: string,
  specificSound: string,
  spendAmmo: func,
  trade: bool,
  type: string,
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
  charName: null,
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
  round: null,
  secondarySound: false,
  setupMode: null,
  slot: null,
  slotType: null,
  special: null,
  specificSound: null,
  spendAmmo: () => null,
  trade: false,
  type: null,
  unloaded: false,
  wounded: false,
  zombieAttack: () => null
};

export default SoundBlock;

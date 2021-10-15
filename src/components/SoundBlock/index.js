import React, { useEffect, useRef } from 'react';
import { bool, func, number, oneOfType, string } from 'prop-types';
import { checkIfItemCanBeCombined, useStateWithLabel } from '../../utils';
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
import {
  Action,
  ZombieActions,
  ZombieImageForMobile
} from '../Sections/ZombiesSection/styles';
import { Block, PlayImageButton, PlayIcon, PlayText, ItemIcon } from './styles';

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
  displayCombineButton,
  goToNextTourStep,
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
  tourMode,
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
  const [hasBeenClickedOnce, toggleHasBeenClickedOnce] = useStateWithLabel(
    false,
    'hasBeenClickedOnce'
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
    (specificSound || name.replace(' ', ''));

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
    console.log('$$$ tourMode', tourMode);
    if (
      (tourMode &&
        tourMode !== 29 &&
        tourMode !== 37 &&
        tourMode !== 48 &&
        tourMode !== 51 &&
        tourMode !== 55 &&
        tourMode !== 59 &&
        tourMode !== 60 &&
        tourMode !== 64 &&
        tourMode !== 66 &&
        tourMode !== 69 &&
        tourMode !== 70) ||
      (tourMode === 55 && hasBeenClickedOnce) ||
      (tourMode === 69 && hasBeenClickedOnce)
    ) {
      return;
    }

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
      callback(ATTACK);
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
    if (
      tourMode === 29 ||
      tourMode === 37 ||
      (tourMode === 59 && hasBeenClickedOnce)
    ) {
      goToNextTourStep();
    } else if (
      tourMode === 55 ||
      tourMode === 59 ||
      tourMode === 69 ||
      tourMode === 70
    ) {
      toggleHasBeenClickedOnce(true);
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
    return () => {
      clearTimeout(activateTimeout.current);
      clearTimeout(attackButtonsTimeout.current);
      clearTimeout(quickAttackDebounceTimeout.current);
    };
  }, []);

  return (
    <Block
      canBeDeflected={canBeDeflected}
      charCanDeflect={charCanDeflect}
      damageMode={damageMode}
      tourMode={tourMode === 15 || tourMode === 18}
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
        {displayCombineButton ||
          (checkIfItemCanBeCombined(name) && canCombine && (
            <ActionButton
              actionType={COMBINE_ACTION}
              callback={event => onClickCombine([name, slot], event)}
              combineItemSelected={combineItemSelected}
              combinePair={combinePair}
              isMobile={isMobile}
            />
          ))}
        {type === ACTIVATIONS &&
          ((isMobile && displayZombieAttackButtonsForMobile) || !isMobile) && (
            <ZombieActions>
              {!isMobile && !isTablet && (
                <Action action={ACTIVATE}>{ACTIVATE}</Action>
              )}
              <Action
                action={ATTACK}
                onClick={
                  !tourMode || (tourMode === 64 && name === 'Walker')
                    ? () => zombieAttack(name)
                    : () => null
                }
                tourMode={tourMode === 64 && name === 'Walker'}
              >
                {ATTACK_SURVIVOR}
              </Action>
              {special && (
                <Action
                  action={KILL}
                  onClick={
                    !tourMode || (tourMode === 66 && name === 'Runner')
                      ? () => zombieAttack(`${name}-instant`)
                      : () => null
                  }
                  tourMode={tourMode === 66 && name === 'Runner'}
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
  damageMode: oneOfType([string, bool]),
  differentSounds: number,
  displayCombineButton: bool,
  goToNextTourStep: func,
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
  tourMode: number,
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
  displayCombineButton: false,
  goToNextTourStep: () => null,
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
  tourMode: null,
  trade: false,
  unloaded: false,
  wounded: false,
  zombieAttack: () => null
};

export default SoundBlock;

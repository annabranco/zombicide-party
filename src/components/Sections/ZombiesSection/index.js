import React, { useContext, useEffect, useRef } from 'react';
import { bool, func, number } from 'prop-types';
import { AppContext } from '../../../setup/context';
import { getMediaQuery, logger, useStateWithLabel } from '../../../utils';
import SoundBlock from '../../SoundBlock';
import {
  ACTIVATIONS,
  END,
  MOBILE,
  TABLET,
  ZOMBIES_ROUND,
  LOG_TYPE_EXTENDED,
  END_ZOMBIE_ROUND,
  ZOMBIE_ATTACK
} from '../../../constants';
import { SelectorArea } from '../../SoundBlock/styles';
import {
  ConfirmAttackButton,
  NoSelectOverlay,
  SubSectionWrapper,
  ZombieLabel,
  ZombieWrapper,
  ZombiesArea,
  ZombiesRoundSign
} from './styles';

const ZombiesSection = ({
  damageMode,
  goToNextTourStep,
  setPlayersRound,
  toggleDamageMode,
  toggleZombiesArePlaying,
  tourMode,
  zombiesRound
}) => {
  const [isHighlighted, highlight] = useStateWithLabel(false, 'isHighlighted');
  const [turnLabel, toggleTurnLabel] = useStateWithLabel(true, 'turnLabel');
  const [zombies, changeZombies] = useStateWithLabel({}, 'zombies');

  const device = useRef(getMediaQuery());
  const timerTimeout = useRef();
  const { context } = useContext(AppContext);

  const endZombiesRound = () => {
    logger(LOG_TYPE_EXTENDED, END_ZOMBIE_ROUND);
    setPlayersRound();
    toggleZombiesArePlaying(false);
  };

  const zombieAttack = zombie => {
    logger(LOG_TYPE_EXTENDED, ZOMBIE_ATTACK);
    setPlayersRound();
    toggleDamageMode(zombie);
    if (tourMode && (tourMode === 64 || tourMode === 66)) {
      goToNextTourStep();
    }
  };

  useEffect(() => {
    if (turnLabel && zombiesRound) {
      timerTimeout.current = setTimeout(() => {
        toggleTurnLabel(false);
      }, 2000);
    }
  }, [toggleTurnLabel, turnLabel, zombiesRound]);

  useEffect(() => {
    changeZombies(context.zombies);
  }, [changeZombies, context.zombies]);

  useEffect(() => {
    return () => clearTimeout(timerTimeout.current);
  }, []);

  return (
    <ZombiesArea>
      {damageMode && <NoSelectOverlay />}
      <SubSectionWrapper>
        <SelectorArea
          columns={
            device.current === MOBILE || device.current === TABLET ? 3 : 'big'
          }
          zombies
        >
          {Object.keys(zombies).map(zombie => (
            <ZombieWrapper
              key={context.zombies[zombie].name}
              onMouseOut={() => highlight()}
              onMouseOver={() => highlight(zombie)}
            >
              <SoundBlock
                differentSounds={context.zombies[zombie].sounds}
                img={context.zombies[zombie].img}
                isMobile={device.current === MOBILE}
                isTablet={device.current === TABLET}
                name={context.zombies[zombie].name}
                rows={
                  device.current === MOBILE
                    ? Object.keys(zombies).length / 3
                    : null
                }
                special={context.zombies[zombie].special}
                tourMode={tourMode}
                type={ACTIVATIONS}
                zombieAttack={zombieAttack}
              />
              {device.current === MOBILE && (
                <ZombieLabel inner>{zombie}</ZombieLabel>
              )}
            </ZombieWrapper>
          ))}
        </SelectorArea>
        {zombiesRound && turnLabel && (
          <ZombiesRoundSign>{ZOMBIES_ROUND}</ZombiesRoundSign>
        )}
        {isHighlighted && <ZombieLabel>{isHighlighted}</ZombieLabel>}
      </SubSectionWrapper>
      <ConfirmAttackButton
        onClick={endZombiesRound}
        tourMode={tourMode === 68}
        type="button"
      >
        {END}
      </ConfirmAttackButton>
    </ZombiesArea>
  );
};

ZombiesSection.propTypes = {
  damageMode: bool.isRequired,
  goToNextTourStep: func.isRequired,
  setPlayersRound: func.isRequired,
  toggleDamageMode: func.isRequired,
  toggleZombiesArePlaying: func.isRequired,
  zombiesRound: bool.isRequired,
  tourMode: number
};

ZombiesSection.defaultProps = {
  tourMode: null
};

export default ZombiesSection;

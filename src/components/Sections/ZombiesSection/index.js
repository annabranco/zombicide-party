import React, { useEffect, useRef } from 'react';
import { bool, func } from 'prop-types';
import { ALL_ZOMBIES } from '../../../setup/zombies';
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
  setPlayersRound,
  toggleDamageMode,
  toggleZombiesArePlaying,
  zombiesRound
}) => {
  const [isHighlighted, highlight] = useStateWithLabel(false, 'isHighlighted');
  const [turnLabel, toggleTurnLabel] = useStateWithLabel(true, 'turnLabel');
  const [zombies, changeZombies] = useStateWithLabel(ALL_ZOMBIES, 'zombies');

  const device = useRef(getMediaQuery());

  const endZombiesRound = () => {
    logger(LOG_TYPE_EXTENDED, END_ZOMBIE_ROUND);
    setPlayersRound();
    toggleZombiesArePlaying(false);
  };

  const zombieAttack = zombie => {
    logger(LOG_TYPE_EXTENDED, ZOMBIE_ATTACK);
    setPlayersRound();
    toggleDamageMode(zombie);
  };

  useEffect(() => {
    if (turnLabel && zombiesRound) {
      setTimeout(() => {
        toggleTurnLabel(false);
      }, 2000);
    }
  }, [zombiesRound]);

  return (
    <ZombiesArea>
      {damageMode && <NoSelectOverlay />}
      <SubSectionWrapper>
        <SelectorArea columns={device.current === MOBILE ? 3 : 'big'} zombies>
          {Object.keys(zombies).map(zombie => (
            <ZombieWrapper
              key={ALL_ZOMBIES[zombie].name}
              onMouseOut={() => highlight()}
              onMouseOver={() => highlight(zombie)}
            >
              <SoundBlock
                differentSounds={ALL_ZOMBIES[zombie].sounds}
                img={ALL_ZOMBIES[zombie].img}
                isMobile={device.current === MOBILE}
                isTablet={device.current === TABLET}
                name={ALL_ZOMBIES[zombie].name}
                rows={
                  device.current === MOBILE
                    ? Object.keys(zombies).length / 3
                    : null
                }
                special={ALL_ZOMBIES[zombie].special}
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
      <ConfirmAttackButton type="button" onClick={endZombiesRound}>
        {END}
      </ConfirmAttackButton>
    </ZombiesArea>
  );
};

ZombiesSection.propTypes = {
  damageMode: bool.isRequired,
  setPlayersRound: func.isRequired,
  toggleDamageMode: func.isRequired,
  toggleZombiesArePlaying: func.isRequired,
  zombiesRound: bool.isRequired
};

export default ZombiesSection;

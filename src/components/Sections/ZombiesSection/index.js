import React, { useEffect, useRef } from 'react';
import { bool, func } from 'prop-types';
import { ALL_ZOMBIES, DOGZ, ZOMBIES_S1 } from '../../../setup/zombies';
import { useStateWithLabel } from '../../../utils/hooks';
import SoundBlock from '../../SoundBlock';
import { SelectorArea } from '../../SoundBlock/styles';
import {
  AttackInstructions,
  CancelAttackButton,
  NoSelectOverlay,
  SubSectionWrapper,
  ZombiesArea,
  ZombiesRoundSign,
  AttackBurronsWrapper,
  ConfirmAttackButton,
  ZombieWrapper,
  ZombieLabel
} from './styles';
import { getMediaQuery } from '../../../utils/devices';
import {
  ACTIVATIONS,
  MOBILE,
  ZOMBIES_ROUND,
  END,
  DESKTOP,
  TABLET
} from '../../../constants';

const ZombiesSection = ({
  damageMode,
  roundEnded,
  setPlayersRound,
  toggleDamageMode,
  toggleZombiesArePlaying,
  visible,
  zombiesRound
}) => {
  const [zombies, changeZombies] = useStateWithLabel(ALL_ZOMBIES, 'zombies');
  const [turnLabel, toggleTurnLabel] = useStateWithLabel(true, 'turnLabel');
  const [isHighlighted, highlight] = useStateWithLabel(false, 'isHighlighted');

  const device = useRef(getMediaQuery());

  const endzombiesRound = () => {
    setPlayersRound();
    toggleZombiesArePlaying(false);
  };

  const zombieAttack = zombie => {
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
    <ZombiesArea visible={visible}>
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
                  device.current === MOBILE && Object.keys(zombies).length / 3
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
      <ConfirmAttackButton type="button" onClick={endzombiesRound}>
        {END}
      </ConfirmAttackButton>
    </ZombiesArea>
  );
};

ZombiesSection.propTypes = {
  damageMode: bool.isRequired,
  roundEnded: bool.isRequired,
  setPlayersRound: func.isRequired,
  toggleDamageMode: func.isRequired,
  toggleZombiesArePlaying: func.isRequired,
  visible: bool.isRequired,
  zombiesRound: bool.isRequired
};

export default ZombiesSection;

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
  ZombiesTurnSign,
  AttackBurronsWrapper,
  ConfirmAttackButton
} from './styles';
import { getMediaQuery } from '../../../utils/devices';
import { MOBILE } from '../../../constants';

const ZombiesSection = ({
  damageMode,
  roundEnded,
  setZombiesTurn,
  toggleDamageMode,
  visible,
  zombiesTurn
}) => {
  const [zombies, changeZombies] = useStateWithLabel(ALL_ZOMBIES, 'zombies');
  const [turnLabel, toggleTurnLabel] = useStateWithLabel(true, 'turnLabel');

  const device = useRef(getMediaQuery());

  const endZombiesTurn = () => {
    setZombiesTurn(false);
    toggleTurnLabel(true);
  };

  useEffect(() => {
    if (turnLabel && zombiesTurn) {
      setTimeout(() => {
        toggleTurnLabel(false);
      }, 2000);
    }
  }, [zombiesTurn]);

  return (
    <ZombiesArea visible={visible}>
      {damageMode && <NoSelectOverlay />}
      {damageMode && (
        <AttackInstructions>
          Select character and slot to inflict damage
        </AttackInstructions>
      )}

      <SubSectionWrapper>
        <SelectorArea columns={device.current === MOBILE ? 3 : 'big'} zombies>
          {Object.keys(zombies).map(zombie => (
            <div key={ALL_ZOMBIES[zombie].name}>
              <SoundBlock
                differentSounds={ALL_ZOMBIES[zombie].sounds}
                img={ALL_ZOMBIES[zombie].img}
                isMobile={device.current === MOBILE}
                name={ALL_ZOMBIES[zombie].name}
                rows={
                  device.current === MOBILE && Object.keys(zombies).length / 3
                }
                special={ALL_ZOMBIES[zombie].special}
                toggleDamageMode={toggleDamageMode}
                type="activations"
              />
            </div>
          ))}
        </SelectorArea>
        {damageMode && (
          <AttackBurronsWrapper>
            <CancelAttackButton onClick={() => toggleDamageMode(false)}>
              Cancel
            </CancelAttackButton>
            {device.current === MOBILE && (
              <ConfirmAttackButton onClick={() => setZombiesTurn(false)}>
                OK
              </ConfirmAttackButton>
            )}
          </AttackBurronsWrapper>
        )}
        {zombiesTurn && turnLabel && (
          <ZombiesTurnSign>Zombies round</ZombiesTurnSign>
        )}
      </SubSectionWrapper>
      <ConfirmAttackButton type="button" onClick={endZombiesTurn}>
        END
      </ConfirmAttackButton>
    </ZombiesArea>
  );
};

ZombiesSection.propTypes = {
  damageMode: bool.isRequired,
  roundEnded: bool.isRequired,
  setZombiesTurn: func.isRequired,
  toggleDamageMode: func.isRequired,
  visible: bool.isRequired,
  zombiesTurn: bool.isRequired
};

export default ZombiesSection;

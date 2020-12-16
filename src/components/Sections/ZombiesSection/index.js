import React from 'react';
import { bool, func } from 'prop-types';
import { DOGZ, ZOMBIES_S1 } from '../../../setup/zombies';
import { useStateWithLabel } from '../../../utils/hooks';
import SoundBlock from '../../SoundBlock';
import { SelectorArea, ZombiesArea } from '../../SoundBlock/styles';
import {
  AttackInstructions,
  CancelAttackButton,
  NoSelectOverlay,
  SubSectionWrapper,
  ZombiesTurnSign
} from './styles';

const ZombiesSection = ({
  damageMode,
  roundEnded,
  toggleDamageMode,
  zombiesTurn
}) => {
  const [zombies, changeZombies] = useStateWithLabel(
    [...ZOMBIES_S1, DOGZ],
    'zombies'
  );

  return (
    <ZombiesArea>
      {damageMode && <NoSelectOverlay />}
      {damageMode && (
        <AttackInstructions>
          Select character and slot to inflict damage
        </AttackInstructions>
      )}

      <SubSectionWrapper>
        <SelectorArea columns="big">
          {zombies.map(zombie => (
            <div key={zombie.name}>
              <SoundBlock
                differentSounds={zombie.sounds}
                img={zombie.img}
                name={zombie.name}
                special={zombie.special}
                toggleDamageMode={toggleDamageMode}
                type="activations"
              />
            </div>
          ))}
        </SelectorArea>
        {damageMode && (
          <CancelAttackButton onClick={() => toggleDamageMode(false)}>
            Cancel
          </CancelAttackButton>
        )}
        {zombiesTurn && <ZombiesTurnSign>Zombies round</ZombiesTurnSign>}
      </SubSectionWrapper>
    </ZombiesArea>
  );
};

ZombiesSection.propTypes = {
  damageMode: bool.isRequired,
  roundEnded: bool.isRequired,
  toggleDamageMode: func.isRequired,
  zombiesTurn: bool.isRequired
};

export default ZombiesSection;

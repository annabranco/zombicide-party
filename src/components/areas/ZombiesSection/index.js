import React from 'react';
import SoundBlock from '../SoundBlock';
import { ZOMBIES_S1 } from '../../../setup/zombies';
import FemaleWound from '../../../assets/images/attacks/female-hit.png';
import FemaleKill from '../../../assets/images/attacks/female-kill.png';
import FemaleInstantKill from '../../../assets/images/attacks/female-instant-kill.png';
import FemaleHordeKill from '../../../assets/images/attacks/female-horde-kill.png';
import MaleWound from '../../../assets/images/attacks/male-hit.png';
import MaleKill from '../../../assets/images/attacks/male-kill.png';
import MaleInstantKill from '../../../assets/images/attacks/male-instant-kill.png';
import MaleHordeKill from '../../../assets/images/attacks/male-horde-kill.png';
import { SelectorArea, ZombiesArea } from '../styles';
import {
  SelectorButton,
  SelectorWrapper,
  SubSectionTitle,
  SubSectionWrapper
} from './styles';
import { useStateWithLabel } from '../../../utils/hooks';

const ZombiesSection = () => {
  const [displayKills, ToggleKills] = useStateWithLabel(false, 'displayKills');
  const [zombies, changeZombies] = useStateWithLabel(ZOMBIES_S1, 'zombies');

  return (
    <ZombiesArea>
      <SelectorWrapper onClick={() => ToggleKills(!displayKills)}>
        <SelectorButton displayKills={displayKills} />
        <SubSectionTitle opened={!displayKills}>Activations</SubSectionTitle>
        <SubSectionTitle opened={displayKills}>Attacks</SubSectionTitle>
      </SelectorWrapper>
      {displayKills ? (
        <SubSectionWrapper>
          <SelectorArea columns="big">
            <SoundBlock
              name="female-hit"
              img={FemaleWound}
              label="Wounds female survivor"
              type="attacks"
            />
            <SoundBlock
              name="male-hit"
              img={MaleWound}
              label="Wounds male survivor"
              type="attacks"
            />
            <SoundBlock
              name="female-kill"
              img={FemaleKill}
              label="Kills female survivor"
              type="attacks"
            />
            <SoundBlock
              name="male-kill"
              img={MaleKill}
              label="Kills male survivor"
              type="attacks"
            />
            <SoundBlock
              name="female-instant-kill"
              img={FemaleInstantKill}
              label="Agressive kill on female survivor"
              type="attacks"
            />
            <SoundBlock
              name="male-instant-kill"
              img={MaleInstantKill}
              label="Agressive kill on male survivor"
              type="attacks"
            />
            <SoundBlock
              name="female-horde-kill"
              img={FemaleHordeKill}
              label="Horde kills female survivor"
              type="attacks"
            />
            <SoundBlock
              name="male-horde-kill"
              img={MaleHordeKill}
              label="Horde kills male survivor"
              type="attacks"
            />
          </SelectorArea>
        </SubSectionWrapper>
      ) : (
        <SubSectionWrapper>
          <SelectorArea columns="big">
            {zombies.map(zombie => (
              <SoundBlock
                key={zombie.name}
                name={zombie.name}
                differentSounds={zombie.sounds}
                img={zombie.img}
                type="activations"
              />
            ))}
          </SelectorArea>
        </SubSectionWrapper>
      )}
    </ZombiesArea>
  );
};

export default ZombiesSection;

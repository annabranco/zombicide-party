import React, { useState } from 'react';
import SoundBlock from '../SoundBlock';
import WalkerIcon from '../../../assets/images/Walker.png';
import RunnerIcon from '../../../assets/images/Runner.png';
import FattyIcon from '../../../assets/images/Fatty.png';
import AbominationIcon from '../../../assets/images/Abomination.png';
import HordeIcon from '../../../assets/images/Horde.png';

import FemaleWound from '../../../assets/images/attacks/female-hit.png';
import FemaleKill from '../../../assets/images/attacks/female-kill.png';
import FemaleInstantKill from '../../../assets/images/attacks/female-instant-kill.png';
import FemaleHordeKill from '../../../assets/images/attacks/female-horde-kill.png';
import MaleWound from '../../../assets/images/attacks/male-hit.png';
import MaleKill from '../../../assets/images/attacks/male-kill.png';
import MaleInstantKill from '../../../assets/images/attacks/male-instant-kill.png';
import MaleHordeKill from '../../../assets/images/attacks/male-horde-kill.png';
import { SoundsSelectorArea, ZombiesArea } from '../styles';
import {
  SelectorButton,
  SelectorWrapper,
  SubSectionTitle,
  SubSectionWrapper
} from './styles';

const ZombiesSection = () => {
  const [displayKills, ToggleKills] = useState(false);

  return (
    <ZombiesArea>
      <SelectorWrapper onClick={() => ToggleKills(!displayKills)}>
        <SelectorButton displayKills={displayKills} />
        <SubSectionTitle opened={!displayKills}>Activations</SubSectionTitle>
        <SubSectionTitle opened={displayKills}>Attacks</SubSectionTitle>
      </SelectorWrapper>
      <SubSectionWrapper opened={!displayKills}>
        <SoundsSelectorArea columns="big" visible={displayKills}>
          <SoundBlock
            name="Walker"
            differentSounds={9}
            img={WalkerIcon}
            type="activations"
          />
          <SoundBlock
            name="Runner"
            differentSounds={5}
            img={RunnerIcon}
            type="activations"
          />
          <SoundBlock
            name="Fatty"
            differentSounds={5}
            img={FattyIcon}
            type="activations"
          />
          <SoundBlock
            name="Abomination"
            differentSounds={4}
            img={AbominationIcon}
            type="activations"
          />
          <SoundBlock
            name="Horde"
            differentSounds={2}
            img={HordeIcon}
            type="activations"
          />
        </SoundsSelectorArea>
      </SubSectionWrapper>
      <SubSectionWrapper opened={displayKills}>
        <SoundsSelectorArea columns="big" opened={displayKills}>
          <SoundBlock name="female-hit" img={FemaleWound} type="attacks" />
          <SoundBlock name="male-hit" img={MaleWound} type="attacks" />
          <SoundBlock name="female-kill" img={FemaleKill} type="attacks" />
          <SoundBlock name="male-kill" img={MaleKill} type="attacks" />
          <SoundBlock
            name="female-instant-kill"
            img={FemaleInstantKill}
            type="attacks"
          />
          <SoundBlock
            name="male-instant-kill"
            img={MaleInstantKill}
            type="attacks"
          />
          <SoundBlock
            name="female-horde-kill"
            img={FemaleHordeKill}
            type="attacks"
          />
          <SoundBlock
            name="male-horde-kill"
            img={MaleHordeKill}
            type="attacks"
          />
        </SoundsSelectorArea>
      </SubSectionWrapper>
    </ZombiesArea>
  );
};

export default ZombiesSection;

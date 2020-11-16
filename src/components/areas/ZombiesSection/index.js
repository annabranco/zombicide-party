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
import { SelectorArea, ZombiesArea } from '../styles';
import {
  SelectorButton,
  SelectorWrapper,
  SubSectionTitle,
  SubSectionWrapper,
  ZombieLabel
} from './styles';

const ZombiesSection = () => {
  const [displayKills, ToggleKills] = useState(false);
  const [activeIcon, selectIcon] = useState();

  return (
    <ZombiesArea>
      <SelectorWrapper onClick={() => ToggleKills(!displayKills)}>
        <SelectorButton displayKills={displayKills} />
        <SubSectionTitle opened={!displayKills}>Activations</SubSectionTitle>
        <SubSectionTitle opened={displayKills}>Attacks</SubSectionTitle>
      </SelectorWrapper>
      <ZombieLabel>{activeIcon}</ZombieLabel>
      {displayKills ? (
        <SubSectionWrapper>
          <SelectorArea columns="big">
            <SoundBlock
              name="female-hit"
              img={FemaleWound}
              label="Wounds female survivor"
              onHover={selectIcon}
              type="attacks"
            />
            <SoundBlock
              name="male-hit"
              img={MaleWound}
              label="Wounds male survivor"
              onHover={selectIcon}
              type="attacks"
            />
            <SoundBlock
              name="female-kill"
              img={FemaleKill}
              label="Kills female survivor"
              onHover={selectIcon}
              type="attacks"
            />
            <SoundBlock
              name="male-kill"
              img={MaleKill}
              label="Kills male survivor"
              onHover={selectIcon}
              type="attacks"
            />
            <SoundBlock
              name="female-instant-kill"
              img={FemaleInstantKill}
              label="Agressive kill on female survivor"
              onHover={selectIcon}
              type="attacks"
            />
            <SoundBlock
              name="male-instant-kill"
              img={MaleInstantKill}
              label="Agressive kill on male survivor"
              onHover={selectIcon}
              type="attacks"
            />
            <SoundBlock
              name="female-horde-kill"
              img={FemaleHordeKill}
              label="Horde kills female survivor"
              onHover={selectIcon}
              type="attacks"
            />
            <SoundBlock
              name="male-horde-kill"
              img={MaleHordeKill}
              label="Horde kills male survivor"
              onHover={selectIcon}
              type="attacks"
            />
          </SelectorArea>
        </SubSectionWrapper>
      ) : (
        <SubSectionWrapper>
          <SelectorArea columns="big">
            <SoundBlock
              name="Walker"
              differentSounds={9}
              img={WalkerIcon}
              onHover={selectIcon}
              type="activations"
            />
            <SoundBlock
              name="Runner"
              differentSounds={5}
              img={RunnerIcon}
              onHover={selectIcon}
              type="activations"
            />
            <SoundBlock
              name="Fatty"
              differentSounds={5}
              img={FattyIcon}
              onHover={selectIcon}
              type="activations"
            />
            <SoundBlock
              name="Abomination"
              differentSounds={4}
              img={AbominationIcon}
              onHover={selectIcon}
              type="activations"
            />
            <SoundBlock
              name="Horde"
              differentSounds={2}
              img={HordeIcon}
              onHover={selectIcon}
              type="activations"
            />
          </SelectorArea>
        </SubSectionWrapper>
      )}
    </ZombiesArea>
  );
};

export default ZombiesSection;

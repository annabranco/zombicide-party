import React from 'react';
import SoundBlock from '../SoundBlock';
import { SoundsSelectorArea, SubSectionTitle } from '../styles';
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

const Activation = () => (
  <>
    <SubSectionTitle>Activations</SubSectionTitle>
    <SoundsSelectorArea columns="big" subSections={2}>
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
    <SubSectionTitle>Kills</SubSectionTitle>
    <SoundsSelectorArea columns="big" subSections={2}>
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
      <SoundBlock name="male-horde-kill" img={MaleHordeKill} type="attacks" />
    </SoundsSelectorArea>
  </>
);

export default Activation;

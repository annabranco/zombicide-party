import React from 'react';
import SoundBlock from '../SoundBlock';
import { SoundsSelectorArea } from '../styles';
import WalkerIcon from '../../../assets/images/Walker.png';
import RunnerIcon from '../../../assets/images/Runner.png';
import FattyIcon from '../../../assets/images/Fatty.png';
import AbominationIcon from '../../../assets/images/Abomination.png';
import HordeIcon from '../../../assets/images/Horde.png';
import OpeningDoorIcon from '../../../assets/images/OpeningDoor.png';

import Crowbar from '../../../assets/images/activations/Crowbar.png';
import FireAxe from '../../../assets/images/activations/FireAxe.jpg';
import Chainsaw from '../../../assets/images/activations/Chainsaw.jpg';

const Activation = () => (
  <SoundsSelectorArea columns={5}>
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
    <SoundBlock
      name="Crowbar"
      differentSounds={1}
      img={Crowbar}
      type="activations"
    />
    <SoundBlock
      name="FireAxe"
      differentSounds={1}
      img={FireAxe}
      type="activations"
    />
    <SoundBlock
      name="Chainsaw"
      differentSounds={1}
      img={Chainsaw}
      type="activations"
    />
  </SoundsSelectorArea>
);

export default Activation;

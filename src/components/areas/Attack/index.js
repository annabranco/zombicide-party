import React from 'react';
import SoundBlock from '../SoundBlock';
import { SoundsSelectorArea } from '../styles';
import BaseballBat from '../../../assets/images/weapons/baseball-bat.jpg';
import Chainsaw from '../../../assets/images/weapons/chainsaw.jpg';
import Crowbar from '../../../assets/images/weapons/crowbar.jpg';
import EvilTwins from '../../../assets/images/weapons/evil-twins.jpg';
import FireAxe from '../../../assets/images/weapons/fire-axe.jpg';
import Katana from '../../../assets/images/weapons/katana.jpg';
import MasShotgun from '../../../assets/images/weapons/mas-shotgun.jpg';
import Machete from '../../../assets/images/weapons/machete.jpg';
import Molotov from '../../../assets/images/weapons/molotov.jpg';
import Pan from '../../../assets/images/weapons/pan.jpg';
import Pistol from '../../../assets/images/weapons/pistol.jpg';
import Rifle from '../../../assets/images/weapons/rifle.jpg';
import SawedOff from '../../../assets/images/weapons/sawed-off.jpg';
import Shotgun from '../../../assets/images/weapons/shotgun.jpg';
import SubMG from '../../../assets/images/weapons/sub-mg.jpg';

const Attack = () => (
  <SoundsSelectorArea columns={6}>
    <SoundBlock name="BaseballBat" img={BaseballBat} type="weapons" />
    <SoundBlock name="Chainsaw" img={Chainsaw} type="weapons" />
    <SoundBlock name="Crowbar" img={Crowbar} type="weapons" />
    <SoundBlock name="EvilTwins" img={EvilTwins} type="weapons" />
    <SoundBlock name="FireAxe" img={FireAxe} type="weapons" />
    <SoundBlock name="Katana" img={Katana} type="weapons" />
    <SoundBlock name="MasShotgun" img={MasShotgun} type="weapons" />
    <SoundBlock name="Machete" img={Machete} type="weapons" />
    <SoundBlock name="Molotov" img={Molotov} type="weapons" />
    <SoundBlock name="Pan" img={Pan} type="weapons" />
    <SoundBlock name="Pistol" img={Pistol} type="weapons" />
    <SoundBlock name="Rifle" img={Rifle} type="weapons" />
    <SoundBlock name="SawedOff" img={SawedOff} type="weapons" />
    <SoundBlock name="Shotgun" img={Shotgun} type="weapons" />
    <SoundBlock name="SubMG" img={SubMG} type="weapons" />
  </SoundsSelectorArea>
);

export default Attack;

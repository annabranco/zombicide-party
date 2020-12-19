import BaseballBat from '../assets/images/weapons/baseball-bat.jpg';
import Chainsaw from '../assets/images/weapons/chainsaw.jpg';
import Crowbar from '../assets/images/weapons/crowbar.jpg';
import EvilTwins from '../assets/images/weapons/evil-twins.jpg';
import FireAxe from '../assets/images/weapons/fire-axe.jpg';
import Katana from '../assets/images/weapons/katana.jpg';
import MasShotgun from '../assets/images/weapons/mas-shotgun.jpg';
import Machete from '../assets/images/weapons/machete.jpg';
import Molotov from '../assets/images/weapons/molotov.jpg';
import Pan from '../assets/images/weapons/pan.jpg';
import Pistol from '../assets/images/weapons/pistol.jpg';
import Rifle from '../assets/images/weapons/rifle.jpg';
import SawedOff from '../assets/images/weapons/sawed-off.jpg';
import Shotgun from '../assets/images/weapons/shotgun.jpg';
import SniperRifle from '../assets/images/weapons/sniper-rifle.jpg';
import SubMG from '../assets/images/weapons/sub-mg.jpg';
import { WEAPONS } from '../constants';

export const WEAPONS_S1 = {
  BaseballBat: {
    img: BaseballBat,
    name: 'BaseballBat',
    noise: false,
    type: WEAPONS
  },
  Chainsaw: {
    canOpenDoor: 'noisy',
    img: Chainsaw,
    name: 'Chainsaw',
    noise: true,
    type: WEAPONS
  },
  Crowbar: {
    canOpenDoor: true,
    img: Crowbar,
    name: 'Crowbar',
    noise: false,
    type: WEAPONS
  },
  EvilTwins: {
    img: EvilTwins,
    name: 'EvilTwins',
    noise: true,
    type: WEAPONS
  },
  FireAxe: {
    canOpenDoor: 'noisy',
    img: FireAxe,
    name: 'FireAxe',
    noise: false,
    type: WEAPONS
  },
  Katana: {
    img: Katana,
    name: 'Katana',
    noise: false,
    type: WEAPONS
  },
  MasShotgun: {
    img: MasShotgun,
    name: 'MasShotgun',
    noise: 'special',
    type: WEAPONS
  },
  Machete: {
    img: Machete,
    name: 'Machete',
    noise: false,
    type: WEAPONS
  },
  Molotov: {
    img: Molotov,
    name: 'Molotov',
    noise: false,
    type: WEAPONS
  },
  Pan: {
    img: Pan,
    name: 'Pan',
    noise: false,
    type: WEAPONS
  },
  Pistol: {
    img: Pistol,
    name: 'Pistol',
    noise: true,
    type: WEAPONS
  },
  Rifle: {
    img: Rifle,
    name: 'Rifle',
    noise: true,
    type: WEAPONS
  },
  SawedOff: {
    img: SawedOff,
    name: 'SawedOff',
    noise: true,
    type: WEAPONS
  },
  Shotgun: {
    img: Shotgun,
    name: 'Shotgun',
    noise: true,
    type: WEAPONS
  },
  SniperRifle: {
    img: SniperRifle,
    name: 'SniperRifle',
    noise: true,
    type: WEAPONS
  },
  SubMG: {
    img: SubMG,
    name: 'SubMG',
    noise: true,
    type: WEAPONS
  }
};

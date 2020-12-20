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
    dices: 1,
    img: BaseballBat,
    name: 'BaseballBat',
    noise: false,
    type: WEAPONS
  },
  Chainsaw: {
    canOpenDoor: 'noisy',
    dices: 5,
    img: Chainsaw,
    name: 'Chainsaw',
    noise: true,
    type: WEAPONS
  },
  Crowbar: {
    canOpenDoor: true,
    dices: 1,
    img: Crowbar,
    name: 'Crowbar',
    noise: false,
    type: WEAPONS
  },
  EvilTwins: {
    dices: 2,
    img: EvilTwins,
    name: 'EvilTwins',
    noise: true,
    type: WEAPONS
  },
  FireAxe: {
    canOpenDoor: 'noisy',
    dices: 1,
    img: FireAxe,
    name: 'FireAxe',
    noise: false,
    type: WEAPONS
  },
  Katana: {
    dices: 2,
    img: Katana,
    name: 'Katana',
    noise: false,
    type: WEAPONS
  },
  MasShotgun: {
    dices: 2,
    img: MasShotgun,
    name: 'MasShotgun',
    noise: 'special',
    type: WEAPONS
  },
  Machete: {
    dices: 1,
    img: Machete,
    name: 'Machete',
    noise: false,
    type: WEAPONS
  },
  Molotov: {
    dices: 'special',
    img: Molotov,
    name: 'Molotov',
    noise: false,
    type: WEAPONS
  },
  Pan: {
    dices: 1,
    img: Pan,
    name: 'Pan',
    noise: false,
    type: WEAPONS
  },
  Pistol: {
    dices: 1,
    img: Pistol,
    name: 'Pistol',
    noise: true,
    type: WEAPONS
  },
  Rifle: {
    combine: ['Scope', 'SniperRifle'],
    dices: 1,
    img: Rifle,
    name: 'Rifle',
    noise: true,
    type: WEAPONS
  },
  SawedOff: {
    dices: 2,
    img: SawedOff,
    name: 'SawedOff',
    noise: true,
    type: WEAPONS
  },
  Shotgun: {
    dices: 2,
    img: Shotgun,
    name: 'Shotgun',
    noise: true,
    type: WEAPONS
  },
  SniperRifle: {
    dices: 1,
    img: SniperRifle,
    name: 'SniperRifle',
    noise: true,
    type: WEAPONS
  },
  SubMG: {
    dices: 3,
    img: SubMG,
    name: 'SubMG',
    noise: true,
    type: WEAPONS
  }
};

import BaseballBat from '../assets/images/weapons/baseball-bat.jpg';
import Baton from '../assets/images/weapons/baton.jpg';
import BatteringRam from '../assets/images/weapons/battering-ram.jpg';
import Chainsaw from '../assets/images/weapons/chainsaw.jpg';
import Crowbar from '../assets/images/weapons/crowbar.jpg';
import EvilTwins from '../assets/images/weapons/evil-twins.jpg';
import FireAxe from '../assets/images/weapons/fire-axe.jpg';
import Flashbang from '../assets/images/weapons/flashbang.jpg';
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
import {
  SPECIAL,
  WEAPONS,
  NOISY,
  MELEE,
  RANGED,
  MELEE_RANGED
} from '../constants';

export const WEAPONS_S1_ORIGINAL = {
  BaseballBat: {
    attack: MELEE,
    dice: 1,
    img: BaseballBat,
    name: 'BaseballBat',
    noise: false,
    type: WEAPONS
  },
  Chainsaw: {
    canOpenDoor: NOISY,
    attack: MELEE,
    dice: 5,
    img: Chainsaw,
    name: 'Chainsaw',
    noise: true,
    type: WEAPONS
  },
  Crowbar: {
    canOpenDoor: true,
    attack: MELEE,
    dice: 1,
    img: Crowbar,
    name: 'Crowbar',
    noise: false,
    type: WEAPONS
  },
  EvilTwins: {
    attack: RANGED,
    dice: 2,
    img: EvilTwins,
    name: 'EvilTwins',
    noise: true,
    type: WEAPONS
  },
  FireAxe: {
    canOpenDoor: NOISY,
    attack: MELEE,
    dice: 1,
    img: FireAxe,
    name: 'FireAxe',
    noise: false,
    type: WEAPONS
  },
  Katana: {
    attack: MELEE,
    dice: 2,
    img: Katana,
    name: 'Katana',
    noise: false,
    type: WEAPONS
  },
  MasShotgun: {
    attack: MELEE_RANGED,
    dice: 2,
    img: MasShotgun,
    name: 'MasShotgun',
    noise: SPECIAL,
    type: WEAPONS
  },
  Machete: {
    attack: MELEE,
    dice: 1,
    img: Machete,
    name: 'Machete',
    noise: false,
    type: WEAPONS
  },
  Molotov: {
    attack: SPECIAL,
    dice: SPECIAL,
    img: Molotov,
    name: 'Molotov',
    noise: false,
    type: WEAPONS,
    useOnce: true
  },
  Pan: {
    attack: MELEE,
    dice: 1,
    img: Pan,
    name: 'Pan',
    noise: false,
    type: WEAPONS
  },
  Pistol: {
    attack: RANGED,
    dice: 1,
    img: Pistol,
    name: 'Pistol',
    noise: true,
    type: WEAPONS
  },
  Rifle: {
    combine: ['Scope', 'SniperRifle'],
    attack: RANGED,
    dice: 1,
    img: Rifle,
    name: 'Rifle',
    noise: true,
    type: WEAPONS
  },
  SawedOff: {
    attack: RANGED,
    dice: 2,
    img: SawedOff,
    name: 'SawedOff',
    noise: true,
    type: WEAPONS
  },
  Shotgun: {
    attack: RANGED,
    dice: 2,
    img: Shotgun,
    name: 'Shotgun',
    noise: true,
    type: WEAPONS
  },
  SniperRifle: {
    attack: RANGED,
    dice: 1,
    img: SniperRifle,
    name: 'SniperRifle',
    noise: true,
    type: WEAPONS
  },
  SubMG: {
    attack: RANGED,
    dice: 3,
    img: SubMG,
    name: 'SubMG',
    noise: true,
    type: WEAPONS
  }
};

export const WEAPONS_TD = {
  Baton: {
    attack: MELEE,
    dice: 1,
    img: Baton,
    name: 'Baton',
    noise: false,
    type: WEAPONS
  },
  BatteringRam: {
    canOpenDoor: NOISY,
    attack: MELEE,
    dice: 2,
    img: BatteringRam,
    name: 'BatteringRam',
    noise: false,
    type: WEAPONS
  },
  Flashbang: {
    attack: RANGED,
    dice: 0,
    img: Flashbang,
    name: 'Flashbang',
    noise: true,
    type: WEAPONS,
    useOnce: true
  }
};

export const WEAPONS_S1 = {
  ...WEAPONS_S1_ORIGINAL,
  ...WEAPONS_TD
};

console.log('$$$ WEAPONS_S1', WEAPONS_S1);

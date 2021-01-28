import AssaultRifle from '../assets/images/weapons/assault-rifle.jpg';
import AutomaticShotgun from '../assets/images/weapons/automatic-shotgun.jpg';
import BaseballBat from '../assets/images/weapons/baseball-bat.jpg';
import BatteringRam from '../assets/images/weapons/battering-ram.jpg';
import Chainsaw from '../assets/images/weapons/chainsaw.jpg';
import ColtPython from '../assets/images/weapons/colt-python.jpg';
import Crowbar from '../assets/images/weapons/crowbar.jpg';
import DesertEagle from '../assets/images/weapons/desert-eagle.jpg';
import DoubleBarrel from '../assets/images/weapons/double-barreled-shotgun.jpg';
import EvilTwins from '../assets/images/weapons/evil-twins.jpg';
import ExpandableBaton from '../assets/images/weapons/expandable-baton.jpg';
import ExpandableBatonClosed from '../assets/images/weapons/expandable-baton-closed.jpg';
import FireAxe from '../assets/images/weapons/fire-axe.jpg';
import Flashbang from '../assets/images/weapons/flashbang.jpg';
import Katana from '../assets/images/weapons/katana.jpg';
import Machete from '../assets/images/weapons/machete.jpg';
import MasShotgun from '../assets/images/weapons/mas-shotgun.jpg';
import Molotov from '../assets/images/weapons/molotov.jpg';
import Mp5 from '../assets/images/weapons/mp5.jpg';
import NightStick from '../assets/images/weapons/night-stick.jpg';
import Pan from '../assets/images/weapons/pan.jpg';
import Pistol from '../assets/images/weapons/pistol.jpg';
import Rifle from '../assets/images/weapons/rifle.jpg';
import SamuraiEdge from '../assets/images/weapons/samurai-edge.jpg';
import SawedOff from '../assets/images/weapons/sawed-off.jpg';
import Shotgun from '../assets/images/weapons/shotgun.jpg';
import SmokeGrenade from '../assets/images/weapons/smoke-grenade.jpg';
import SniperRifle from '../assets/images/weapons/sniper-rifle.jpg';
import SubMG from '../assets/images/weapons/sub-mg.jpg';
import TaserGun from '../assets/images/weapons/taser-gun.jpg';

import {
  SPECIAL,
  WEAPONS,
  NOISY,
  MELEE,
  RANGED,
  MELEE_RANGED
} from '../constants';

export const WEAPONS_S1 = {
  BaseballBat: {
    attack: MELEE,
    dice: 1,
    img: BaseballBat,
    name: 'Baseball Bat',
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
    name: 'Evil Twins',
    noise: true,
    type: WEAPONS
  },
  FireAxe: {
    canOpenDoor: NOISY,
    attack: MELEE,
    dice: 1,
    img: FireAxe,
    name: 'Fire Axe',
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
    name: 'Mas Shotgun',
    noise: SPECIAL,
    type: WEAPONS
  },
  Machete: {
    attack: MELEE,
    dice: 1,
    dual: true,
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
    dual: true,
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
    dual: true,
    img: SawedOff,
    name: 'Sawed Off',
    needsReloading: true,
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
    name: 'Sniper Rifle',
    noise: true,
    type: WEAPONS
  },
  SubMG: {
    attack: RANGED,
    dice: 3,
    dual: true,
    img: SubMG,
    name: 'SubMG',
    noise: true,
    type: WEAPONS
  }
};

export const WEAPONS_MALL = {
  AssaultRifle: {
    attack: RANGED,
    dice: 3,
    img: AssaultRifle,
    name: 'Assault Rifle',
    noise: true,
    type: WEAPONS
  }
};

export const WEAPONS_S2 = {
  AutomaticShotgun: {
    attack: RANGED,
    dice: 3,
    img: AutomaticShotgun,
    name: 'Automatic Shotgun',
    noise: true,
    type: WEAPONS
  },
  NightStick: {
    attack: MELEE,
    dice: 1,
    img: NightStick,
    name: 'NightStick',
    noise: false,
    type: WEAPONS
  }
};

export const WEAPONS_S3 = {
  DoubleBarrel: {
    attack: RANGED,
    dice: 2,
    img: DoubleBarrel,
    name: 'Double Barrel',
    noise: true,
    type: WEAPONS
  },
  Mp5: {
    attack: RANGED,
    dice: 3,
    img: Mp5,
    name: 'Mp5',
    noise: true,
    type: WEAPONS
  }
};

export const WEAPONS_OTHERS = {
  DesertEagle: {
    attack: RANGED,
    dice: 1,
    img: DesertEagle,
    name: 'Desert Eagle',
    noise: false,
    type: WEAPONS
  }
};

export const WEAPONS_NIGHT_SHIFT = {
  AutomaticShotgun: {
    attack: RANGED,
    dice: 3,
    img: AutomaticShotgun,
    name: 'Automatic Shotgun',
    noise: true,
    type: WEAPONS
  },
  BatteringRam: {
    canOpenDoor: NOISY,
    attack: MELEE,
    dice: 2,
    img: BatteringRam,
    name: 'Battering Ram',
    noise: false,
    type: WEAPONS
  },
  ColtPython: {
    canOpenDoor: NOISY,
    attack: RANGED,
    dice: 1,
    dual: true,
    img: ColtPython,
    name: 'Colt Python',
    noise: true,
    type: WEAPONS
  },

  ExpandableBaton: {
    altImage: ExpandableBatonClosed,
    attack: MELEE,
    dice: 1,
    img: ExpandableBaton,
    name: 'Expandable Baton',
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
  },
  Mp5: {
    attack: RANGED,
    dice: 3,
    img: Mp5,
    name: 'Mp5',
    noise: true,
    type: WEAPONS
  },
  SamuraiEdge: {
    attack: RANGED,
    dice: 1,
    img: SamuraiEdge,
    name: 'Samurai Edge',
    noise: true,
    type: WEAPONS
  },
  SmokeGrenade: {
    attack: RANGED,
    dice: 0,
    img: SmokeGrenade,
    name: 'Smoke Grenade',
    noise: false,
    type: WEAPONS
  },
  TaserGun: {
    attack: RANGED,
    dice: 0,
    img: TaserGun,
    name: 'Taser Gun',
    noise: false,
    type: WEAPONS
  }
};

const selectedSets = [
  WEAPONS_S1,
  WEAPONS_MALL,
  WEAPONS_S2,
  WEAPONS_S3,
  WEAPONS_OTHERS,
  WEAPONS_NIGHT_SHIFT
];

export const setupWeapons = sets => {
  let allWeapons = {};
  sets.forEach(set => {
    allWeapons = { ...allWeapons, ...set };
  });
  return allWeapons;
};

export const ALL_WEAPONS = setupWeapons(selectedSets);

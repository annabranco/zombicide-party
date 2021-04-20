import AK47 from '../assets/images/weapons/ak47.jpg';
import AK47Golden from '../assets/images/weapons/ak47-golden.jpg';
import AssaultRifle from '../assets/images/weapons/assault-rifle.jpg';
import AutomaticShotgun from '../assets/images/weapons/automatic-shotgun.jpg';
import BaseballBat from '../assets/images/weapons/baseball-bat.jpg';
import BatteringRam from '../assets/images/weapons/battering-ram.jpg';
import Betty from '../assets/images/weapons/betty.jpg';
import Bow from '../assets/images/weapons/bow.jpg';
import Chainsaw from '../assets/images/weapons/chainsaw.jpg';
import ColtPython from '../assets/images/weapons/colt-python.jpg';
import ConcreteSaw from '../assets/images/weapons/concrete-saw.jpg';
import Crossbow from '../assets/images/weapons/crossbow.jpg';
import Crowbar from '../assets/images/weapons/crowbar.jpg';
import DesertEagle from '../assets/images/weapons/desert-eagle.jpg';
import DoubleBarrel from '../assets/images/weapons/double-barreled-shotgun.jpg';
import DougsDream from '../assets/images/weapons/dougs-dream.jpg';
import EntryShotgun from '../assets/images/weapons/entry-shotgun.jpg';
import EvilTwins from '../assets/images/weapons/evil-twins.jpg';
import ExpandableBaton from '../assets/images/weapons/expandable-baton.jpg';
import ExpandableBatonClosed from '../assets/images/weapons/expandable-baton-closed.jpg';
import FireAxe from '../assets/images/weapons/fire-axe.jpg';
import Flamethrower from '../assets/images/weapons/flamethrower.jpg';
import Flashbang from '../assets/images/weapons/flashbang.jpg';
import Handcannon from '../assets/images/weapons/handcannon.jpg';
import Hatchet from '../assets/images/weapons/hatchet.jpg';
import JacknJill from '../assets/images/weapons/jack-and-jill.jpg';
import Katana from '../assets/images/weapons/katana.jpg';
import Knife from '../assets/images/weapons/knife.jpg';
import Kukri from '../assets/images/weapons/kukri.jpg';
import LaGuillotine from '../assets/images/weapons/la-guillotine.jpg';
import M4Pink from '../assets/images/weapons/M4-pink.jpg';
import M4Cqb from '../assets/images/weapons/m4-cqb.jpg';
import Mac10 from '../assets/images/weapons/mac10.jpg';
import Machete from '../assets/images/weapons/machete.jpg';
import Magnum44 from '../assets/images/weapons/magnum44.jpg';
import MasShotgun from '../assets/images/weapons/mas-shotgun.jpg';
import MeatCleaver from '../assets/images/weapons/meat-cleaver.jpg';
import Minigun from '../assets/images/weapons/minigun.jpg';
import Molotov from '../assets/images/weapons/molotov.jpg';
import Mp5 from '../assets/images/weapons/mp5.jpg';
import Nailbat from '../assets/images/weapons/nailbat.jpg';
import NedsAtomicFlashlight from '../assets/images/weapons/neds-atomic-flashlight.jpg';
import NightStick from '../assets/images/weapons/night-stick.jpg';
import Pan from '../assets/images/weapons/pan.jpg';
import PasGun from '../assets/images/weapons/pas-gun.jpg';
import Pistol from '../assets/images/weapons/pistol.jpg';
import Rifle from '../assets/images/weapons/rifle.jpg';
import RocketLauncher from '../assets/images/weapons/rocket-launcher.jpg';
import Saber from '../assets/images/weapons/saber.jpg';
import SamuraiEdge from '../assets/images/weapons/samurai-edge.jpg';
import SawedOff from '../assets/images/weapons/sawed-off.jpg';
import SBF from '../assets/images/weapons/sbf.jpg';
import Shotgun from '../assets/images/weapons/shotgun.jpg';
import SmokeGrenade from '../assets/images/weapons/smoke-grenade.jpg';
import SniperRifle from '../assets/images/weapons/sniper-rifle.jpg';
import SPAS12 from '../assets/images/weapons/spas12.jpg';
import Special911 from '../assets/images/weapons/special911.jpg';
import SweetSisters from '../assets/images/weapons/sweet-sisters.jpg';
import SubMG from '../assets/images/weapons/sub-mg.jpg';
import TaserGun from '../assets/images/weapons/taser-gun.jpg';
import Thompson from '../assets/images/weapons/thompson.jpg';
import VikingAxe from '../assets/images/weapons/viking-axe.jpg';
import Wakizashi from '../assets/images/weapons/wakizashi.jpg';
import Winchester from '../assets/images/weapons/winchester.jpg';
import ZombKnuckles from '../assets/images/weapons/zomb-knuckles.jpg';

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
    type: WEAPONS,
    unique: true
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
    type: WEAPONS,
    unique: true
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
    combined: true,
    dice: SPECIAL,
    img: Molotov,
    name: 'Molotov',
    noise: true,
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
    combined: true,
    dice: 1,
    img: SniperRifle,
    name: 'Sniper Rifle',
    noise: true,
    sound: 'Rifle',
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

export const WEAPONS_TOXIC_MALL = {
  Magnum44: {
    attack: RANGED,
    dice: 1,
    img: Magnum44,
    name: 'Magnum 44',
    noise: true,
    secondarySound: true,
    type: WEAPONS
  },
  Special911: {
    attack: RANGED,
    dice: 5,
    img: Special911,
    name: 'Special 911',
    noise: true,
    type: WEAPONS,
    ultraRed: true
  },
  AssaultRifle: {
    attack: RANGED,
    dice: 3,
    img: AssaultRifle,
    name: 'Assault Rifle',
    noise: true,
    type: WEAPONS
  },
  Betty: {
    attack: RANGED,
    canOpenDoor: NOISY,
    dice: 7,
    img: Betty,
    name: 'Betty',
    noise: true,
    sound: 'Chainsaw',
    type: WEAPONS,
    ultraRed: true
  },
  DougsDream: {
    attack: RANGED,
    dice: 8,
    img: DougsDream,
    name: "Doug's Dream",
    noise: true,
    type: WEAPONS,
    ultraRed: true
  },
  Flamethrower: {
    attack: SPECIAL,
    dice: SPECIAL,
    img: Flamethrower,
    name: 'Flamethrower',
    noise: true,
    requires: 'Gasoline',
    type: WEAPONS
  },
  JacknJill: {
    attack: RANGED,
    dice: 6,
    img: JacknJill,
    name: "Jack 'n Jill",
    needsReloading: true,
    noise: true,
    type: WEAPONS,
    ultraRed: true
  },
  NedsAtomicFlashlight: {
    attack: MELEE,
    dice: 5,
    img: NedsAtomicFlashlight,
    name: "Ned's Atomic Flashlight",
    noise: true,
    type: WEAPONS,
    ultraRed: true
  },
  Pan: {
    attack: MELEE,
    dice: 1,
    img: Pan,
    name: 'Pan',
    noise: false,
    type: WEAPONS
  },
  PasGun: {
    attack: RANGED,
    dice: 1,
    img: PasGun,
    name: "Pa's Gun",
    noise: true,
    type: WEAPONS
  },
  SweetSisters: {
    attack: MELEE_RANGED,
    dice: 6,
    img: SweetSisters,
    name: 'Sweet Sisters',
    noise: true,
    type: WEAPONS,
    ultraRed: true
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
  ConcreteSaw: {
    attack: MELEE,
    dice: 3,
    img: ConcreteSaw,
    name: 'Concrete Saw',
    noise: true,
    type: WEAPONS
  },
  Hatchet: {
    attack: MELEE,
    dice: 1,
    dual: true,
    img: Hatchet,
    name: 'Hatchet',
    noise: false,
    type: WEAPONS
  },
  Kukri: {
    attack: MELEE,
    dice: 1,
    dual: true,
    img: Kukri,
    name: 'Kukri',
    noise: false,
    type: WEAPONS
  },
  MeatCleaver: {
    attack: MELEE,
    dice: 1,
    img: MeatCleaver,
    name: 'Meat Cleaver',
    noise: false,
    type: WEAPONS
  },
  Nailbat: {
    attack: MELEE,
    dice: 2,
    img: Nailbat,
    name: 'Nailbat',
    noise: false,
    type: WEAPONS
  },
  NightStick: {
    attack: MELEE,
    dice: 1,
    img: NightStick,
    name: 'NightStick',
    noise: false,
    type: WEAPONS
  },
  Wakizashi: {
    attack: MELEE,
    dice: 1,
    dual: true,
    img: Wakizashi,
    name: 'Wakizashi',
    noise: false,
    type: WEAPONS
  }
};

export const WEAPONS_S3 = {
  AK47: {
    attack: RANGED,
    dice: 2,
    img: AK47,
    name: 'AK47',
    noise: true,
    type: WEAPONS
  },
  Bow: {
    attack: RANGED,
    dice: 1,
    img: Bow,
    name: 'Bow',
    noise: false,
    type: WEAPONS
  },
  Crossbow: {
    attack: RANGED,
    dice: 1,
    img: Crossbow,
    name: 'Crossbow',
    noise: false,
    type: WEAPONS
  },
  DoubleBarrel: {
    attack: RANGED,
    dice: 2,
    img: DoubleBarrel,
    name: 'Double Barrel',
    noise: true,
    type: WEAPONS
  },
  Knife: {
    attack: MELEE,
    dice: 1,
    dual: true,
    img: Knife,
    name: 'Knife',
    noise: false,
    type: WEAPONS
  },
  LaGuillotine: {
    attack: MELEE,
    dice: 4,
    img: LaGuillotine,
    name: 'LaGuillotine',
    noise: false,
    type: WEAPONS
  },
  Mac10: {
    attack: RANGED,
    dice: 5,
    dual: true,
    img: Mac10,
    name: 'Mac10',
    needsReloading: true,
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
  },
  Saber: {
    attack: MELEE,
    dice: 2,
    img: Saber,
    name: 'Saber',
    noise: true,
    type: WEAPONS
  }
};

export const WEAPONS_ANGRY_NEIGHBORS = {
  SBF: {
    attack: MELEE,
    dice: 1,
    dual: true,
    img: SBF,
    name: 'SBF',
    noise: false,
    type: WEAPONS
  },
  Handcannon: {
    attack: RANGED,
    dice: 3,
    img: Handcannon,
    name: 'Handcannon',
    needsReloading: true,
    noise: true,
    type: WEAPONS
  },
  Winchester: {
    attack: RANGED,
    dice: 2,
    img: Winchester,
    name: 'Winchester',
    noise: true,
    type: WEAPONS
  },
  ZombKnuckles: {
    attack: MELEE,
    dice: 1,
    dual: true,
    img: ZombKnuckles,
    name: 'ZombKnuckles',
    noise: false,
    type: WEAPONS
  }
};

export const WEAPONS_OTHERS = {
  AK47Golden: {
    attack: RANGED,
    dice: 2,
    img: AK47Golden,
    name: 'AK47 Golden',
    noise: true,
    sound: 'AK47',
    type: WEAPONS
  },
  DesertEagle: {
    attack: RANGED,
    dice: 1,
    img: DesertEagle,
    name: 'Desert Eagle',
    noise: true,
    type: WEAPONS
  },
  M4Pink: {
    attack: RANGED,
    dice: 3,
    img: M4Pink,
    name: 'M4 Pink',
    noise: true,
    sound: 'M4',
    type: WEAPONS
  },
  SPAS12: {
    attack: RANGED,
    dice: 3,
    img: SPAS12,
    name: 'SPAS12',
    noise: true,
    type: WEAPONS
  },
  Thompson: {
    attack: RANGED,
    dice: 5,
    img: Thompson,
    name: 'Thompson',
    noise: true,
    type: WEAPONS
  }
};

export const WEAPONS_NIGHT_SHIFT = {
  AssaultRifle: {
    attack: RANGED,
    dice: 3,
    img: AssaultRifle,
    name: 'Assault Rifle',
    noise: true,
    type: WEAPONS
  },
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
    attack: RANGED,
    dice: 1,
    dual: true,
    img: ColtPython,
    name: 'Colt Python',
    noise: true,
    secondarySound: true,
    type: WEAPONS
  },
  DesertEagle: {
    attack: RANGED,
    dice: 1,
    img: DesertEagle,
    name: 'Desert Eagle',
    noise: true,
    type: WEAPONS
  },
  EntryShotgun: {
    canOpenDoor: NOISY,
    attack: RANGED,
    dice: 2,
    img: EntryShotgun,
    name: 'Entry Shotgun',
    needsReloading: true,
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
  M4CQB: {
    attack: RANGED,
    dice: 3,
    img: M4Cqb,
    name: 'M4 CQB',
    noise: true,
    sound: 'M4CQB',
    type: WEAPONS
  },
  Minigun: {
    attack: RANGED,
    dice: 12,
    img: Minigun,
    name: 'Minigun',
    noise: 3,
    type: WEAPONS
  },
  Mp5: {
    attack: RANGED,
    dice: 3,
    img: Mp5,
    name: 'Mp5',
    noise: true,
    type: WEAPONS
  },
  RocketLauncher: {
    attack: SPECIAL,
    combined: true,
    dice: SPECIAL,
    img: RocketLauncher,
    name: 'Rocket Launcher',
    noise: true,
    requires: 'Rocket',
    type: WEAPONS
  },
  SamuraiEdge: {
    attack: RANGED,
    dice: 2,
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
    type: WEAPONS,
    useOnce: true
  },
  TaserGun: {
    attack: RANGED,
    dice: 0,
    img: TaserGun,
    name: 'Taser Gun',
    noise: false,
    type: WEAPONS
  },
  VikingAxe: {
    attack: RANGED,
    dice: 2,
    dual: true,
    img: VikingAxe,
    name: 'Viking Axe',
    noise: false,
    type: WEAPONS
  }
};

export const ALL_WEAPONS = {
  ...WEAPONS_S1,
  ...WEAPONS_TOXIC_MALL,
  ...WEAPONS_S2,
  ...WEAPONS_S3,
  ...WEAPONS_ANGRY_NEIGHBORS,
  ...WEAPONS_OTHERS,
  ...WEAPONS_NIGHT_SHIFT
};

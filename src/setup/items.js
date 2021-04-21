import Antibiotics from '../assets/images/items/antibiotics.jpg';
import BagofRice from '../assets/images/items/bag-of-rice.jpg';
import CannedFood from '../assets/images/items/canned-food.jpg';
import CelticShield from '../assets/images/items/celtic-shield.jpg';
import Cookies from '../assets/images/items/cookies.jpg';
import Defibrillator from '../assets/images/items/defibrillator.jpg';
import DisgustingDisguise from '../assets/images/items/disgusting-disguise.jpg';
import EnergyBar from '../assets/images/items/energy-bar.jpg';
import Flashlight from '../assets/images/items/flashlight.jpg';
import FlashlightNS from '../assets/images/items/flashlight-ns.jpg';
import GasMask from '../assets/images/items/gas-mask.jpg';
import GasMaskNS from '../assets/images/items/gas-mask-ns.jpg';
import Gasoline from '../assets/images/items/gasoline.jpg';
import GlassBottle from '../assets/images/items/glass-bottle.jpg';
import GoalieMask from '../assets/images/items/goalie-mask.jpg';
import HandheldTransceiver from '../assets/images/items/handheld-transceiver.jpg';
import HazmatSuit from '../assets/images/items/hazmat-suit.jpg';
import HollowPointRounds from '../assets/images/items/hollow-point-rounds.jpg';
import InfraredGoggles from '../assets/images/items/infrared-goggles.jpg';
import LaserPointer from '../assets/images/items/laser-pointer.jpg';
import LockpickSet from '../assets/images/items/lockpick-set.jpg';
import Nails from '../assets/images/items/nails.jpg';
import PileOfCash from '../assets/images/items/pile-of-cash.jpg';
import PlentyOfAmmo from '../assets/images/items/plenty-of-ammo.jpg';
import PlentyofAmmoforShotgun from '../assets/images/items/plenty-of-ammo-shotgun.jpg';
import PoliceRiotHelmet from '../assets/images/items/police-riot-helmet.jpg';
import PoliceRiotShield from '../assets/images/items/police-riot-shield.jpg';
import ReinforcedVest from '../assets/images/items/reinforced-vest.jpg';
import RiotShield from '../assets/images/items/riot-shield.jpg';
import Scope from '../assets/images/items/scope.jpg';
import SpareChange from '../assets/images/items/spare-change.jpg';
import Suppressor from '../assets/images/items/suppressor.jpg';
import Timebomb from '../assets/images/items/timebomb.jpg';
import UberShield from '../assets/images/items/uber-shield.jpg';
import Water from '../assets/images/items/water.jpg';

import { ITEMS } from '../constants';

export const ITEMS_S1 = {
  BagofRice: {
    img: BagofRice,
    name: 'Bag of Rice',
    type: ITEMS
  },
  CannedFood: {
    img: CannedFood,
    name: 'Canned Food',
    type: ITEMS
  },
  Flashlight: {
    img: Flashlight,
    name: 'Flashlight',
    type: ITEMS
  },
  Gasoline: {
    combine: ['GlassBottle', 'Molotov'],
    img: Gasoline,
    name: 'Gasoline',
    type: ITEMS
  },
  GlassBottle: {
    combine: ['Gasoline', 'Molotov'],
    img: GlassBottle,
    name: 'Glass Bottle',
    type: ITEMS
  },
  GoalieMask: {
    img: GoalieMask,
    name: 'Goalie Mask',
    type: ITEMS
  },
  PlentyofAmmoforShotgun: {
    img: PlentyofAmmoforShotgun,
    name: 'Plenty of Ammo for Shotgun',
    type: ITEMS
  },
  PlentyOfAmmo: {
    img: PlentyOfAmmo,
    name: 'Plenty Of Ammo',
    type: ITEMS
  },
  Scope: {
    combine: ['Rifle', 'SniperRifle'],
    img: Scope,
    name: 'Scope',
    type: ITEMS
  },
  Water: {
    img: Water,
    name: 'Water',
    type: ITEMS
  }
};

export const ITEMS_TOXIC_MALL = {
  Cookies: {
    img: Cookies,
    name: 'Cookies',
    type: ITEMS
  },
  GasMask: {
    img: GasMask,
    name: 'Gas Mask',
    type: ITEMS
  },
  HollowPointRounds: {
    img: HollowPointRounds,
    name: 'Hollow Point Rounds',
    type: ITEMS
  },
  LaserPointer: {
    img: LaserPointer,
    name: 'Laser Pointer',
    type: ITEMS
  },
  SpareChange: {
    img: SpareChange,
    name: 'Spare Change',
    type: ITEMS
  }
};

export const ITEMS_S2 = {
  Nails: {
    img: Nails,
    name: 'Nails',
    type: ITEMS
  },
  RiotShield: {
    img: RiotShield,
    name: 'Riot Shield',
    type: ITEMS
  }
};

export const ITEMS_ANGRY_NEIGHBORS = {
  UberShield: {
    img: UberShield,
    name: 'Uber Shield',
    type: ITEMS
  }
};

export const ITEMS_NIGHT_SHIFT = {
  Antibiotics: {
    img: Antibiotics,
    name: 'Antibiotics',
    type: ITEMS
  },
  CelticShield: {
    img: CelticShield,
    name: 'Celtic Shield',
    type: ITEMS
  },
  Defibrillator: {
    img: Defibrillator,
    name: 'Defibrillator',
    type: ITEMS
  },
  DisgustingDisguise: {
    img: DisgustingDisguise,
    name: 'Disgusting Disguise',
    type: ITEMS
  },
  EnergyBar: {
    img: EnergyBar,
    name: 'Energy Bar',
    type: ITEMS
  },
  Flashlight: {
    img: FlashlightNS,
    name: 'Flashlight',
    type: ITEMS
  },
  GasMask: {
    img: GasMaskNS,
    name: 'Gas Mask',
    type: ITEMS
  },
  HandheldTransceiver: {
    img: HandheldTransceiver,
    name: 'Handheld Transceiver',
    type: ITEMS
  },
  HazmatSuit: {
    img: HazmatSuit,
    name: 'Hazmat Suit',
    type: ITEMS
  },
  InfraredGoggles: {
    img: InfraredGoggles,
    name: 'Infrared Goggles',
    type: ITEMS
  },
  LaserPointer: {
    img: LaserPointer,
    name: 'Laser Pointer',
    type: ITEMS
  },
  LockpickSet: {
    img: LockpickSet,
    name: 'Lockpick Set',
    type: ITEMS
  },
  PileofCash: {
    img: PileOfCash,
    name: 'Pile of Cash',
    type: ITEMS
  },
  PoliceRiotHelmet: {
    img: PoliceRiotHelmet,
    name: 'Police Riot Helmet',
    type: ITEMS
  },
  PoliceRiotShield: {
    img: PoliceRiotShield,
    name: 'Police Riot Shield',
    type: ITEMS
  },
  ReinforcedVest: {
    img: ReinforcedVest,
    name: 'Reinforced Vest',
    type: ITEMS
  },
  Suppressor: {
    img: Suppressor,
    name: 'Suppressor',
    type: ITEMS
  },
  Timebomb: {
    img: Timebomb,
    name: 'Timebomb',
    type: ITEMS
  }
};

export const ALL_ITEMS = {
  ...ITEMS_S1,
  ...ITEMS_S2,
  ...ITEMS_TOXIC_MALL,
  ...ITEMS_ANGRY_NEIGHBORS,
  ...ITEMS_NIGHT_SHIFT
};

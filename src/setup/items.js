import BagOfRice from '../assets/images/items/bag-of-rice.jpg';
import CannedFood from '../assets/images/items/canned-food.jpg';
import Cookies from '../assets/images/items/cookies.jpg';
import Flashlight from '../assets/images/items/flashlight.jpg';
import GasMask from '../assets/images/items/gas-mask.jpg';
import Gasoline from '../assets/images/items/gasoline.jpg';
import GlassBottle from '../assets/images/items/glass-bottle.jpg';
import GoalieMask from '../assets/images/items/goalie-mask.jpg';
import HandheldTransceiver from '../assets/images/items/handheld-transceiver.jpg';
import HollowPointRounds from '../assets/images/items/hollow-point-rounds.jpg';
import InfraredGoggles from '../assets/images/items/infrared-goggles.jpg';
import LaserPointer from '../assets/images/items/laser-pointer.jpg';
import PlentyOfAmmo from '../assets/images/items/plenty-of-ammo.jpg';
import PlentyOfAmmoShotgun from '../assets/images/items/plenty-of-ammo-shotgun.jpg';
import PoliceRiotHelmet from '../assets/images/items/police-riot-helmet.jpg';
import PoliceRiotShield from '../assets/images/items/police-riot-shield.jpg';
import ReinforcedVest from '../assets/images/items/reinforced-vest.jpg';
import Scope from '../assets/images/items/scope.jpg';
import SpareChange from '../assets/images/items/spare-change.jpg';
import Suppressor from '../assets/images/items/suppressor.jpg';
import Water from '../assets/images/items/water.jpg';
import { ITEMS } from '../constants';

export const ITEMS_S1 = {
  BagOfRice: {
    img: BagOfRice,
    name: 'BagOfRice',
    type: ITEMS
  },
  CannedFood: {
    img: CannedFood,
    name: 'CannedFood',
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
    name: 'GlassBottle',
    type: ITEMS
  },
  GoalieMask: {
    img: GoalieMask,
    name: 'GoalieMask',
    type: ITEMS
  },
  PlentyOfAmmoShotgun: {
    img: PlentyOfAmmoShotgun,
    name: 'PlentyOfAmmoShotgun',
    type: ITEMS
  },
  PlentyOfAmmo: {
    img: PlentyOfAmmo,
    name: 'PlentyOfAmmo',
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
    name: 'GasMask',
    type: ITEMS
  },
  HollowPointRounds: {
    img: HollowPointRounds,
    name: 'Hollow Point Rounds',
    type: ITEMS
  },
  LaserPointer: {
    img: LaserPointer,
    name: 'LaserPointer',
    type: ITEMS
  },
  SpareChange: {
    img: SpareChange,
    name: 'Spare Change',
    type: ITEMS
  }
};

export const ITEMS_NIGHT_SHIFT = {
  GasMask: {
    img: GasMask,
    name: 'GasMask',
    type: ITEMS
  },
  HandheldTransceiver: {
    img: HandheldTransceiver,
    name: 'HandheldTransceiver',
    type: ITEMS
  },
  InfraredGoggles: {
    img: InfraredGoggles,
    name: 'InfraredGoggles',
    type: ITEMS
  },
  LaserPointer: {
    img: LaserPointer,
    name: 'LaserPointer',
    type: ITEMS
  },
  PoliceRiotHelmet: {
    img: PoliceRiotHelmet,
    name: 'PoliceRiotHelmet',
    type: ITEMS
  },
  PoliceRiotShield: {
    img: PoliceRiotShield,
    name: 'PoliceRiotShield',
    type: ITEMS
  },
  ReinforcedVest: {
    img: ReinforcedVest,
    name: 'ReinforcedVest',
    type: ITEMS
  },
  Suppressor: {
    img: Suppressor,
    name: 'Suppressor',
    type: ITEMS
  }
};

export const ALL_ITEMS = {
  ...ITEMS_S1,
  ...ITEMS_TOXIC_MALL,
  ...ITEMS_NIGHT_SHIFT
};

import Season1 from '../assets/images/sets/season1.png';
import DogZ from '../assets/images/sets/dogZ.png';
import Kopinski from '../assets/images/sets/kopinski.png';
import NightShift from '../assets/images/sets/nightShift.png';
import ToxicMall from '../assets/images/sets/toxicMall.png';

import {
  CHARACTERS_KOPINSKI,
  CHARACTERS_NIGHT_SHIFT,
  CHARACTERS_S1,
  CHARACTERS_TOXIC_MALL
} from './characters';
import {
  WEAPONS_S1,
  WEAPONS_S2,
  WEAPONS_S3,
  WEAPONS_NIGHT_SHIFT,
  WEAPONS_TOXIC_MALL,
  WEAPONS_ANGRY_NEIGHBORS,
  WEAPONS_OTHERS
} from './weapons';
import { DOGZ, ZOMBIES_S1 } from './zombies';
import { ITEMS_S1, ITEMS_NIGHT_SHIFT, ITEMS_TOXIC_MALL } from './items';

export const SETS = {
  season1: {
    characters: CHARACTERS_S1,
    cover: Season1,
    defaultSelected: true,
    deselectable: false,
    items: ITEMS_S1,
    label: 'Season 1',
    name: 'season1',
    weapons: WEAPONS_S1,
    zombies: ZOMBIES_S1
  },
  season2: {
    cover: NightShift,
    coverSize: 'small',
    deselectable: false,
    label: 'Season 2: Prison Outbreak',
    name: 'season2',
    weapons: WEAPONS_S2
  },
  season3: {
    characters: CHARACTERS_NIGHT_SHIFT,
    cover: NightShift,
    coverSize: 'small',
    deselectable: false,
    label: 'Season 3: Rue Morgue',
    name: 'season3',
    weapons: WEAPONS_S3
  }
};

export const EXPANSIONS = {
  dogZ: {
    cover: DogZ,
    coverSize: 'medium',
    deselectable: true,
    label: 'DogZ',
    name: 'dogZ',
    zombies: DOGZ
  },
  kopinski: {
    characters: CHARACTERS_KOPINSKI,
    cover: Kopinski,
    coverSize: 'medium',
    deselectable: true,
    label: 'Special Guest: Karl Kopinski',
    name: 'kopinski'
  },
  toxicMall: {
    characters: CHARACTERS_TOXIC_MALL,
    cover: ToxicMall,
    coverSize: 'small',
    deselectable: true,
    items: ITEMS_TOXIC_MALL,
    label: 'Toxic City Mall',
    name: 'toxicCity',
    weapons: WEAPONS_TOXIC_MALL
  },
  nightShift: {
    characters: CHARACTERS_NIGHT_SHIFT,
    cover: NightShift,
    coverSize: 'small',
    deselectable: true,
    items: ITEMS_NIGHT_SHIFT,
    label: 'Night Shift Campaign (beta)',
    name: 'nightShift',
    weapons: WEAPONS_NIGHT_SHIFT
  },
  angryNeighbors: {
    characters: CHARACTERS_NIGHT_SHIFT,
    cover: NightShift,
    coverSize: 'small',
    deselectable: false,
    label: 'Angry Neighbors',
    name: 'angryNeighbors',
    weapons: WEAPONS_ANGRY_NEIGHBORS
  },
  others: {
    characters: CHARACTERS_NIGHT_SHIFT,
    cover: NightShift,
    coverSize: 'small',
    deselectable: false,
    label: 'Kickstarters & Others',
    name: 'others',
    weapons: WEAPONS_OTHERS
  }
};

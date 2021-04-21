import Season1 from '../assets/images/sets/season1.png';
import Season2 from '../assets/images/sets/season2.png';
import Season3 from '../assets/images/sets/season3.png';
import DogZ from '../assets/images/sets/dogZ.png';
import Kopinski from '../assets/images/sets/kopinski.png';
import NightShift from '../assets/images/sets/nightShift.png';
import AngryNeighbors from '../assets/images/sets/angryNeighbors.png';
import ToxicMall from '../assets/images/sets/toxicMall.png';
import Others from '../assets/images/sets/others.png';

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
  WEAPONS_TOXIC_MALL,
  WEAPONS_ANGRY_NEIGHBORS,
  WEAPONS_OTHERS,
  WEAPONS_NIGHT_SHIFT
} from './weapons';
import { DOGZ, ZOMBIES_S1 } from './zombies';
import {
  ITEMS_S1,
  ITEMS_S2,
  ITEMS_TOXIC_MALL,
  ITEMS_ANGRY_NEIGHBORS,
  ITEMS_NIGHT_SHIFT
} from './items';

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
    cover: Season2,
    coverSize: 'small',
    deselectable: false,
    items: ITEMS_S2,
    label: 'Season 2: Prison Outbreak',
    name: 'season2',
    weapons: WEAPONS_S2
  },
  season3: {
    characters: CHARACTERS_NIGHT_SHIFT,
    cover: Season3,
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
    cover: AngryNeighbors,
    coverSize: 'small',
    deselectable: false,
    items: ITEMS_ANGRY_NEIGHBORS,
    label: 'Angry Neighbors',
    name: 'angryNeighbors',
    weapons: WEAPONS_ANGRY_NEIGHBORS
  },
  others: {
    cover: Others,
    coverSize: 'small',
    deselectable: false,
    label: 'Kickstarters & Others',
    name: 'others',
    weapons: WEAPONS_OTHERS
  }
};

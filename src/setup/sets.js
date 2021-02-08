import Season1 from '../assets/images/sets/season1.png';
import DogZ from '../assets/images/sets/dogZ.png';
import Kopinski from '../assets/images/sets/kopinski.png';
import NightShift from '../assets/images/sets/nightShift.png';
import { CHARACTERS_KOPINSKI, CHARACTERS_S1 } from './characters';
import { WEAPONS_S1, WEAPONS_NIGHT_SHIFT } from './weapons';
import { DOGZ, ZOMBIES_S1 } from './zombies';
import { ITEMS_S1, ITEMS_NIGHT_SHIFT } from './items';

export const SETS = {
  season1: {
    characters: CHARACTERS_S1,
    cover: Season1,
    deselectable: false,
    items: ITEMS_S1,
    label: 'Season 1',
    name: 'season1',
    weapons: WEAPONS_S1,
    zombies: ZOMBIES_S1
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
  nightShift: {
    cover: NightShift,
    coverSize: 'small',
    deselectable: true,
    items: ITEMS_NIGHT_SHIFT,
    label: 'Night Shift Campaign (beta)',
    name: 'nightShift',
    weapons: WEAPONS_NIGHT_SHIFT
  }
};

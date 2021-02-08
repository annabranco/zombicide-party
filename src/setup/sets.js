import Season1 from '../assets/images/sets/season1.jpg';
import DogZ from '../assets/images/sets/dogz.jpg';
import Kopinski from '../assets/images/sets/kopinski.jpg';

export const SETS = {
  season1: {
    cover: Season1,
    deselectable: false,
    label: 'Season 1',
    name: 'season1'
  }
};

export const EXPANSIONS = {
  dogZ: {
    cover: DogZ,
    coverSize: 'medium',
    deselectable: true,
    label: 'DogZ',
    name: 'dogZ'
  },
  kopinski: {
    cover: Kopinski,
    coverSize: 'medium',
    deselectable: true,
    label: 'Special Guest: Karl Kopinski',
    name: 'kopinski'
  },
  nightShift: {
    cover: Season1,
    coverSize: 'small',
    deselectable: true,
    label: 'Night Shift Campaign (beta)',
    name: 'nightShift'
  }
};

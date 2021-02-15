import { createContext } from 'react';

export const AppContext = createContext();

export const GAME_RULES = [
  {
    label: 'Mission has cars',
    name: 'cars',
    order: 1,
    selected: false
  },
  {
    label: 'Has objectives tokens',
    name: 'objectives',
    order: 2,
    selected: true
  },
  {
    label: 'Allow editing in-game',
    name: 'editInGame',
    order: 3,
    selected: true
  },
  {
    label: 'Has EXIT area',
    name: 'exit',
    order: 4,
    selected: true
  },
  {
    label: 'Allow new characters in-game',
    name: 'addChars',
    order: 5,
    selected: true
  },
  {
    label: 'Enable Win Game button',
    name: 'winGame',
    order: 6,
    selected: true
  },
  {
    label: 'All characters must live',
    name: 'noDeathesAllowed',
    order: 7,
    selected: false
  },
  {
    label: 'Allow finding combined items',
    name: 'findCombinedItems',
    order: 8,
    selected: false
  },
  {
    label: 'Use time counter',
    name: 'timer',
    order: 9,
    selected: true
  },
  {
    label: 'Enable explosion sound button',
    name: 'explosion',
    order: 10,
    selected: false
  },
  {
    disabled: true,
    label: 'Allow Zombivors',
    name: 'zombivors',
    order: 11,
    selected: false
  },
  {
    disabled: true,
    label: 'Abomination kills with 1 hit',
    name: 'abominationInstantKill',
    order: 12,
    selected: false
  }
];

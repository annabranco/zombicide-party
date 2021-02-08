import { EXPANSIONS, SETS } from './sets';

export const setupGame = rules => {
  let ALL_CHARACTERS = {};
  let ALL_ITEMS = {};
  let ALL_WEAPONS = {};
  let ALL__ZOMBIES = {};

  Object.values(SETS).forEach(set => {
    if (rules[set.name]) {
      if (set.characters) {
        ALL_CHARACTERS = { ...ALL_CHARACTERS, ...set.characters };
      }
      if (set.items) {
        ALL_ITEMS = { ...ALL_ITEMS, ...set.items };
      }
      if (set.weapons) {
        ALL_WEAPONS = { ...ALL_WEAPONS, ...set.weapons };
      }
      if (set.zombies) {
        ALL__ZOMBIES = { ...ALL__ZOMBIES, ...set.zombies };
      }
    }
  });
  Object.values(EXPANSIONS).forEach(expansion => {
    if (rules[expansion.name]) {
      if (expansion.characters) {
        ALL_CHARACTERS = { ...ALL_CHARACTERS, ...expansion.characters };
      }
      if (expansion.items) {
        ALL_ITEMS = { ...ALL_ITEMS, ...expansion.items };
      }
      if (expansion.weapons) {
        ALL_WEAPONS = { ...ALL_WEAPONS, ...expansion.weapons };
      }
      if (expansion.zombies) {
        ALL__ZOMBIES = { ...ALL__ZOMBIES, ...expansion.zombies };
      }
    }
  });
  return {
    characters: Object.entries(ALL_CHARACTERS)
      .sort((a, b) => {
        const nameA = a[0].toUpperCase();
        const nameB = b[0].toUpperCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      })
      .reduce((result, char) => {
        if (typeof result[0] === 'string') {
          return [result[1], char[1]];
        }
        return [...result, char[1]];
      }),
    items: ALL_ITEMS,
    rules,
    weapons: ALL_WEAPONS,
    zombies: ALL__ZOMBIES
  };
};

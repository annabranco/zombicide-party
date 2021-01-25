import { NOISY } from '../constants';
import { ALL_ITEMS } from '../setup/items';
import { SPECIALS_CARDS } from '../setup/specials';
import { ALL_WEAPONS } from '../setup/weapons';

const ALL_CARDS = {
  ...ALL_ITEMS,
  ...SPECIALS_CARDS,
  ...ALL_WEAPONS
};

export const checkIfCharacterCanOpenDoors = currentItems => {
  let openDoor;
  currentItems.forEach(item => {
    if (item) {
      const itemName = item.replace(' ', '');
      if (ALL_WEAPONS[itemName] && ALL_WEAPONS[itemName].canOpenDoor) {
        openDoor = ALL_WEAPONS[itemName].name;
      }
    }
  });
  return openDoor || false;
};

export const getItemPhoto = item => {
  const photoName = item.replace(' ', '');
  if (Object.keys(SPECIALS_CARDS).find(name => photoName === name)) {
    return SPECIALS_CARDS[photoName].img;
  }
  if (Object.keys(ALL_WEAPONS).find(name => photoName === name)) {
    return ALL_WEAPONS[photoName].img;
  }
  if (Object.keys(ALL_ITEMS).find(name => photoName === name)) {
    return ALL_ITEMS[photoName].img;
  }
  return null;
};

export const getItemType = item => {
  if (item) {
    const itemName = item.replace(' ', '');
    if (Object.keys(ALL_CARDS).find(name => itemName === name)) {
      return ALL_CARDS[itemName].type;
    }
  }
  return null;
};

export const checkForNoise = item => {
  if (item) {
    const itemName = item.replace(' ', '');
    if (Object.keys(ALL_CARDS).find(name => itemName === name)) {
      return ALL_CARDS[itemName].noise;
    }
  }
  return null;
};

export const checkForNoiseOpeningDoor = item => {
  if (item) {
    const itemName = item.replace(' ', '');
    if (Object.keys(ALL_CARDS).find(name => itemName === name)) {
      return ALL_CARDS[itemName].canOpenDoor === NOISY;
    }
  }
  return null;
};

export const checkIfCharacterHasFlashlight = items => {
  if (items.find(name => name === 'Flashlight')) {
    return true;
  }
  return false;
};

export const checkIfItemCanBeCombined = item => {
  if (item) {
    const itemName = item.replace(' ', '');
    if (Object.keys(ALL_CARDS).find(name => itemName === name)) {
      return !!ALL_CARDS[itemName].combine;
    }
  }
  return null;
};

export const checkIfCharCanCombineItems = items => {
  const itemsThatCanBeCombined = [];
  items.forEach(item => {
    if (item) {
      const itemName = item.replace(' ', '');
      if (checkIfItemCanBeCombined(itemName)) {
        const pairItem = ALL_CARDS[itemName].combine[0];
        if (items.includes(pairItem)) {
          itemsThatCanBeCombined.push(itemName);
          return true;
        }
      }
    }
    return false;
  });
  if (itemsThatCanBeCombined.length > 0) {
    return itemsThatCanBeCombined;
  }
  return false;
};

export const checkIfAllSlotsAreEmpty = items => items.every(item => !item);

export const getCombiningReference = ([item, firstSlot]) => {
  if (item) {
    const itemName = item.replace(' ', '');
    return {
      item: itemName,
      firstSlot,
      pair: ALL_CARDS[itemName].combine[0],
      finalItem: ALL_CARDS[itemName].combine[1]
    };
  }
  return null;
};

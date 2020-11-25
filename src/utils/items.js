import { WEAPONS_S1 } from '../setup/weapons';
import { ITEMS_S1 } from '../setup/items';

export const characterCanOpenDoors = currentItems => {
  let openDoor;
  currentItems.forEach(item => {
    if (WEAPONS_S1[item] && WEAPONS_S1[item].canOpenDoor) {
      openDoor = WEAPONS_S1[item].name;
    }
  });
  return openDoor;
};

export const getItemPhoto = item => {
  if (Object.keys(WEAPONS_S1).find(name => item === name)) {
    return WEAPONS_S1[item].img;
  }
  if (Object.keys(ITEMS_S1).find(name => item === name)) {
    return ITEMS_S1[item].img;
  }
  return null;
};

export const getItemType = item => {
  if (Object.keys(WEAPONS_S1).find(name => item === name)) {
    return 'weapons';
  }
  if (Object.keys(ITEMS_S1).find(name => item === name)) {
    return 'items';
  }
  return null;
};

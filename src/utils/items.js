import { ITEMS_S1 } from '../setup/items';
import { SPECIALS_CARDS } from '../setup/specials';
import { WEAPONS_S1 } from '../setup/weapons';

const ALL_ITEMS = {
  ...ITEMS_S1,
  ...SPECIALS_CARDS,
  ...WEAPONS_S1
};

export const characterCanOpenDoors = currentItems => {
  console.log('$$$ currentItems', currentItems);
  let openDoor;
  currentItems.forEach(item => {
    if (WEAPONS_S1[item] && WEAPONS_S1[item].canOpenDoor) {
      openDoor = WEAPONS_S1[item].name;
    }
  });
  return openDoor;
};

export const getItemPhoto = item => {
  if (Object.keys(SPECIALS_CARDS).find(name => item === name)) {
    return SPECIALS_CARDS[item].img;
  }
  if (Object.keys(WEAPONS_S1).find(name => item === name)) {
    return WEAPONS_S1[item].img;
  }
  if (Object.keys(ITEMS_S1).find(name => item === name)) {
    return ITEMS_S1[item].img;
  }
  return null;
};

export const getItemType = item => {
  if (Object.keys(ALL_ITEMS).find(name => item === name)) {
    return ALL_ITEMS[item].type;
  }
  return null;
};

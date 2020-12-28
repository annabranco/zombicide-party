import { cloneDeep } from 'lodash';
import { ABILITIES_S1 } from '../setup/abilities';

const { ACTION, MOVE_ACTION, SEARCH_ACTION } = ABILITIES_S1;

export const handlePromotionEffects = (char, level, actionsLeft) => {
  const updatedChar = cloneDeep(char);
  updatedChar.actionsLeft = [...actionsLeft];

  if (level === 'blue') {
    if (
      char.promotions.blue.name === ACTION.name ||
      char.promotions.blue.name === MOVE_ACTION.name ||
      char.promotions.blue.name === SEARCH_ACTION.name
    ) {
      updatedChar.actions = char.promotions.blue.effect(char.actions);
      updatedChar.actionsLeft = char.promotions.blue.effect(
        actionsLeft || char.actions
      );
    }
  } else if (level === 'yellow') {
    if (
      char.promotions.yellow.name === ACTION.name ||
      char.promotions.yellow.name === MOVE_ACTION.name ||
      char.promotions.yellow.name === SEARCH_ACTION.name
    ) {
      updatedChar.actions = char.promotions.yellow.effect(char.actions);
      updatedChar.actionsLeft = char.promotions.yellow.effect(
        actionsLeft || char.actions
      );
    }
  }
  console.log('$$$ actionsLeft UTILS', actionsLeft);
  console.log('$$$ updatedChar UTILS', updatedChar);
  console.log('$$$ updatedChar UTILS', cloneDeep(updatedChar));

  return updatedChar;
};

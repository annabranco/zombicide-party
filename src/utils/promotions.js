import { cloneDeep } from 'lodash';
import { ABILITIES_S1 } from '../setup/abilities';

const { ACTION, MOVE_ACTION, SEARCH_ACTION, COMBAT_ACTION } = ABILITIES_S1;

export const handlePromotionEffects = (char, level, actionsLeft, index) => {
  const updatedChar = cloneDeep(char);

  updatedChar.actionsLeft = [...actionsLeft];

  if (level === 'blue') {
    if (
      (updatedChar.promotions.blue.name === ACTION.name ||
        updatedChar.promotions.blue.name === MOVE_ACTION.name ||
        updatedChar.promotions.blue.name === SEARCH_ACTION.name ||
        updatedChar.promotions.blue.name === COMBAT_ACTION.name) &&
      updatedChar.promotions.blue.effect
    ) {
      updatedChar.actions = updatedChar.promotions.blue.effect(
        updatedChar.actions
      );
      updatedChar.actionsLeft = updatedChar.promotions.blue.effect(
        actionsLeft || updatedChar.actions
      );
    }
    updatedChar.abilities.push(updatedChar.promotions.blue.name);
  } else if (level === 'yellow') {
    if (
      (updatedChar.promotions.yellow.name === ACTION.name ||
        updatedChar.promotions.yellow.name === MOVE_ACTION.name ||
        updatedChar.promotions.yellow.name === SEARCH_ACTION.name ||
        updatedChar.promotions.blue.name === COMBAT_ACTION.name) &&
      updatedChar.promotions.yellow.effect
    ) {
      updatedChar.actions = updatedChar.promotions.yellow.effect(
        updatedChar.actions
      );
      updatedChar.actionsLeft = updatedChar.promotions.yellow.effect(
        actionsLeft || updatedChar.actions
      );
    }
    updatedChar.abilities.push(char.promotions.yellow.name);
  } else if (level === 'orange') {
    if (
      (updatedChar.promotions.orange[index].name === ACTION.name ||
        updatedChar.promotions.orange[index].name === MOVE_ACTION.name ||
        updatedChar.promotions.orange[index].name === SEARCH_ACTION.name ||
        updatedChar.promotions.orange[index].name === COMBAT_ACTION.name) &&
      updatedChar.promotions.orange[index].effect
    ) {
      updatedChar.actions = updatedChar.promotions.orange[index].effect(
        updatedChar.actions
      );
      updatedChar.actionsLeft = updatedChar.promotions.orange[index].effect(
        actionsLeft || updatedChar.actions
      );
    }
    updatedChar.abilities.push(char.promotions.orange[index].name);
  } else {
    if (
      (updatedChar.promotions.red[index].name === ACTION.name ||
        updatedChar.promotions.red[index].name === MOVE_ACTION.name ||
        updatedChar.promotions.red[index].name === SEARCH_ACTION.name ||
        updatedChar.promotions.red[index].name === COMBAT_ACTION.name) &&
      updatedChar.promotions.red[index].effect
    ) {
      updatedChar.actions = updatedChar.promotions.red[index].effect(
        updatedChar.actions
      );
      updatedChar.actionsLeft = updatedChar.promotions.red[index].effect(
        actionsLeft || updatedChar.actions
      );
    }
    updatedChar.abilities.push(char.promotions.red[index].name);
  }

  return updatedChar;
};

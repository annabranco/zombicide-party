import { cloneDeep } from 'lodash';
import { ABILITIES_S1 } from '../setup/abilities';

const {
  ACTION,
  MOVE_ACTION,
  SEARCH_ACTION,
  COMBAT_ACTION,
  DIE_COMBAT,
  DIE_MELEE,
  DIE_RANGED,
  STARTS_WITH,
  MATCHING_SET,
  MEDIC,
  HOARD
} = ABILITIES_S1;

export const handlePromotionEffects = (char, level, actionsLeft, index) => {
  const updatedChar = cloneDeep(char);
  console.log('$$$ STARTING PROMO', char.name);
  updatedChar.actionsLeft = [...actionsLeft];

  if (level === 'blue') {
    console.log('$$$ blue promo', char, level, index);
    console.log(
      '$$$ updatedChar.promotions.blue.name',
      updatedChar.promotions.blue.name
    );
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
    } else if (
      (updatedChar.promotions.blue.name === DIE_COMBAT.name ||
        updatedChar.promotions.blue.name === DIE_MELEE.name ||
        updatedChar.promotions.blue.name === DIE_RANGED.name) &&
      updatedChar.promotions.blue.effect
    ) {
      updatedChar.bonusDices = updatedChar.promotions.red[index].effect(
        updatedChar.bonusDices
      );
    } else if (
      updatedChar.promotions.blue.name.includes(
        STARTS_WITH().name.substring(0, 12)
      )
    ) {
      updatedChar.inHand[1] = updatedChar.promotions.blue.effect();
    } else if (updatedChar.promotions.blue.name.includes(HOARD.name)) {
      console.log('$$$ updatedChar.inReserve ', updatedChar.inReserve);
      updatedChar.inReserve = updatedChar.promotions.blue.effect(
        updatedChar.inReserve
      );
      console.log(
        '$$$ updatedChar.promotions.blue.effect(',
        updatedChar.inReserve
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
    } else if (
      (updatedChar.promotions.yellow.name === DIE_COMBAT.name ||
        updatedChar.promotions.yellow.name === DIE_MELEE.name ||
        updatedChar.promotions.yellow.name === DIE_RANGED.name) &&
      updatedChar.promotions.yellow.effect
    ) {
      updatedChar.bonusDices = updatedChar.promotions.red[index].effect(
        updatedChar.bonusDices
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
    } else if (
      (updatedChar.promotions.orange[index].name === DIE_COMBAT.name ||
        updatedChar.promotions.orange[index].name === DIE_MELEE.name ||
        updatedChar.promotions.orange[index].name === DIE_RANGED.name) &&
      updatedChar.promotions.orange[index].effect
    ) {
      updatedChar.bonusDices = updatedChar.promotions.orange[index].effect(
        updatedChar.bonusDices
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
    } else if (
      (updatedChar.promotions.red[index].name === DIE_COMBAT.name ||
        updatedChar.promotions.red[index].name === DIE_MELEE.name ||
        updatedChar.promotions.red[index].name === DIE_RANGED.name) &&
      updatedChar.promotions.red[index].effect
    ) {
      updatedChar.bonusDices = updatedChar.promotions.red[index].effect(
        updatedChar.bonusDices
      );
    }
    updatedChar.abilities.push(char.promotions.red[index].name);
  }
  console.log('$$$ updatedChar', char.name, updatedChar);
  return updatedChar;
};

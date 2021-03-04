import { cloneDeep } from 'lodash';
import { ALL_ABILITIES } from '../setup/abilities';

const {
  ACTION,
  ACTION_MELEE,
  ACTION_RANGED,
  MOVE_ACTION,
  SEARCH_ACTION,
  COMBAT_ACTION,
  DIE_COMBAT,
  DIE_MELEE,
  DIE_RANGED,
  STARTS_WITH,
  HOARD,
  REAPER_COMBAT,
  REAPER_MELEE,
  REAPER_RANGED
} = ALL_ABILITIES;

export const handlePromotionEffects = (char, level, actionsLeft, index) => {
  const updatedChar = cloneDeep(char);
  updatedChar.actionsLeft = [...actionsLeft];

  if (level === 'blue') {
    if (
      (updatedChar.promotions.blue.name === ACTION.name ||
        updatedChar.promotions.blue.name === MOVE_ACTION.name ||
        updatedChar.promotions.blue.name === SEARCH_ACTION.name ||
        updatedChar.promotions.blue.name === COMBAT_ACTION.name ||
        updatedChar.promotions.blue.name === ACTION_MELEE.name ||
        updatedChar.promotions.blue.name === ACTION_RANGED.name) &&
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
        updatedChar.promotions.blue.name === DIE_RANGED.name ||
        updatedChar.promotions.blue.name === REAPER_COMBAT.name ||
        updatedChar.promotions.blue.name === REAPER_MELEE.name ||
        updatedChar.promotions.blue.name === REAPER_RANGED.name) &&
      updatedChar.promotions.blue.effect
    ) {
      updatedChar.bonusDice = updatedChar.promotions.blue.effect(
        updatedChar.bonusDice
      );
    } else if (
      updatedChar.promotions.blue.name.includes(
        STARTS_WITH().name.substring(0, 12)
      )
    ) {
      updatedChar.inHand[1] = updatedChar.promotions.blue.effect();
    } else if (updatedChar.promotions.blue.name.includes(HOARD.name)) {
      updatedChar.inReserve = updatedChar.promotions.blue.effect(
        updatedChar.inReserve
      );
    }
    updatedChar.abilities.push(updatedChar.promotions.blue.name);
  } else if (level === 'yellow') {
    if (
      (updatedChar.promotions.yellow.name === ACTION.name ||
        updatedChar.promotions.yellow.name === MOVE_ACTION.name ||
        updatedChar.promotions.yellow.name === SEARCH_ACTION.name ||
        updatedChar.promotions.yellow.name === COMBAT_ACTION.name ||
        updatedChar.promotions.yellow.name === ACTION_MELEE.name ||
        updatedChar.promotions.yellow.name === ACTION_RANGED.name) &&
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
        updatedChar.promotions.yellow.name === DIE_RANGED.name ||
        updatedChar.promotions.yellow.name === REAPER_COMBAT.name ||
        updatedChar.promotions.yellow.name === REAPER_MELEE.name ||
        updatedChar.promotions.yellow.name === REAPER_RANGED.name) &&
      updatedChar.promotions.yellow.effect
    ) {
      updatedChar.bonusDice = updatedChar.promotions.yellow.effect(
        updatedChar.bonusDice
      );
    } else if (updatedChar.promotions.yellow.name.includes(HOARD.name)) {
      updatedChar.inReserve = updatedChar.promotions.yellow.effect(
        updatedChar.inReserve
      );
    }
    updatedChar.abilities.push(char.promotions.yellow.name);
  } else if (level === 'orange') {
    if (
      (updatedChar.promotions.orange[index].name === ACTION.name ||
        updatedChar.promotions.orange[index].name === MOVE_ACTION.name ||
        updatedChar.promotions.orange[index].name === SEARCH_ACTION.name ||
        updatedChar.promotions.orange[index].name === COMBAT_ACTION.name ||
        updatedChar.promotions.orange[index].name === ACTION_MELEE.name ||
        updatedChar.promotions.orange[index].name === ACTION_RANGED.name) &&
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
        updatedChar.promotions.orange[index].name === DIE_RANGED.name ||
        updatedChar.promotions.orange[index].name === REAPER_COMBAT.name ||
        updatedChar.promotions.orange[index].name === REAPER_MELEE.name ||
        updatedChar.promotions.orange[index].name === REAPER_RANGED.name) &&
      updatedChar.promotions.orange[index].effect
    ) {
      updatedChar.bonusDice = updatedChar.promotions.orange[index].effect(
        updatedChar.bonusDice
      );
    } else if (updatedChar.promotions.orange[index].name.includes(HOARD.name)) {
      updatedChar.inReserve = updatedChar.promotions.orange[index].effect(
        updatedChar.inReserve
      );
    }
    updatedChar.abilities.push(char.promotions.orange[index].name);
  } else {
    if (
      (updatedChar.promotions.red[index].name === ACTION.name ||
        updatedChar.promotions.red[index].name === MOVE_ACTION.name ||
        updatedChar.promotions.red[index].name === SEARCH_ACTION.name ||
        updatedChar.promotions.red[index].name === COMBAT_ACTION.name ||
        updatedChar.promotions.red[index].name === ACTION_MELEE.name ||
        updatedChar.promotions.red[index].name === ACTION_RANGED.name) &&
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
        updatedChar.promotions.red[index].name === DIE_RANGED.name ||
        updatedChar.promotions.red[index].name === REAPER_COMBAT.name ||
        updatedChar.promotions.red[index].name === REAPER_MELEE.name ||
        updatedChar.promotions.red[index].name === REAPER_RANGED.name) &&
      updatedChar.promotions.red[index].effect
    ) {
      updatedChar.bonusDice = updatedChar.promotions.red[index].effect(
        updatedChar.bonusDice
      );
    } else if (updatedChar.promotions.red[index].name.includes(HOARD.name)) {
      updatedChar.inReserve = updatedChar.promotions.red[index].effect(
        updatedChar.inReserve
      );
    }
    updatedChar.abilities.push(char.promotions.red[index].name);
  }
  return updatedChar;
};

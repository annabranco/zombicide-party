import {
  BONUS_ACTION,
  FREE_ATTACK,
  FREE_ATTACK_MELEE,
  FREE_ATTACK_RANGED,
  FREE_MOVE,
  FREE_SEARCH
} from '../constants';

export const getActionColor = action => {
  switch (action) {
    case FREE_MOVE:
      return '#33cc33';
    case FREE_ATTACK:
    case FREE_ATTACK_MELEE:
    case FREE_ATTACK_RANGED:
      return '#ff0000';
    case FREE_SEARCH:
      return '#ffa100';
    case BONUS_ACTION:
      return '#cf87ff';
    default:
      return '#00a9ff';
  }
};

export const totalActions = actionsArray => {
  return actionsArray.reduce((a, b) => a + b);
};

export const checkIfHasAnyActionLeft = actionsArray =>
  actionsArray &&
  actionsArray.reduce((a, b, index) => {
    if (index === 4) {
      return a;
    }
    if (index === 2) {
      return a + totalActions(b);
    }
    return a + (typeof b === 'number' ? Math.max(0, b) : Number(!!b));
  }, 0);

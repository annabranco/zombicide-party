import { FREE_ATTACK, FREE_MOVE, FREE_SEARCH } from '../constants';

export const getActionColor = action => {
  switch (action) {
    case FREE_MOVE:
      return '#33cc33';
    case FREE_ATTACK:
      return '#ff0000';
    case FREE_SEARCH:
      return '#ffa100';
    default:
      return '#00a9ff';
  }
};

export const checkIfHasAnyActionLeft = actionsArray =>
  actionsArray.reduce(
    (a, b) => a + (typeof b === 'number' ? Math.max(0, b) : Number(!!b)),
    0
  );

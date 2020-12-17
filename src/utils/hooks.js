import { useState, useDebugValue, useEffect } from 'react';
import { checkIfHasAnyActionLeft } from './actions';

export const useStateWithLabel = (initialValue, displayName) => {
  const [value, setValue] = useState(initialValue);

  useDebugValue(displayName);
  return [value, setValue];
};

export const useTurnsCounter = ([
  numOfActions,
  movements,
  attacks,
  searches
]) => {
  const [extraMovementActions, setExtraMovementActions] = useState(movements);
  const [extraAttackActions, setExtraAttackActions] = useState(attacks);
  const [searchActions, setSearchActions] = useState(searches);
  const [generalActions, setGeneralActions] = useState(numOfActions);
  const [finishedTurn, finishTurn] = useState(false);
  const [message, changeMessage] = useState('');

  const hasUsedAllActions = ({
    act = generalActions,
    mov = extraMovementActions,
    att = extraAttackActions,
    sea = searchActions
  } = {}) => {
    if (act === 0 && searchActions === 0) {
      setSearchActions(searchActions - 1);
    }
    if (!act && !mov && !att && sea <= 0) {
      changeMessage('Used all actions.');
      setSearchActions(searchActions - 1);
      finishTurn(true);
      return true;
    }
    return false;
  };

  const spendAction = (type = 'general') => {
    if (type === 'move' && extraMovementActions > 0) {
      changeMessage(`Used 1 extra move of ${extraMovementActions}.`);
      setExtraMovementActions(extraMovementActions - 1);
      return hasUsedAllActions({ mov: extraMovementActions - 1 });
    }

    if (type === 'attack' && extraAttackActions > 0) {
      changeMessage(`Uses 1 extra attack of ${extraAttackActions}.`);
      setExtraAttackActions(extraAttackActions - 1);
      return hasUsedAllActions({ att: extraAttackActions - 1 });
    }

    if (type === 'search') {
      if (searchActions < 0) {
        changeMessage(`No ${type} actions left.`);
        return null;
      }

      if (searchActions > 0) {
        changeMessage('Uses 1 free search.');
        setSearchActions(-1);
        return hasUsedAllActions({ sea: searchActions - 1 });
      }
    }

    if (generalActions > 0) {
      changeMessage(
        `Used 1 general action to ${type}: ${generalActions - 1} left.`
      );
      setGeneralActions(generalActions - 1);
      return hasUsedAllActions({ act: generalActions - 1 });
    }
    changeMessage(`No ${type} actions left.`);
    return null;
  };

  useEffect(() => {
    setGeneralActions(numOfActions);
    setExtraMovementActions(movements);
    setExtraAttackActions(attacks);
    setSearchActions(searches);
    finishTurn(
      !checkIfHasAnyActionLeft([numOfActions, movements, attacks, searches])
    );
    changeMessage('');
  }, [attacks, movements, numOfActions, searches]);

  return {
    generalActions,
    extraMovementActions,
    extraAttackActions,
    searchActions,
    spendAction,
    finishedTurn,
    canMove: generalActions > 0 || extraMovementActions > 0,
    canAttack: generalActions > 0 || extraAttackActions > 0,
    canSearch: (generalActions > 0 && searchActions >= 0) || searchActions > 0,
    message
  };
};

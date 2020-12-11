import { useState, useDebugValue, useEffect } from 'react';

export const useStateWithLabel = (initialValue, displayName) => {
  const [value, setValue] = useState(initialValue);

  useDebugValue(displayName);
  return [value, setValue];
};

export const useTurnsCounter = ([
  numOfActions = 3,
  movements = 0,
  attacks = 0,
  searches = 0
]) => {
  const [extraMovementActions, setExtraMovementActions] = useState(movements);
  const [extraAttackActions, setExtraAttackActions] = useState(attacks);
  const [searchActions, setSearchActions] = useState(searches);
  const [generalActions, setGeneralActions] = useState(numOfActions);
  const [finishedTurn, finishTurn] = useState(false);
  const [message, changeMessage] = useState('');

  const checkIfStillCanPlay = ({
    act = generalActions,
    mov = extraMovementActions,
    att = extraAttackActions,
    sea = searchActions
  }) => {
    if (!act && !mov && !att && sea <= 0) {
      changeMessage('Used all actions.');
      finishTurn(true);
      return false;
    }
    return true;
  };

  const spendAction = (type = 'general') => {
    if (type === 'move' && extraMovementActions > 0) {
      changeMessage(`Used 1 extra move of ${extraMovementActions}.`);
      setExtraMovementActions(extraMovementActions - 1);
      return checkIfStillCanPlay({ mov: extraMovementActions - 1 });
    }

    if (type === 'attack' && extraAttackActions > 0) {
      changeMessage(`Uses 1 extra attack of ${extraAttackActions}.`);
      setExtraAttackActions(extraAttackActions - 1);
      return checkIfStillCanPlay({ att: extraAttackActions - 1 });
    }

    if (type === 'search') {
      if (searchActions < 0) {
        changeMessage(`No ${type} actions left.`);
        return null;
      }
      setSearchActions(searchActions - 1);

      if (searchActions > 0) {
        changeMessage('Uses 1 free search.');
        return checkIfStillCanPlay({ sea: searchActions - 1 });
      }
    }

    if (generalActions > 0) {
      changeMessage(
        `Used 1 general action to ${type}: ${generalActions - 1} left.`
      );
      setGeneralActions(generalActions - 1);
      return checkIfStillCanPlay({ act: generalActions - 1 });
    }
    changeMessage(`No ${type} actions left.`);
    return null;
  };

  useEffect(() => {
    setGeneralActions(numOfActions || 3);
    setExtraMovementActions(movements || 0);
    setExtraAttackActions(attacks || 0);
    setSearchActions(searches || 0);
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
    canSearch: generalActions > 0 && searchActions >= 0,
    message
  };
};

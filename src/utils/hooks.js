import { useState, useDebugValue, useEffect } from 'react';
import { checkIfHasAnyActionLeft, totalActions } from './actions';
import { logger } from './logger';
import {
  ATTACK,
  ATTACK_MELEE,
  ATTACK_RANGED,
  GENERAL,
  LOG_TYPE_EXTENDED,
  MOVE,
  SEARCH,
  TURNS_HOOK_UPDATED
} from '../constants';

export const useStateWithLabel = (initialValue, displayName) => {
  const [value, setValue] = useState(initialValue);

  useDebugValue(displayName);
  return [value, setValue];
};

export const useTurnsCounter = (
  character,
  [
    numOfActions = 3,
    movements = 0,
    attacks = [0, 0, 0],
    searches = 0,
    numOfBonusActions = 0
  ]
) => {
  const [extraMovementActions, setExtraMovementActions] = useState(movements);
  const [extraAttackActions, setExtraAttackActions] = useState(attacks);
  const [searchActions, setSearchActions] = useState(searches);
  const [generalActions, setGeneralActions] = useState(numOfActions);
  const [bonusActions, setBonusActions] = useState(numOfBonusActions);
  const [finishedTurn, finishTurn] = useState(false);
  const [message, changeMessage] = useState('');

  const hasUsedAllActions = ({
    act = generalActions,
    mov = extraMovementActions,
    att = extraAttackActions,
    sea = searchActions,
    bon = bonusActions
  } = {}) => {
    // if (act === 0 && searchActions === 0) {
    //   setSearchActions(searchActions - 1);
    // }
    if (!act && !mov && !totalActions(att) && sea <= 0 && !bon) {
      changeMessage(`${character} used all actions.`);
      setSearchActions(searchActions - 1);
      finishTurn(true);
      return true;
    }
    return false;
  };
  const spendAction = (type = GENERAL) => {
    if (bonusActions) {
      changeMessage(`${character} used 1 bonus action to ${type}.`);
      setBonusActions(bonusActions - 1);
      if (type === 'search') {
        setSearchActions(-1);
      }
      return hasUsedAllActions({ bon: bonusActions - 1 });
    }
    if (type === MOVE && extraMovementActions > 0) {
      changeMessage(
        `${character} used 1 extra move of ${extraMovementActions}.`
      );
      setExtraMovementActions(extraMovementActions - 1);
      return hasUsedAllActions({ mov: extraMovementActions - 1 });
    }

    if (type.includes(ATTACK) && totalActions(extraAttackActions) > 0) {
      let bonusAttackUsed = false;
      if (type === ATTACK_MELEE && extraAttackActions[1] > 0) {
        changeMessage(
          `${character} used 1 extra melee attack of ${extraAttackActions[1]}.`
        );
        extraAttackActions[1] -= 1;
        bonusAttackUsed = true;
      } else if (type === ATTACK_RANGED && extraAttackActions[2] > 0) {
        changeMessage(
          `${character} used 1 extra ranged attack of ${extraAttackActions[2]}.`
        );
        extraAttackActions[2] -= 1;
        bonusAttackUsed = true;
      } else if (extraAttackActions[0] > 0) {
        changeMessage(
          `${character} used 1 extra attack of ${extraAttackActions[0]}.`
        );
        extraAttackActions[0] -= 1;
        bonusAttackUsed = true;
      }
      if (bonusAttackUsed) {
        setExtraAttackActions(extraAttackActions);
        return hasUsedAllActions({ att: extraAttackActions });
      }
    }

    if (type === SEARCH) {
      if (searchActions < 0) {
        changeMessage(`${character} has no ${type} actions left.`);
        return null;
      }

      if (searchActions > 0) {
        changeMessage(`${character} used 1 free search.`);
        setSearchActions(-1);
        return hasUsedAllActions({ sea: searchActions - 1 });
      }
    }

    if (generalActions > 0) {
      changeMessage(
        `${character} used 1 general action to ${type}: ${
          generalActions - 1
        } left.`
      );
      setGeneralActions(generalActions - 1);
      if (type === SEARCH) {
        setSearchActions(-1);
        return hasUsedAllActions({ act: generalActions - 1 });
      }
      return hasUsedAllActions({
        act: generalActions - 1
      });
    }
    changeMessage(`${character} has no ${type} actions left.`);
    return null;
  };

  useEffect(() => {
    if (character) {
      setGeneralActions(numOfActions);
      setExtraMovementActions(movements);
      setExtraAttackActions(attacks);
      setSearchActions(searches);
      setBonusActions(numOfBonusActions);
      finishTurn(
        !checkIfHasAnyActionLeft([
          numOfActions,
          movements,
          attacks,
          searches,
          numOfBonusActions
        ])
      );
      changeMessage('');
    }
  }, [
    attacks[0],
    attacks[1],
    attacks[2],
    character,
    movements,
    numOfActions,
    searches,
    numOfBonusActions
  ]);

  useEffect(() => {
    if (character) {
      logger(
        LOG_TYPE_EXTENDED,
        TURNS_HOOK_UPDATED,
        `${character}, { gen: ${numOfActions} => ${generalActions}, mov: ${movements} => ${extraMovementActions}, att: ${attacks} => ${extraAttackActions}, sea: ${searches} => ${searchActions}, bon: ${numOfBonusActions} => ${bonusActions} }`
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    generalActions,
    extraMovementActions,
    extraAttackActions,
    searchActions,
    bonusActions
  ]);

  return {
    generalActions,
    extraMovementActions,
    extraAttackActions,
    searchActions,
    bonusActions,
    spendAction,
    finishedTurn,
    canMove: generalActions > 0 || extraMovementActions > 0,
    canAttack: generalActions > 0 || totalActions(extraAttackActions) > 0,
    canSearch: (generalActions > 0 && searchActions >= 0) || searchActions > 0,
    message
  };
};

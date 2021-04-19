import React, { useEffect, useRef } from 'react';
import { bool, func, number, string, oneOfType, arrayOf } from 'prop-types';
import { ALL_WEAPONS } from '../../../../setup/weapons';
import {
  getItemPhoto,
  getItemType,
  logger,
  useStateWithLabel
} from '../../../../utils';
import ActionButton from '../../ActionButton';
import SoundBlock from '../../SoundBlock';
import ZombieFace from '../../../../assets/images/zombieFace.png';
import {
  DROP,
  IN_HAND,
  ITEM_IN_RESERVE,
  ITEM_IN_HAND,
  MELEE,
  MELEE_RANGED,
  MOBILE,
  NONE,
  RANGED,
  RELOAD,
  RELOAD_ACTION,
  SEARCH_ACTION,
  SPECIAL,
  WEAPONS,
  LOG_TYPE_EXTENDED,
  SLOT_SELECTED,
  BURNEM_ALL
} from '../../../../constants';
import { BonusDiceType } from '../../../../interfaces/types';
import { AppButton } from '../../../Sections/PlayersSection/styles';
import {
  ActionButtonIcon,
  ActionButtonsWrapper,
  Item,
  ItemBlank,
  ItemWrapper,
  KillButton,
  KillButtonIcon,
  KillButtonsWrapper
} from './styles';

const ItemsArea = ({
  activateDualEffect,
  allSlotsAreEmpty,
  bonusDice,
  canAttack,
  canBeDeflected,
  canCombine,
  canSearch,
  causeDamage,
  charCanDeflect,
  charName,
  charVoice,
  combineItemSelected,
  combinePair,
  damageMode,
  device,
  dice,
  dropMode,
  dualWeaponEffect,
  forcedKillButtons,
  gainCustomXp,
  gainXp,
  index,
  item,
  itemSelected,
  makeNoise,
  numItems,
  onClickCombine,
  onClickDrop,
  round,
  secondarySound,
  selectSlot,
  setupMode,
  slotType,
  spendAction,
  spendSingleUseWeapon,
  trade,
  tradeItem,
  wounded
}) => {
  const [displaySplash, toggleDisplaySplash] = useStateWithLabel(
    false,
    'displaySplash'
  );
  const [isActive, toggleActive] = useStateWithLabel(false, 'isActive');
  const [killButtons, changeKillButtons] = useStateWithLabel([], 'killButtons');
  const [needReload, toggleNeedReload] = useStateWithLabel(false, 'needReload');
  const [firedDual, toggleFiredDual] = useStateWithLabel(false, 'firedDual');

  const killButtonsTimer = useRef();
  const dualTimer = useRef();

  const itemsType = getItemType(item);

  const activateKillButtons = () => {
    spendSingleUseWeapon(index, item);
    if (ALL_WEAPONS[item].dice === SPECIAL) {
      gainCustomXp(BURNEM_ALL);
    } else {
      const totalDice = calculateTotalDice();
      const currentPool = killButtons.length;
      const newArray = [...Array(totalDice).keys()].map(
        value => value + currentPool
      );

      toggleFiredDual(true);

      if (dualWeaponEffect) {
        activateDualEffect(totalDice);
      }

      clearTimeout(killButtonsTimer.current);
      changeKillButtons([...killButtons, ...newArray]);

      dualTimer.current = setTimeout(() => {
        toggleFiredDual();
      }, 2000);
      killButtonsTimer.current = setTimeout(() => {
        changeKillButtons([]);
      }, 10000);
    }
  };

  const calculateTotalDice = () => {
    const { combat, melee, ranged } = bonusDice;
    let totalDice;

    totalDice = dice + combat;

    if (ALL_WEAPONS[item].attack === MELEE) {
      totalDice += melee;
    } else if (ALL_WEAPONS[item].attack === RANGED) {
      totalDice += ranged;
    } else if (ALL_WEAPONS[item].attack === MELEE_RANGED) {
      totalDice = totalDice + ranged + melee;
    }
    return totalDice;
  };
  const checkIfReloadIsNeeded = () =>
    ALL_WEAPONS[item] && ALL_WEAPONS[item].needsReloading;

  const forceActivateKillButtons = fkbuttons => {
    if (!firedDual) {
      const currentPool = killButtons.length;
      const newArray = [...Array(fkbuttons).keys()].map(
        value => value + currentPool
      );

      clearTimeout(killButtonsTimer.current);
      changeKillButtons([...killButtons, ...newArray]);
      killButtonsTimer.current = setTimeout(() => {
        changeKillButtons([]);
      }, 10000);
    }
  };

  const getSlotNumber = itemIndex => {
    const adj = slotType === IN_HAND ? 1 : 3;
    return itemIndex + adj;
  };

  const onClickCard = () => {
    const slot = getSlotNumber(index);
    if (damageMode) {
      causeDamage(slot);
    } else if (trade) {
      if (itemSelected) {
        tradeItem({ item: null, slot, charTrading: charName });
      } else {
        tradeItem({ item, slot, charTrading: charName });
      }
    } else {
      onClickChange();
    }
  };

  const onClickChange = () => {
    toggleActive(false);
    logger(
      LOG_TYPE_EXTENDED,
      SLOT_SELECTED,
      index + (itemsType === WEAPONS ? 1 : 3)
    );
    selectSlot(index + (itemsType === WEAPONS ? 1 : 3));
  };

  const onClickEmptyCard = () => {
    const slot = getSlotNumber(index);
    if (damageMode) {
      if (allSlotsAreEmpty) {
        causeDamage(slot);
      }
    } else if (trade) {
      if (itemSelected) {
        tradeItem({ item: null, slot, charTrading: charName });
      } else {
        tradeItem({ item: NONE, slot, charTrading: charName });
      }
    } else if (canSearch || setupMode) {
      logger(LOG_TYPE_EXTENDED, SLOT_SELECTED, slot);
      selectSlot(slot);
    }
  };

  const killOneZombie = pressedButton => {
    const updatedKillButtons = [...killButtons];

    toggleDisplaySplash(true);
    setTimeout(() => {
      toggleDisplaySplash(false);
    }, 350);

    clearTimeout(killButtonsTimer.current);
    killButtonsTimer.current = setTimeout(() => {
      changeKillButtons([]);
    }, 3000);
    updatedKillButtons[pressedButton] = `${pressedButton}`;
    changeKillButtons(updatedKillButtons);
    gainXp(1);
  };

  const reload = weapon => {
    if (needReload) {
      spendAction(RELOAD);
      toggleNeedReload(false);
    }
  };

  const spendAmmo = () => {
    toggleNeedReload(true);
  };

  useEffect(() => {
    toggleNeedReload(false);
  }, [charName, toggleNeedReload]);

  useEffect(() => {
    if (forcedKillButtons > 0) {
      forceActivateKillButtons(forcedKillButtons);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [forcedKillButtons]);

  useEffect(() => {
    clearTimeout(killButtonsTimer.current);
    clearTimeout(dualTimer.current);
    toggleFiredDual();
    changeKillButtons([]);
    return () => {
      clearTimeout(killButtonsTimer.current);
      clearTimeout(dualTimer.current);
      toggleFiredDual();
      changeKillButtons([]);
    };
  }, [changeKillButtons, charName, item, toggleFiredDual]);

  return (
    <ItemWrapper
      id={`${item}-${index + 1}`}
      isActive={isActive}
      numItems={numItems}
      onMouseOut={!device === MOBILE ? () => toggleActive(false) : null}
      onMouseOver={!device === MOBILE ? () => toggleActive(true) : null}
      slotType={slotType}
      type={itemsType}
    >
      <Item damageMode={damageMode} trade={trade}>
        {item ? (
          <SoundBlock
            activateKillButtons={activateKillButtons}
            callback={spendAction}
            canAttack={canAttack}
            canBeDeflected={canBeDeflected}
            canCombine={canCombine && canCombine.includes(item)}
            charCanDeflect={charCanDeflect}
            charName={charName}
            combineItemSelected={combineItemSelected}
            combinePair={combinePair}
            damageMode={damageMode}
            img={getItemPhoto(item, slotType)}
            isMobile={device === MOBILE}
            isSelected={itemSelected}
            makeNoise={makeNoise}
            name={item}
            needsToBeReloaded={checkIfReloadIsNeeded()}
            onClickCard={setupMode ? onClickEmptyCard : onClickCard}
            onClickCombine={onClickCombine}
            round={round}
            secondarySound={secondarySound}
            setupMode={setupMode}
            slot={getSlotNumber(index)}
            slotType={slotType}
            specificSound={ALL_WEAPONS[item] && ALL_WEAPONS[item].sound}
            spendAmmo={spendAmmo}
            trade={trade}
            type={itemsType}
            unloaded={needReload}
            wounded={wounded}
          />
        ) : (
          <ItemBlank
            allSlotsAreEmpty={allSlotsAreEmpty}
            canSearch={canSearch}
            damageMode={damageMode}
            isSelected={itemSelected}
            onClick={onClickEmptyCard}
            setupMode={setupMode}
            trade={trade}
          >
            {!trade &&
              (slotType === IN_HAND ? (
                <p>{ITEM_IN_HAND}</p>
              ) : (
                <p>{ITEM_IN_RESERVE}</p>
              ))}
            {canSearch && !damageMode && !setupMode && (
              <ActionButton
                actionType={SEARCH_ACTION}
                callback={onClickEmptyCard}
                type={charVoice}
              />
            )}
          </ItemBlank>
        )}
      </Item>
      <ActionButtonsWrapper trade={trade} visible={dropMode}>
        {item && !damageMode && (
          <AppButton
            onClick={() =>
              trade
                ? onClickDrop(charName, slotType, index)
                : onClickDrop('', index)
            }
            type="button"
            trade
          >
            <ActionButtonIcon className="far fa-trash-alt" type={DROP} />
          </AppButton>
        )}
      </ActionButtonsWrapper>
      {needReload && (
        <ActionButton
          actionType={RELOAD_ACTION}
          callback={reload}
          isMobile={device === MOBILE}
          type="center"
        />
      )}
      {killButtons.length > 0 && (
        <KillButtonsWrapper displaySplash={displaySplash}>
          {killButtons.map(key => (
            <KillButton
              attack={ALL_WEAPONS[item] && ALL_WEAPONS[item].attack}
              key={`kill-${item}-${key}`}
              onClick={() => killOneZombie(key)}
              type="button"
              trade
              visible={typeof key === 'number'}
            >
              <KillButtonIcon src={ZombieFace} type="kill" />
            </KillButton>
          ))}
        </KillButtonsWrapper>
      )}
    </ItemWrapper>
  );
};

ItemsArea.propTypes = {
  activateDualEffect: func,
  allSlotsAreEmpty: bool,
  bonusDice: BonusDiceType,
  canAttack: bool,
  canBeDeflected: bool,
  canCombine: oneOfType([arrayOf(string), bool]),
  canSearch: bool,
  causeDamage: func,
  charCanDeflect: bool,
  charName: string,
  charVoice: string,
  combineItemSelected: bool,
  combinePair: bool,
  damageMode: oneOfType([string, bool]),
  device: string.isRequired,
  dice: oneOfType([number, string]),
  dropMode: bool,
  dualWeaponEffect: bool,
  forcedKillButtons: number,
  gainCustomXp: func,
  gainXp: func,
  index: number.isRequired,
  item: string,
  itemSelected: bool,
  makeNoise: func,
  numItems: number,
  onClickCombine: func,
  onClickDrop: func.isRequired,
  round: number,
  secondarySound: bool,
  selectSlot: func,
  setupMode: oneOfType([string, bool]),
  slotType: string.isRequired,
  spendAction: func,
  spendSingleUseWeapon: func,
  trade: bool,
  tradeItem: func,
  wounded: bool.isRequired
};

ItemsArea.defaultProps = {
  activateDualEffect: () => null,
  allSlotsAreEmpty: false,
  bonusDice: null,
  canAttack: false,
  canBeDeflected: false,
  canCombine: null,
  canSearch: false,
  causeDamage: null,
  charCanDeflect: false,
  charName: null,
  charVoice: null,
  combineItemSelected: false,
  combinePair: false,
  damageMode: false,
  dice: null,
  dropMode: false,
  dualWeaponEffect: false,
  forcedKillButtons: null,
  gainCustomXp: () => null,
  gainXp: () => null,
  item: null,
  itemSelected: false,
  makeNoise: () => null,
  numItems: null,
  onClickCombine: () => null,
  round: null,
  secondarySound: false,
  selectSlot: () => null,
  setupMode: null,
  spendAction: () => null,
  spendSingleUseWeapon: () => null,
  trade: false,
  tradeItem: () => null
};

export default ItemsArea;

import React, { useEffect, useRef } from 'react';
import { bool, func, number, string, oneOfType } from 'prop-types';
import { useStateWithLabel } from '../../../utils/hooks';
import { getItemPhoto, getItemType } from '../../../utils/items';
import SoundBlock from '../../SoundBlock';
import ActionButton from '../../ActionButton';
import { ALL_WEAPONS } from '../../../setup/weapons';
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
  WEAPONS
} from '../../../constants';
import ZombieFace from '../../../assets/images/zombieFace.png';
import { BonusDicesType } from '../../../interfaces/types';
import { AppButton } from '../../Sections/PlayersSection/styles';
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
  actionsLeft,
  activateDualEffect,
  allSlotsAreEmpty,
  bonusDices,
  callback,
  canAttack,
  canBeAbsorbed,
  canCombine,
  canSearch,
  causeDamage,
  charCanAbsorb,
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
  handleSearch,
  index,
  item,
  itemSelected,
  makeNoise,
  numItems,
  onClickCombine,
  onClickDrop,
  selectSlot,
  setupMode,
  slotType,
  spendAction,
  spendSingleUseWeapon,
  startTrade,
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

  // const bonusDiceRef = useRef();
  // const dicesRef = useRef();
  const killButtonsTimer = useRef();

  const itemsType = getItemType(item);

  const activateKillButtons = () => {
    spendSingleUseWeapon(index, item);
    if (ALL_WEAPONS[item].dice === SPECIAL) {
      gainCustomXp(index);
    } else {
      const totalDices = calculateTotalDices();
      const currentPool = killButtons.length;
      const newArray = [...Array(totalDices).keys()].map(
        value => value + currentPool
      );

      toggleFiredDual(true);

      if (dualWeaponEffect) {
        console.log('$$$ DW totalDices', totalDices);
        activateDualEffect(totalDices);
      }

      clearTimeout(killButtonsTimer.current);

      setTimeout(() => {
        toggleFiredDual();
      }, 2000);
      changeKillButtons([...killButtons, ...newArray]);
      killButtonsTimer.current = setTimeout(() => {
        changeKillButtons([]);
      }, 10000);
    }
  };

  const calculateTotalDices = () => {
    const { combat, melee, ranged } = bonusDices;
    let totalDices;

    // bonusDiceRef.current = bonusDices;
    // dicesRef.current = dice;

    totalDices = dice + combat;

    if (ALL_WEAPONS[item].attack === MELEE) {
      totalDices += melee;
    } else if (ALL_WEAPONS[item].attack === RANGED) {
      totalDices += ranged;
    } else if (ALL_WEAPONS[item].attack === MELEE_RANGED) {
      totalDices = totalDices + ranged + melee;
    }
    return totalDices;
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
      selectSlot(slot);
      if (!setupMode) {
        handleSearch();
      }
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
  }, [forcedKillButtons]);

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
            callback={callback}
            canAttack={canAttack}
            canBeAbsorbed={canBeAbsorbed}
            canCombine={canCombine && canCombine.includes(item)}
            charCanAbsorb={charCanAbsorb}
            combineItemSelected={combineItemSelected}
            combinePair={combinePair}
            damageMode={damageMode}
            img={getItemPhoto(item)}
            isMobile={device === MOBILE}
            isSelected={itemSelected}
            makeNoise={makeNoise}
            name={item}
            needsToBeReloaded={checkIfReloadIsNeeded()}
            onClickCard={setupMode ? onClickEmptyCard : onClickCard}
            onClickCombine={onClickCombine}
            setupMode={setupMode}
            slot={getSlotNumber(index)}
            slotType={slotType}
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
  actionsLeft: number,
  activateDualEffect: func,
  allSlotsAreEmpty: bool,
  bonusDices: BonusDicesType,
  callback: func,
  canAttack: bool,
  canBeAbsorbed: bool,
  canCombine: bool,
  canSearch: bool,
  causeDamage: func,
  charCanAbsorb: bool,
  charName: string,
  charVoice: string,
  combineItemSelected: bool,
  combinePair: bool,
  damageMode: bool,
  device: string.isRequired,
  dice: number,
  dropMode: bool,
  dualWeaponEffect: bool,
  forcedKillButtons: number,
  gainCustomXp: func,
  gainXp: func,
  handleSearch: func,
  index: number.isRequired,
  item: string,
  itemSelected: bool,
  makeNoise: func,
  numItems: number,
  onClickCombine: func,
  onClickDrop: func.isRequired,
  selectSlot: func,
  setupMode: oneOfType([string, bool]),
  slotType: string.isRequired,
  spendAction: func,
  spendSingleUseWeapon: func,
  startTrade: func,
  trade: bool,
  tradeItem: func,
  wounded: bool.isRequired
};

ItemsArea.defaultProps = {
  actionsLeft: null,
  activateDualEffect: () => null,
  allSlotsAreEmpty: false,
  bonusDices: null,
  callback: () => null,
  canAttack: false,
  canBeAbsorbed: false,
  canCombine: false,
  canSearch: false,
  causeDamage: null,
  charCanAbsorb: false,
  charName: null,
  charVoice: null,
  combineItemSelected: false,
  combinePair: false,
  damageMode: false,
  dice: null,
  dropMode: false,
  dualWeaponEffect: false,
  forcedKillButtons: null,
  itemSelected: false,
  gainCustomXp: () => null,
  gainXp: () => null,
  handleSearch: () => null,
  item: null,
  makeNoise: () => null,
  numItems: null,
  onClickCombine: () => null,
  selectSlot: () => null,
  setupMode: null,
  spendAction: () => null,
  spendSingleUseWeapon: () => null,
  startTrade: () => null,
  trade: false,
  tradeItem: () => null
};

export default ItemsArea;

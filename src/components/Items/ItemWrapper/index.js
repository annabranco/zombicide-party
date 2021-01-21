import React, { useEffect, useRef } from 'react';
import { bool, func, number, string } from 'prop-types';
import { isEqual } from 'lodash';
import { useStateWithLabel } from '../../../utils/hooks';
import { getItemPhoto, getItemType } from '../../../utils/items';
import SoundBlock from '../../SoundBlock';
import ActionButton from '../../ActionButton';
import { ALL_WEAPONS } from '../../../setup/weapons';

import { AppButton } from '../../Sections/PlayersSection/styles';
import {
  ActionButtonIcon,
  ItemWrapper,
  ItemBlank,
  Item,
  ActionButtonsWrapper,
  KillButtonsWrapper,
  KillButton,
  KillButtonIcon
} from './styles';
import {
  DROP,
  IN_HAND,
  ITEM_IN_BACKPACK,
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
  TRADE,
  WEAPONS
} from '../../../constants';
import { BonusDicesType } from '../../../interfaces/types';

const ItemsArea = ({
  actionsLeft,
  allSlotsAreEmpty,
  bonusDices,
  callback,
  canAttack,
  canCombine,
  canSearch,
  charName,
  charVoice,
  causeDamage,
  combineItemSelected,
  combinePair,
  damageMode,
  device,
  dice,
  dropMode,
  gainCustomXp,
  gainXp,
  handleSearch,
  index,
  item,
  itemSelected,
  makeNoise,
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
  const [displayKillButtons, toggleDisplayKillButtons] = useStateWithLabel(
    false,
    'displayKillButtons'
  );
  const [isActive, toggleActive] = useStateWithLabel(false, 'isActive');
  const [isSelected, select] = useStateWithLabel(false, 'isSelected');
  const [killButtons, changeKillButtons] = useStateWithLabel([], 'killButtons');
  const [needReload, toggleNeedReload] = useStateWithLabel([], 'needReload');

  const bonusDiceRef = useRef();
  const dicesRef = useRef();
  const killButtonsTimer = useRef();

  const itemsType = getItemType(item);

  const activateKillButtons = () => {
    spendSingleUseWeapon(index, item);
    if (ALL_WEAPONS[item].dice === SPECIAL) {
      gainCustomXp(index);
    } else {
      toggleDisplayKillButtons(true);
      killButtonsTimer.current = setTimeout(() => {
        toggleDisplayKillButtons(false);
        changeKillButtons(calculateTotalDices());
      }, 3000);
    }
  };

  const calculateTotalDices = () => {
    const { combat, melee, ranged } = bonusDices;
    let totalDices;
    bonusDiceRef.current = bonusDices;
    dicesRef.current = dice;

    totalDices = dice + combat;

    if (ALL_WEAPONS[item].attack === MELEE) {
      totalDices += melee;
    } else if (ALL_WEAPONS[item].attack === RANGED) {
      totalDices += ranged;
    } else if (ALL_WEAPONS[item].attack === MELEE_RANGED) {
      totalDices = totalDices + ranged + melee;
    }
    return [...Array(totalDices).keys()];
  };

  const checkIfReloadIsNeeded = () => item === ALL_WEAPONS.SawedOff.name;

  const getSlotNumber = itemIndex => {
    const adj = slotType === IN_HAND ? 1 : 3;
    return itemIndex + adj;
  };

  const onClickCard = () => {
    const slot = getSlotNumber(index);
    if (damageMode) {
      causeDamage(slot);
    } else if (trade) {
      if (isSelected) {
        select(false);
        tradeItem({ item: null, slot, char: charName });
      } else {
        tradeItem({ item, slot, char: charName });
        if (!itemSelected) {
          select(true);
        }
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
      if (isSelected) {
        select(false);
        tradeItem({ item: null, slot, char: charName });
      } else {
        tradeItem({ item: NONE, slot, char: charName });
        if (!itemSelected) {
          select(true);
        }
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
    clearTimeout(killButtonsTimer.current);
    killButtonsTimer.current = setTimeout(() => {
      toggleDisplayKillButtons(false);
      changeKillButtons(calculateTotalDices());
    }, 2000);
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
    if (dice && bonusDices) {
      if (
        !isEqual(bonusDiceRef.current, bonusDices) ||
        dicesRef.current !== dice
      ) {
        changeKillButtons(calculateTotalDices());
      }
    }
  }, [dice, bonusDices, item, changeKillButtons]);

  useEffect(() => {
    toggleNeedReload(false);
  }, [charName, toggleNeedReload]);

  return (
    <ItemWrapper
      id={`${item}-${index + 1}`}
      isActive={isActive}
      key={`${item}-${index + 1}`}
      onMouseOut={!device === MOBILE ? () => toggleActive(false) : null}
      onMouseOver={!device === MOBILE ? () => toggleActive(true) : null}
      slotType={slotType}
      type={itemsType}
    >
      <Item damageMode={damageMode} trade={trade}>
        {/* {isActive && trade && <p>CONFIRM</p>} */}
        {item ? (
          <SoundBlock
            activateKillButtons={activateKillButtons}
            callback={callback}
            canAttack={canAttack}
            canCombine={canCombine && canCombine.includes(item)}
            combineItemSelected={combineItemSelected}
            combinePair={combinePair}
            damageMode={damageMode}
            img={getItemPhoto(item)}
            isMobile={device === MOBILE}
            isSelected={isSelected}
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
            damageMode={damageMode}
            canSearch={canSearch}
            isSelected={isSelected}
            onClick={onClickEmptyCard}
            setupMode={setupMode}
            trade={trade}
          >
            {!trade && (slotType === IN_HAND ? ITEM_IN_HAND : ITEM_IN_BACKPACK)}
            {canSearch && !damageMode && !setupMode && (
              <ActionButton
                actionType={SEARCH_ACTION}
                callback={onClickEmptyCard}
                device={device}
                type={charVoice}
              />
            )}
          </ItemBlank>
        )}
      </Item>
      <ActionButtonsWrapper trade={trade} visible={dropMode}>
        {needReload && (
          <ActionButton
            actionType={RELOAD_ACTION}
            callback={reload}
            device={device}
            type="center"
          />
        )}
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
      {displayKillButtons && (
        <KillButtonsWrapper>
          {killButtons.map(key => (
            <KillButton
              key={`kill-${item}-${key}`}
              onClick={() => killOneZombie(key)}
              type="button"
              trade
              visible={typeof key === 'number'}
            >
              <KillButtonIcon className="fas fa-skull" type="kill" />
            </KillButton>
          ))}
        </KillButtonsWrapper>
      )}
    </ItemWrapper>
  );
};

ItemsArea.propTypes = {
  actionsLeft: number.isRequired,
  allSlotsAreEmpty: bool,
  bonusDices: BonusDicesType,
  callback: func.isRequired,
  canAttack: bool,
  canCombine: bool.isRequired,
  canSearch: bool.isRequired,
  charName: string,
  charVoice: string,
  causeDamage: func.isRequired,
  combineItemSelected: bool,
  combinePair: bool,
  damageMode: bool.isRequired,
  device: string.isRequired,
  dice: number,
  dropMode: bool.isRequired,
  gainCustomXp: func,
  gainXp: func,
  handleSearch: func.isRequired,
  index: number.isRequired,
  item: string,
  itemSelected: bool.isRequired,
  makeNoise: func.isRequired,
  onClickCombine: func.isRequired,
  onClickDrop: func.isRequired,
  selectSlot: func.isRequired,
  setupMode: bool,
  slotType: string.isRequired,
  spendAction: func,
  spendSingleUseWeapon: func,
  startTrade: func.isRequired,
  trade: bool.isRequired,
  tradeItem: func,
  wounded: bool.isRequired
};

ItemsArea.defaultProps = {
  allSlotsAreEmpty: false,
  bonusDices: null,
  canAttack: false,
  charName: null,
  charVoice: null,
  combineItemSelected: false,
  combinePair: false,
  dice: null,
  gainCustomXp: () => null,
  gainXp: () => null,
  item: null,
  spendAction: () => null,
  setupMode: false,
  spendSingleUseWeapon: () => null,
  tradeItem: () => null
};

export default ItemsArea;

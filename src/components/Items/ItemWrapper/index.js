import React, { useEffect, useRef } from 'react';
import { bool, func, number, string } from 'prop-types';
import { isEqual } from 'lodash';
import { useStateWithLabel } from '../../../utils/hooks';
import { getItemPhoto, getItemType } from '../../../utils/items';
import SoundBlock from '../../SoundBlock';
import ActionButton from '../../ActionButton';
import { WEAPONS_S1 } from '../../../setup/weapons';

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
  IN_HAND,
  ITEM_IN_BACKPACK,
  ITEM_IN_HAND,
  MELEE,
  MELEE_RANGED,
  RANGED,
  SPECIAL,
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
  dice,
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
  startTrade,
  trade,
  tradeItem,
  wounded
}) => {
  const [isActive, toggleActive] = useStateWithLabel(false, 'isActive');
  const [isSelected, select] = useStateWithLabel(false, 'isSelected');
  const [killButtons, changeKillButtons] = useStateWithLabel([], 'killButtons');
  const [displayKillButtons, toggleDisplayKillButtons] = useStateWithLabel(
    false,
    'displayKillButtons'
  );
  const killButtonsTimer = useRef();
  const bonusDiceRef = useRef();
  const dicesRef = useRef();

  const itemsType = getItemType(item);

  const activateKillButtons = () => {
    if (WEAPONS_S1[item].dice === SPECIAL) {
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

    if (WEAPONS_S1[item].attack === MELEE) {
      totalDices += melee;
    } else if (WEAPONS_S1[item].attack === RANGED) {
      totalDices += ranged;
    } else if (WEAPONS_S1[item].attack === MELEE_RANGED) {
      totalDices = totalDices + ranged + melee;
    }
    return [...Array(totalDices).keys()];
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
        tradeItem({ item: 'none', slot, char: charName });
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
    }, 3000);
    updatedKillButtons[pressedButton] = `${pressedButton}`;
    changeKillButtons(updatedKillButtons);
    gainXp(1);
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

  return (
    <ItemWrapper
      id={`${item}-${index + 1}`}
      isActive={isActive}
      key={`${item}-${index + 1}`}
      onMouseOut={() => toggleActive(false)}
      onMouseOver={() => toggleActive(true)}
      slotType={slotType}
      type={itemsType}
    >
      <Item damageMode={damageMode} trade={trade}>
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
            isSelected={isSelected}
            makeNoise={makeNoise}
            name={item}
            onClickCard={setupMode ? onClickEmptyCard : onClickCard}
            onClickCombine={onClickCombine}
            setupMode={setupMode}
            slot={getSlotNumber(index)}
            slotType={slotType}
            trade={trade}
            type={itemsType}
            wounded={wounded}
          >
            {canSearch && !damageMode && !setupMode && (
              <ActionButton
                actionType="search"
                callback={onClickEmptyCard}
                type={charVoice}
              />
            )}
          </SoundBlock>
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
                actionType="search"
                callback={onClickEmptyCard}
                type={charVoice}
              />
            )}
          </ItemBlank>
        )}
      </Item>
      <ActionButtonsWrapper trade={trade}>
        {!trade && !damageMode && actionsLeft > 0 && (
          <AppButton onClick={() => startTrade(true)} type="button" trade>
            <ActionButtonIcon className="fas fa-exchange-alt" type="trade" />
          </AppButton>
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
            <ActionButtonIcon className="far fa-trash-alt" type="drop" />
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
  dice: number,
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
  setupMode: false,
  tradeItem: () => null
};

export default ItemsArea;

import React from 'react';
import { bool, func, number, string } from 'prop-types';
import { useStateWithLabel } from '../../../utils/hooks';
import { getItemPhoto, getItemType } from '../../../utils/items';
import SoundBlock from '../../SoundBlock';
import ActionButton from '../../Sections/PlayersSection/actions';

import { AppButton } from '../../Sections/PlayersSection/styles';
import {
  ActionButtonIcon,
  ItemWrapper,
  ItemBlank,
  Item,
  ActionButtonsWrapper
} from './styles';
import {
  IN_HAND,
  ITEM_IN_BACKPACK,
  ITEM_IN_HAND,
  WEAPONS
} from '../../../constants';

const ItemsArea = ({
  actionsLeft,
  allSlotsAreEmpty,
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

  const itemsType = getItemType(item);

  const onClickChange = () => {
    toggleActive(false);
    selectSlot(index + (itemsType === WEAPONS ? 1 : 3));
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

  const getSlotNumber = itemIndex => {
    const adj = slotType === IN_HAND ? 1 : 3;
    return itemIndex + adj;
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
    </ItemWrapper>
  );
};

ItemsArea.propTypes = {
  actionsLeft: number.isRequired,
  allSlotsAreEmpty: bool,
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
  canAttack: false,
  charName: null,
  charVoice: null,
  combineItemSelected: false,
  combinePair: false,
  item: null,
  setupMode: false,
  tradeItem: () => null
};

export default ItemsArea;

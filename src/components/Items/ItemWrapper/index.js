import React, { useEffect } from 'react';
import { bool, func, number, string } from 'prop-types';
import { useStateWithLabel } from '../../../utils/hooks';
import { getItemPhoto, getItemType } from '../../../utils/items';
import SoundBlock from '../../SoundBlock';
import { ActionButton } from '../../Sections/PlayersSection/styles';
import {
  ActionButtonIcon,
  ItemWrapper,
  ItemBlank,
  Item,
  ActionButtonsWrapper
} from './styles';
import { characterTypes } from '../../../interfaces/types';

const ItemsArea = ({
  actionsLeft,
  allSlotsAreEmpty,
  callback,
  canAttack,
  charName,
  causeDamage,
  damageMode,
  index,
  item,
  itemSelected,
  makeNoise,
  onClickDrop,
  selectSlot,
  slotType,
  startTrade,
  trade,
  tradeItem,
  wounded
}) => {
  const [isActive, toggleActive] = useStateWithLabel(false, 'isActive');
  const [isSelected, select] = useStateWithLabel(false, 'isSelected');

  const itemsType = getItemType(item);
  // const [itemsType, changeItemsType] = useStateWithLabel(
  //   getItemType(item),
  //   'itemsType'
  // );

  const onClickChange = () => {
    toggleActive(false);
    selectSlot(index + (itemsType === 'weapons' ? 1 : 3));
  };

  console.log('$$$ actionsLeft', actionsLeft);

  const onClickCard = () => {
    const adj = slotType === 'inHand' ? 1 : 3;
    if (damageMode) {
      causeDamage(index + adj);
    } else if (trade) {
      if (isSelected) {
        select(false);
        tradeItem({ item: null, slot: index + adj, char: charName });
      } else {
        tradeItem({ item, slot: index + adj, char: charName });
        if (!itemSelected) {
          select(true);
        }
      }
    } else {
      onClickChange();
    }
  };

  const onClickEmptyCard = () => {
    const adj = slotType === 'inHand' ? 1 : 3;

    if (damageMode) {
      if (allSlotsAreEmpty) {
        causeDamage(index + adj);
      }
    } else if (trade) {
      if (isSelected) {
        select(false);
        tradeItem({ item: null, slot: index + adj, char: charName });
      } else {
        tradeItem({ item: 'none', slot: index + adj, char: charName });
        if (!itemSelected) {
          select(true);
        }
      }
    } else {
      selectSlot(index + adj);
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
            damageMode={damageMode}
            img={getItemPhoto(item)}
            isSelected={isSelected}
            makeNoise={makeNoise}
            name={item}
            onClickCard={onClickCard}
            slotType={slotType}
            trade={trade}
            type={itemsType}
            wounded={wounded}
          />
        ) : (
          <ItemBlank
            allSlotsAreEmpty={allSlotsAreEmpty}
            damageMode={damageMode}
            isSelected={isSelected}
            onClick={onClickEmptyCard}
          >
            {!trade &&
              (slotType === 'inHand' ? 'Item in hand' : 'Item in backpack')}
          </ItemBlank>
        )}
      </Item>
      <ActionButtonsWrapper trade={trade}>
        {!trade && !damageMode && actionsLeft > 0 && (
          <ActionButton onClick={() => startTrade(true)} type="button" trade>
            <ActionButtonIcon className="fas fa-exchange-alt" type="trade" />
          </ActionButton>
        )}
        {item && !damageMode && (
          <ActionButton
            onClick={() =>
              trade
                ? onClickDrop(charName, slotType, index)
                : onClickDrop('', index)
            }
            type="button"
            trade
          >
            <ActionButtonIcon className="far fa-trash-alt" type="drop" />
          </ActionButton>
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
  charName: string,
  causeDamage: func.isRequired,
  damageMode: bool.isRequired,
  index: number.isRequired,
  item: string,
  itemSelected: bool.isRequired,
  makeNoise: func.isRequired,
  onClickDrop: func.isRequired,
  selectSlot: func.isRequired,
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
  item: null,
  tradeItem: () => null
};

export default ItemsArea;

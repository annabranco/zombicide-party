import React, { useEffect } from 'react';
import { bool, func, number, string } from 'prop-types';
import { useStateWithLabel } from '../../../utils/hooks';
import { getItemPhoto, getItemType } from '../../../utils/items';
import SoundBlock from '../../SoundBlock';
import { ActionButton } from '../../Sections/PlayersSection/styles';
import { ItemWrapper, ItemBlank, Item, ActionButtonsWrapper } from './styles';

const ItemsArea = ({
  allSlotsAreEmpty,
  causeDamage,
  damageMode,
  index,
  item,
  onClickDrop,
  selectSlot,
  slotType,
  startTrade,
  trade,
  wounded
}) => {
  const [isActive, toggleActive] = useStateWithLabel(false, 'isActive');
  const itemsType = getItemType(item);
  // const [itemsType, changeItemsType] = useStateWithLabel(
  //   getItemType(item),
  //   'itemsType'
  // );

  const onClickChange = () => {
    toggleActive(false);
    selectSlot(index + (itemsType === 'weapons' ? 1 : 3));
  };

  const onClickCard = () => {
    if (damageMode) {
      causeDamage(index + (slotType === 'inHand' ? 1 : 3));
    } else {
      onClickChange();
    }
  };

  const onClickEmptyCard = () => {
    if (damageMode) {
      if (allSlotsAreEmpty) {
        causeDamage(index + (slotType === 'inHand' ? 1 : 3));
      }
    } else {
      selectSlot(index + (slotType === 'inHand' ? 1 : 3));
    }
  };

  return (
    <ItemWrapper
      id={`${item}-${index + 1}`}
      isActive={item && isActive}
      key={`${item}-${index + 1}`}
      onMouseOut={() => toggleActive(false)}
      onMouseOver={() => toggleActive(true)}
      slotType={slotType}
      type={itemsType}
    >
      <Item damageMode={damageMode} trade={trade}>
        {item ? (
          <SoundBlock
            damageMode={damageMode}
            img={getItemPhoto(item)}
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
            onClick={onClickEmptyCard}
          >
            {!trade &&
              (slotType === 'inHand' ? 'Item in hand' : 'Item in backpack')}
          </ItemBlank>
        )}
      </Item>
      {item && !damageMode && (
        <ActionButtonsWrapper>
          <ActionButton onClick={() => startTrade(true)} type="button">
            TRADE
          </ActionButton>

          <ActionButton onClick={() => onClickDrop('', index)} type="button">
            DROP
          </ActionButton>
        </ActionButtonsWrapper>
      )}
    </ItemWrapper>
  );
};

ItemsArea.propTypes = {
  allSlotsAreEmpty: bool,
  causeDamage: func.isRequired,
  damageMode: bool.isRequired,
  index: number.isRequired,
  item: string,
  onClickDrop: func.isRequired,
  selectSlot: func.isRequired,
  slotType: string.isRequired,
  startTrade: func.isRequired,
  trade: bool.isRequired,
  wounded: bool.isRequired
};

ItemsArea.defaultProps = {
  allSlotsAreEmpty: false,
  item: null
};

export default ItemsArea;

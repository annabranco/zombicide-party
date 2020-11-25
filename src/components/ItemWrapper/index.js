import React, { useEffect } from 'react';
import { number, string, func } from 'prop-types';
import SoundBlock from '../areas/SoundBlock';
import { ActionButtonsWrapper, Item, ItemBlank, ItemWrapper } from './styles';
import { useStateWithLabel } from '../../utils/hooks';
import { ActionButton } from '../areas/PlayersSection/styles';
import { getItemPhoto, getItemType } from '../../utils/items';

const ItemsArea = ({ item, index, selectSlot, onClickDrop, slotType }) => {
  const [isActive, toggleActive] = useStateWithLabel(false, 'isActive');
  const [itemsType, changeItemsType] = useStateWithLabel(
    'weapons',
    'itemsType'
  );

  const onClickChange = () => {
    toggleActive(false);
    selectSlot(index + (itemsType === 'weapons' ? 1 : 3));
  };

  useEffect(() => {
    const type = getItemType(item);
    changeItemsType(type);
  }, [item, changeItemsType]);

  return (
    <ItemWrapper
      onMouseOver={() => toggleActive(true)}
      onMouseOut={() => toggleActive(false)}
      slotType={slotType}
      key={`${item}-${index + 1}`}
      id={`${item}-${index + 1}`}
      isActive={item && isActive}
    >
      <Item>
        {item ? (
          <SoundBlock
            name={item}
            img={getItemPhoto(item)}
            slotType={slotType}
            type={itemsType}
          />
        ) : (
          <ItemBlank
            onClick={() => selectSlot(index + (slotType === 'inHand' ? 1 : 3))}
          >
            {slotType === 'inHand' ? 'Item in hand' : 'Item in backpack'}
          </ItemBlank>
        )}
      </Item>
      {item && (
        <ActionButtonsWrapper>
          <ActionButton type="button" onClick={onClickChange}>
            CHANGE
          </ActionButton>

          <ActionButton type="button" onClick={() => onClickDrop('', index)}>
            DROP
          </ActionButton>
        </ActionButtonsWrapper>
      )}
    </ItemWrapper>
  );
};

ItemsArea.propTypes = {
  item: string.isRequired,
  index: number.isRequired,
  selectSlot: func.isRequired,
  onClickDrop: func.isRequired,
  slotType: string.isRequired
};

export default ItemsArea;

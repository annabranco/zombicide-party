import React, { useEffect } from 'react';
import { number, string, func } from 'prop-types';
import { useStateWithLabel } from '../../../utils/hooks';
import { getItemPhoto, getItemType } from '../../../utils/items';
import SoundBlock from '../../SoundBlock';
import { ActionButton } from '../../Sections/PlayersSection/styles';
import { ItemWrapper, ItemBlank, Item, ActionButtonsWrapper } from './styles';

const ItemsArea = ({ index, item, onClickDrop, selectSlot, slotType }) => {
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
      id={`${item}-${index + 1}`}
      isActive={item && isActive}
      key={`${item}-${index + 1}`}
      onMouseOut={() => toggleActive(false)}
      onMouseOver={() => toggleActive(true)}
      slotType={slotType}
    >
      <Item>
        {item ? (
          <SoundBlock
            img={getItemPhoto(item)}
            name={item}
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
          <ActionButton onClick={onClickChange} type="button">
            CHANGE
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
  index: number.isRequired,
  item: string,
  onClickDrop: func.isRequired,
  selectSlot: func.isRequired,
  slotType: string.isRequired
};

ItemsArea.defaultProps = {
  item: null
};

export default ItemsArea;

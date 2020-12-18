import React, { useEffect } from 'react';
import { func, string } from 'prop-types';
import { WEAPONS_S1 } from '../../../setup/weapons';
import { ITEMS_S1 } from '../../../setup/items';
import { useStateWithLabel } from '../../../utils/hooks';
import SelectionItem from '../ItemSelector';
import { SelectorArea } from '../../SoundBlock/styles';
import {
  SelectorButton,
  SelectorModal,
  SelectorWrapper,
  SubSectionTitle
} from './styles';
import { ButtonsWrapper, CancelButton } from '../../TradeArea/styles';
import { IN_HAND, ITEMS, WEAPONS } from '../../../constants';

const ItemsSelectorModal = ({ onSelect, selectSlot, slotType }) => {
  const [items, changeItems] = useStateWithLabel(ITEMS_S1, ITEMS);
  const [itemsType, changeItemsType] = useStateWithLabel(ITEMS, 'itemsType');

  const changeType = () => {
    if (itemsType === ITEMS) {
      changeItems(WEAPONS_S1);
      changeItemsType(WEAPONS);
    } else {
      changeItems(ITEMS_S1);
      changeItemsType(ITEMS);
    }
  };

  useEffect(() => {
    if (slotType === IN_HAND) {
      changeItems(WEAPONS_S1);
      changeItemsType(WEAPONS);
    }
  }, [changeItems, slotType, changeItemsType]);

  return (
    <>
      <SelectorWrapper onClick={changeType} selectorType="itemsSelector">
        <SelectorButton displayKills={itemsType === ITEMS} />
        <SubSectionTitle opened={itemsType === WEAPONS}>
          Weapons
        </SubSectionTitle>
        <SubSectionTitle opened={itemsType === ITEMS}>Items</SubSectionTitle>
      </SelectorWrapper>
      <SelectorModal>
        <SelectorArea columns={6}>
          {Object.keys(items).map(name => (
            <SelectionItem
              img={items[name].img}
              key={items[name].name}
              name={items[name].name}
              onSelect={() => onSelect(items[name].name)}
              type={items[name].type}
            />
          ))}
        </SelectorArea>
        <ButtonsWrapper>
          <CancelButton type="button" onClick={() => selectSlot()}>
            CANCEL
          </CancelButton>
        </ButtonsWrapper>
      </SelectorModal>
    </>
  );
};

ItemsSelectorModal.propTypes = {
  onSelect: func.isRequired,
  selectSlot: func.isRequired,
  slotType: string.isRequired
};

export default ItemsSelectorModal;

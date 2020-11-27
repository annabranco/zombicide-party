import React, { useEffect } from 'react';
import { func, string } from 'prop-types';
import { WEAPONS_S1 } from '../../../setup/weapons';
import { ITEMS_S1 } from '../../../setup/items';
import { useStateWithLabel } from '../../../utils/hooks';
import SelectionItem from '../ItemSelector';
import { SelectorArea } from '../../SoundBlock/styles';
import { SelectorModal } from './styles';
import {
  SelectorButton,
  SelectorWrapper,
  SubSectionTitle
} from '../../Sections/ZombiesSection/styles';

const ItemsSelectorModal = ({ onSelect, slotType }) => {
  const [items, changeItems] = useStateWithLabel(ITEMS_S1, 'items');
  const [itemsType, changeItemsType] = useStateWithLabel('items', 'itemsType');

  const changeType = () => {
    if (itemsType === 'items') {
      changeItems(WEAPONS_S1);
      changeItemsType('weapons');
    } else {
      changeItems(ITEMS_S1);
      changeItemsType('items');
    }
  };

  useEffect(() => {
    if (slotType === 'inHand') {
      changeItems(WEAPONS_S1);
      changeItemsType('weapons');
    }
  }, [changeItems, slotType, changeItemsType]);

  return (
    <>
      <SelectorWrapper onClick={changeType} selectorType="itemsSelector">
        <SelectorButton displayKills={itemsType === 'items'} />
        <SubSectionTitle opened={itemsType === 'weapons'}>
          Weapons
        </SubSectionTitle>
        <SubSectionTitle opened={itemsType === 'items'}>Items</SubSectionTitle>
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
      </SelectorModal>
    </>
  );
};

ItemsSelectorModal.propTypes = {
  onSelect: func.isRequired,
  slotType: string.isRequired
};

export default ItemsSelectorModal;
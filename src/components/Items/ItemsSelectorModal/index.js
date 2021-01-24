import React, { useEffect } from 'react';
import { func, string } from 'prop-types';
import { ALL_WEAPONS } from '../../../setup/weapons';
import { ALL_ITEMS } from '../../../setup/items';
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
import {
  DESKTOP,
  IN_HAND,
  ITEMS,
  MOBILE,
  TABLET,
  WEAPONS
} from '../../../constants';

const ItemsSelectorModal = ({ device, onSelect, selectSlot, slotType }) => {
  const [items, changeItems] = useStateWithLabel(ALL_ITEMS, ITEMS);
  const [itemsType, changeItemsType] = useStateWithLabel(ITEMS, 'itemsType');

  const changeType = () => {
    if (itemsType === ITEMS) {
      changeItems(ALL_WEAPONS);
      changeItemsType(WEAPONS);
    } else {
      changeItems(ALL_ITEMS);
      changeItemsType(ITEMS);
    }
  };

  const calculateColumns = () => {
    switch (device) {
      case MOBILE:
        return 3;
      case TABLET:
        return 4;
      case DESKTOP:
      default:
        return 8;
    }
  };

  useEffect(() => {
    if (slotType === IN_HAND) {
      changeItems(ALL_WEAPONS);
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
        <SelectorArea columns={calculateColumns()}>
          {Object.keys(items)
            .sort()
            .map(name => (
              <SelectionItem
                img={items[name].img}
                key={items[name].name}
                name={items[name].name}
                onSelect={() => onSelect(items[name].name)}
                type={items[name].type}
              />
            ))}
        </SelectorArea>
        <ButtonsWrapper itemSelector>
          <CancelButton type="button" onClick={() => selectSlot()}>
            CANCEL
          </CancelButton>
        </ButtonsWrapper>
      </SelectorModal>
    </>
  );
};

ItemsSelectorModal.propTypes = {
  device: string.isRequired,
  onSelect: func.isRequired,
  selectSlot: func.isRequired,
  slotType: string.isRequired
};

export default ItemsSelectorModal;

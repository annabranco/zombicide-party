import React, { useContext, useEffect } from 'react';
import { bool, func, oneOfType, string } from 'prop-types';
import { pickBy } from 'lodash';
import { AppContext } from '../../../setup/rules';
import { useStateWithLabel } from '../../../utils';
import SelectionItem from '../ItemSelector';
import { SelectorArea } from '../../SoundBlock/styles';
import {
  DESKTOP,
  IN_HAND,
  IN_RESERVE,
  ITEMS,
  MOBILE,
  TABLET,
  WEAPONS
} from '../../../constants';
import { ButtonsWrapper, CancelButton } from '../../TradeArea/styles';
import {
  SelectorButton,
  SelectorModal,
  SelectorWrapper,
  SubSectionTitle
} from './styles';

const ItemsSelectorModal = ({
  device,
  onSelect,
  selectSlot,
  setupMode,
  slotType
}) => {
  const [items, changeItems] = useStateWithLabel({}, ITEMS);
  const [itemsType, changeItemsType] = useStateWithLabel(ITEMS, 'itemsType');

  const { context } = useContext(AppContext);

  const changeType = () => {
    if (itemsType === ITEMS) {
      changeItems(context.weapons);
      changeItemsType(WEAPONS);
    } else {
      changeItems(context.items);
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
      if (!context.rules.findCombinedItems && !setupMode) {
        const filteredWeapons = pickBy(
          context.weapons,
          attributes => !attributes.combined
        );
        changeItems(filteredWeapons);
      } else {
        changeItems(context.weapons);
      }
      changeItemsType(WEAPONS);
    } else if (slotType === IN_RESERVE) {
      changeItems(context.items);
      changeItemsType(ITEMS);
    }
  }, [
    changeItems,
    slotType,
    changeItemsType,
    context.weapons,
    context.items,
    context.rules.findCombinedItems,
    setupMode
  ]);

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
                onSelect={() => onSelect(items[name].name.replace(' ', ''))}
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
  setupMode: oneOfType([bool, string]).isRequired,
  slotType: string.isRequired
};

export default ItemsSelectorModal;

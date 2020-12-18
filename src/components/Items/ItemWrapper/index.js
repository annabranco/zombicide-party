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

const ItemsArea = ({
  actionsLeft,
  allSlotsAreEmpty,
  callback,
  canAttack,
  canSearch,
  charName,
  charVoice,
  causeDamage,
  damageMode,
  handleSearch,
  index,
  item,
  itemSelected,
  makeNoise,
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
    selectSlot(index + (itemsType === 'weapons' ? 1 : 3));
  };

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
    } else if (canSearch || setupMode) {
      selectSlot(index + adj);
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
            damageMode={damageMode}
            img={getItemPhoto(item)}
            isSelected={isSelected}
            makeNoise={makeNoise}
            name={item}
            onClickCard={setupMode ? onClickEmptyCard : onClickCard}
            setupMode={setupMode}
            slotType={slotType}
            trade={trade}
            type={itemsType}
            wounded={wounded}
          />
        ) : (
          <ItemBlank
            allSlotsAreEmpty={allSlotsAreEmpty}
            damageMode={damageMode}
            canSearch={canSearch}
            isSelected={isSelected}
            onClick={damageMode ? () => null : onClickEmptyCard}
            setupMode={setupMode}
            trade={trade}
          >
            {!trade &&
              (slotType === 'inHand' ? 'Item in hand' : 'Item in backpack')}
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
  canSearch: bool.isRequired,
  charName: string,
  charVoice: string,
  causeDamage: func.isRequired,
  damageMode: bool.isRequired,
  handleSearch: func.isRequired,
  index: number.isRequired,
  item: string,
  itemSelected: bool.isRequired,
  makeNoise: func.isRequired,
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
  item: null,
  setupMode: false,
  tradeItem: () => null
};

export default ItemsArea;

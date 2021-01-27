import React, { useEffect, useRef } from 'react';
import { cloneDeep } from 'lodash';
import { func, string } from 'prop-types';
import {
  ArrowSign,
  CharItems,
  NextButton,
  PreviousButton
} from '../Sections/PlayersSection/styles';
import { getCharacterColor } from '../../utils/players';
import { useStateWithLabel } from '../../utils/hooks';
import ItemsArea from '../Items/ItemsArea';
import {
  ButtonsWrapper,
  CancelButton,
  CharacterId,
  CharacterName,
  CharacterTrading,
  CurrentCharacterTag,
  ConfirmButton,
  CurrentPartnerTag,
  Face,
  PlayerName,
  TradeWrapper,
  NavButtonsWrapper
} from './styles';
import {
  IN_RESERVE,
  IN_HAND,
  SELECT_TRADE_PARTNER,
  TRADING_WITH,
  WOUNDED,
  NONE
} from '../../constants';

const TradeArea = ({
  spendAction,
  character,
  characters,
  confirmTrade,
  device,
  startTrade
}) => {
  const [updatedCharacter, updateCharacter] = useStateWithLabel(
    null,
    'updatedCharacter'
  );

  const [updatedCharacters, updateCharacters] = useStateWithLabel(
    null,
    'updatedCharacters'
  );
  const [tradePartner, updatePartner] = useStateWithLabel(null, 'tradePartner');

  const [partnerIndex, changePartnerIndex] = useStateWithLabel(
    0,
    'partnerIndex'
  );
  const [tradeEstablished, establishTrade] = useStateWithLabel(
    null,
    'tradeEstablished'
  );

  const [selectedItem1, selectItem1] = useStateWithLabel(null, 'selectedItem1');

  const changeToNextPlayer = () => {
    const nextPlayerIndex =
      partnerIndex + 1 >= updatedCharacters.length ? 0 : partnerIndex + 1;
    changePartnerIndex(nextPlayerIndex);
  };

  const changeToPreviousPlayer = () => {
    const nextPlayerIndex =
      partnerIndex - 1 < 0 ? updatedCharacters.length - 1 : partnerIndex - 1;
    updateCharacters(updatedCharacters);
    changePartnerIndex(nextPlayerIndex);
  };

  const prevPartnerIndex = useRef();

  const onClickConfirm = () => {
    const updCharsAfterTrade = cloneDeep(characters);
    updCharsAfterTrade.forEach((char, index) => {
      if (char.name === updatedCharacter.name) {
        updCharsAfterTrade[index] = updatedCharacter;
      } else if (char.name === tradePartner.name) {
        updCharsAfterTrade[index] = tradePartner;
      }
    });
    confirmTrade(updatedCharacter, updCharsAfterTrade);
    startTrade(false);
    establishTrade(false);
    spendAction();
  };

  useEffect(() => {
    const mainChar = cloneDeep(character);
    const updChar = characters.filter(char => char.name !== mainChar.name);
    updateCharacter(mainChar);
    updateCharacters(updChar);
    updatePartner(updChar[0]);
  }, [updatePartner, character, characters, updateCharacter, updateCharacters]);

  useEffect(() => {
    if (updatedCharacters && partnerIndex !== prevPartnerIndex.current) {
      const nextPartner = updatedCharacters[partnerIndex];
      updatePartner(nextPartner);
      prevPartnerIndex.current = partnerIndex;
    }
  }, [partnerIndex]);

  const onTrade = ({ item, slot, charTrading }) => {
    if (selectedItem1) {
      if (!item) {
        selectItem1();
      } else {
        const updChar = cloneDeep(updatedCharacter);
        const updPartn = cloneDeep(tradePartner);
        const typeItem1 = selectedItem1.slot <= 2 ? IN_HAND : IN_RESERVE;
        const typeItem2 = slot <= 2 ? IN_HAND : IN_RESERVE;
        const index1 =
          selectedItem1.slot <= 2
            ? selectedItem1.slot - 1
            : selectedItem1.slot - 3;
        const index2 = slot <= 2 ? slot - 1 : slot - 3;
        // eslint-disable-next-line no-debugger
        debugger;

        if (selectedItem1.item === NONE && item === NONE) {
          return null;
        }
        if (selectedItem1.charTrading === charTrading) {
          if (updChar.name === charTrading) {
            updChar[typeItem1][index1] = item === NONE ? null : item;
            updChar[typeItem2][index2] =
              selectedItem1.item === NONE ? null : selectedItem1.item;
            updateCharacter(updChar);
          } else {
            updPartn[typeItem1][index1] = item === NONE ? null : item;
            updPartn[typeItem2][index2] =
              selectedItem1.item === NONE ? null : selectedItem1.item;
            updatePartner(updPartn);
          }
        } else if (selectedItem1.item === WOUNDED || item === WOUNDED) {
          console.log('NOT');
        } else if (selectedItem1.charTrading === updChar.name) {
          updChar[typeItem1][index1] = item === NONE ? null : item;
          updPartn[typeItem2][index2] =
            selectedItem1.item === NONE ? null : selectedItem1.item;
          updateCharacter(updChar);
          updatePartner(updPartn);
        } else {
          updPartn[typeItem1][index1] = item === NONE ? null : item;
          updChar[typeItem2][index2] =
            selectedItem1.item === NONE ? null : selectedItem1.item;
          updateCharacter(updChar);
          updatePartner(updPartn);
        }
        selectItem1();
        establishTrade(true);
      }
    } else {
      selectItem1({ item, slot, charTrading });
    }
    return null;
  };

  const onClickDrop = (charName, type, index) => {
    if (charName === updatedCharacter.name) {
      const charDropping = cloneDeep(updatedCharacter);
      charDropping[type][index] = null;
      updateCharacter(charDropping);
    } else if (charName === tradePartner.name) {
      const charDropping = cloneDeep(tradePartner);
      charDropping[type][index] = null;
      updatePartner(charDropping);
    }
  };

  return (
    <TradeWrapper>
      {updatedCharacter && (
        <CharacterTrading>
          <CharacterId>
            <Face src={updatedCharacter.face} alt="" />
            <CharacterName trade>{updatedCharacter.name}</CharacterName>
            <PlayerName color={getCharacterColor(updatedCharacter.name)}>
              {updatedCharacter.player}
            </PlayerName>
          </CharacterId>
          <CharItems slotType={IN_HAND} trade>
            {updatedCharacter.inHand.map((item, index) => (
              <ItemsArea
                charName={updatedCharacter.name}
                index={index}
                item={item}
                itemSelected={
                  selectedItem1 &&
                  selectedItem1.charTrading === updatedCharacter.name &&
                  selectedItem1.slot === index + 1
                }
                key={`${item}-${index + 1}`}
                onClickDrop={onClickDrop}
                slotType={IN_HAND}
                trade
                tradeItem={onTrade}
                wounded={updatedCharacter.wounded}
              />
            ))}
          </CharItems>
          <CharItems slotType={IN_RESERVE} trade>
            {updatedCharacter.inReserve.map((item, index) => (
              <ItemsArea
                charName={updatedCharacter.name}
                index={index}
                item={item}
                itemSelected={
                  selectedItem1 &&
                  selectedItem1.charTrading === updatedCharacter.name &&
                  selectedItem1.slot === index + 3
                }
                key={`${item}-${index + 3}`}
                noAudio
                onClickDrop={onClickDrop}
                slotType={IN_RESERVE}
                trade
                tradeItem={onTrade}
                wounded={updatedCharacter.wounded}
              />
            ))}
          </CharItems>
        </CharacterTrading>
      )}
      {tradePartner && (
        <CharacterTrading>
          <CharacterId>
            <Face src={tradePartner.face} alt="" />
            <CharacterName trade>{tradePartner.name}</CharacterName>
            <PlayerName color={getCharacterColor(tradePartner.name)}>
              {tradePartner.player}
            </PlayerName>
          </CharacterId>
          <CharItems slotType={IN_HAND} trade>
            {tradePartner.inHand.map((item, index) => (
              <ItemsArea
                charName={tradePartner.name}
                device={device}
                index={index}
                item={item}
                itemSelected={
                  selectedItem1 &&
                  selectedItem1.charTrading === tradePartner.name &&
                  selectedItem1.slot === index + 1
                }
                key={`${item}-${index + 1}`}
                onClickDrop={onClickDrop}
                slotType={IN_HAND}
                trade
                tradeItem={onTrade}
                wounded={tradePartner.wounded}
              />
            ))}
          </CharItems>
          <CharItems slotType={IN_RESERVE} trade>
            {tradePartner.inReserve.map((item, index) => (
              <ItemsArea
                charName={tradePartner.name}
                device={device}
                index={index}
                item={item}
                itemSelected={
                  selectedItem1 &&
                  selectedItem1.charTrading === tradePartner.name &&
                  selectedItem1.slot === index + 3
                }
                key={`${item}-${index + 3}`}
                noAudio
                onClickDrop={onClickDrop}
                slotType={IN_RESERVE}
                trade
                tradeItem={onTrade}
                wounded={tradePartner.wounded}
              />
            ))}
          </CharItems>
          {!tradeEstablished && (
            <NavButtonsWrapper>
              <ArrowSign
                className="fas fa-caret-left"
                onClick={changeToPreviousPlayer}
                role="button"
              />
              <ArrowSign
                className="fas fa-caret-right"
                onClick={changeToNextPlayer}
                role="button"
              />
            </NavButtonsWrapper>
          )}

          <CurrentPartnerTag>
            {tradeEstablished
              ? TRADING_WITH(tradePartner.name)
              : SELECT_TRADE_PARTNER}
          </CurrentPartnerTag>
        </CharacterTrading>
      )}
      <ButtonsWrapper>
        <CancelButton type="button" onClick={() => startTrade(false)}>
          CANCEL
        </CancelButton>
        <ConfirmButton type="button" onClick={onClickConfirm}>
          CONFIRM
        </ConfirmButton>
      </ButtonsWrapper>
    </TradeWrapper>
  );
};

TradeArea.propTypes = {
  character: string.isRequired,
  characters: string.isRequired,
  confirmTrade: func.isRequired,
  device: string.isRequired,
  spendAction: func.isRequired,
  startTrade: func.isRequired
};

export default TradeArea;

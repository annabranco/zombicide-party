import React, { useEffect, useRef } from 'react';
import { func, string } from 'prop-types';
import {
  CharItems,
  NextButton,
  PreviousButton
} from '../Sections/PlayersSection/styles';
import { getCharacterColor } from '../../utils/players';
import { useStateWithLabel } from '../../utils/hooks';
import ItemsArea from '../Items/ItemWrapper';
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
  TradeWrapper
} from './styles';

const TradeArea = ({
  character,
  characters,
  inHand: currentInHand,
  inBackpack: currentInBackpack,
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
  const [tradePartner, changeTradePartner] = useStateWithLabel(
    null,
    'tradePartner'
  );

  const [partnerIndex, changePartnerIndex] = useStateWithLabel(
    0,
    'partnerIndex'
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

  useEffect(() => {
    const mainChar = { ...character };
    const updChar = characters.filter(char => char.name !== mainChar.name);
    updateCharacter(mainChar);
    updateCharacters(updChar);
    changeTradePartner(updChar[0]);
  }, [
    changeTradePartner,
    character,
    characters,
    updateCharacter,
    updateCharacters
  ]);

  useEffect(() => {
    if (updatedCharacters && partnerIndex !== prevPartnerIndex.current) {
      const nextPartner = updatedCharacters[partnerIndex];
      changeTradePartner(nextPartner);
      prevPartnerIndex.current = partnerIndex;
    }
  }, [partnerIndex]);

  const onTrade = ({ item, slot, char }) => {
    if (selectedItem1) {
      if (!item) {
        selectItem1();
      } else {
        console.log('$$$ ITEM2', char, slot, item);
        const updChar = { ...updatedCharacter };
        const updPartn = { ...tradePartner };
        const typeItem1 = selectedItem1.slot <= 2 ? 'inHand' : 'inBackpack';
        const typeItem2 = slot <= 2 ? 'inHand' : 'inBackpack';
        const index1 =
          selectedItem1.slot <= 2
            ? selectedItem1.slot - 1
            : selectedItem1.slot - 3;
        const index2 = slot <= 2 ? slot - 1 : slot - 3;

        if (selectedItem1.char === char) {
          if (updChar.name === char) {
            updChar[typeItem1][index1] = item === 'none' ? null : item;
            updChar[typeItem2][index2] =
              selectedItem1.item === 'none' ? null : selectedItem1.item;
            // updateCharacter(updChar);
          } else {
            updPartn[typeItem1][index1] = item === 'none' ? null : item;
            updPartn[typeItem2][index2] =
              selectedItem1.item === 'none' ? null : selectedItem1.item;
          }
          selectItem1();
        } else if (selectedItem1.item === 'Wounded' || item === 'Wounded') {
          console.log('NOT');
        } else if (selectedItem1.char === updChar.name) {
          updChar[typeItem1][index1] = item === 'none' ? null : item;
          updPartn[typeItem2][index2] =
            selectedItem1.item === 'none' ? null : selectedItem1.item;
          selectItem1();
        } else {
          updPartn[typeItem1][index1] = item === 'none' ? null : item;
          updChar[typeItem2][index2] =
            selectedItem1.item === 'none' ? null : selectedItem1.item;
          selectItem1();
        }
      }
    } else {
      console.log('$$$ ITEM1', char, slot, item);
      selectItem1({ item, slot, char });
    }
  };

  return (
    <TradeWrapper>
      {tradePartner && (
        <CharacterTrading>
          <CharacterId>
            <Face src={tradePartner.face} alt="" />
            <CharacterName trade>{tradePartner.name}</CharacterName>
          </CharacterId>
          <PlayerName color={getCharacterColor(tradePartner.name)}>
            {tradePartner.player}
          </PlayerName>
          <CharItems slotType="inHand" trade>
            {tradePartner.inHand.map((item, index) => (
              <ItemsArea
                character={tradePartner.name}
                index={index}
                item={item}
                itemSelected={Boolean(selectedItem1)}
                key={`${item}-${index + 1}`}
                onClickDrop={() => null}
                slotType="inHand"
                trade
                tradeItem={onTrade}
                wounded={tradePartner.wounded}
              />
            ))}
          </CharItems>
          <CharItems slotType="inBackpack" trade>
            {tradePartner.inBackpack.map((item, index) => (
              <ItemsArea
                character={tradePartner.name}
                index={index}
                item={item}
                itemSelected={Boolean(selectedItem1)}
                key={`${item}-${index + 3}`}
                noAudio
                onClickDrop={() => null}
                slotType="inBackpack"
                trade
                tradeItem={onTrade}
                wounded={tradePartner.wounded}
              />
            ))}
          </CharItems>
          <CurrentPartnerTag>Select character to trade with</CurrentPartnerTag>
          <PreviousButton onClick={changeToPreviousPlayer} trade type="button">
            ◄
          </PreviousButton>
          <NextButton onClick={changeToNextPlayer} trade type="button">
            ►
          </NextButton>
        </CharacterTrading>
      )}
      {updatedCharacter && (
        <CharacterTrading>
          <CharacterId>
            <Face src={updatedCharacter.face} alt="" />
            <CharacterName trade>{updatedCharacter.name}</CharacterName>
            <PlayerName color={getCharacterColor(updatedCharacter.name)}>
              {updatedCharacter.player}
            </PlayerName>
          </CharacterId>
          <CharItems slotType="inHand" trade>
            {updatedCharacter.inHand.map((item, index) => (
              <ItemsArea
                character={updatedCharacter.name}
                index={index}
                item={item}
                itemSelected={Boolean(selectedItem1)}
                key={`${item}-${index + 1}`}
                onClickDrop={() => null}
                slotType="inHand"
                trade
                tradeItem={onTrade}
                wounded={updatedCharacter.wounded}
              />
            ))}
          </CharItems>
          <CharItems slotType="inBackpack" trade>
            {updatedCharacter.inBackpack.map((item, index) => (
              <ItemsArea
                character={updatedCharacter.name}
                index={index}
                item={item}
                itemSelected={Boolean(selectedItem1)}
                key={`${item}-${index + 3}`}
                noAudio
                onClickDrop={() => null}
                slotType="inBackpack"
                trade
                tradeItem={onTrade}
                wounded={updatedCharacter.wounded}
              />
            ))}
          </CharItems>
          <CurrentCharacterTag color={getCharacterColor(updatedCharacter.name)}>
            Current Character
          </CurrentCharacterTag>
        </CharacterTrading>
      )}
      <ButtonsWrapper>
        <CancelButton type="button" onClick={() => startTrade(false)}>
          CANCEL
        </CancelButton>
        <ConfirmButton type="button" onClick={() => startTrade(false)}>
          CONFIRM
        </ConfirmButton>
      </ButtonsWrapper>
    </TradeWrapper>
  );
};

TradeArea.propTypes = {
  character: string.isRequired,
  characters: string.isRequired,
  inHand: string.isRequired,
  inBackpack: string.isRequired,
  startTrade: func.isRequired
};

export default TradeArea;

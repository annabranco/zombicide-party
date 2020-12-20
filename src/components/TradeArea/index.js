import React, { useEffect, useRef } from 'react';
import { cloneDeep } from 'lodash';
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
import { IN_BACKPACK, IN_HAND } from '../../constants';

const TradeArea = ({
  spendAction,
  character,
  characters,
  confirmTrade,
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

  const onTrade = ({ item, slot, char }) => {
    if (selectedItem1) {
      if (!item) {
        selectItem1();
      } else {
        const updChar = cloneDeep(updatedCharacter);
        const updPartn = cloneDeep(tradePartner);
        const typeItem1 = selectedItem1.slot <= 2 ? IN_HAND : IN_BACKPACK;
        const typeItem2 = slot <= 2 ? IN_HAND : IN_BACKPACK;
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
            updateCharacter(updChar);
          } else {
            updPartn[typeItem1][index1] = item === 'none' ? null : item;
            updPartn[typeItem2][index2] =
              selectedItem1.item === 'none' ? null : selectedItem1.item;
            updatePartner(updPartn);
          }
        } else if (selectedItem1.item === 'Wounded' || item === 'Wounded') {
          console.log('NOT');
        } else if (selectedItem1.char === updChar.name) {
          updChar[typeItem1][index1] = item === 'none' ? null : item;
          updPartn[typeItem2][index2] =
            selectedItem1.item === 'none' ? null : selectedItem1.item;
          updateCharacter(updChar);
          updatePartner(updPartn);
        } else {
          updPartn[typeItem1][index1] = item === 'none' ? null : item;
          updChar[typeItem2][index2] =
            selectedItem1.item === 'none' ? null : selectedItem1.item;
          updateCharacter(updChar);
          updatePartner(updPartn);
        }
        selectItem1();
        establishTrade(true);
      }
    } else {
      selectItem1({ item, slot, char });
    }
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
                charName={tradePartner.name}
                index={index}
                item={item}
                itemSelected={Boolean(selectedItem1)}
                key={`${item}-${index + 1}`}
                onClickDrop={onClickDrop}
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
                charName={tradePartner.name}
                index={index}
                item={item}
                itemSelected={Boolean(selectedItem1)}
                key={`${item}-${index + 3}`}
                noAudio
                onClickDrop={onClickDrop}
                slotType="inBackpack"
                trade
                tradeItem={onTrade}
                wounded={tradePartner.wounded}
              />
            ))}
          </CharItems>
          {!tradeEstablished && (
            <>
              <PreviousButton
                onClick={changeToPreviousPlayer}
                trade
                type="button"
              >
                ◄
              </PreviousButton>
              <NextButton onClick={changeToNextPlayer} trade type="button">
                ►
              </NextButton>
            </>
          )}

          <CurrentPartnerTag>
            {tradeEstablished
              ? `Trading with ${tradePartner.name}`
              : 'Select character to trade with'}
          </CurrentPartnerTag>
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
                charName={updatedCharacter.name}
                index={index}
                item={item}
                itemSelected={Boolean(selectedItem1)}
                key={`${item}-${index + 1}`}
                onClickDrop={onClickDrop}
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
                charName={updatedCharacter.name}
                index={index}
                item={item}
                itemSelected={Boolean(selectedItem1)}
                key={`${item}-${index + 3}`}
                noAudio
                onClickDrop={onClickDrop}
                slotType="inBackpack"
                trade
                tradeItem={onTrade}
                wounded={updatedCharacter.wounded}
              />
            ))}
          </CharItems>
          {/* <CurrentCharacterTag color={getCharacterColor(updatedCharacter.name)}>
            Current Character
          </CurrentCharacterTag> */}
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
  spendAction: func.isRequired,
  startTrade: func.isRequired
};

export default TradeArea;

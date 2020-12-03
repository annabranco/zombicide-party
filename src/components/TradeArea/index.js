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

  const [inHand, updateInHand] = useStateWithLabel(['', ''], 'inHand');
  const [inBackpack, updateInBackpack] = useStateWithLabel(
    ['', '', ''],
    'inBackpack'
  );
  const [inPartnersHand, updatePartnersInHand] = useStateWithLabel(
    ['', ''],
    'inPartnersHand'
  );
  const [inPartnersBackpack, updatePartnersInBackpack] = useStateWithLabel(
    ['', '', ''],
    'inPartnersBackpack'
  );

  const [selectedItem1, selectItem1] = useStateWithLabel(
    ['', '', ''],
    'selectedItem1'
  );

  const [selectedItem2, selectItem2] = useStateWithLabel(
    ['', '', ''],
    'selectedItem2'
  );

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
    const updChar = characters.filter(char => char.name !== character.name);

    updateCharacter({ ...character });
    updateCharacters(updChar);
    changeTradePartner(updChar[0]);
    updateInHand([...character.inHand]);
    updateInBackpack([...character.inBackpack]);
    updatePartnersInHand([...updChar[0].inHand]);
    updatePartnersInBackpack([...updChar[0].inBackpack]);

    console.log('$$$ currentInHand', currentInHand);
  }, [
    changeTradePartner,
    character,
    characters,
    currentInHand,
    currentInBackpack,
    updateCharacter,
    updateCharacters,
    updateInHand,
    updateInBackpack,
    updatePartnersInHand,
    updatePartnersInBackpack
  ]);

  useEffect(() => {
    // eslint-disable-next-line no-debugger
    debugger;
    if (updatedCharacters && partnerIndex !== prevPartnerIndex.current) {
      const nextPartner = updatedCharacters[partnerIndex];
      changeTradePartner(nextPartner);
      updatePartnersInHand([...nextPartner.inHand]);
      updatePartnersInBackpack([...nextPartner.inBackpack]);
      prevPartnerIndex.current = partnerIndex;
    }
  }, [partnerIndex]);

  const onSelectSlot = (name, slot) => {
    if (selectedItem1) {
      console.log('$$$ selectedItem2', name, slot);
    } else {
      console.log('$$$ selectedItem1', name, slot);
      selectItem1([name, slot]);
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
            {inPartnersHand.map((item, index) => (
              <ItemsArea
                index={index}
                item={item}
                key={`${item}-${index + 1}`}
                onClickDrop={() => null}
                selectSlot={onSelectSlot}
                slotType="inHand"
                trade
                wounded={character.wounded}
              />
            ))}
          </CharItems>
          <CharItems slotType="inBackpack" trade>
            {inPartnersBackpack.map((item, index) => (
              <ItemsArea
                index={index}
                item={item}
                key={`${item}-${index + 3}`}
                noAudio
                onClickDrop={() => null}
                selectSlot={onSelectSlot}
                slotType="inBackpack"
                trade
                wounded={character.wounded}
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

      <CharacterTrading>
        <CharacterId>
          <Face src={character.face} alt="" />
          <CharacterName trade>{character.name}</CharacterName>
          <PlayerName color={getCharacterColor(character.name)}>
            {character.player}
          </PlayerName>
        </CharacterId>
        <CharItems slotType="inHand" trade>
          {inHand.map((item, index) => (
            <ItemsArea
              index={index}
              item={item}
              key={`${item}-${index + 1}`}
              onClickDrop={() => null}
              selectSlot={() => null}
              slotType="inHand"
              trade
              wounded={character.wounded}
            />
          ))}
        </CharItems>
        <CharItems slotType="inBackpack" trade>
          {inBackpack.map((item, index) => (
            <ItemsArea
              index={index}
              item={item}
              key={`${item}-${index + 3}`}
              noAudio
              onClickDrop={() => null}
              selectSlot={() => null}
              slotType="inBackpack"
              trade
              wounded={character.wounded}
            />
          ))}
        </CharItems>
        <CurrentCharacterTag color={getCharacterColor(character.name)}>
          Current Character
        </CurrentCharacterTag>
      </CharacterTrading>
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

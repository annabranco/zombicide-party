import React, { useContext, useEffect, useRef } from 'react';
import { cloneDeep } from 'lodash';
import { arrayOf, bool, func, number, oneOfType, string } from 'prop-types';
import { AppContext } from '../../setup/context';
import { ALL_WEAPONS } from '../../setup/weapons';
import { getCharacterColor, logger, useStateWithLabel } from '../../utils';
import ItemsArea from '../Items/ItemsArea';
import {
  IN_HAND,
  IN_RESERVE,
  LOG_REORDER,
  LOG_TYPE_EXTENDED,
  LOG_TRADE,
  NONE,
  SELECT_TRADE_PARTNER,
  TRADING_WITH,
  WOUNDED,
  TRADE,
  TOUR_WEAPONS_TO_WANDA,
  TOUR_WEAPONS_TO_AMY
} from '../../constants';
import { CharacterType } from '../../interfaces/types';
import { ArrowSign, CharItems } from '../Sections/PlayersSection/styles';
import {
  ButtonsWrapper,
  CancelButton,
  CharacterId,
  CharacterTrading,
  CharacterTradingName,
  ConfirmButton,
  CurrentPartnerTag,
  Face,
  NavButtonsWrapper,
  PlayerName,
  TradeWrapper
} from './styles';

const TradeArea = ({
  character,
  characters,
  checkIfCharHasDualEffect,
  confirmTrade,
  device,
  goToNextTourStep,
  onClickEndTurn,
  reorder,
  setupMode,
  spendAction,
  startTrade,
  tourMode
}) => {
  const [partnerIndex, changePartnerIndex] = useStateWithLabel(
    0,
    'partnerIndex'
  );
  const [selectedItem1, selectItem1] = useStateWithLabel(null, 'selectedItem1');
  const [tradeEstablished, establishTrade] = useStateWithLabel(
    null,
    'tradeEstablished'
  );
  const [updatedCharacter, updateCharacter] = useStateWithLabel(
    null,
    'updatedCharacter'
  );
  const [updatedCharacters, updateCharacters] = useStateWithLabel(
    null,
    'updatedCharacters'
  );
  const [tradePartner, updatePartner] = useStateWithLabel(null, 'tradePartner');

  const { context } = useContext(AppContext);

  const initialTradingMessage = () => {
    if (tourMode === 53) {
      return TOUR_WEAPONS_TO_WANDA;
    }
    if (tourMode === 56) {
      return TOUR_WEAPONS_TO_AMY;
    }
    return SELECT_TRADE_PARTNER;
  };

  const changeToNextPlayer = () => {
    const nextPlayerIndex =
      partnerIndex + 1 >= updatedCharacters.length ? 0 : partnerIndex + 1;
    changePartnerIndex(nextPlayerIndex);
  };

  const changeToPreviousPlayer = () => {
    const nextPlayerIndex =
      partnerIndex - 1 < 0 ? updatedCharacters.length - 1 : partnerIndex - 1;
    // updateCharacters(updatedCharacters);
    changePartnerIndex(nextPlayerIndex);
  };

  const prevPartnerIndex = useRef();

  const onClickConfirm = () => {
    const updCharsAfterTrade = cloneDeep(characters);
    updCharsAfterTrade.forEach((char, index) => {
      if (char.name === updatedCharacter.name) {
        updCharsAfterTrade[index] = updatedCharacter;
      } else if (tradePartner && char.name === tradePartner.name) {
        updCharsAfterTrade[index] = tradePartner;
      }
    });
    confirmTrade(updatedCharacter, updCharsAfterTrade);
    startTrade(false);
    establishTrade(false);
    if (!reorder && !setupMode) {
      spendAction(TRADE);
    }

    if (tourMode === 36 || tourMode === 53 || tourMode === 56) {
      goToNextTourStep();
    }
  };

  const onTrade = ({ item, slot, charTrading }) => {
    if (selectedItem1) {
      if (!item) {
        selectItem1();
      } else {
        const updChar = cloneDeep(updatedCharacter);
        const typeItem1 = selectedItem1.slot <= 2 ? IN_HAND : IN_RESERVE;
        const typeItem2 = slot <= 2 ? IN_HAND : IN_RESERVE;
        const index1 =
          selectedItem1.slot <= 2
            ? selectedItem1.slot - 1
            : selectedItem1.slot - 3;
        const index2 = slot <= 2 ? slot - 1 : slot - 3;
        const expBaton = ALL_WEAPONS.ExpandableBaton.name.replace(' ', '');
        let updPartn;

        if (tradePartner) {
          updPartn = cloneDeep(tradePartner);
        }

        if (selectedItem1.item === NONE && item === NONE) {
          return null;
        }

        if (selectedItem1.charTrading === charTrading) {
          // Reordering own items
          if (updChar.name === charTrading) {
            // Active player reordering
            const oldReserve = [...updChar.inReserve];
            updChar[typeItem1][index1] = item === NONE ? null : item;
            updChar[typeItem2][index2] =
              selectedItem1.item === NONE ? null : selectedItem1.item;

            if (
              oldReserve.includes(expBaton) &&
              !updChar.inReserve.includes(expBaton)
            ) {
              const emptySlot = updChar.inReserve.indexOf(
                itemInReserve => !itemInReserve || item === NONE
              );
              if (emptySlot !== -1) {
                updChar.inReserve.splice(
                  oldReserve.findIndex(
                    itemInReserve => itemInReserve === expBaton
                  ),
                  1
                );
              } else {
                updChar.inReserve.splice(emptySlot, 1);
              }
            } else if (
              !oldReserve.includes(expBaton) &&
              updChar.inReserve.includes(expBaton)
            ) {
              updChar.inReserve.push(null);
            }
            checkIfCharHasDualEffect(updChar.inHand);
            updateCharacter(updChar);
            logger(
              LOG_TYPE_EXTENDED,
              LOG_REORDER,
              updChar.name,
              `[hand: ${updatedCharacter.inHand.toString()}, reserve: ${updatedCharacter.inReserve.toString()}] => [hand: ${updChar.inHand.toString()}, reserve: ${updChar.inReserve.toString()}]`
            );
          } else {
            // Trading partner reordering
            const oldReserve = [...updPartn.inReserve];

            updPartn[typeItem1][index1] = item === NONE ? null : item;
            updPartn[typeItem2][index2] =
              selectedItem1.item === NONE ? null : selectedItem1.item;

            if (
              oldReserve.includes(expBaton) &&
              !updPartn.inReserve.includes(expBaton)
            ) {
              const emptySlot = updPartn.inReserve.indexOf(
                itemInReserve => !itemInReserve || item === NONE
              );
              if (emptySlot !== -1) {
                updPartn.inReserve.splice(
                  oldReserve.findIndex(
                    itemInReserve => itemInReserve === expBaton
                  ),
                  1
                );
              } else {
                updPartn.inReserve.splice(emptySlot, 1);
              }
            } else if (
              !oldReserve.includes(expBaton) &&
              updPartn.inReserve.includes(expBaton)
            ) {
              updPartn.inReserve.push(null);
            }
            updatePartner(updPartn);
            logger(
              LOG_TYPE_EXTENDED,
              LOG_REORDER,
              updPartn.name,
              `[hand: ${tradePartner.inHand.toString()}, reserve: ${tradePartner.inReserve.toString()}] => [hand: ${updPartn.inHand.toString()}, reserve: ${updPartn.inReserve.toString()}]`
            );
          }
        } else if (selectedItem1.item === WOUNDED || item === WOUNDED) {
          // do nothing
        } else if (tradePartner) {
          // Trade
          if (selectedItem1.charTrading === updChar.name) {
            // Active character starts trade
            const oldCharReserve = [...updChar.inReserve];
            const oldPartnReserve = [...updPartn.inReserve];

            updChar[typeItem1][index1] = item === NONE ? null : item;
            updPartn[typeItem2][index2] =
              selectedItem1.item === NONE ? null : selectedItem1.item;

            if (
              oldCharReserve.includes(expBaton) &&
              !updChar.inReserve.includes(expBaton)
            ) {
              const emptySlot = updChar.inReserve.indexOf(
                itemInReserve => !itemInReserve || item === NONE
              );
              if (emptySlot !== -1) {
                updChar.inReserve.splice(
                  oldCharReserve.findIndex(
                    itemInReserve => itemInReserve === expBaton
                  ),
                  1
                );
              } else {
                updChar.inReserve.splice(emptySlot, 1);
              }
            } else if (
              !oldCharReserve.includes(expBaton) &&
              updChar.inReserve.includes(expBaton)
            ) {
              updChar.inReserve.push(null);
            }

            if (
              oldPartnReserve.includes(expBaton) &&
              !updPartn.inReserve.includes(expBaton)
            ) {
              const emptySlot = updPartn.inReserve.indexOf(
                itemInReserve => !itemInReserve || item === NONE
              );
              if (emptySlot !== -1) {
                updPartn.inReserve.splice(
                  oldPartnReserve.findIndex(
                    itemInReserve => itemInReserve === expBaton
                  ),
                  1
                );
              } else {
                updPartn.inReserve.splice(emptySlot, 1);
              }
            } else if (
              !oldPartnReserve.includes(expBaton) &&
              updPartn.inReserve.includes(expBaton)
            ) {
              updPartn.inReserve.push(null);
            }
            logger(
              LOG_TYPE_EXTENDED,
              LOG_TRADE,
              `[${updChar.name}] ${selectedItem1.item} <=> ${item} [${updPartn.name}]`
            );
            updateCharacter(updChar);
            updatePartner(updPartn);
          } else {
            // Partner starts trade
            const oldCharReserve = [...updChar.inReserve];
            const oldPartnReserve = [...updPartn.inReserve];

            updPartn[typeItem1][index1] = item === NONE ? null : item;
            updChar[typeItem2][index2] =
              selectedItem1.item === NONE ? null : selectedItem1.item;

            if (
              oldCharReserve.includes(expBaton) &&
              !updChar.inReserve.includes(expBaton)
            ) {
              updChar.inReserve.splice(
                oldCharReserve.findIndex(
                  itemInReserve => itemInReserve === expBaton
                ),
                1
              );
            } else if (
              !oldCharReserve.includes(expBaton) &&
              updChar.inReserve.includes(expBaton)
            ) {
              updChar.inReserve.push(null);
            }

            if (
              oldPartnReserve.includes(expBaton) &&
              !updPartn.inReserve.includes(expBaton)
            ) {
              updPartn.inReserve.splice(
                oldPartnReserve.findIndex(
                  itemInReserve => itemInReserve === expBaton
                ),
                1
              );
            } else if (
              !oldPartnReserve.includes(expBaton) &&
              updPartn.inReserve.includes(expBaton)
            ) {
              updPartn.inReserve.push(null);
            }
            logger(
              LOG_TYPE_EXTENDED,
              LOG_TRADE,
              `[${updPartn.name}] ${selectedItem1.item} <=> ${item} [${updChar.name}]`
            );
            updateCharacter(updChar);
            updatePartner(updPartn);
          }

          checkIfCharHasDualEffect(updChar.inHand);
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
      checkIfCharHasDualEffect(charDropping.inHand);
      updateCharacter(charDropping);
    } else if (charName === tradePartner.name) {
      const charDropping = cloneDeep(tradePartner);
      charDropping[type][index] = null;
      updatePartner(charDropping);
    }
  };

  const checkIfConfirmButtonIsDisabled = () => {
    if (!tourMode) {
      if (updatedCharacter) {
        return false;
      }
      return true;
    }
    if (!tradePartner) {
      if (
        updatedCharacter &&
        updatedCharacter.inHand[0] === 'SubMG' &&
        updatedCharacter.inHand[1] === 'SubMG'
      ) {
        return false;
      }
      return true;
    }
    if (tourMode === 53) {
      if (
        tradePartner.name === 'Wanda' &&
        tradePartner.inHand[0] === 'SubMG' &&
        tradePartner.inHand[1] === 'SubMG'
      ) {
        return false;
      }
      return true;
    }
    if (tourMode === 56) {
      if (
        tradePartner.name === 'Amy' &&
        tradePartner.inHand[0] === 'SubMG' &&
        tradePartner.inHand[1] === 'SubMG'
      ) {
        return false;
      }
      return true;
    }
    return true;
  };

  useEffect(() => {
    const mainChar = cloneDeep(character);
    updateCharacter(mainChar);

    if (!reorder) {
      const updChars = characters.filter(char => char.name !== mainChar.name);
      updateCharacters(updChars);
      updatePartner(updChars[0]);
    }
  }, [
    updatePartner,
    character,
    characters,
    updateCharacter,
    updateCharacters,
    reorder
  ]);

  useEffect(() => {
    if (updatedCharacters && partnerIndex !== prevPartnerIndex.current) {
      const nextPartner = updatedCharacters[partnerIndex];
      updatePartner(nextPartner);
      prevPartnerIndex.current = partnerIndex;
    }
  }, [partnerIndex, updatedCharacters, updatePartner]);

  useEffect(() => {
    if (tourMode === 52) {
      goToNextTourStep();
    }
  }, [goToNextTourStep, tourMode]);

  return (
    <TradeWrapper>
      {updatedCharacter && (
        <CharacterTrading>
          <CharacterId>
            <Face src={updatedCharacter.face} alt="" />
            <CharacterTradingName trade>
              {updatedCharacter.name}
            </CharacterTradingName>
            <PlayerName
              color={getCharacterColor(
                updatedCharacter.name,
                context.characters
              )}
            >
              {updatedCharacter.player}
            </PlayerName>
          </CharacterId>
          <CharItems slotType={IN_HAND} trade>
            {updatedCharacter.inHand.map((item, index) => (
              <ItemsArea
                charName={updatedCharacter.name}
                device={device}
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
                device={device}
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
            <CharacterTradingName trade>
              {tradePartner.name}
            </CharacterTradingName>
            <PlayerName
              color={getCharacterColor(tradePartner.name, context.characters)}
            >
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

          <CurrentPartnerTag
            tourMode={
              (tourMode === 53 && tradePartner.name !== 'Wanda') ||
              (tourMode === 56 && tradePartner.name !== 'Amy')
            }
          >
            {tradeEstablished
              ? TRADING_WITH(tradePartner.name)
              : initialTradingMessage()}
          </CurrentPartnerTag>
        </CharacterTrading>
      )}
      <ButtonsWrapper>
        <CancelButton
          disabled={tourMode && tourMode !== 53 && tourMode !== 56}
          type="button"
          onClick={() => startTrade(false)}
        >
          CANCEL
        </CancelButton>
        <ConfirmButton
          disabled={checkIfConfirmButtonIsDisabled()}
          tourMode={
            tourMode &&
            updatedCharacter &&
            ((!tradePartner &&
              updatedCharacter.inHand[0] === 'SubMG' &&
              updatedCharacter.inHand[1] === 'SubMG') ||
              (tradePartner &&
                tourMode === 53 &&
                tradePartner.name === 'Wanda' &&
                tradePartner.inHand[0] === 'SubMG' &&
                tradePartner.inHand[1] === 'SubMG') ||
              (tradePartner &&
                tourMode === 56 &&
                tradePartner.name === 'Amy' &&
                tradePartner.inHand[0] === 'SubMG' &&
                tradePartner.inHand[1] === 'SubMG'))
          }
          type="button"
          onClick={onClickConfirm}
        >
          CONFIRM
        </ConfirmButton>
      </ButtonsWrapper>
    </TradeWrapper>
  );
};

TradeArea.propTypes = {
  character: CharacterType.isRequired,
  characters: arrayOf(CharacterType).isRequired,
  checkIfCharHasDualEffect: func.isRequired,
  confirmTrade: func.isRequired,
  device: string.isRequired,
  goToNextTourStep: func,
  onClickEndTurn: func,
  reorder: bool.isRequired,
  setupMode: oneOfType([bool, string]).isRequired,
  spendAction: func.isRequired,
  startTrade: func.isRequired,
  tourMode: number
};

TradeArea.defaultProps = {
  goToNextTourStep: () => null,
  onClickEndTurn: () => null,
  tourMode: null
};

export default TradeArea;

import React, { useEffect, useRef } from 'react';
import { arrayOf, bool, func, number, oneOfType, string } from 'prop-types';
import { ALL_WEAPONS } from '../../../setup/weapons';
import {
  checkIfItemCanBeCombined,
  getItemPhoto,
  getItemType,
  logger,
  useStateWithLabel
} from '../../../utils';
import SoundBlock from '../../SoundBlock';
import ActionButton from '../../ActionButton';
import ZombieFace from '../../../assets/images/zombieFace.png';
import { BonusDicesType } from '../../../interfaces/types';
import { AppButton } from '../../Sections/PlayersSection/styles';
import {
  BURNEM_ALL,
  DESKTOP,
  DROP,
  IN_HAND,
  IN_RESERVE,
  ITEM_IN_HAND,
  ITEM_IN_RESERVE,
  LOG_TYPE_EXTENDED,
  MELEE,
  MELEE_RANGED,
  MOBILE,
  NONE,
  RANGED,
  RELOAD,
  RELOAD_ACTION,
  SEARCH_ACTION,
  SLOT_SELECTED,
  SPECIAL,
  WEAPONS
} from '../../../constants';
import {
  ActionButtonIcon,
  ActionButtonsWrapper,
  Item,
  ItemBlank,
  ItemWrapper,
  KillButton,
  KillButtonIcon,
  KillButtonsWrapper
} from './styles';

const ItemsArea = ({
  actionsLeft,
  activateDualEffect,
  allSlotsAreEmpty,
  bonusDices,
  canAttack,
  canBeDeflected,
  canCombine,
  canSearch,
  causeDamage,
  charCanDeflect,
  charName,
  charVoice,
  combineItemSelected,
  combinePair,
  damageMode,
  device,
  dice,
  dropMode,
  dualWeaponEffect,
  forcedKillButtons,
  gainCustomXp,
  gainXp,
  goToNextTourStep,
  index,
  item,
  itemSelected,
  makeNoise,
  numItems,
  onClickCombine,
  onClickDrop,
  round,
  secondarySound,
  selectSlot,
  setupMode,
  slotType,
  spendAction,
  spendSingleUseWeapon,
  trade,
  tradeItem,
  tourMode,
  wounded
}) => {
  const [displaySplash, toggleDisplaySplash] = useStateWithLabel(
    false,
    'displaySplash'
  );
  const [displayCombineButton, toggleDisplayCombineButton] = useStateWithLabel(
    false,
    'displayCombineButton'
  );

  const [isActive, toggleActive] = useStateWithLabel(false, 'isActive');
  const [killButtons, changeKillButtons] = useStateWithLabel([], 'killButtons');
  const [needReload, toggleNeedReload] = useStateWithLabel(false, 'needReload');
  const [firedDual, toggleFiredDual] = useStateWithLabel(false, 'firedDual');
  const [tourKills, updateTourKills] = useStateWithLabel(0, 'tourKills');

  const killButtonsTimer = useRef();
  const dualTimer = useRef();

  const itemsType = getItemType(item);

  const notAvailableOnTourMode = tourMode && tourMode >= 23 && tourMode <= 70;

  const activateKillButtons = () => {
    spendSingleUseWeapon(index, item);
    if (ALL_WEAPONS[item].dice === SPECIAL) {
      gainCustomXp(BURNEM_ALL);
    } else {
      const totalDices = calculateTotalDices();
      const currentPool = killButtons.length;
      const newArray = [...Array(totalDices).keys()].map(
        value => value + currentPool
      );

      toggleFiredDual(true);

      if (dualWeaponEffect) {
        activateDualEffect(totalDices);
      }

      clearTimeout(killButtonsTimer.current);
      changeKillButtons([...killButtons, ...newArray]);

      dualTimer.current = setTimeout(() => {
        toggleFiredDual();
      }, 2000);

      killButtonsTimer.current = setTimeout(() => {
        changeKillButtons([]);
      }, 10000);

      if (tourMode === 29 || tourMode === 37) {
        clearTimeout(killButtonsTimer.current);
      }
    }
  };

  const calculateTotalDices = () => {
    const { combat, melee, ranged } = bonusDices;
    let totalDices;

    totalDices = dice + combat;

    if (ALL_WEAPONS[item].attack === MELEE) {
      totalDices += melee;
    } else if (ALL_WEAPONS[item].attack === RANGED) {
      totalDices += ranged;
    } else if (ALL_WEAPONS[item].attack === MELEE_RANGED) {
      totalDices = totalDices + ranged + melee;
    }
    return totalDices;
  };
  const checkIfReloadIsNeeded = () =>
    ALL_WEAPONS[item] && ALL_WEAPONS[item].needsReloading;

  const forceActivateKillButtons = fkbuttons => {
    if (!firedDual) {
      const currentPool = killButtons.length;
      const newArray = [...Array(fkbuttons).keys()].map(
        value => value + currentPool
      );

      clearTimeout(killButtonsTimer.current);
      changeKillButtons([...killButtons, ...newArray]);

      if (tourMode === 38) {
        return;
      }

      killButtonsTimer.current = setTimeout(() => {
        changeKillButtons([]);
      }, 10000);
    }
  };

  const getSlotNumber = itemIndex => {
    const adj = slotType === IN_HAND ? 1 : 3;
    return itemIndex + adj;
  };

  const onClickCard = () => {
    const slot = getSlotNumber(index);
    if (setupMode) {
      onClickEmptyCard();
    } else if (damageMode) {
      causeDamage(slot);
    } else if (trade) {
      if (itemSelected) {
        tradeItem({ item: null, slot, charTrading: charName });
      } else {
        tradeItem({ item, slot, charTrading: charName });
      }
    } else if (
      checkIfItemCanBeCombined(item) &&
      canCombine &&
      device !== DESKTOP
    ) {
      toggleDisplayCombineButton(true);
      setTimeout(() => {
        toggleDisplayCombineButton(false);
      }, 3000);
    } else {
      changeSlot();
    }
  };

  const changeSlot = () => {
    toggleActive(false);
    logger(
      LOG_TYPE_EXTENDED,
      SLOT_SELECTED,
      index + (itemsType === WEAPONS ? 1 : 3)
    );
    selectSlot(index + (itemsType === WEAPONS ? 1 : 3));
  };

  const onClickEmptyCard = () => {
    const slot = getSlotNumber(index);

    if (tourMode && slotType === IN_RESERVE) {
      return;
    }
    if (
      tourMode &&
      (tourMode === 13 || tourMode === 17 || tourMode === 20 || tourMode === 33)
    ) {
      goToNextTourStep();
    } else if (tourMode) {
      return;
    }

    if (damageMode) {
      if (allSlotsAreEmpty) {
        causeDamage(slot);
      }
    } else if (trade) {
      if (itemSelected) {
        tradeItem({ item: null, slot, charTrading: charName });
      } else {
        tradeItem({ item: NONE, slot, charTrading: charName });
      }
    } else if (canSearch || setupMode) {
      logger(LOG_TYPE_EXTENDED, SLOT_SELECTED, slot);
      selectSlot(slot);
    }
  };

  const killOneZombie = pressedButton => {
    const updatedKillButtons = [...killButtons];

    toggleDisplaySplash(true);
    setTimeout(() => {
      toggleDisplaySplash(false);
    }, 350);

    clearTimeout(killButtonsTimer.current);
    killButtonsTimer.current = setTimeout(() => {
      changeKillButtons([]);
    }, 7000);
    updatedKillButtons[pressedButton] = `${pressedButton}`;
    changeKillButtons(updatedKillButtons);
    gainXp(1);

    if (tourMode === 30 || (tourMode === 38 && tourKills === 2)) {
      goToNextTourStep();
      updateTourKills(0);
    } else if (tourMode === 37 || tourMode === 38) {
      updateTourKills(tourKills + 1);
    }
  };

  const reload = weapon => {
    if (needReload) {
      spendAction(RELOAD);
      toggleNeedReload(false);
    }
  };

  const spendAmmo = () => {
    toggleNeedReload(true);
  };

  useEffect(() => {
    toggleNeedReload(false);
  }, [charName, toggleNeedReload]);

  useEffect(() => {
    if (forcedKillButtons > 0) {
      forceActivateKillButtons(forcedKillButtons);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [forcedKillButtons]);

  useEffect(() => {
    return () => {
      clearTimeout(killButtonsTimer.current);
      clearTimeout(dualTimer.current);
    };
  }, []);

  return (
    <ItemWrapper
      id={`${item}-${index + 1}`}
      isActive={isActive}
      numItems={numItems}
      onMouseOut={!device === MOBILE ? () => toggleActive(false) : null}
      onMouseOver={!device === MOBILE ? () => toggleActive(true) : null}
      slotType={slotType}
      tourMode={
        tourMode &&
        slotType === IN_HAND &&
        (tourMode === 13 ||
          tourMode === 17 ||
          tourMode === 20 ||
          (tourMode === 33 && !item))
      }
      type={itemsType}
    >
      <Item damageMode={damageMode} trade={trade}>
        {item ? (
          <SoundBlock
            activateKillButtons={activateKillButtons}
            callback={spendAction}
            canAttack={canAttack}
            canBeDeflected={canBeDeflected}
            canCombine={canCombine && canCombine.includes(item)}
            charCanDeflect={charCanDeflect}
            combineItemSelected={combineItemSelected}
            combinePair={combinePair}
            damageMode={damageMode}
            displayCombineButton={displayCombineButton}
            goToNextTourStep={goToNextTourStep}
            img={getItemPhoto(item, slotType)}
            isMobile={device === MOBILE}
            isSelected={itemSelected}
            makeNoise={makeNoise}
            name={item}
            needsToBeReloaded={checkIfReloadIsNeeded()}
            onClickCard={onClickCard}
            onClickCombine={onClickCombine}
            round={round}
            secondarySound={secondarySound}
            setupMode={setupMode}
            slot={getSlotNumber(index)}
            slotType={slotType}
            specificSound={ALL_WEAPONS[item] && ALL_WEAPONS[item].sound}
            spendAmmo={spendAmmo}
            tourMode={tourMode}
            trade={trade}
            type={itemsType}
            unloaded={needReload}
            wounded={wounded}
          />
        ) : (
          <ItemBlank
            allSlotsAreEmpty={allSlotsAreEmpty}
            canSearch={notAvailableOnTourMode || canSearch}
            damageMode={damageMode}
            isSelected={itemSelected}
            onClick={onClickEmptyCard}
            setupMode={setupMode}
            trade={trade}
          >
            {!trade &&
              (slotType === IN_HAND ? (
                <p>{ITEM_IN_HAND}</p>
              ) : (
                <p>{ITEM_IN_RESERVE}</p>
              ))}
            {!notAvailableOnTourMode &&
              canSearch &&
              !damageMode &&
              !setupMode && (
                <ActionButton
                  actionType={SEARCH_ACTION}
                  callback={onClickEmptyCard}
                  type={charVoice}
                />
              )}
          </ItemBlank>
        )}
      </Item>
      <ActionButtonsWrapper trade={trade} visible={dropMode}>
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
            <ActionButtonIcon className="far fa-trash-alt" type={DROP} />
          </AppButton>
        )}
      </ActionButtonsWrapper>
      {needReload && (
        <ActionButton
          actionType={RELOAD_ACTION}
          callback={reload}
          isMobile={device === MOBILE}
          type="center"
        />
      )}
      {killButtons.length > 0 && (
        <KillButtonsWrapper displaySplash={displaySplash}>
          {killButtons.map(key => (
            <KillButton
              attack={ALL_WEAPONS[item] && ALL_WEAPONS[item].attack}
              key={`kill-${item}-${key}`}
              onClick={() => killOneZombie(key)}
              tourMode={tourMode === 30}
              type="button"
              trade
              visible={typeof key === 'number'}
            >
              <KillButtonIcon src={ZombieFace} type="kill" />
            </KillButton>
          ))}
        </KillButtonsWrapper>
      )}
    </ItemWrapper>
  );
};

ItemsArea.propTypes = {
  actionsLeft: number,
  activateDualEffect: func,
  allSlotsAreEmpty: bool,
  bonusDices: BonusDicesType,
  canAttack: bool,
  canBeDeflected: bool,
  canCombine: oneOfType([arrayOf(string), bool]),
  canSearch: bool,
  causeDamage: func,
  charCanDeflect: bool,
  charName: string,
  charVoice: string,
  combineItemSelected: bool,
  combinePair: bool,
  damageMode: oneOfType([string, bool]),
  device: string.isRequired,
  dice: oneOfType([number, string]),
  dropMode: bool,
  dualWeaponEffect: bool,
  forcedKillButtons: number,
  gainCustomXp: func,
  gainXp: func,
  goToNextTourStep: func,
  index: number.isRequired,
  item: string,
  itemSelected: bool,
  makeNoise: func,
  numItems: number,
  onClickCombine: func,
  onClickDrop: func.isRequired,
  round: number,
  secondarySound: bool,
  selectSlot: func,
  setupMode: oneOfType([string, bool]),
  slotType: string.isRequired,
  spendAction: func,
  spendSingleUseWeapon: func,
  tourMode: number,
  trade: bool,
  tradeItem: func,
  wounded: bool.isRequired
};

ItemsArea.defaultProps = {
  actionsLeft: null,
  activateDualEffect: () => null,
  allSlotsAreEmpty: false,
  bonusDices: null,
  canAttack: false,
  canBeDeflected: false,
  canCombine: null,
  canSearch: false,
  causeDamage: null,
  charCanDeflect: false,
  charName: null,
  charVoice: null,
  combineItemSelected: false,
  combinePair: false,
  damageMode: false,
  dice: null,
  dropMode: false,
  dualWeaponEffect: false,
  forcedKillButtons: null,
  gainCustomXp: () => null,
  gainXp: () => null,
  goToNextTourStep: () => null,
  item: null,
  itemSelected: false,
  makeNoise: () => null,
  numItems: null,
  onClickCombine: () => null,
  round: null,
  secondarySound: false,
  selectSlot: () => null,
  setupMode: null,
  spendAction: () => null,
  spendSingleUseWeapon: () => null,
  tourMode: null,
  trade: false,
  tradeItem: () => null
};

export default ItemsArea;

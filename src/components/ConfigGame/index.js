import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { bool, func, instanceOf, string } from 'prop-types';
import { useStateWithLabel } from '../../utils';
import Season1 from '../../assets/images/sets/season1.jpg';
import DogZ from '../../assets/images/sets/dogz.jpg';
import Kopinski from '../../assets/images/sets/kopinski.jpg';

import {
  CANCEL,
  GO_ON,
  NEW_GAME_WARNING,
  MANAGE_PLAYERS,
  CHOOSE_PLAYER_DYNAMIC,
  CHOOSE_PLAYER,
  OK,
  PLAYERS_DB_EMPTY,
  WARNING,
  LOCAL_STORAGE_PLAYERS_KEY,
  GENERAL,
  LOST
} from '../../constants';
import {
  ModalButton,
  ModalMessage,
  ModalTitle,
  ModalWindow
} from '../SetupModal/styles';
import { ButtonsArea } from '../MainMenu/styles';
import {
  ConfigSection,
  ConfigTitle,
  CoversWrapper,
  ConfigWrapper,
  Cover,
  CoverLabel,
  RuleSwitch,
  RulesWrapper
} from './styles';

const ConfigGame = ({ toggleConfig }) => {
  const [setLabel, changeSetLabel] = useStateWithLabel(null, 'setLabel');
  const [expansionLabel, changeExpansionLabel] = useStateWithLabel(
    null,
    'expansionLabel'
  );
  const [expansionsSelected, updateExpansionsSelected] = useStateWithLabel(
    new Set(),
    'expansionsSelected'
  );
  const [rules, changeRules] = useStateWithLabel(
    {
      cars: false,
      editInGame: true,
      addChars: false,
      timer: true,
      explosion: false,
      objectives: true,
      exit: true,
      findCombinedItems: false,
      abominationInstantKill: false
    },
    'rules'
  );

  const confirmConfig = () => {
    console.log(expansionsSelected, rules);
    toggleConfig(false);
  };

  const handleChange = event => {
    changeRules({ ...rules, [event.target.name]: event.target.checked });
  };

  const onClickExpansion = expansion => {
    const selExpans = new Set([...expansionsSelected]);
    if (selExpans.has(expansion)) {
      selExpans.delete(expansion);
      updateExpansionsSelected(selExpans);
    } else {
      selExpans.add(expansion);
      updateExpansionsSelected(selExpans);
    }
  };

  return (
    <ModalWindow type="config" visible>
      <ModalTitle>Config New Game</ModalTitle>
      <ModalMessage>Confirm or change next game config</ModalMessage>
      <ConfigWrapper>
        <ConfigSection>
          <ConfigTitle>Game sets</ConfigTitle>
          <CoversWrapper>
            <Cover
              active
              src={Season1}
              onMouseOver={() => changeSetLabel('Season 1')}
              onMouseOut={() => changeSetLabel()}
              onClick={() => changeSetLabel('Cannot be unselected')}
            />
            <CoverLabel>{setLabel}</CoverLabel>
          </CoversWrapper>
        </ConfigSection>
        <ConfigSection>
          <ConfigTitle>Expansions</ConfigTitle>
          <CoversWrapper>
            <Cover
              active={expansionsSelected.has('DogZ')}
              src={DogZ}
              medium
              onMouseOver={() => changeExpansionLabel('DogZ')}
              onMouseOut={() => changeExpansionLabel()}
              onClick={() => onClickExpansion('DogZ')}
            />
            <Cover
              src={Kopinski}
              medium
              onMouseOver={() =>
                changeExpansionLabel('Special Guest: Karl Kopinski')
              }
              onMouseOut={() => changeExpansionLabel()}
              onClick={() => onClickExpansion('Special Guest: Karl Kopinski')}
              active={expansionsSelected.has('Special Guest: Karl Kopinski')}
            />
            <Cover
              src={Season1}
              small
              onMouseOver={() =>
                changeExpansionLabel('Night Shift Campaign (beta)')
              }
              onMouseOut={() => changeExpansionLabel()}
              onClick={() => onClickExpansion('Night Shift Campaign (beta)')}
              active={expansionsSelected.has('Night Shift Campaign (beta)')}
            />
            <CoverLabel>{expansionLabel}</CoverLabel>
          </CoversWrapper>
        </ConfigSection>
        <ConfigSection>
          <ConfigTitle>Game rules</ConfigTitle>
          <RulesWrapper>
            <FormGroup column>
              <FormControlLabel
                control={
                  <RuleSwitch
                    checked={rules.cars}
                    onChange={handleChange}
                    name="cars"
                    color="primary"
                  />
                }
                label="Mission has cars"
              />
              <FormControlLabel
                control={
                  <RuleSwitch
                    checked={rules.editInGame}
                    onChange={handleChange}
                    name="editInGame"
                  />
                }
                label="Allow editing in-game"
              />

              <FormControlLabel
                control={
                  <RuleSwitch
                    checked={rules.addChars}
                    onChange={handleChange}
                    name="addChars"
                    color="primary"
                  />
                }
                label="Allow new characters in-game"
              />

              <FormControlLabel
                control={
                  <RuleSwitch
                    checked={rules.timer}
                    onChange={handleChange}
                    name="timer"
                    color="primary"
                  />
                }
                label="Use time counter"
              />
              <FormControlLabel
                control={
                  <RuleSwitch
                    checked={rules.explosion}
                    onChange={handleChange}
                    name="explosion"
                    color="primary"
                  />
                }
                label="Enable explosion sound button"
              />
            </FormGroup>
            <FormGroup column>
              <FormControlLabel
                control={
                  <RuleSwitch
                    checked={rules.objectives}
                    onChange={handleChange}
                    name="objectives"
                    color="primary"
                  />
                }
                label="Has objectives tokens"
              />
              <FormControlLabel
                control={
                  <RuleSwitch
                    checked={rules.exit}
                    onChange={handleChange}
                    name="exit"
                    color="primary"
                  />
                }
                label="Has EXIT area"
              />
              <FormControlLabel
                control={
                  <RuleSwitch
                    checked={rules.findCombinedItems}
                    onChange={handleChange}
                    name="findCombinedItems"
                    color="primary"
                  />
                }
                label="Allow finding combined items"
              />
              <FormControlLabel
                control={
                  <RuleSwitch
                    checked={rules.abominationInstantKill}
                    onChange={handleChange}
                    name="abominationInstantKill"
                    color="primary"
                  />
                }
                label="Abomination kills with 1 hit"
              />
            </FormGroup>
          </RulesWrapper>
        </ConfigSection>
      </ConfigWrapper>
      <ButtonsArea>
        <ModalButton
          disabled={false}
          inactive={false}
          onClick={confirmConfig}
          type="accept"
        >
          Looks great!
        </ModalButton>
      </ButtonsArea>
    </ModalWindow>
  );
};

ConfigGame.propTypes = {
  toggleConfig: func.isRequired
};

// ConfigGame.defaultProps = {
//   addPlayer: () => null,
//   dynamic: false,
//   loadedGame: null,
//   playIntro: null,
//   type: null
// };

export default ConfigGame;

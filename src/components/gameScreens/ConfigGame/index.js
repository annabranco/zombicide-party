import React, { useContext, useEffect } from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { func } from 'prop-types';
import { setupGame } from '../../../setup/config';
import { AppContext, GAME_RULES } from '../../../setup/rules';
import { EXPANSIONS, SETS } from '../../../setup/sets';
import { getMediaQuery, logger, useStateWithLabel } from '../../../utils';
import {
  ALL,
  CANT_DESELECT,
  CONFIG_EXPANSIONS,
  CONFIG_RULES,
  CONFIG_SETS,
  CONFIG_GAME,
  CONFIRM,
  CONFIRM_SETTINGS,
  DESKTOP,
  GAME_RULES_TITLE,
  GAME_SETS,
  LOCAL_STORAGE_CONFIG_KEY,
  LOOKS_GREAT,
  LOG_TYPE_CORE,
  UPDATE_CONFIG
} from '../../../constants';
import {
  ModalButton,
  ModalMessage,
  ModalTitle,
  ModalWindow
} from '../SetupModal/styles';
import { ButtonsArea } from '../../mainSections/MainMenu/styles';
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
  const [activeSection, changeActiveSection] = useStateWithLabel(
    CONFIG_RULES,
    'rules'
  );
  const [expansionLabel, changeExpansionLabel] = useStateWithLabel(
    null,
    'expansionLabel'
  );
  const [rules, changeRules] = useStateWithLabel({}, 'rules');
  const [setLabel, changeSetLabel] = useStateWithLabel(null, 'setLabel');

  const { updateContext } = useContext(AppContext);

  const confirmConfig = () => {
    const detailedRules = setupGame(rules);

    localStorage.setItem(LOCAL_STORAGE_CONFIG_KEY, JSON.stringify(rules));
    logger(LOG_TYPE_CORE, UPDATE_CONFIG, {
      rules,
      ...detailedRules
    });
    toggleConfig(false);
    window.gameRules = { rules, ...detailedRules };
    updateContext({ rules, ...detailedRules });
  };

  const handleChange = event => {
    changeRules({ ...rules, [event.target.name]: event.target.checked });
  };

  const onClickButton = () => {
    if (activeSection === CONFIG_SETS) {
      changeActiveSection(CONFIG_EXPANSIONS);
    } else if (activeSection === CONFIG_EXPANSIONS) {
      changeActiveSection(CONFIG_RULES);
    } else {
      confirmConfig();
    }
  };

  const onClickExpansion = expansion => {
    const updRules = { ...rules };
    updRules[expansion] = !updRules[expansion];

    if (expansion === 'nightShift') {
      updRules.season2 = updRules[expansion];
      updRules.season3 = updRules[expansion];
      updRules.angryNeighbors = updRules[expansion];
      updRules.others = updRules[expansion];
    }

    changeRules(updRules);
  };

  useEffect(() => {
    const savedConfig = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_CONFIG_KEY)
    );
    const rulesObj = {};
    GAME_RULES.forEach(rule => {
      if (!rule.disabled) {
        rulesObj[rule.name] = rule.selected;
      }
    });
    Object.keys(SETS).forEach(set => {
      if (!set.disabled) {
        rulesObj[set] = true;
      }
    });
    Object.keys(EXPANSIONS).forEach(expansion => {
      if (!expansion.disabled) {
        rulesObj[expansion] = false;
      }
    });
    if (savedConfig) {
      Object.keys(savedConfig).forEach(rule => {
        rulesObj[rule] = savedConfig[rule];
      });
    }
    changeRules(rulesObj);
  }, [changeRules]);

  useEffect(() => {
    if (getMediaQuery() === DESKTOP) {
      changeActiveSection(ALL);
    } else {
      changeActiveSection(CONFIG_SETS);
    }
  }, [changeActiveSection]);

  return (
    <ModalWindow type="config" visible>
      <ModalTitle>{CONFIG_GAME}</ModalTitle>
      <ModalMessage small>{CONFIRM_SETTINGS}</ModalMessage>
      <ConfigWrapper>
        {(activeSection === ALL || activeSection === CONFIG_SETS) && (
          <ConfigSection>
            <ConfigTitle>{GAME_SETS}</ConfigTitle>
            <CoversWrapper>
              {Object.values(SETS).map(set => (
                <Cover
                  active={rules[set.name]}
                  alt={set.label}
                  key={`Set-${set.name}`}
                  src={set.cover}
                  onMouseOver={() => changeSetLabel(set.label)}
                  onMouseOut={() => changeSetLabel()}
                  onClick={() =>
                    set.deselectable
                      ? onClickExpansion(set.name)
                      : changeSetLabel(CANT_DESELECT)
                  }
                />
              ))}
              <CoverLabel>{setLabel}</CoverLabel>
            </CoversWrapper>
          </ConfigSection>
        )}
        {(activeSection === ALL || activeSection === CONFIG_EXPANSIONS) && (
          <ConfigSection>
            <ConfigTitle>{CONFIG_EXPANSIONS}</ConfigTitle>
            <CoversWrapper>
              {Object.values(EXPANSIONS).map(expansion => (
                <Cover
                  active={rules[expansion.name]}
                  alt={expansion.label}
                  key={`Expansion-${expansion.name}`}
                  small
                  src={expansion.cover}
                  onMouseOver={() => changeExpansionLabel(expansion.label)}
                  onMouseOut={() => changeExpansionLabel()}
                  onClick={() =>
                    expansion.deselectable
                      ? onClickExpansion(expansion.name)
                      : changeExpansionLabel(CANT_DESELECT)
                  }
                />
              ))}
              <CoverLabel>{expansionLabel}</CoverLabel>
            </CoversWrapper>
          </ConfigSection>
        )}
        {(activeSection === ALL || activeSection === CONFIG_RULES) && (
          <ConfigSection>
            <ConfigTitle>{GAME_RULES_TITLE}</ConfigTitle>
            <RulesWrapper>
              {Object.keys(rules).length > 0 && (
                <>
                  {window.innerWidth > 1400 ? (
                    <>
                      <FormGroup>
                        {GAME_RULES.filter(rule => rule.order % 2 !== 0).map(
                          rule => (
                            <FormControlLabel
                              control={
                                <RuleSwitch
                                  checked={rules[rule.name]}
                                  onChange={handleChange}
                                  name={rule.name}
                                />
                              }
                              disabled={rule.disabled}
                              key={`rule-${rule.name}`}
                              label={rule.label}
                            />
                          )
                        )}
                      </FormGroup>
                      <FormGroup>
                        {GAME_RULES.filter(rule => rule.order % 2 === 0).map(
                          rule => (
                            <FormControlLabel
                              control={
                                <RuleSwitch
                                  checked={rules[rule.name]}
                                  onChange={handleChange}
                                  name={rule.name}
                                />
                              }
                              disabled={rule.disabled}
                              key={`rule-${rule.name}`}
                              label={rule.label}
                            />
                          )
                        )}
                      </FormGroup>
                    </>
                  ) : (
                    <FormGroup>
                      {GAME_RULES.sort((ruleA, ruleB) =>
                        ruleA.order > ruleB.order ? 1 : -1
                      ).map(rule => (
                        <FormControlLabel
                          control={
                            <RuleSwitch
                              checked={rules[rule.name]}
                              onChange={handleChange}
                              name={rule.name}
                            />
                          }
                          disabled={rule.disabled}
                          key={`rule-${rule.name}`}
                          label={rule.label}
                        />
                      ))}
                    </FormGroup>
                  )}
                </>
              )}
            </RulesWrapper>
          </ConfigSection>
        )}
      </ConfigWrapper>
      <ButtonsArea>
        <ModalButton
          disabled={false}
          inactive={false}
          onClick={onClickButton}
          type="accept"
        >
          {activeSection === ALL || activeSection === CONFIG_RULES
            ? LOOKS_GREAT
            : CONFIRM}
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

import React, { useEffect } from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { func } from 'prop-types';
import { EXPANSIONS, SETS } from '../../setup/sets';
import { useStateWithLabel } from '../../utils';
import { CANT_DESELECT, LOCAL_STORAGE_CONFIG_KEY } from '../../constants';
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
import { GAME_RULES } from '../../setup/rules';

const ConfigGame = ({ toggleConfig }) => {
  const [setLabel, changeSetLabel] = useStateWithLabel(null, 'setLabel');
  const [expansionLabel, changeExpansionLabel] = useStateWithLabel(
    null,
    'expansionLabel'
  );
  const [rules, changeRules] = useStateWithLabel({}, 'rules');

  const confirmConfig = () => {
    console.log({ ...rules });
    localStorage.setItem(
      LOCAL_STORAGE_CONFIG_KEY,
      JSON.stringify({ ...rules })
    );
    toggleConfig(false);
  };

  const handleChange = event => {
    changeRules({ ...rules, [event.target.name]: event.target.checked });
  };

  const onClickExpansion = expansion => {
    const updRules = { ...rules };
    updRules[expansion] = !updRules[expansion];
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

  return (
    <ModalWindow type="config" visible>
      <ModalTitle>Config New Game</ModalTitle>
      <ModalMessage>Confirm or change next game config</ModalMessage>
      <ConfigWrapper>
        <ConfigSection>
          <ConfigTitle>Game sets</ConfigTitle>
          <CoversWrapper>
            {Object.values(SETS).map(set => (
              <Cover
                active
                key={`Set-${set.name}`}
                src={set.cover}
                onMouseOver={() => changeSetLabel(set.name)}
                onMouseOut={() => changeSetLabel()}
                onClick={() => changeSetLabel(CANT_DESELECT)}
              />
            ))}
            <CoverLabel>{setLabel}</CoverLabel>
          </CoversWrapper>
        </ConfigSection>
        <ConfigSection>
          <ConfigTitle>Expansions</ConfigTitle>
          <CoversWrapper>
            {Object.values(EXPANSIONS).map(expansion => (
              <Cover
                active={rules[expansion.name]}
                key={`Expansion-${expansion.name}`}
                medium
                src={expansion.cover}
                onMouseOver={() => changeExpansionLabel(expansion.label)}
                onMouseOut={() => changeExpansionLabel()}
                onClick={() => onClickExpansion(expansion.name)}
              />
            ))}
            <CoverLabel>{expansionLabel}</CoverLabel>
          </CoversWrapper>
        </ConfigSection>
        <ConfigSection>
          <ConfigTitle>Game rules</ConfigTitle>
          <RulesWrapper>
            {Object.keys(rules).length > 0 && (
              <>
                <FormGroup column>
                  {GAME_RULES.filter(rule => rule.order % 2 !== 0).map(rule => (
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
                <FormGroup column>
                  {GAME_RULES.filter(rule => rule.order % 2 === 0).map(rule => (
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
              </>
            )}
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

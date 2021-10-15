import React, { useEffect } from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import { Global } from '@emotion/core';
import { cloneDeep } from 'lodash';
import { setupGame } from '../../setup/config';
import { AppContext } from '../../setup/context';
import { loadSavedGame, logger, useStateWithLabel } from '../../utils';
import ControllerLayer from '../ControllerLayer';
import ErrorBoundary from '../ErrorBoundary';
import ErrorComponent from '../ErrorBoundary/ErrorComponent';
import Home from '../Home';
import MainScreen from '../MainScreen';
import NewGame from '../NewGame';
import NotificationsLayer from '../Notifications/layer';
import { STEPS } from '../Tour';
import {
  CLEAR_LS,
  ERROR_TEXTS_404,
  LOCAL_STORAGE_CONFIG_KEY,
  LOCAL_STORAGE_KEY,
  LOCAL_STORAGE_ROUNDS_KEY,
  LOG_APP_INIT,
  LOG_LOADED_GAME,
  LOG_TYPE_CORE,
  LOG_TYPE_INFO
} from '../../constants';
import { globalStyles } from '../../styles';

window.addEventListener('orientationchange', () => {
  window.location.reload();
});

const App = () => {
  const [initialCharacters, setInitialCharacters] = useStateWithLabel(
    null,
    'initialCharacters'
  );
  const [damageMode, toggleDamageMode] = useStateWithLabel(false, 'damageMode');
  const [loadedGame, loadGame] = useStateWithLabel(null, 'loadedGame');
  const [context, updateContext] = useStateWithLabel({}, 'context');
  const [tourMode, changeTourModeStep] = useStateWithLabel(null, 'tourMode');

  const goToNextTourStep = next => {
    const nextStep = next || next === 0 ? next : STEPS[tourMode].step + 1;

    if (tourMode < STEPS.length - 1) {
      changeTourModeStep(nextStep);
    } else {
      changeTourModeStep(null);
    }
  };

  window.step = goToNextTourStep;

  useEffect(() => {
    const game = loadSavedGame();
    const rules = JSON.parse(localStorage.getItem(LOCAL_STORAGE_CONFIG_KEY));

    logger(LOG_TYPE_CORE, LOG_APP_INIT);

    if (rules) {
      const detailedRules = setupGame(rules);
      window.gameRules = detailedRules;

      updateContext({ ...context, ...detailedRules });
    }

    if (game && game.length !== 0) {
      loadGame(game);
      logger(LOG_TYPE_CORE, LOG_LOADED_GAME, cloneDeep(game));
    } else {
      logger(LOG_TYPE_INFO, CLEAR_LS);
      localStorage.removeItem(LOCAL_STORAGE_ROUNDS_KEY);
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    }
    window.gameDebug = 'extended';
  }, [loadGame]);

  return (
    <HashRouter basename="/">
      <Global styles={globalStyles} />
      <ErrorBoundary>
        <AppContext.Provider value={{ context, updateContext }}>
          <NotificationsLayer
            changeTourModeStep={changeTourModeStep}
            goToNextTourStep={goToNextTourStep}
            tourMode={tourMode}
          />
          <ControllerLayer />
          <Switch>
            <Route
              exact
              path="/"
              render={() => (
                <Home
                  goToNextTourStep={goToNextTourStep}
                  loadedGame={loadedGame}
                  setInitialCharacters={setInitialCharacters}
                  tourMode={tourMode}
                />
              )}
            />
            <Route
              exact
              path="/new"
              render={() => (
                <NewGame
                  goToNextTourStep={goToNextTourStep}
                  loadedGame={Boolean(loadedGame)}
                  setInitialCharacters={setInitialCharacters}
                  tourMode={tourMode}
                />
              )}
            />
            <Route
              exact
              path="/play"
              render={() => (
                <MainScreen
                  damageMode={damageMode}
                  initialCharacters={initialCharacters}
                  goToNextTourStep={goToNextTourStep}
                  loadGame={loadGame}
                  loadedGame={loadedGame}
                  toggleDamageMode={toggleDamageMode}
                  tourMode={tourMode}
                />
              )}
            />
            <Route
              render={() => (
                <ErrorComponent texts={ERROR_TEXTS_404} notifyButtonLink="/" />
              )}
            />
          </Switch>
        </AppContext.Provider>
      </ErrorBoundary>
    </HashRouter>
  );
};

export default App;

import React, { useEffect } from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import { Global } from '@emotion/core';
import { cloneDeep } from 'lodash';
import { loadSavedGame, logger, useStateWithLabel } from '../../utils';
import MainMenu from '../MainMenu';
import NewGame from '../NewGame';
import MainScreen from '../MainScreen';
import ControllerLayer from '../ControllerLayer';
import ErrorBoundary from '../ErrorBoundary';
import ErrorComponent from '../ErrorBoundary/ErrorComponent';
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
import { AppContext } from '../../setup/rules';
import { setupGame } from '../../setup/config';

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

  useEffect(() => {
    const game = loadSavedGame();
    const rules = JSON.parse(localStorage.getItem(LOCAL_STORAGE_CONFIG_KEY));

    logger(LOG_TYPE_CORE, LOG_APP_INIT);

    if (rules) {
      const detailedRules = setupGame(rules);
      window.gameRules = detailedRules;
      updateContext(detailedRules);
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
  }, [loadGame, updateContext]);

  return (
    <HashRouter basename="/">
      <Global styles={globalStyles} />
      <ErrorBoundary>
        <AppContext.Provider value={{ context, updateContext }}>
          <ControllerLayer />
          <Switch>
            <Route
              exact
              path="/"
              render={() => (
                <MainMenu
                  loadedGame={loadedGame}
                  setInitialCharacters={setInitialCharacters}
                />
              )}
            />
            <Route
              exact
              path="/new"
              render={() => (
                <NewGame
                  loadedGame={Boolean(loadedGame)}
                  setInitialCharacters={setInitialCharacters}
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
                  loadGame={loadGame}
                  loadedGame={loadedGame}
                  toggleDamageMode={toggleDamageMode}
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

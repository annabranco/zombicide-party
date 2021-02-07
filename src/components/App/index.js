import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
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
  LOCAL_STORAGE_KEY,
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

  useEffect(() => {
    const game = loadSavedGame();

    logger(LOG_TYPE_CORE, LOG_APP_INIT);

    if (game && game.length !== 0) {
      loadGame(game);
      logger(LOG_TYPE_CORE, LOG_LOADED_GAME, cloneDeep(game));
    } else {
      logger(LOG_TYPE_INFO, CLEAR_LS);
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    }
  }, [loadGame]);

  return (
    <Router>
      <Global styles={globalStyles} />
      <ErrorBoundary>
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
      </ErrorBoundary>
    </Router>
  );
};

export default App;

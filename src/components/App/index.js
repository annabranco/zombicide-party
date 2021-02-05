import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Global } from '@emotion/core';
import { useStateWithLabel } from '../../utils/hooks';
import { LOCAL_STORAGE_KEY, ERROR_TEXTS_404 } from '../../constants';
import MainMenu from '../MainMenu';
import NewGame from '../NewGame';

import { globalStyles } from '../../styles';
import MainScreen from '../MainScreen';
import ControllerLayer from '../ControllerLayer';
import { loadSavedGame } from '../../utils/characters';
import ErrorBoundary from '../ErrorBoundary';
import ErrorComponent from '../ErrorBoundary/ErrorComponent';

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

    if (game && game.length !== 0) {
      loadGame(game);
    } else {
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

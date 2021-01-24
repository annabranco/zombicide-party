import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Global } from '@emotion/core';
import { useStateWithLabel } from '../../utils/hooks';
import { LOCAL_STORAGE_KEY } from '../../constants';
import MainMenu from '../MainMenu';
import NewGame from '../NewGame';

import { globalStyles } from '../../styles';
import MainScreen from '../MainScreen';
import ControllerLayer from '../ControllerLayer';

const App = () => {
  const [initialCharacters, setInitialCharacters] = useStateWithLabel(
    null,
    'initialCharacters'
  );
  const [damageMode, toggleDamageMode] = useStateWithLabel(false, 'damageMode');
  const [loadedGame, loadGame] = useStateWithLabel(null, 'damageMode');
  const [zombiesTurn, setZombiesTurn] = useStateWithLabel(false, 'zombiesTurn');

  useEffect(() => {
    const game = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));

    if (game && game.length !== 0) {
      loadGame(game);
    } else {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    }
  }, [loadGame]);

  return (
    <Router>
      <Global styles={globalStyles} />
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
          path="/new"
          render={() => (
            <NewGame
              loadedGame={Boolean(loadedGame)}
              setInitialCharacters={setInitialCharacters}
            />
          )}
        />
        <Route
          path="/play"
          render={() => (
            <MainScreen
              damageMode={damageMode}
              initialCharacters={initialCharacters}
              loadGame={loadGame}
              loadedGame={loadedGame}
              toggleDamageMode={toggleDamageMode}
              setZombiesTurn={setZombiesTurn}
              zombiesTurn={zombiesTurn}
            />
          )}
        />
      </Switch>
    </Router>
  );
};

export default App;

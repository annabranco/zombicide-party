import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Global } from '@emotion/core';
import { useStateWithLabel } from '../../utils/hooks';
import {
  LOCAL_STORAGE_KEY,
  SECTION_PLAYERS,
  SECTION_ZOMBIES
} from '../../constants';
import MainMenu from '../MainMenu';
import NewGame from '../NewGame';
import Section from '../Sections';
import PlayersSection from '../Sections/PlayersSection';
import ZombiesSection from '../Sections/ZombiesSection';
import { globalStyles } from '../../styles';
import { MainScreen } from './styles';

const App = () => {
  const [initialCharacters, setInitialCharacters] = useStateWithLabel(
    [],
    'initialCharacters'
  );
  const [damageMode, toggleDamageMode] = useStateWithLabel(false, 'damageMode');
  const [loadedGame, loadGame] = useStateWithLabel(null, 'damageMode');
  const [zombiesTurn, setZombiesTurn] = useStateWithLabel(null, 'damageMode');

  useEffect(() => {
    const game = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));

    if (game && game.length !== 0) {
      loadGame(game);
    } else {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    }
  }, []);

  return (
    <Router>
      <Global styles={globalStyles} />
      <Switch>
        <Route
          exact
          path="/"
          render={() => <MainMenu loadedGame={Boolean(loadedGame)} />}
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
            <MainScreen>
              <Section name={SECTION_PLAYERS}>
                <PlayersSection
                  damageMode={damageMode}
                  initialCharacters={initialCharacters}
                  loadGame={loadGame}
                  loadedGame={loadedGame}
                  toggleDamageMode={toggleDamageMode}
                  setZombiesTurn={setZombiesTurn}
                />
              </Section>
              <Section name={SECTION_ZOMBIES}>
                <ZombiesSection
                  damageMode={damageMode}
                  toggleDamageMode={toggleDamageMode}
                  zombiesTurn={zombiesTurn}
                />
              </Section>
            </MainScreen>
          )}
        />
      </Switch>
    </Router>
  );
};

export default App;

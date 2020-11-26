import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Global } from '@emotion/core';
import { useStateWithLabel } from '../../utils/hooks';
import MainMenu from '../MainMenu';
import NewGame from '../NewGame';
import PlayersSection from '../Sections/PlayersSection';
import Section from '../Sections';
import ZombiesSection from '../Sections/ZombiesSection';
import { MainScreen } from './styles';
import { globalStyles } from '../../styles';

const App = () => {
  const [initialCharacters, setInitialCharacters] = useStateWithLabel(
    [],
    'initialCharacters'
  );
  const [damageMode, toggleDamageMode] = useStateWithLabel(false, 'damageMode');

  const loadedGame = JSON.parse(localStorage.getItem('ZombicideParty'));

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
              <Section name="Players">
                <PlayersSection
                  damageMode={damageMode}
                  initialCharacters={initialCharacters}
                  loadedGame={loadedGame}
                  toggleDamageMode={toggleDamageMode}
                />
              </Section>
              <Section name="Zombies">
                <ZombiesSection
                  damageMode={damageMode}
                  toggleDamageMode={toggleDamageMode}
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

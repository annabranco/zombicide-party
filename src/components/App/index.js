import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Global } from '@emotion/core';
import { globalStyles } from '../../styles';
import ZombiesSection from '../areas/ZombiesSection';
import PlayersSection from '../areas/PlayersSection';
import Section from '../Section';
import { MainScreen } from './styles';
import MainMenu from '../MainMenu';
import NewGame from '../NewGame';

const App = () => {
  const [initialCharacters, setInitialCharacters] = useState([]);
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
                  initialCharacters={initialCharacters}
                  loadedGame={loadedGame}
                />
              </Section>
              <Section name="Zombies">
                <ZombiesSection />
              </Section>
            </MainScreen>
          )}
        />
      </Switch>
    </Router>
  );
};

export default App;

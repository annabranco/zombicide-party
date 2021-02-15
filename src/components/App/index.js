import React, { useEffect, useRef } from 'react';
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
import Intro from '../../assets/sounds/music/TheHorrorShowShort.mp3';
import IntroEnd from '../../assets/sounds/intro/ding.mp3';
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

  const intro = useRef(new Audio(Intro));
  const introEnd = useRef(new Audio(IntroEnd));

  const playIntro = () => {
    intro.current.currentTime = 0;
    intro.current.volume = 0.4;
    intro.current.loop = true;
    intro.current.play();
  };

  const stopIntro = () => {
    const fadeInterval = setInterval(() => {
      if (intro.current.volume < 0.1) {
        clearInterval(fadeInterval);
        intro.current.pause();
      } else if (intro.current.volume > 0) {
        intro.current.volume -= 0.05;
      }
    }, 500);
    setTimeout(() => {
      introEnd.current.currentTime = 0;
      introEnd.current.volume = 0.2;
      introEnd.current.play();
    }, 3500);
  };

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
    return () => stopIntro();
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
                  playIntro={playIntro}
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
                  stopIntro={stopIntro}
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

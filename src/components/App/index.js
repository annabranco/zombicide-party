import { Global } from '@emotion/core';
import React, { useState } from 'react';
import { globalStyles } from '../../styles';
import ZombiesSection from '../areas/ZombiesSection';
import PlayersSection from '../areas/PlayersSection';
import Section from '../Section';
import { MainScreen } from './styles';
import MainMenu from '../MainMenu';

const App = () => {
  const [isMainMenuOpen, toggleMainMenu] = useState(true);
  const [loadedCharacters, loadCharacters] = useState(true);

  const loadedGame = JSON.parse(localStorage.getItem('ZombicideParty'));

  const onClickContinue = () => {
    loadCharacters(loadedGame);
    toggleMainMenu(false);
  };

  return (
    <>
      <Global styles={globalStyles} />
      {isMainMenuOpen ? (
        <MainMenu onClickContinue={onClickContinue} />
      ) : (
        <MainScreen>
          <Section name="Players">
            <PlayersSection loadedCharacters={loadedCharacters} />
          </Section>
          <Section name="Zombies">
            <ZombiesSection />
          </Section>
        </MainScreen>
      )}
    </>
  );
};

export default App;

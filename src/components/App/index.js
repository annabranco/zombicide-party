import { Global } from '@emotion/core';
import React, { useState } from 'react';
import { globalStyles } from '../../styles';
import ZombiesSection from '../areas/ZombiesSection';
import PlayersSection from '../areas/PlayersSection';
import Background from '../areas/Background';
import Death from '../areas/Death';
import Section from '../Section';
import { MainScreen } from './styles';

const App = () => {
  return (
    <MainScreen>
      <Global styles={globalStyles} />
      <Section name="Players">
        <PlayersSection />
      </Section>
      <Section name="Zombies">
        <ZombiesSection />
      </Section>
    </MainScreen>
  );
};

export default App;

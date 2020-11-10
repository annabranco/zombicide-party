import { Global } from '@emotion/core';
import React, { useState } from 'react';
import { globalStyles } from '../../styles';
import Activation from '../areas/Activation';
import Attack from '../areas/Attack';
import Background from '../areas/Background';
import Death from '../areas/Death';
import Section from '../Section';
import { MainScreen } from './styles';

const App = () => {
  const [showMusicArea, ToggleMusicArea] = useState(false);
  const [showActivationArea, ToggleActivationArea] = useState(true);
  const [showAttackArea, ToggleAttackArea] = useState(true);
  const [showDeathArea, ToggleDeathArea] = useState(false);

  const openActivation = () => {
    ToggleActivationArea(true);
    ToggleAttackArea(false);
  };

  const openAttack = () => {
    ToggleActivationArea(false);
    ToggleAttackArea(true);
  };

  return (
    <>
      <MainScreen>
        <Global styles={globalStyles} />
        <Section name="Players" state={showAttackArea} action={openAttack}>
          {showAttackArea && <Attack />}
        </Section>
        <Section
          name="Zombies"
          state={showActivationArea}
          action={openActivation}
        >
          {showActivationArea && <Activation />}
        </Section>
      </MainScreen>
    </>
  );
};

export default App;

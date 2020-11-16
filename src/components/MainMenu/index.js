import React, { useEffect, useState } from 'react';
import { func } from 'prop-types';
import appInfo from '../../../package.json';
import {
  ActionButton,
  MainTitle,
  MenuScreen,
  TestButton,
  ThunderOverlay,
  Version
} from './styles';
import BG from '../../assets/images/background/background.jpg';
import Storm from '../../assets/sounds/intro/intro.mp3';
import Horde from '../../assets/sounds/activations/Horde1.mp3';

const MainMenu = ({ onClickContinue }) => {
  const [testSound, toggleTestSound] = useState(false);
  const APP_VERSION = appInfo.version;

  useEffect(() => {
    const storm = new Audio(Storm);
    const horde = new Audio(Horde);
    if (testSound) {
      storm.currentTime = 0;
      horde.currentTime = 0;
      storm.loop = true;
      horde.loop = true;
      storm.volume = 1;
      horde.volume = 0.6;

      storm.play();
      horde.play();
    }
    return () => {
      storm.pause();
      horde.pause();
    };
  }, [testSound]);

  return (
    <MenuScreen img={BG}>
      <ThunderOverlay testSound={testSound} />
      <MainTitle>ZOMBICIDE PARTY</MainTitle>
      <ActionButton>New Game</ActionButton>
      <ActionButton onClick={onClickContinue}>Continue</ActionButton>
      <TestButton onClick={() => toggleTestSound(!testSound)}>
        {testSound ? 'Stop Sound' : 'Test Sound'}
      </TestButton>

      <Version>{APP_VERSION}</Version>
    </MenuScreen>
  );
};

MainMenu.propTypes = {
  onClickContinue: func.isRequired
};

export default MainMenu;

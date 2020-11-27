import React, { useEffect, useRef } from 'react';
import { bool } from 'prop-types';
import appInfo from '../../../package.json';
import { useStateWithLabel } from '../../utils/hooks';
import BG from '../../assets/images/background/background.jpg';
import Logo from '../../assets/images/logo.png';
import Storm from '../../assets/sounds/intro/intro.mp3';
import Horde from '../../assets/sounds/activations/Horde1.mp3';
import {
  ActionButton,
  ButtonsArea,
  LogoArea,
  MainTitle,
  MenuScreen,
  StyledLink,
  TestButton,
  ThunderOverlay,
  Version,
  ZombicideLogo,
  ZombieIntro
} from './styles';
import { ZOMBIES_INTRO } from '../../setup/zombies';

const MainMenu = ({ loadedGame }) => {
  const [testSound, toggleTestSound] = useStateWithLabel(false, 'testSound');
  const APP_VERSION = appInfo.version;
  const zombieImage = useRef(ZOMBIES_INTRO[Math.floor(Math.random() * 4)]);

  useEffect(() => {
    const storm = new Audio(Storm);
    const horde = new Audio(Horde);
    if (testSound) {
      storm.currentTime = 0;
      horde.currentTime = 0;
      storm.loop = true;
      horde.loop = true;
      storm.volume = 1;
      horde.volume = 0.7;

      storm.play();
      horde.play();
    }
    return () => {
      storm.pause();
      horde.pause();
    };
  }, [testSound]);

  return (
    <MenuScreen img={BG} type="main">
      <ThunderOverlay testSound={testSound} />
      <LogoArea>
        <ZombicideLogo src={Logo} />
        <MainTitle>PARTY</MainTitle>
      </LogoArea>
      <ZombieIntro src={zombieImage.current} />
      <ButtonsArea>
        <StyledLink to="/new">
          <ActionButton>New Game</ActionButton>
        </StyledLink>
        {loadedGame && (
          <StyledLink to="/play">
            <ActionButton>Continue</ActionButton>
          </StyledLink>
        )}
        <TestButton onClick={() => toggleTestSound(!testSound)}>
          {testSound ? 'Stop Sound' : 'Test Sound'}
        </TestButton>
      </ButtonsArea>

      <Version>{APP_VERSION}</Version>
    </MenuScreen>
  );
};

MainMenu.propTypes = {
  loadedGame: bool.isRequired
};

export default MainMenu;

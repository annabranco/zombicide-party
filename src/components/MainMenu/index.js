import React, { useEffect, useRef } from 'react';
import { bool } from 'prop-types';
import appInfo from '../../../package.json';
import { useStateWithLabel } from '../../utils/hooks';
import BG from '../../assets/images/background/background.jpg';
import Logo from '../../assets/images/logo.png';
import {
  SelectionButton,
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
import { STOP_SOUND, TEST_SOUND } from '../../constants';
import { SOUNDS } from '../../assets/sounds';

const MainMenu = ({ loadedGame }) => {
  const [testSound, toggleTestSound] = useStateWithLabel(false, 'testSound');
  const APP_VERSION = appInfo.version;
  const zombieImage = useRef(
    ZOMBIES_INTRO[Math.ceil(Math.random() * ZOMBIES_INTRO.length)]
  );

  useEffect(() => {
    const storm = new Audio(SOUNDS.intro);
    const horde = new Audio(SOUNDS.Horde1);
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
      <ButtonsArea delay>
        <StyledLink to="/new">
          <SelectionButton>New Game</SelectionButton>
        </StyledLink>
        {loadedGame && (
          <StyledLink to="/play">
            <SelectionButton>Continue</SelectionButton>
          </StyledLink>
        )}
        <TestButton onClick={() => toggleTestSound(!testSound)}>
          {testSound ? STOP_SOUND : TEST_SOUND}
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

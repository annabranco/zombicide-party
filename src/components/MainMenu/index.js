import React, { useEffect, useRef } from 'react';
import { bool, func } from 'prop-types';
import appInfo from '../../../package.json';
import { useStateWithLabel } from '../../utils/hooks';
import BG from '../../assets/images/background/background2.jpg';
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
  ZombieImage,
  ZombieImageShadow
} from './styles';
import { ZOMBIES_INTRO } from '../../setup/zombies';
import { CONTINUE, NEW_GAME, STOP_SOUND, TEST_SOUND } from '../../constants';
import { SOUNDS } from '../../assets/sounds';

const MainMenu = ({ loadedGame, setInitialCharacters }) => {
  const [testSound, toggleTestSound] = useStateWithLabel(false, 'testSound');
  const APP_VERSION = appInfo.version;
  const zombieImage = useRef(
    ZOMBIES_INTRO[Math.floor(Math.random() * ZOMBIES_INTRO.length)]
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
      <ZombieImage src={zombieImage.current} />
      <ZombieImageShadow src={zombieImage.current} />
      <ButtonsArea delay>
        <StyledLink to="/new">
          <SelectionButton>{NEW_GAME}</SelectionButton>
        </StyledLink>
        {loadedGame && (
          <StyledLink
            to="/play"
            onClick={() => setInitialCharacters(loadedGame)}
          >
            <SelectionButton>{CONTINUE}</SelectionButton>
          </StyledLink>
        )}
      </ButtonsArea>

      <TestButton onClick={() => toggleTestSound(!testSound)}>
        {testSound ? STOP_SOUND : TEST_SOUND}
      </TestButton>
      <Version>{APP_VERSION}</Version>
    </MenuScreen>
  );
};

MainMenu.propTypes = {
  loadedGame: bool.isRequired,
  setInitialCharacters: func.isRequired
};

export default MainMenu;

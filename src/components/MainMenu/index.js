import React, { useEffect, useRef } from 'react';
import { func, arrayOf } from 'prop-types';
import appInfo from '../../../package.json';
import { ZOMBIES_INTRO } from '../../setup/zombies';
import { logger, useStateWithLabel } from '../../utils';
import NightShiftIntro from './NighShift';
import FogEffect from '../Fog';
import { SOUNDS } from '../../assets/sounds';
import BG from '../../assets/images/background/background2.jpg';
import Logo from '../../assets/images/logo.png';
import {
  CLICK_SOUND_TEST,
  CONTINUE,
  INTRO_IMG_LOADED,
  INTRO_NS_LOADED,
  LOG_TYPE_EXTENDED,
  NEW_GAME,
  STOP_SOUND,
  TEST_SOUND
} from '../../constants';
import { CharacterType } from '../../interfaces/types';
import {
  ButtonsArea,
  LogoArea,
  MainTitle,
  MenuScreen,
  SelectionButton,
  StyledLink,
  TestButton,
  ThunderOverlay,
  Version,
  ZombicideLogo,
  ZombieImage,
  ZombieImageShadow
} from './styles';

const MainMenu = ({ loadedGame, setInitialCharacters }) => {
  const [nightShift, toggleNightShift] = useStateWithLabel(false, 'nightShift');
  const [testSound, toggleTestSound] = useStateWithLabel(false, 'testSound');

  const APP_VERSION = appInfo.version;
  const zombieImage = useRef(
    ZOMBIES_INTRO[Math.floor(Math.random() * ZOMBIES_INTRO.length)]
  );
  // const zombieImage = useRef(ZOMBIES_INTRO[5]);

  useEffect(() => {
    const storm = new Audio(SOUNDS.intro);
    const horde = new Audio(SOUNDS.Horde1);
    if (testSound) {
      logger(LOG_TYPE_EXTENDED, CLICK_SOUND_TEST);
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

  useEffect(() => {
    if (zombieImage.current) {
      if (zombieImage.current.includes('ZombieCop')) {
        toggleNightShift(true);
        logger(LOG_TYPE_EXTENDED, INTRO_NS_LOADED);
      }
      logger(LOG_TYPE_EXTENDED, INTRO_IMG_LOADED, zombieImage.current);
    }
  }, [zombieImage, toggleNightShift]);

  return (
    <MenuScreen img={BG} type="main">
      <ThunderOverlay testSound={testSound} />
      <FogEffect />
      {nightShift && <NightShiftIntro />}
      <LogoArea nightShift={nightShift}>
        <ZombicideLogo src={Logo} />
        <MainTitle>PARTY</MainTitle>
      </LogoArea>
      <ZombieImage nightShift={nightShift} src={zombieImage.current} />
      <ZombieImageShadow nightShift={nightShift} src={zombieImage.current} />
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
  loadedGame: arrayOf(CharacterType),
  setInitialCharacters: func.isRequired
};

MainMenu.defaultProps = {
  loadedGame: false
};

export default MainMenu;

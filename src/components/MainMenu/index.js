import React, { useContext, useEffect, useRef } from 'react';
import { func, arrayOf } from 'prop-types';
import appInfo from '../../../package.json';
import { AppContext } from '../../setup/rules';
import { ZOMBIES_S1 } from '../../setup/zombies';
import { logger, useStateWithLabel } from '../../utils';
import NightShiftIntro from './NighShift';
import FogEffect from '../Fog';
import { SOUNDS } from '../../assets/sounds';
import BG from '../../assets/images/background/background2.jpg';
import ZombieCop from '../../assets/images/zombies/ZombieCop.png';
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
  const zombieImage = useRef();
  const { context } = useContext(AppContext);

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
    const zombiesImages = [];
    if (context.rules && context.rules.nightShift) {
      zombieImage.current = ZombieCop;
      toggleNightShift(true);
      logger(LOG_TYPE_EXTENDED, INTRO_NS_LOADED);
    } else {
      if (context.zombies) {
        Object.values(context.zombies).forEach(
          zombie => zombie.intro && zombiesImages.push(zombie.intro)
        );
      } else {
        Object.values(ZOMBIES_S1).forEach(
          zombie => zombie.intro && zombiesImages.push(zombie.intro)
        );
      }
      zombieImage.current =
        zombiesImages[Math.floor(Math.random() * zombiesImages.length)];

      logger(LOG_TYPE_EXTENDED, INTRO_IMG_LOADED, zombieImage.current);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [context]);

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
  loadedGame: null
};

export default MainMenu;

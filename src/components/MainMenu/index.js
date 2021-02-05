import React, { useEffect, useRef } from 'react';
import { func, arrayOf } from 'prop-types';
import appInfo from '../../../package.json';
import { useStateWithLabel } from '../../utils/hooks';
import NightShiftIntro from './NighShift';
import { ZOMBIES_INTRO } from '../../setup/zombies';
import { CONTINUE, NEW_GAME, STOP_SOUND, TEST_SOUND } from '../../constants';
import { SOUNDS } from '../../assets/sounds';
import BG from '../../assets/images/background/background2.jpg';
import Logo from '../../assets/images/logo.png';
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
import { CharacterType } from '../../interfaces/types';
import FogEffect from '../Fog';

const MainMenu = ({ loadedGame, setInitialCharacters }) => {
  const [nightShift, toggleNightShift] = useStateWithLabel(false, 'nightShift');
  const [testSound, toggleTestSound] = useStateWithLabel(false, 'testSound');

  const APP_VERSION = appInfo.version;
  // const zombieImage = useRef(
  //   ZOMBIES_INTRO[Math.floor(Math.random() * ZOMBIES_INTRO.length)]
  // );
  const zombieImage = useRef(ZOMBIES_INTRO[5]);

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

  useEffect(() => {
    if (zombieImage.current.includes('ZombieCop')) {
      toggleNightShift(true);
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
      <ZombieImage src={zombieImage.current} nightShift={nightShift} />
      <ZombieImageShadow src={zombieImage.current} nightShift={nightShift} />
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

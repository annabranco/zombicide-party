import React, { useContext, useEffect, useState } from 'react';
import { arrayOf, func, number } from 'prop-types';
import appInfo from '../../../package.json';
import { AppContext } from '../../setup/context';
import { ZOMBIES_S1 } from '../../setup/zombies';
import { getMediaQuery, logger, useStateWithLabel } from '../../utils';
import {
  FIRST_TIME_MODAL,
  TOUR_WARNING_MODAL
} from '../Notifications/notifications';
import { InstructionsWrapper } from '../Tour/styles';
import NightShiftIntro from './NighShift';
import SupportMeButton from '../SupportMe/button';
import TakeATourButton from '../Tour/button';
import FogEffect from '../Fog';
import { SOUNDS } from '../../assets/sounds';
import BG from '../../assets/images/background/background2.jpg';
import ZombieCop from '../../assets/images/zombies/ZombieCop.png';
import Logo from '../../assets/images/logo.png';
import {
  CENTER,
  CLICK_SOUND_TEST,
  CONTINUE,
  DESKTOP,
  FIRST_TIME,
  INTRO_IMG_LOADED,
  INTRO_NS_LOADED,
  LOCAL_STORAGE_KEY,
  LOCAL_STORAGE_TOUR_KEY,
  LOG_TYPE_EXTENDED,
  MODAL,
  NEW_GAME,
  STOP_SOUND,
  TAKE_IT_ANYWAY,
  TEST_SOUND,
  TOUR_WARNING,
  WARNING
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
  WarningButton,
  WarningMessage,
  ZombicideLogo,
  ZombieImage,
  ZombieImageShadow
} from './styles';

const Home = ({
  loadedGame,
  goToNextTourStep,
  setInitialCharacters,
  tourMode
}) => {
  const [displayTourWarning, toggleDisplayTourWarning] = useStateWithLabel(
    false,
    'displayTourWarning'
  );
  const [nightShift, toggleNightShift] = useStateWithLabel(false, 'nightShift');
  const [testSound, toggleTestSound] = useStateWithLabel(false, 'testSound');
  const [zombieImage, changeZombieImage] = useState();

  const APP_VERSION = appInfo.version;
  const { context, updateContext } = useContext(AppContext);
  const isDesktop = getMediaQuery() === DESKTOP;

  const onConfirmTakeATour = () => {
    toggleDisplayTourWarning(false);
    goToNextTourStep(0);
  };

  const onClickTakeATour = () => {
    const savedGameExists = !!localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedGameExists) {
      updateContext({
        ...context,
        notification: {
          type: WARNING,
          info: WARNING,
          content: TOUR_WARNING_MODAL(onConfirmTakeATour)
        }
      });
    } else {
      goToNextTourStep(0);
    }
  };

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
      if (tourMode === 0) {
        setTimeout(() => {
          goToNextTourStep();
        }, 200);
      }
    }
    return () => {
      storm.pause();
      horde.pause();
    };
  }, [goToNextTourStep, testSound, tourMode]);

  useEffect(() => {
    const zombiesImages = [];
    if (context.rules && context.rules.nightShift) {
      changeZombieImage(ZombieCop);
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
      changeZombieImage(
        zombiesImages[Math.floor(Math.random() * zombiesImages.length)]
      );

      logger(LOG_TYPE_EXTENDED, INTRO_IMG_LOADED, zombieImage);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [context]);

  useEffect(() => {
    const displayTour = !localStorage.getItem(LOCAL_STORAGE_TOUR_KEY);

    if (isDesktop && displayTour && !context.notification) {
      updateContext({
        ...context,
        notification: {
          type: MODAL,
          info: FIRST_TIME,
          content: FIRST_TIME_MODAL
        }
      });
    }
  }, [context, isDesktop, updateContext]);

  return (
    <MenuScreen img={BG} type="main">
      <ThunderOverlay testSound={testSound} />
      <FogEffect />
      {nightShift && <NightShiftIntro />}
      <LogoArea nightShift={nightShift}>
        <ZombicideLogo src={Logo} />
        <MainTitle>PARTY</MainTitle>
      </LogoArea>
      <ZombieImage nightShift={nightShift} src={zombieImage} />
      <ZombieImageShadow nightShift={nightShift} src={zombieImage} />
      <ButtonsArea delay>
        <StyledLink to="/new">
          <SelectionButton tourMode={tourMode === 1}>
            {NEW_GAME}
          </SelectionButton>
        </StyledLink>
        {loadedGame && typeof tourMode !== 'number' && (
          <StyledLink
            to="/play"
            onClick={() => setInitialCharacters(loadedGame)}
          >
            <SelectionButton>{CONTINUE}</SelectionButton>
          </StyledLink>
        )}
      </ButtonsArea>
      <div style={{ marginLeft: '100px' }}>
        <SupportMeButton isDesktop={isDesktop} />
      </div>
      {isDesktop && (
        <TestButton
          onClick={() => toggleTestSound(!testSound)}
          tourMode={tourMode === 0}
        >
          {testSound ? STOP_SOUND : TEST_SOUND}
        </TestButton>
      )}
      <Version>{APP_VERSION}</Version>
      {typeof tourMode !== 'number' && (
        <TakeATourButton onClickTakeATour={onClickTakeATour} />
      )}

      {displayTourWarning && (
        <InstructionsWrapper positionX={CENTER} positionY={CENTER}>
          <WarningMessage>{TOUR_WARNING}</WarningMessage>
          <WarningButton onClick={onConfirmTakeATour}>
            {TAKE_IT_ANYWAY}
          </WarningButton>
        </InstructionsWrapper>
      )}
    </MenuScreen>
  );
};

Home.propTypes = {
  goToNextTourStep: func.isRequired,
  loadedGame: arrayOf(CharacterType),
  setInitialCharacters: func.isRequired,
  tourMode: number
};

Home.defaultProps = {
  loadedGame: null,
  tourMode: null
};

export default Home;

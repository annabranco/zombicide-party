import React, { useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { arrayOf, func, number, string } from 'prop-types';
import { getMediaQuery, logger } from '../../utils';
import FogEffect from '../Fog';
import BG from '../../assets/images/background/background2.jpg';
import { MenuScreen } from '../MainMenu/styles';
import Defeat from '../../assets/sounds/music/FuneralProcession.mp3';
import PartialVictory from '../../assets/sounds/music/FlashInThePan.mp3';
import Victory from '../../assets/sounds/music/HearsePileup-Grindstone.mp3';
import VictoryAlternative from '../../assets/sounds/music/Portrayal-LostSouls.mp3';

import Exit from '../../assets/images/exit.png';
import {
  ACHIEVE_OBJECTIVES,
  CLEAR_LS,
  DEFEAT,
  END_GAME_SCREEN,
  ESCAPED_ALL,
  ESCAPED_REMAINING,
  GAME_DURATION,
  GAME_OVER,
  KILLED,
  KILLED_EM_ALL,
  KILLED_REMAINING,
  LIVED_TO_TELL,
  LIVE_ANOTHER_DAY,
  LOCAL_STORAGE_KEY,
  LOCAL_STORAGE_ROUNDS_KEY,
  LOG_TYPE_INFO,
  MOBILE,
  THEY_DID_IT,
  VICTORY
} from '../../constants';
import { CharacterType } from '../../interfaces/types';
import {
  Blood,
  BloodDrop,
  EndGameText,
  EndingCharacterImage,
  EndingCharacters,
  ExitButton,
  GameInfo
} from './styles';

const EndGame = ({ characters, details, loadGame, round, time, type }) => {
  const ambience = useRef();
  const history = useHistory();

  const getGameOverText = () => {
    switch (details) {
      case KILLED_REMAINING:
      case ESCAPED_REMAINING:
        return LIVED_TO_TELL;
      case ESCAPED_ALL:
        return LIVE_ANOTHER_DAY;
      case ACHIEVE_OBJECTIVES:
        return THEY_DID_IT;
      case KILLED_EM_ALL:
      default:
        return GAME_OVER;
    }
  };

  const exitGame = () => {
    loadGame();
    logger(LOG_TYPE_INFO, CLEAR_LS);
    localStorage.removeItem(LOCAL_STORAGE_ROUNDS_KEY);
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    history.push('/');
  };

  useEffect(() => {
    if (type === DEFEAT) {
      ambience.current = new Audio(Defeat);
    } else if (type === VICTORY && details === ESCAPED_ALL) {
      ambience.current = new Audio(Victory);
    } else if (type === VICTORY && details === ACHIEVE_OBJECTIVES) {
      ambience.current = new Audio(VictoryAlternative);
    } else if (type === VICTORY) {
      ambience.current = new Audio(PartialVictory);
    }
    ambience.current.currentTime = 0;
    ambience.current.volume = 0.4;
    ambience.current.play();
    logger(LOG_TYPE_INFO, END_GAME_SCREEN, type);
    return () => {
      ambience.current.pause();
      ambience.current = null;
    };
  }, [type, details]);

  return (
    <MenuScreen img={BG} dynamic type={type}>
      <FogEffect inChar />

      <EndGameText type={type}>
        {getGameOverText()}
        {type === DEFEAT && (
          <Blood>
            {[...Array(10).keys()].map(drop => (
              <BloodDrop key={`bloodDrop${drop}`} />
            ))}
          </Blood>
        )}
      </EndGameText>
      {type === VICTORY && (
        <EndingCharacters>
          {characters
            .filter(char => char.wounded !== KILLED)
            .map(char => (
              <EndingCharacterImage
                key={`endGameImage-${char.name}`}
                number={characters.length}
                src={getMediaQuery() === MOBILE ? char.face : char.selector}
              />
            ))}
        </EndingCharacters>
      )}
      <ExitButton
        delay={type === VICTORY && characters.length}
        onClick={exitGame}
        src={Exit}
        type={type}
      />
      <GameInfo>{GAME_DURATION(round, time)}</GameInfo>
    </MenuScreen>
  );
};

EndGame.propTypes = {
  characters: arrayOf(CharacterType),
  details: string.isRequired,
  loadGame: func.isRequired,
  round: number.isRequired,
  time: string.isRequired,
  type: string.isRequired
};

EndGame.defaultProps = {
  characters: null
};

export default EndGame;

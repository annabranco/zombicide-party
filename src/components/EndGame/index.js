import React, { useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { func, string, arrayOf } from 'prop-types';
import FogEffect from '../Fog';
import BG from '../../assets/images/background/background2.jpg';
import { MenuScreen } from '../MainMenu/styles';
import YouLose from '../../assets/sounds/music/FuneralProcession.mp3';
import YouWin from '../../assets/sounds/music/VideoGameSoldiers.mp3';
import Exit from '../../assets/images/exit.png';
import {
  Blood,
  BloodDrop,
  EndGameText,
  ExitButton,
  EndingCharacterImage,
  EndingCharacters
} from './styles';
import {
  GAME_OVER,
  KILLED,
  LIVE_ANOTHER_DAY,
  LOCAL_STORAGE_KEY,
  LOST,
  MOBILE,
  WON
} from '../../constants';

import { CharacterType } from '../../interfaces/types';
import { getMediaQuery } from '../../utils/devices';

const EndGame = ({ characters, loadGame, type }) => {
  const ambience = useRef();
  const history = useHistory();

  const exitGame = () => {
    loadGame();
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    history.push('/');
    window.location.reload();
  };

  useEffect(() => {
    if (type === LOST) {
      ambience.current = new Audio(YouLose);
    } else {
      ambience.current = new Audio(YouWin);
    }
    ambience.current.currentTime = 0;
    ambience.current.volume = 0.4;
    ambience.current.play();
    return () => {
      ambience.current.pause();
      ambience.current = null;
    };
  }, [type]);

  return (
    <MenuScreen img={BG} dynamic type={type}>
      <FogEffect inChar />

      <EndGameText type={type}>
        {type === LOST ? GAME_OVER : LIVE_ANOTHER_DAY}
        {type === LOST && (
          <Blood>
            {[...Array(10).keys()].map(drop => (
              <BloodDrop key={`bloodDrop${drop}`} />
            ))}
          </Blood>
        )}
      </EndGameText>
      {type === WON && (
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
        delay={type === WON && characters.length}
        onClick={exitGame}
        src={Exit}
        type={type}
      />
    </MenuScreen>
  );
};

EndGame.propTypes = {
  characters: arrayOf(CharacterType),
  type: string.isRequired,
  loadGame: func.isRequired
};

EndGame.defaultProps = {
  characters: null
};

export default EndGame;

import React, { useEffect, useRef } from 'react';
import { arrayOf, bool, func, oneOfType, string } from 'prop-types';
import { logger, useStateWithLabel } from '../../utils';
import PlayersSection from '../Sections/PlayersSection';
import ZombiesSection from '../Sections/ZombiesSection';
import {
  GAME_TIME,
  LESS_THAN_1_MIN,
  LOCAL_STORAGE_ROUNDS_KEY,
  LOG_TYPE_INFO,
  PLAYERS,
  ROUND,
  ZOMBIES
} from '../../constants';
import { CharacterType } from '../../interfaces/types';
import { MainArea, RoundTag } from './styles';

const MainScreen = ({
  damageMode,
  initialCharacters,
  loadGame,
  loadedGame,
  stopIntro,
  toggleDamageMode
}) => {
  const [rounds, updateRounds] = useStateWithLabel([], 'round');
  const [displayRounds, toggleDisplayRounds] = useStateWithLabel(
    false,
    'displayRounds'
  );
  const [activeSide, changeActiveSide] = useStateWithLabel(
    PLAYERS,
    'activeSide'
  );
  const [zombiesArePlaying, toggleZombiesArePlaying] = useStateWithLabel(
    false,
    'zombiesArePlaying'
  );
  const gameTime = useRef(0);
  const formatedGameTime = useRef(LESS_THAN_1_MIN);

  const formatGameTime = time => {
    const digits = time.replace('m', '').split('h');
    if (digits.length === 2) {
      return Number(digits[0]) * 60 + Number(digits[1]);
    }
    if (digits[0].length > 2) {
      return 0;
    }
    return Number(digits[0]);
  };

  const nextGameRound = () => {
    const updRounds = [...rounds];
    updRounds.push(formatedGameTime.current);
    localStorage.setItem(LOCAL_STORAGE_ROUNDS_KEY, JSON.stringify(updRounds));
    updateRounds(updRounds);
    toggleDisplayRounds(true);
    setTimeout(() => {
      toggleDisplayRounds(false);
    }, 3000);
  };

  useEffect(() => {
    const gameRounds = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_ROUNDS_KEY)
    );

    const handleGameTime = () => {
      const updatedGameTime = gameTime.current ? gameTime.current + 1 : 1;
      let hours = Math.floor(updatedGameTime / 60);
      let minutes = Math.floor(updatedGameTime % 60);

      hours = hours === 0 ? '' : `${hours}h`;
      minutes = `${minutes}m`;

      gameTime.current = updatedGameTime;
      formatedGameTime.current = `${hours}${minutes}`;
      window.gametime = formatedGameTime.current;
      logger(LOG_TYPE_INFO, GAME_TIME, formatedGameTime.current);
    };

    const timer = setInterval(() => {
      handleGameTime();
    }, 60000);

    if (gameRounds) {
      gameTime.current = formatGameTime(gameRounds[gameRounds.length - 1]);
      handleGameTime();
      updateRounds(gameRounds);
    }

    window.gametime = formatedGameTime.current;

    return () => {
      clearInterval(timer);
    };
  }, [updateRounds]);

  return (
    <MainArea>
      <PlayersSection
        damageMode={damageMode}
        initialCharacters={initialCharacters}
        loadGame={loadGame}
        loadedGame={loadedGame}
        nextGameRound={nextGameRound}
        round={rounds.length}
        setZombiesRound={() => changeActiveSide(ZOMBIES)}
        stopIntro={stopIntro}
        time={formatedGameTime.current}
        toggleDamageMode={toggleDamageMode}
        toggleZombiesArePlaying={toggleZombiesArePlaying}
        visible={activeSide === PLAYERS}
        zombiesArePlaying={zombiesArePlaying}
        zombiesRound={activeSide === ZOMBIES}
      />
      {activeSide === ZOMBIES && (
        <ZombiesSection
          damageMode={damageMode}
          setPlayersRound={() => changeActiveSide(PLAYERS)}
          toggleDamageMode={toggleDamageMode}
          toggleZombiesArePlaying={toggleZombiesArePlaying}
          zombiesRound={activeSide === ZOMBIES}
        />
      )}
      {displayRounds && <RoundTag>{`${ROUND} ${rounds.length}`}</RoundTag>}
    </MainArea>
  );
};

MainScreen.propTypes = {
  damageMode: oneOfType([string, bool]).isRequired,
  initialCharacters: arrayOf(CharacterType),
  loadGame: func.isRequired,
  loadedGame: arrayOf(CharacterType),
  stopIntro: func.isRequired,
  toggleDamageMode: func.isRequired
};

MainScreen.defaultProps = {
  initialCharacters: null,
  loadedGame: null
};

export default MainScreen;

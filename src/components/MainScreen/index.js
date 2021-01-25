import React, { useEffect, useRef } from 'react';
import { bool, func, arrayOf } from 'prop-types';
import PlayersSection from '../Sections/PlayersSection';
import ZombiesSection from '../Sections/ZombiesSection';
import { MainArea, RoundTag } from './styles';
import { CharacterType } from '../../interfaces/types';
import { useStateWithLabel } from '../../utils/hooks';
import { LESS_THAN_1_MIN, PLAYERS, ROUND, ZOMBIES } from '../../constants';

const MainScreen = ({
  damageMode,
  initialCharacters,
  loadGame,
  loadedGame,
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
  const gameTime = useRef();

  const nextGameRound = () => {
    const updRounds = [...rounds];
    updRounds.push(gameTime.current);
    updateRounds(updRounds);
    toggleDisplayRounds(true);
    setTimeout(() => {
      toggleDisplayRounds(false);
    }, 3000);
  };

  useEffect(() => {
    window.time = LESS_THAN_1_MIN;
    const timer = setInterval(() => {
      const updatedGameTime = gameTime.current ? gameTime.current + 1 : 1;
      let hours = Math.floor(updatedGameTime / 60);
      let minutes = Math.floor(updatedGameTime % 60);

      hours = hours === 0 ? '' : `${hours}h`;
      minutes = `${minutes}m`;
      gameTime.current = updatedGameTime;
      window.time = `${hours}${minutes}`;
    }, 60000);

    return () => {
      clearInterval(timer);
    };
  }, []);
  return (
    <MainArea>
      <PlayersSection
        damageMode={damageMode}
        initialCharacters={initialCharacters}
        loadGame={loadGame}
        loadedGame={loadedGame}
        toggleDamageMode={toggleDamageMode}
        setZombiesRound={() => changeActiveSide(ZOMBIES)}
        nextGameRound={nextGameRound}
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
      {!displayRounds && <RoundTag>{`${ROUND} ${rounds.length}`}</RoundTag>}
    </MainArea>
  );
};

MainScreen.propTypes = {
  damageMode: bool.isRequired,
  initialCharacters: arrayOf(CharacterType).isRequired,
  loadGame: func.isRequired,
  loadedGame: arrayOf(CharacterType).isRequired,
  toggleDamageMode: func.isRequired
};

export default MainScreen;

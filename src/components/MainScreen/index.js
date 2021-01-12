import React, { useEffect, useRef } from 'react';
import { bool, func, arrayOf } from 'prop-types';
import PlayersSection from '../Sections/PlayersSection';
import ZombiesSection from '../Sections/ZombiesSection';
import { MainArea } from './styles';
import { CharacterType } from '../../interfaces/types';
import { useStateWithLabel } from '../../utils/hooks';
import { LESS_THAN_1_MIN } from '../../constants';

const MainScreen = ({
  damageMode,
  initialCharacters,
  loadGame,
  loadedGame,
  toggleDamageMode,
  setZombiesTurn,
  zombiesTurn
}) => {
  const [activeSection, changeActiveSection] = useStateWithLabel(
    'PlayersSection',
    'activeSection'
  );
  const [rounds, updateRounds] = useStateWithLabel([], 'round');

  const gameTime = useRef();

  const nextGameRound = () => {
    const updRounds = [...rounds];
    updRounds.push(gameTime.current);
    updateRounds(updRounds);
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
        setZombiesTurn={setZombiesTurn}
        nextGameRound={nextGameRound}
        visible={activeSection === 'PlayersSection'}
      />
      <ZombiesSection
        damageMode={damageMode}
        toggleDamageMode={toggleDamageMode}
        visible={activeSection === 'ZombiesSection'}
        zombiesTurn={zombiesTurn}
      />
      <p>Round: {rounds.length}</p>
    </MainArea>
  );
};

MainScreen.propTypes = {
  damageMode: bool.isRequired,
  initialCharacters: arrayOf(CharacterType).isRequired,
  loadGame: func.isRequired,
  loadedGame: arrayOf(CharacterType).isRequired,
  setZombiesTurn: func.isRequired,
  toggleDamageMode: func.isRequired,
  zombiesTurn: bool.isRequired
};

export default MainScreen;

import React from 'react';
import { string } from 'prop-types';
import { useStateWithLabel } from '../utils/hooks';

const usePlayersHandler = (player, order) => {
  const [player, changePlayer] = useStateWithLabel(null, 'player');
  const [playerIndex, changePlayerIndex] = useStateWithLabel(
    null,
    'playerIndex'
  );

  return <p>usePlayersHandler working!</p>;
};

usePlayersHandler.propTypes = {
  key: string
};

usePlayersHandler.defaultProps = {
  key: undefined
};

export default usePlayersHandler;

import React, { useEffect, useState } from 'react';

import React from 'react';
import { string } from 'prop-types';

const usePlayersHandler = (player, order) => {
  const [player, changePlayer] = useState();
  const [playerIndex, changePlayerIndex] = useState();



  return (

    <p>usePlayersHandler working!</p>

  );
}

usePlayersHandler.propTypes = {
  key : string
};

usePlayersHandler.defaultProps = {
  key : undefined
};

export default usePlayersHandler;

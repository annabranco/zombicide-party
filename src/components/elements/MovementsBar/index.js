import React from 'react';
import { string, bool, number, arrayOf } from 'prop-types';
import { getActionColor } from '../../../utils';
import { IndicatorsWrapper } from '../../Sections/PlayersSection/styles';
import { MovementIcon } from './styles';

const MovementsBar = ({
  actionsCount,
  charIsAlive,
  gameHasEnded,
  setupMode,
  tradeModeActive
}) => {
  return (
    <>
      {charIsAlive && !gameHasEnded && !setupMode && !tradeModeActive && (
        <IndicatorsWrapper>
          {actionsCount.map((action, index) => (
            <MovementIcon
              color={getActionColor(action)}
              key={`${action}-${index}`} // eslint-disable-line react/no-array-index-key
              type={action}
            >
              {action}
            </MovementIcon>
          ))}
        </IndicatorsWrapper>
      )}
    </>
  );
};

MovementsBar.propTypes = {
  actionsCount: arrayOf([string, number]).isRequired,
  charIsAlive: bool.isRequired,
  gameHasEnded: bool.isRequired,
  setupMode: bool.isRequired,
  tradeModeActive: bool.isRequired
};

export default MovementsBar;

import React from 'react';
import { string, func, bool, oneOfType, number, arrayOf } from 'prop-types';
import { getXpColor } from '../../../utils';
import { HighestXpType } from '../../../interfaces/types';
import { IndicatorsWrapper } from '../../Sections/PlayersSection/styles';
import { HighestXpTag, XpIcon } from './styles';

const XpBar = ({
  currentXp,
  charIsAlive,
  device,
  gameHasEnded,
  setupMode,
  xpCounter,
  tradeModeActive,
  setCustomXp,
  highestXp,
  characterName
}) => {
  return (
    <>
      {charIsAlive && !gameHasEnded && !tradeModeActive && (
        <IndicatorsWrapper header>
          {xpCounter &&
            xpCounter.map((level, index) => (
              <XpIcon
                activeColor={
                  (level <= currentXp || xpCounter[index - 1] < currentXp) &&
                  getXpColor(level, xpCounter[index - 1], true)
                }
                color={getXpColor(level, xpCounter[index - 1])}
                currentXp={currentXp === level}
                device={device.current}
                highestXp={highestXp.xp === level}
                key={`xp-${level}-${xpCounter[index - 1]}`}
                onClick={
                  setupMode
                    ? () =>
                        setCustomXp(
                          level,
                          xpCounter[index - 1],
                          xpCounter[index + 1]
                        )
                    : () => null
                }
                setupMode={setupMode}
                size={xpCounter.length}
                type={level}
              >
                {level}
                {highestXp.xp === level && highestXp.name !== characterName && (
                  <HighestXpTag xp={highestXp.xp}>
                    {highestXp.name}
                  </HighestXpTag>
                )}
              </XpIcon>
            ))}
        </IndicatorsWrapper>
      )}
    </>
  );
};

XpBar.propTypes = {
  characterName: string.isRequired,
  currentXp: number.isRequired,
  charIsAlive: bool.isRequired,
  device: string.isRequired,
  gameHasEnded: bool.isRequired,
  setupMode: bool.isRequired,
  xpCounter: arrayOf(oneOfType([number, string])).isRequired,
  tradeModeActive: bool.isRequired,
  setCustomXp: func.isRequired,
  highestXp: HighestXpType.isRequired
};

export default XpBar;

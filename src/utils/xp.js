const blueThreatThresold = 6;
const yellowThreatThresold = 18;
const orangeThreatThresold = 42;
const midYellowThresold = parseInt(
  (yellowThreatThresold + orangeThreatThresold) / 2,
  10
);

export const calculateXpBar = currentXp => {
  let xpLevels;
  if (currentXp <= blueThreatThresold) {
    xpLevels = Array.from({ length: yellowThreatThresold + 1 }, (_, i) => i);
    xpLevels.push(yellowThreatThresold + 1);
    xpLevels.push('...');
    xpLevels.push(orangeThreatThresold + 1);
  } else if (currentXp <= yellowThreatThresold) {
    xpLevels = [0, '...'];
    // eslint-disable-next-line no-plusplus
    for (let x = blueThreatThresold + 1; x <= yellowThreatThresold; x++) {
      xpLevels.push(x);
    }
    xpLevels.push(yellowThreatThresold + 1);
    xpLevels.push('...');
    xpLevels.push(orangeThreatThresold + 1);
  } else if (currentXp <= midYellowThresold) {
    xpLevels = [0, '...', yellowThreatThresold];
    // eslint-disable-next-line no-plusplus
    for (let x = yellowThreatThresold + 1; x <= midYellowThresold; x++) {
      xpLevels.push(x);
    }
    xpLevels.push('...');
    xpLevels.push(orangeThreatThresold + 1);
  } else {
    xpLevels = [
      0,
      blueThreatThresold + 1,
      yellowThreatThresold + 1,
      '...',
      midYellowThresold
    ];
    // eslint-disable-next-line no-plusplus
    for (let x = midYellowThresold + 1; x <= orangeThreatThresold; x++) {
      xpLevels.push(x);
    }
    xpLevels.push(orangeThreatThresold + 1);
  }
  return xpLevels;
};

export const getXpColor = (xp, prevXp, active) => {
  let level = xp;
  if (xp === '...') {
    level = prevXp;
  }
  switch (true) {
    case level > orangeThreatThresold:
      return active ? '#ff0000' : '#c05959';
    case level > yellowThreatThresold:
      return active ? '#ff6600' : '#ffbf80';
    case level > blueThreatThresold:
      return active ? '#ffff00' : '#ffffcc';
    default:
      return active ? '#4d79ff' : '#CCE5FF';
  }
};

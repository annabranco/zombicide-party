import { MOBILE } from '../constants';

export const blueThreatThresold = 6;
export const yellowThreatThresold = 18;
export const orangeThreatThresold = 42;
const midOrangeThresold = parseInt(
  (yellowThreatThresold + orangeThreatThresold) / 2,
  10
);

export const calculateXpBar = (currentXp, highestXp, device) => {
  let xpLevels;

  if (currentXp <= blueThreatThresold) {
    if (device === MOBILE) {
      xpLevels = Array.from({ length: blueThreatThresold + 1 }, (_, i) => i);
      xpLevels.push(blueThreatThresold + 1);
      xpLevels.push('...');
      if (!xpLevels.includes(highestXp) && highestXp <= yellowThreatThresold) {
        xpLevels.push(highestXp);
        xpLevels.push('...');
      }
      xpLevels.push(yellowThreatThresold + 1);
      xpLevels.push('...');
      if (!xpLevels.includes(highestXp) && highestXp <= orangeThreatThresold) {
        xpLevels.push(highestXp);
        xpLevels.push('...');
      }
    } else {
      xpLevels = Array.from({ length: yellowThreatThresold + 1 }, (_, i) => i);
      xpLevels.push(yellowThreatThresold + 1);
      xpLevels.push('...');
      if (!xpLevels.includes(highestXp)) {
        xpLevels.push(highestXp);
        xpLevels.push('...');
      }
    }
    if (!xpLevels.includes(orangeThreatThresold + 1)) {
      xpLevels.push(orangeThreatThresold + 1);
    }
  } else if (currentXp <= yellowThreatThresold) {
    if (device === MOBILE) {
      xpLevels = [0];
    } else {
      xpLevels = [0, '...'];
    }
    for (let x = blueThreatThresold + 1; x <= yellowThreatThresold; x++) {
      xpLevels.push(x);
    }
    xpLevels.push(yellowThreatThresold + 1);
    xpLevels.push('...');
    if (!xpLevels.includes(highestXp)) {
      xpLevels.push(highestXp);
    }
    if (!xpLevels.includes(orangeThreatThresold + 1)) {
      xpLevels.push(orangeThreatThresold + 1);
    }
  } else if (currentXp <= midOrangeThresold) {
    if (device === MOBILE) {
      xpLevels = [0, blueThreatThresold + 1];
    } else {
      xpLevels = [0, '...', yellowThreatThresold];
    }

    for (let x = yellowThreatThresold + 1; x <= midOrangeThresold; x++) {
      xpLevels.push(x);
    }
    xpLevels.push('...');
    if (!xpLevels.includes(highestXp)) {
      xpLevels.push(highestXp);
      xpLevels.push('...');
    }
    if (!xpLevels.includes(orangeThreatThresold + 1)) {
      xpLevels.push(orangeThreatThresold + 1);
    }
  } else {
    if (device === MOBILE) {
      xpLevels = [0, blueThreatThresold + 1, midOrangeThresold];
    } else {
      xpLevels = [
        0,
        '...',
        blueThreatThresold + 1,
        '...',
        yellowThreatThresold + 1,
        '...',
        midOrangeThresold
      ];
    }

    for (let x = midOrangeThresold + 1; x <= orangeThreatThresold; x++) {
      xpLevels.push(x);
    }
  }
  if (!xpLevels.includes(orangeThreatThresold + 1)) {
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

export const advancingLevel = char => {
  switch (true) {
    case char.experience > blueThreatThresold:
      return char.promotion1;
    case char.experience > yellowThreatThresold:
      return char.promotion2;
    case char.experience > orangeThreatThresold:
      return char.promotion3;
    default:
      return false;
  }
};

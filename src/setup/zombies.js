import Walker from '../assets/images/zombies/walker.jpg';
import WalkerSmall from '../assets/images/zombies/walker-small.jpg';
import Runner from '../assets/images/zombies/runner.jpg';
import RunnerSmall from '../assets/images/zombies/runner-small.jpg';
import Fatty from '../assets/images/zombies/fatty.jpg';
import FattySmall from '../assets/images/zombies/fatty-small.jpg';
import Abomination from '../assets/images/zombies/abomination.jpg';
import AbominationSmall from '../assets/images/zombies/abomination-small.jpg';
import Horde from '../assets/images/zombies/horde.jpg';
import HordeSmall from '../assets/images/zombies/horde-small.jpg';
import Dogz from '../assets/images/zombies/dogz.jpg';
import DogzSmall from '../assets/images/zombies/dogz-small.jpg';

import DogzIntro from '../assets/images/zombies/Dogz.png';
import WalkerIntro from '../assets/images/zombies/Walker.png';
import RunnerIntro from '../assets/images/zombies/Runner.png';
import FattyIntro from '../assets/images/zombies/Fatty.png';
import AbominationIntro from '../assets/images/zombies/Abomination.png';
import NightShiftIntro from '../assets/images/zombies/ZombieCop.png';
import { ZOMBIE } from '../constants';

export const ZOMBIES_S1 = {
  Walker: {
    img: Walker,
    imgSmall: WalkerSmall,
    name: 'Walker',
    sounds: 9,
    type: ZOMBIE
  },
  Runner: {
    img: Runner,
    imgSmall: RunnerSmall,
    name: 'Runner',
    sounds: 5,
    special: 'Instant kill',
    type: ZOMBIE
  },
  Fatty: {
    img: Fatty,
    imgSmall: FattySmall,
    name: 'Fatty',
    sounds: 5,
    type: ZOMBIE
  },
  Abomination: {
    img: Abomination,
    imgSmall: AbominationSmall,
    name: 'Abomination',
    sounds: 4,
    type: ZOMBIE
  },
  Horde: {
    img: Horde,
    imgSmall: HordeSmall,
    name: 'Horde',
    sounds: 2,
    type: ZOMBIE,
    special: 'Feast on survivor'
  }
};

export const DOGZ = {
  Dogz: {
    img: Dogz,
    imgSmall: DogzSmall,
    name: 'Dogz',
    sounds: 5,
    special: 'Instant kill',
    type: ZOMBIE
  }
};

export const ZOMBIES_INTRO = [
  WalkerIntro,
  RunnerIntro,
  FattyIntro,
  AbominationIntro,
  DogzIntro,
  NightShiftIntro
];

const selectedSets = [ZOMBIES_S1, DOGZ];

export const setupZombies = sets => {
  let allZombies = {};
  sets.forEach(set => {
    allZombies = { ...allZombies, ...set };
  });
  return allZombies;
};

export const ALL_ZOMBIES = setupZombies(selectedSets);

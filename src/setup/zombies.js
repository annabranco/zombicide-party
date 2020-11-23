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

const WALKER = {
  img: Walker,
  imgSmall: WalkerSmall,
  name: 'Walker',
  sounds: 9
};

const RUNNER = {
  img: Runner,
  imgSmall: RunnerSmall,
  name: 'Runner',
  sounds: 5
};

const FATTY = {
  img: Fatty,
  imgSmall: FattySmall,
  name: 'Fatty',
  sounds: 5
};

const ABOMINATION = {
  img: Abomination,
  imgSmall: AbominationSmall,
  name: 'Abomination',
  sounds: 4
};

const HORDE = {
  img: Horde,
  imgSmall: HordeSmall,
  name: 'Horde',
  sounds: 2
};

export const ZOMBIES_S1 = [WALKER, RUNNER, FATTY, ABOMINATION, HORDE];

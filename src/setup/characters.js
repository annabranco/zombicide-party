import Amy from '../assets/images/survivors/amy.jpg';
import Ben from '../assets/images/survivors/ben.jpg';
import Mary from '../assets/images/survivors/mary.jpg';
import Ned from '../assets/images/survivors/ned.jpg';
import Phil from '../assets/images/survivors/phil.jpg';
import Wanda from '../assets/images/survivors/wanda.jpg';
import Josh from '../assets/images/survivors/josh.jpg';
import Doug from '../assets/images/survivors/doug.jpg';
import AmyFace from '../assets/images/survivors/amy-face.png';
import BenFace from '../assets/images/survivors/ben-face.png';
import MaryFace from '../assets/images/survivors/mary-face.png';
import NedFace from '../assets/images/survivors/ned-face.png';
import PhilFace from '../assets/images/survivors/phil-face.png';
import WandaFace from '../assets/images/survivors/wanda-face.png';
import JoshFace from '../assets/images/survivors/josh-face.png';
import DougFace from '../assets/images/survivors/doug-face.png';
import SelectorAmy from '../assets/images/selectors/selector-amy.png';
import SelectorBen from '../assets/images/selectors/selector-ben.png';
import SelectorMary from '../assets/images/selectors/selector-mary.png';
import SelectorNed from '../assets/images/selectors/selector-ned.png';
import SelectorPhil from '../assets/images/selectors/selector-phil.png';
import SelectorWanda from '../assets/images/selectors/selector-wanda.png';
import SelectorJosh from '../assets/images/selectors/selector-josh.png';
import SelectorDoug from '../assets/images/selectors/selector-doug.png';

const AMY = {
  abilities: [],
  actions: [3, 1, 0, 0],
  color: '#a015a3',
  experience: 0,
  face: AmyFace,
  img: Amy,
  inBackpack: [null, null, null],
  inHand: [null, null],
  location: null,
  movement: 'quick',
  name: 'Amy',
  player: null,
  selector: SelectorAmy,
  voice: 'female',
  wounded: false
};

const BEN = {
  abilities: [],
  actions: [3, 0, 0, 0],
  color: '#537c6f',
  experience: 0,
  face: BenFace,
  img: Ben,
  inBackpack: [null, null, null],
  inHand: [null, null],
  location: null,
  movement: 'confident',
  name: 'Ben',
  player: null,
  selector: SelectorBen,
  voice: 'male',
  wounded: false
};

const DOUG = {
  abilities: [],
  actions: [3, 0, 0, 0],
  color: '#3566c6',
  experience: 0,
  face: DougFace,
  img: Doug,
  inBackpack: [null, null, null],
  inHand: [null, null],
  location: null,
  movement: 'confident',
  name: 'Doug',
  player: null,
  selector: SelectorDoug,
  voice: 'male',
  wounded: false
};

const JOSH = {
  abilities: [],
  actions: [3, 0, 0, 0],
  color: '#ba761d',
  experience: 0,
  face: JoshFace,
  img: Josh,
  inBackpack: [null, null, null],
  inHand: [null, null],
  location: null,
  movement: 'furtive',
  name: 'Josh',
  player: null,
  selector: SelectorJosh,
  voice: 'male',
  wounded: false
};

const MARY = {
  abilities: [],
  actions: [3, 0, 0, 0],
  color: '#3e4c84',
  experience: 0,
  face: MaryFace,
  img: Mary,
  inBackpack: [null, null, null],
  inHand: [null, null],
  location: null,
  movement: 'normal',
  name: 'Mary',
  player: null,
  selector: SelectorMary,
  voice: 'female',
  wounded: false
};

const NED = {
  abilities: [],
  actions: [3, 0, 0, 1],
  color: '#b52929',
  experience: 0,
  face: NedFace,
  img: Ned,
  inBackpack: [null, null, null],
  inHand: [null, null],
  location: null,
  movement: 'heavy',
  name: 'Ned',
  player: null,
  selector: SelectorNed,
  voice: 'male',
  wounded: false
};

const PHIL = {
  abilities: [],
  actions: [3, 0, 0, 0],
  color: '#565656',
  experience: 0,
  face: PhilFace,
  img: Phil,
  inBackpack: [null, null, null],
  inHand: [null, 'Pistol'],
  movement: 'tactical',
  name: 'Phil',
  player: null,
  selector: SelectorPhil,
  voice: 'male',
  wounded: false
};

const WANDA = {
  abilities: [],
  actions: [3, 0, 0, 0],
  color: '#339b35',
  experience: 0,
  face: WandaFace,
  img: Wanda,
  inBackpack: [null, null, null],
  inHand: [null, null],
  location: null,
  movement: 'rolling',
  name: 'Wanda',
  player: null,
  selector: SelectorWanda,
  voice: 'female',
  wounded: false
};

export const CHARACTERS_KOPINSKI = [BEN, MARY];
export const CHARACTERS_S1 = [AMY, DOUG, JOSH, NED, PHIL, WANDA];

export const CHARACTERS = [...CHARACTERS_S1, ...CHARACTERS_KOPINSKI].sort(
  (a, b) => {
    const nameA = a.name.toUpperCase();
    const nameB = b.name.toUpperCase();
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    // names must be equal
    return 0;
  }
);

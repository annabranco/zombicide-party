import Amy from '../assets/images/survivors/amy.jpg';
import Ned from '../assets/images/survivors/ned.jpg';
import Phil from '../assets/images/survivors/phil.jpg';
import Wanda from '../assets/images/survivors/wanda.jpg';
import Josh from '../assets/images/survivors/josh.jpg';
import Doug from '../assets/images/survivors/doug.jpg';
import AmyFace from '../assets/images/survivors/amy-face.png';
import NedFace from '../assets/images/survivors/ned-face.png';
import PhilFace from '../assets/images/survivors/phil-face.png';
import WandaFace from '../assets/images/survivors/wanda-face.png';
import JoshFace from '../assets/images/survivors/josh-face.png';
import DougFace from '../assets/images/survivors/doug-face.png';
import SelectorAmy from '../assets/images/selectors/selector-amy.png';
import SelectorNed from '../assets/images/selectors/selector-ned.png';
import SelectorPhil from '../assets/images/selectors/selector-phil.png';
import SelectorWanda from '../assets/images/selectors/selector-wanda.png';
import SelectorJosh from '../assets/images/selectors/selector-josh.png';
import SelectorDoug from '../assets/images/selectors/selector-doug.png';

const AMY = {
  abilities: [],
  color: '#a015a3',
  experience: 0,
  face: AmyFace,
  img: Amy,
  inBackpack: [null, null, null],
  inHand: [null, null],
  location: null,
  movement: 'normal',
  name: 'Amy',
  player: null,
  selector: SelectorAmy,
  voice: 'female',
  wounded: false
};

const NED = {
  abilities: [],
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

const JOSH = {
  abilities: [],
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

const DOUG = {
  abilities: [],
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

export const CHARACTERS = [AMY, DOUG, JOSH, NED, PHIL, WANDA];

import Amy from '../assets/images/survivors/amy.jpg';
import Ned from '../assets/images/survivors/ned.jpg';
import Phil from '../assets/images/survivors/phil.jpg';
import Wanda from '../assets/images/survivors/wanda.jpg';
import Josh from '../assets/images/survivors/josh.jpg';
import Doug from '../assets/images/survivors/doug.jpg';
import SelectorAmy from '../assets/images/selectors/selector-amy.png';
import SelectorNed from '../assets/images/selectors/selector-ned.png';
import SelectorPhil from '../assets/images/selectors/selector-phil.png';
import SelectorWanda from '../assets/images/selectors/selector-wanda.png';
import SelectorJosh from '../assets/images/selectors/selector-josh.png';
import SelectorDoug from '../assets/images/selectors/selector-doug.png';

const AMY = {
  img: Amy,
  name: 'Amy',
  items: [],
  weapons: [],
  abilities: [],
  selector: SelectorAmy,
  experience: 0,
  player: null,
  color: '#a015a3'
};

const NED = {
  img: Ned,
  name: 'Ned',
  items: [],
  weapons: [],
  abilities: [],
  selector: SelectorNed,
  experience: 0,
  player: null,
  color: '#b52929'
};

const PHIL = {
  img: Phil,
  name: 'Phil',
  items: [],
  weapons: ['Pistol'],
  abilities: [],
  selector: SelectorPhil,
  experience: 0,
  player: null,
  color: '#565656'
};

const WANDA = {
  img: Wanda,
  name: 'Wanda',
  items: [],
  weapons: [],
  abilities: [],
  selector: SelectorWanda,
  experience: 0,
  player: null,
  color: '#339b35'
};

const JOSH = {
  img: Josh,
  name: 'Josh',
  items: [],
  weapons: [],
  abilities: [],
  selector: SelectorJosh,
  experience: 0,
  player: null,
  color: '#ba761d'
};

const DOUG = {
  img: Doug,
  name: 'Doug',
  items: [],
  weapons: [],
  abilities: [],
  selector: SelectorDoug,
  experience: 0,
  player: null,
  color: '#3566c6'
};

export const CHARACTERS = [AMY, DOUG, JOSH, NED, PHIL, WANDA];

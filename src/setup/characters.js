/* eslint-disable no-unused-vars */
import Amy from '../assets/images/survivors/amy.png';
import Ben from '../assets/images/survivors/ben.png';
import Mary from '../assets/images/survivors/mary.png';
import Ned from '../assets/images/survivors/ned.png';
import Phil from '../assets/images/survivors/phil.png';
import Wanda from '../assets/images/survivors/wanda.png';
import Josh from '../assets/images/survivors/josh.png';
import Doug from '../assets/images/survivors/doug.png';
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
import { FEMALE, MALE } from '../constants';
import { ABILITIES_S1, ABILITIES_S2, ABILITIES_MALL } from './abilities';

const {
  ACTION,
  DAMAGEMELEE,
  DAMAGE_RANGED,
  DICE_ROLL_COMBAT,
  DICE_ROLL_MEELEE,
  DICE_ROLL_RANGED,
  DIE_COMBAT,
  DIE_MELEE,
  DIE_RANGED,
  COMBAT_ACTION,
  MOVE_ACTION,
  SEARCH_ACTION,
  MAX_RANGE,
  ZONE_PER_MOVE,
  RE_ROLL,
  TWO_COCKTAILS,
  TWO_ZONES_MOVE,
  AMBIDEXTROUS,
  BORN_LEADER,
  DESTINY,
  GUNSLINGER,
  HEARD,
  HOLD_YOUR_NOSE,
  ALL_YOUVE_GOT,
  LOCK_IT_DOWN,
  LOUD,
  LUCKY,
  MATCHING_SET,
  MEDIC,
  NINJA,
  SLIPPERY,
  SNIPER,
  STARTS_WITH,
  SWORDMASTER,
  TOUGH,
  TRICK_SHOT
} = ABILITIES_S1;
const { REAPER_RANGED, BLITZ } = ABILITIES_S2;
const { ACTION_RANGED } = ABILITIES_MALL;

export const CHARACTERS_S1 = {
  Amy: {
    abilities: [],
    abilitiesUsed: [],
    actions: [3, 0, 0, 0, 0],
    actionsLeft: [3, 0, 0, 0, 0],
    bonusDices: { combat: 0, melee: 0, ranged: 0 },
    color: '#a015a3',
    experience: 0,
    face: AmyFace,
    img: Amy,
    inReserve: [null, null, null],
    inHand: [null, null],
    location: null,
    movement: 'quick',
    name: 'Amy',
    noise: 0,
    player: null,
    promotions: {
      blue: MOVE_ACTION,
      yellow: ACTION,
      orange: [COMBAT_ACTION, MOVE_ACTION],
      red: [DIE_COMBAT, DICE_ROLL_COMBAT, MEDIC]
    },
    selector: SelectorAmy,
    voice: FEMALE,
    unloaded: [],
    wounded: false
  },
  Doug: {
    abilities: [],
    abilitiesUsed: [],
    actions: [3, 0, 0, 0, 0],
    actionsLeft: [3, 0, 0, 0, 0],
    bonusDices: { combat: 0, melee: 0, ranged: 0 },
    color: '#3566c6',
    experience: 0,
    face: DougFace,
    img: Doug,
    inReserve: [null, null, null],
    inHand: [null, null],
    location: null,
    movement: 'confident',
    name: 'Doug',
    noise: 0,
    player: null,
    promotions: {
      blue: MATCHING_SET,
      yellow: ACTION,
      orange: [DIE_RANGED, COMBAT_ACTION],
      red: [DICE_ROLL_COMBAT, AMBIDEXTROUS, SLIPPERY]
    },
    selector: SelectorDoug,
    voice: MALE,
    unloaded: [],
    wounded: false
  },
  Josh: {
    abilities: [],
    abilitiesUsed: [],
    actions: [3, 0, 0, 0, 0],
    actionsLeft: [3, 0, 0, 0, 0],
    bonusDices: { combat: 0, melee: 0, ranged: 0 },
    color: '#ba761d',
    experience: 0,
    face: JoshFace,
    img: Josh,
    inReserve: [null, null, null],
    inHand: [null, null],
    location: null,
    movement: 'furtive',
    name: 'Josh',
    noise: 0,
    player: null,
    promotions: {
      blue: SLIPPERY,
      yellow: ACTION,
      orange: [DIE_MELEE, RE_ROLL],
      red: [ACTION, DICE_ROLL_COMBAT, LUCKY]
    },
    selector: SelectorJosh,
    voice: MALE,
    unloaded: [],
    wounded: false
  },
  Ned: {
    abilities: [],
    abilitiesUsed: [],
    actions: [3, 0, 0, 0, 0],
    actionsLeft: [3, 0, 0, 0, 0],
    bonusDices: { combat: 0, melee: 0, ranged: 0 },
    color: '#b52929',
    experience: 0,
    face: NedFace,
    img: Ned,
    inReserve: [null, null, null],
    inHand: [null, null],
    location: null,
    movement: 'heavy',
    name: 'Ned',
    noise: 0,
    player: null,
    promotions: {
      blue: SEARCH_ACTION,
      yellow: ACTION,
      orange: [DIE_RANGED, COMBAT_ACTION],
      red: [DICE_ROLL_COMBAT, DIE_COMBAT, TOUGH]
    },
    selector: SelectorNed,
    voice: MALE,
    unloaded: [],
    wounded: false
  },
  Phil: {
    abilities: [],
    abilitiesUsed: [],
    actions: [3, 0, 0, 0, 0],
    actionsLeft: [3, 0, 0, 0, 0],
    bonusDices: { combat: 0, melee: 0, ranged: 0 },
    color: '#565656',
    experience: 0,
    face: PhilFace,
    img: Phil,
    inReserve: [null, null, null],
    inHand: [null, null],
    movement: 'tactical',
    name: 'Phil',
    noise: 0,
    player: null,
    selector: SelectorPhil,
    promotions: {
      blue: STARTS_WITH('Pistol'),
      yellow: ACTION,
      orange: [DICE_ROLL_RANGED, SEARCH_ACTION],
      red: [DIE_RANGED, BORN_LEADER, SNIPER]
    },
    voice: MALE,
    unloaded: [],
    wounded: false
  },
  Wanda: {
    abilities: [],
    abilitiesUsed: [],
    actions: [3, 0, 0, 0, 0],
    actionsLeft: [3, 0, 0, 0, 0],
    bonusDices: { combat: 0, melee: 0, ranged: 0 },
    color: '#339b35',
    experience: 0,
    face: WandaFace,
    img: Wanda,
    inReserve: [null, null, null],
    inHand: [null, null],
    location: null,
    movement: 'rolling',
    name: 'Wanda',
    noise: 0,
    player: null,
    promotions: {
      blue: TWO_ZONES_MOVE,
      yellow: ACTION,
      orange: [DICE_ROLL_MEELEE, SLIPPERY],
      red: [DIE_COMBAT, MOVE_ACTION, ZONE_PER_MOVE]
    },
    selector: SelectorWanda,
    voice: FEMALE,
    unloaded: [],
    wounded: false
  }
};

export const CHARACTERS_KOPINSKI = {
  Ben: {
    abilities: [],
    abilitiesUsed: [],
    actions: [3, 0, 0, 0, 0],
    actionsLeft: [3, 0, 0, 0, 0],
    bonusDices: { combat: 0, melee: 0, ranged: 0 },
    color: '#537c6f',
    experience: 0,
    face: BenFace,
    img: Ben,
    inReserve: [null, null, null],
    inHand: [null, null],
    location: null,
    movement: 'confident',
    name: 'Ben',
    noise: 0,
    player: null,
    promotions: {
      blue: BLITZ,
      yellow: ACTION,
      orange: [DICE_ROLL_RANGED, DIE_MELEE],
      red: [COMBAT_ACTION, MOVE_ACTION, SLIPPERY]
    },
    selector: SelectorBen,
    voice: MALE,
    unloaded: [],
    wounded: false
  },
  Mary: {
    abilities: [],
    abilitiesUsed: [],
    actions: [3, 0, 0, 0, 0],
    actionsLeft: [3, 0, 0, 0, 0],
    bonusDices: { combat: 0, melee: 0, ranged: 0 },
    color: '#3e4c84',
    experience: 0,
    face: MaryFace,
    img: Mary,
    inReserve: [null, null, null],
    inHand: [null, null],
    location: null,
    movement: 'normal',
    name: 'Mary',
    noise: 0,
    player: null,
    promotions: {
      blue: REAPER_RANGED,
      yellow: ACTION,
      orange: [ACTION_RANGED, BLITZ],
      red: [DICE_ROLL_COMBAT, DIE_COMBAT, MOVE_ACTION]
    },
    selector: SelectorMary,
    voice: FEMALE,
    unloaded: [],
    wounded: false
  }
};

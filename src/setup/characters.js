/* eslint-disable no-unused-vars */
import Amy from '../assets/images/survivors/amy.png';
import Anya from '../assets/images/survivors/anya.png';
import Ben from '../assets/images/survivors/ben.png';
import BillCash from '../assets/images/survivors/billcash.png';
import Bob from '../assets/images/survivors/bob.png';
import Clara from '../assets/images/survivors/clara.png';
import Debra from '../assets/images/survivors/debra.png';
import Doug from '../assets/images/survivors/doug.png';
import Josh from '../assets/images/survivors/josh.png';
import Krys from '../assets/images/survivors/krys.png';
import Mary from '../assets/images/survivors/mary.png';
import Ned from '../assets/images/survivors/ned.png';
import Phil from '../assets/images/survivors/phil.png';
import Ruiz from '../assets/images/survivors/ruiz.png';
import Sternkova from '../assets/images/survivors/sternkova.png';
import Wanda from '../assets/images/survivors/wanda.png';

import AmyFace from '../assets/images/survivors/faces/amy-face.png';
import AnyaFace from '../assets/images/survivors/faces/anya-face.png';
import BenFace from '../assets/images/survivors/faces/ben-face.png';
import BillCashFace from '../assets/images/survivors/faces/billcash-face.png';
import BobFace from '../assets/images/survivors/faces/bob-face.png';
import ClaraFace from '../assets/images/survivors/faces/clara-face.png';
import DebraFace from '../assets/images/survivors/faces/debra-face.png';
import DougFace from '../assets/images/survivors/faces/doug-face.png';
import JoshFace from '../assets/images/survivors/faces/josh-face.png';
import KrysFace from '../assets/images/survivors/faces/krys-face.png';
import MaryFace from '../assets/images/survivors/faces/mary-face.png';
import NedFace from '../assets/images/survivors/faces/ned-face.png';
import PhilFace from '../assets/images/survivors/faces/phil-face.png';
import RuizFace from '../assets/images/survivors/faces/ruiz-face.png';
import SternkovaFace from '../assets/images/survivors/faces/sternkova-face.png';
import WandaFace from '../assets/images/survivors/faces/wanda-face.png';

import SelectorAmy from '../assets/images/survivors/selectors/selector-amy.png';
import SelectorAnya from '../assets/images/survivors/selectors/selector-anya.png';
import SelectorBen from '../assets/images/survivors/selectors/selector-ben.png';
import SelectorBillCash from '../assets/images/survivors/selectors/selector-billcash.png';
import SelectorBob from '../assets/images/survivors/selectors/selector-bob.png';
import SelectorClara from '../assets/images/survivors/selectors/selector-clara.png';
import SelectorDebra from '../assets/images/survivors/selectors/selector-debra.png';
import SelectorDoug from '../assets/images/survivors/selectors/selector-doug.png';
import SelectorJosh from '../assets/images/survivors/selectors/selector-josh.png';
import SelectorKrys from '../assets/images/survivors/selectors/selector-krys.png';
import SelectorMary from '../assets/images/survivors/selectors/selector-mary.png';
import SelectorNed from '../assets/images/survivors/selectors/selector-ned.png';
import SelectorPhil from '../assets/images/survivors/selectors/selector-phil.png';
import SelectorRuiz from '../assets/images/survivors/selectors/selector-ruiz.png';
import SelectorSternkova from '../assets/images/survivors/selectors/selector-sternkova.png';
import SelectorWanda from '../assets/images/survivors/selectors/selector-wanda.png';

import { FEMALE, MALE } from '../constants';
import { ALL_ABILITIES } from './abilities';

const {
  ACTION,
  ACTION_MELEE,
  ACTION_RANGED,
  AGILITY,
  ALL_YOUVE_GOT,
  AMBIDEXTROUS,
  BLITZ,
  BLOODLUST_MELEE,
  BORN_LEADER,
  BREAK_IN,
  CANT_BE_THAT_UNLUCKY,
  CAN_START_AT,
  CHARISMATIC,
  COLLECTOR,
  COMBAT_ACTION,
  DAMAGEMELEE,
  DAMAGE_RANGED,
  DEATH_GRASP,
  DESTINY,
  DICE_ROLL_COMBAT,
  DICE_ROLL_MEELEE,
  DICE_ROLL_RANGED,
  DIE_COMBAT,
  DIE_MELEE,
  DIE_RANGED,
  FREE_RELOAD,
  FRENZY_COMBAT,
  FRENZY_MELEE,
  FRENZY_RANGED,
  GUNSLINGER,
  HIT_N_RUN,
  HOARD,
  HOLD_YOUR_NOSE,
  INFLUENCER,
  LIFE_SAVER,
  LOCK_IT_DOWN,
  LOUD,
  LOW_PROFILE,
  LUCKY,
  MATCHING_SET,
  MAX_RANGE,
  MEDIC,
  MORE_DAMAGE_COMBAT,
  MORE_DAMAGE_WITH,
  MOVE_ACTION,
  NIGHT_VISION,
  NINJA,
  PEEK_OUT_THE_WINDOW,
  PICKPOCKETING,
  POINT_BLANK,
  REAPER_COMBAT,
  REAPER_MELEE,
  REAPER_RANGED,
  REGENERATION,
  RE_ROLL,
  ROLL6,
  ROTTEN,
  RUN_TO_DAYLIGHT,
  SCAVENGER,
  SEARCH_ACTION,
  SEARCH_PLUS_ONE,
  SHOOT_FROM_THE_HIP,
  SHOVE,
  SLIPPERY,
  SNIPER,
  SPRINT,
  STARTS_WITH,
  SUPER_STRENGTH,
  SWORDMASTER,
  TACTICIAN,
  TAUNT,
  TOUGH,
  TOXIC_IMMUNITY,
  TRICK_SHOT,
  TWO_COCKTAILS,
  TWO_ZONES_MOVE,
  URBAN_SURVIVOR,
  WEBBING,
  ZOMBIE_LINK,
  ZONE_PER_MOVE
} = ALL_ABILITIES;

export const CHARACTERS_S1 = {
  Amy: {
    abilities: [],
    abilitiesUsed: [],
    actions: [3, 0, [0, 0, 0], 0, 0],
    actionsLeft: [3, 0, [0, 0, 0], 0, 0],
    bonusDice: { combat: 0, melee: 0, ranged: 0 },
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
    wounded: false
  },
  Doug: {
    abilities: [],
    abilitiesUsed: [],
    actions: [3, 0, [0, 0, 0], 0, 0],
    actionsLeft: [3, 0, [0, 0, 0], 0, 0],
    bonusDice: { combat: 0, melee: 0, ranged: 0 },
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
    wounded: false
  },
  Josh: {
    abilities: [],
    abilitiesUsed: [],
    actions: [3, 0, [0, 0, 0], 0, 0],
    actionsLeft: [3, 0, [0, 0, 0], 0, 0],
    bonusDice: { combat: 0, melee: 0, ranged: 0 },
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
    wounded: false
  },
  Ned: {
    abilities: [],
    abilitiesUsed: [],
    actions: [3, 0, [0, 0, 0], 0, 0],
    actionsLeft: [3, 0, [0, 0, 0], 0, 0],
    bonusDice: { combat: 0, melee: 0, ranged: 0 },
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
    wounded: false
  },
  Phil: {
    abilities: [],
    abilitiesUsed: [],
    actions: [3, 0, [0, 0, 0], 0, 0],
    actionsLeft: [3, 0, [0, 0, 0], 0, 0],
    bonusDice: { combat: 0, melee: 0, ranged: 0 },
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
    wounded: false
  },
  Wanda: {
    abilities: [],
    abilitiesUsed: [],
    actions: [3, 0, [0, 0, 0], 0, 0],
    actionsLeft: [3, 0, [0, 0, 0], 0, 0],
    bonusDice: { combat: 0, melee: 0, ranged: 0 },
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
    wounded: false
  }
};

export const CHARACTERS_KOPINSKI = {
  Ben: {
    abilities: [],
    abilitiesUsed: [],
    actions: [3, 0, [0, 0, 0], 0, 0],
    actionsLeft: [3, 0, [0, 0, 0], 0, 0],
    bonusDice: { combat: 0, melee: 0, ranged: 0 },
    color: '#537c6f',
    experience: 0,
    face: BenFace,
    img: Ben,
    inReserve: [null, null, null],
    inHand: [null, null],
    location: null,
    movement: 'confident',
    name: 'Ben',
    nickname: 'Redcap',
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
    wounded: false
  },
  Mary: {
    abilities: [],
    abilitiesUsed: [],
    actions: [3, 0, [0, 0, 0], 0, 0],
    actionsLeft: [3, 0, [0, 0, 0], 0, 0],
    bonusDice: { combat: 0, melee: 0, ranged: 0 },
    color: '#3e4c84',
    experience: 0,
    face: MaryFace,
    img: Mary,
    inReserve: [null, null, null],
    inHand: [null, null],
    location: null,
    movement: 'normal',
    name: 'Mary',
    nickname: 'Angry',
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
    wounded: false
  }
};

export const CHARACTERS_NIGHT_SHIFT = {
  Anya: {
    abilities: [],
    abilitiesUsed: [],
    actions: [3, 0, [0, 0, 0], 0, 0],
    actionsLeft: [3, 0, [0, 0, 0], 0, 0],
    bonusDice: { combat: 0, melee: 0, ranged: 0 },
    color: '#537c6f',
    experience: 0,
    face: AnyaFace,
    img: Anya,
    inReserve: [null, null, null],
    inHand: [null, null],
    location: null,
    movement: 'tactical',
    name: 'Anya',
    noise: 0,
    player: null,
    promotions: {
      blue: HIT_N_RUN,
      yellow: ACTION,
      orange: [ZOMBIE_LINK, SNIPER],
      red: [MAX_RANGE, DIE_COMBAT, CANT_BE_THAT_UNLUCKY]
    },
    selector: SelectorAnya,
    voice: FEMALE,
    wounded: false
  },
  BillCash: {
    abilities: [],
    abilitiesUsed: [],
    actions: [3, 0, [0, 0, 0], 0, 0],
    actionsLeft: [3, 0, [0, 0, 0], 0, 0],
    bonusDice: { combat: 0, melee: 0, ranged: 0 },
    color: '#3e4c84',
    experience: 0,
    face: BillCashFace,
    img: BillCash,
    inReserve: [null, null, null],
    inHand: [null, null],
    location: null,
    movement: 'confident',
    name: 'Bill Cash',
    noise: 0,
    player: null,
    promotions: {
      blue: SHOOT_FROM_THE_HIP,
      yellow: ACTION,
      orange: [NIGHT_VISION, FREE_RELOAD],
      red: [DIE_RANGED, ACTION_RANGED, DICE_ROLL_RANGED]
    },
    selector: SelectorBillCash,
    voice: MALE,
    wounded: false
  },
  Bob: {
    abilities: [],
    abilitiesUsed: [],
    actions: [3, 0, [0, 0, 0], 0, 0],
    actionsLeft: [3, 0, [0, 0, 0], 0, 0],
    bonusDice: { combat: 0, melee: 0, ranged: 0 },
    color: '#537c6f',
    experience: 0,
    face: BobFace,
    img: Bob,
    inReserve: [null, null, null],
    inHand: [null, null],
    location: null,
    movement: 'heavy',
    name: 'Bob',
    nickname: 'Bluefoot',
    noise: 0,
    player: null,
    promotions: {
      blue: SUPER_STRENGTH,
      yellow: ACTION,
      orange: [TAUNT, HOARD],
      red: [REAPER_MELEE, COMBAT_ACTION, ALL_YOUVE_GOT]
    },
    selector: SelectorBob,
    voice: MALE,
    wounded: false
  },
  Clara: {
    abilities: [],
    abilitiesUsed: [],
    actions: [3, 0, [0, 0, 0], 0, 0],
    actionsLeft: [3, 0, [0, 0, 0], 0, 0],
    bonusDice: { combat: 0, melee: 0, ranged: 0 },
    color: '#3e4c84',
    experience: 0,
    face: ClaraFace,
    img: Clara,
    inReserve: [null, null, null],
    inHand: [null, null],
    location: null,
    movement: 'skating',
    name: 'Clara',
    nickname: 'Icy',
    noise: 0,
    player: null,
    promotions: {
      blue: SPRINT,
      yellow: ACTION,
      orange: [POINT_BLANK, MEDIC],
      red: [ACTION, LIFE_SAVER, DIE_RANGED]
    },
    selector: SelectorClara,
    voice: FEMALE,
    wounded: false
  },
  Debra: {
    abilities: [],
    abilitiesUsed: [],
    actions: [3, 0, [0, 0, 0], 0, 0],
    actionsLeft: [3, 0, [0, 0, 0], 0, 0],
    bonusDice: { combat: 0, melee: 0, ranged: 0 },
    color: '#3e4c84',
    experience: 0,
    face: DebraFace,
    img: Debra,
    inReserve: [null, null, null],
    inHand: [null, null],
    location: null,
    movement: 'quick',
    name: 'Debra',
    noise: 0,
    player: null,
    promotions: {
      blue: LOW_PROFILE,
      yellow: ACTION,
      orange: [PICKPOCKETING, PEEK_OUT_THE_WINDOW],
      red: [INFLUENCER, ACTION, FRENZY_COMBAT]
    },
    selector: SelectorDebra,
    voice: MALE,
    wounded: false
  },
  Krys: {
    abilities: [],
    abilitiesUsed: [],
    actions: [3, 0, [0, 0, 0], 0, 0],
    actionsLeft: [3, 0, [0, 0, 0], 0, 0],
    bonusDice: { combat: 0, melee: 0, ranged: 0 },
    color: '#537c6f',
    experience: 0,
    face: KrysFace,
    img: Krys,
    inReserve: [null, null, null],
    inHand: [null, null],
    location: null,
    movement: 'furtive',
    name: 'Krys',
    nickname: 'Rainbow',
    noise: 0,
    player: null,
    promotions: {
      blue: SCAVENGER,
      yellow: ACTION,
      orange: [MAX_RANGE, SLIPPERY],
      red: [SNIPER, DICE_ROLL_COMBAT, WEBBING]
    },
    selector: SelectorKrys,
    voice: FEMALE,
    wounded: false
  },
  Ruiz: {
    abilities: [],
    abilitiesUsed: [],
    actions: [3, 0, [0, 0, 0], 0, 0],
    actionsLeft: [3, 0, [0, 0, 0], 0, 0],
    bonusDice: { combat: 0, melee: 0, ranged: 0 },
    color: '#3e4c84',
    experience: 0,
    face: RuizFace,
    img: Ruiz,
    inReserve: [null, null, null],
    inHand: [null, null],
    location: null,
    movement: 'normal',
    name: 'Ruiz',
    nickname: 'Detective',
    noise: 0,
    player: null,
    promotions: {
      blue: WEBBING,
      yellow: ACTION,
      orange: [SEARCH_PLUS_ONE, BORN_LEADER],
      red: [DIE_RANGED, TACTICIAN, BLOODLUST_MELEE]
    },
    selector: SelectorRuiz,
    voice: MALE,
    wounded: false
  },
  Sternkova: {
    abilities: [],
    abilitiesUsed: [],
    actions: [3, 0, [0, 0, 0], 0, 0],
    actionsLeft: [3, 0, [0, 0, 0], 0, 0],
    bonusDice: { combat: 0, melee: 0, ranged: 0 },
    color: '#537c6f',
    experience: 0,
    face: SternkovaFace,
    img: Sternkova,
    inReserve: [null, null, null],
    inHand: [null, null],
    location: null,
    movement: 'tactical',
    name: 'Sternkova',
    noise: 0,
    player: null,
    promotions: {
      blue: TACTICIAN,
      yellow: ACTION,
      orange: [BLOODLUST_MELEE, AGILITY],
      red: [COMBAT_ACTION, REAPER_MELEE, DIE_COMBAT]
    },
    selector: SelectorSternkova,
    voice: FEMALE,
    wounded: false
  }
};

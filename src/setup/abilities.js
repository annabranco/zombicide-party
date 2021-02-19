const ACTION = {
  name: '+1 Action',
  description: 'The Survivor has an extra Action he may use as he pleases.',
  effect: ([gen, mov, att, sea, bon]) => [gen + 1, mov, att, sea, bon]
};

const DAMAGE_MELEE = {
  name: '+1 Damage: Melee',
  description: 'The Survivor gets a +1 Damage bonus with Melee attacks.'
};

const DAMAGE_RANGED = {
  name: '+1 Damage: ranged',
  description: 'The Survivor gets a +1 Damage bonus with Ranged attacks.'
};

const DICE_ROLL_COMBAT = {
  name: '+1 to dice: Combat',
  description:
    'The Survivor adds 1 to the result of each die he rolls on a Combat Action (Melee or Ranged). The maximum result is always 6.'
};

const DICE_ROLL_MEELEE = {
  name: '+1 to dice: Melee',
  description:
    'The Survivor adds 1 to the result of each die he rolls in Melee Combat. The maximum result is always 6.'
};
const DICE_ROLL_RANGED = {
  name: '+1 to dice: Ranged',
  description:
    'The Survivor adds 1 to the result of each die he rolls in Ranged Combat. The maximum result is always 6.'
};
const DIE_COMBAT = {
  name: '+1 die: Combat',
  description:
    'The Survivor’s weapons roll an extra die in Combat (Melee or Ranged). Dual weapons gain a die each, for a total of +2 dice per Dual Combat Action.',
  effect: ({ combat, melee, ranged }) => ({ combat: combat + 1, melee, ranged })
};
const DIE_MELEE = {
  name: '+1 die: Melee',
  description:
    'The Survivor’s Melee weapons rolls an extra die in Combat. Dual melee weapons gain a die each, for a total of +2 dice per Dual Melee Combat Action.',
  effect: ({ combat, melee, ranged }) => ({ combat, melee: melee + 1, ranged })
};
const DIE_RANGED = {
  name: '+1 die: Ranged',
  description:
    'The Survivor’s Ranged weapons roll an extra die in Combat. Dual ranged weapons gain a die each, for a total of +2 dice per Dual Ranged Combat Action.',
  effect: ({ combat, melee, ranged }) => ({ combat, melee, ranged: ranged + 1 })
};
const COMBAT_ACTION = {
  name: '+1 free Combat Action',
  description:
    'The Survivor has one free extra Combat Action. This Action may only be used for Melee or Ranged Combat.',
  effect: ([gen, mov, att, sea, bon]) => [
    gen,
    mov,
    [att[0] + 1, att[1], att[2]],
    sea,
    bon
  ]
};
const MOVE_ACTION = {
  name: '+1 free Move Action',
  description:
    'The Survivor has one free extra Move Action. This Action may only be used as a Move Action.',
  effect: ([gen, mov, att, sea, bon]) => [gen, mov + 1, att, sea, bon]
};
const SEARCH_ACTION = {
  name: '+1 free Search Action ',
  description:
    'The Survivor has one free extra Search Action. This Action may only be used to Search and the Survivor can still only Search once per turn.',
  effect: ([gen, mov, att, sea, bon]) => [gen, mov, att, sea + 1, bon]
};
const MAX_RANGE = {
  name: '+1 max Range',
  description: 'The Survivor’s Ranged weapons’ maximum Range is increased by 1.'
};
const ZONE_PER_MOVE = {
  name: '+1 Zone per Move',
  description:
    'The Survivor can move through one extra Zone each time he performs a Move Action. This Skill stacks with other effects benefitting Move Actions.'
};
const RE_ROLL = {
  name: '1 re-roll / turn',
  description:
    'Once per turn, you can re-roll all the dice related to the resolution of an Action made by the Survivor. The new result takes the place of the previous one. This Skill stacks with the effects of Equipment that allow re-rolls.'
};
const TWO_COCKTAILS = {
  name: '2 cocktails are better than 1',
  description:
    'The Survivor gets two Molotov cards instead of one when he creates a Molotov.'
};
const TWO_ZONES_MOVE = {
  name: '2 Zones per Move Action',
  description:
    'When the Survivor spends one Action to Move, he can move one or two Zones instead of one.'
};
const AMBIDEXTROUS = {
  name: 'Ambidextrous',
  description:
    'The Survivor treats all Melee and Ranged weapons as if they had the Dual symbol '
};
const BORN_LEADER = {
  name: 'Born leader',
  description:
    'During the Survivor’s turn, he may give one free Action to another Survivor, to use as he pleases. This Action must be used during the recipient’s next turn or it is lost.'
};
const DESTINY = {
  name: 'Destiny',
  description:
    'The Survivor can use this Skill once per turn when he reveals an Equipment card he drew. Discard that card and draw another Equipment card.'
};
const GUNSLINGER = {
  name: 'Gunslinger',
  description:
    ' The Survivor treats all Ranged weapons as if they had the Dual symbol'
};
const HOARD = {
  name: 'Hoard',
  description: ' The Survivor can carry one extra Equipment card in reserve',
  effect: itemsInReserve => [...itemsInReserve, null]
};
const HOLD_YOUR_NOSE = {
  name: 'Hold your nose',
  description:
    'This Skill can be used once per turn. The Survivor gets a free Search Action in the Zone if he has eliminated a Zombie (even outside a building) the very same turn. This Action may only be used to Search and the Survivor can still only Search once per turn.'
};
const ALL_YOUVE_GOT = {
  name: "Is that all you've got?",
  description:
    'You can use this Skill any time the Survivor is about to get Wounded cards. Discard one Equipment card in your Survivor’s inventory for each Wound he’s about to receive. Negate a Wounded card per discarded Equipment card.'
};
const LOCK_IT_DOWN = {
  name: 'Lock it down',
  description:
    'At the cost of one Action, the Survivor can close an open door. Opening it again later does not trigger a new Zombie Spawn.'
};
const LOUD = {
  name: 'Loud',
  description:
    'Once per turn, the Survivor can make a huge amount of noise! Until this Survivor’s next turn, the Zone he used this Skill in is considered to have the highest number of Noise tokens on the entire map. If different Survivors have this Skill, only the last one who used it applies the effects.'
};
const LUCKY = {
  name: 'Lucky',
  description:
    'The Survivor can re-roll once all the dice of each Action he takes. The new result takes the place of the previous one. This Skill stacks with the effects of other Skills (“1 re-roll per turn”, for example) and Equipment that allows re-rolls. '
};
const MATCHING_SET = {
  name: 'Matching Set',
  description:
    'When a Survivor performs a Search Action and draws a weapon card with the Dual symbol, he can immediately take a second card of the same type from the Equipment deck. Shuffle the deck afterward.',
  effect: () => 'matchingSet'
};
const MEDIC = {
  name: 'Medic',
  description:
    'Once per turn, the Survivor can freely remove one Wounded card from a Survivor in the same Zone. He may also heal himself'
};
const NINJA = {
  name: 'Ninja',
  description:
    ' The Survivor makes no Noise. At all. His miniature does not count as a Noise token, and his use of Equipment or weapons produces no  Noise tokens either! The Survivor may choose not to use this Skill at any time, if he wishes to be noisy.'
};
const SLIPPERY = {
  name: 'Slippery',
  description:
    ' The Survivor does not spend extra Actions when he performs a Move Action through a Zone where there are Zombies'
};
const SNIPER = {
  name: 'Sniper',
  description:
    'The Survivor may freely choose the targets of all his Ranged Combat Actions.'
};

const STARTS_WITH = equipment => ({
  name: `Starts with ${equipment}`,
  description:
    ' The Survivor begins the game with the indicated Equipment; its card is automatically assigned to him before the beginning of the game.',
  effect: () => equipment
});

const SWORDMASTER = {
  name: 'Swordmaster',
  description:
    'The Survivor treats all Melee weapons as if they had the Dual symbol '
};
const TOUGH = {
  name: 'Tough',
  description:
    'The Survivor ignores the first Attack he receives from a single Zombie every Zombies’ Phase'
};
const TRICK_SHOT = {
  name: 'Trick shot ',
  description:
    'When the Survivor is equipped with Dual Ranged weapons, he can aim at targets in different Zones with each weapon in the same Action.'
};

export const ABILITIES_S1 = {
  ACTION,
  DAMAGE_MELEE,
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
  HOARD,
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
};

const ACTION_MELEE = {
  name: '+1 free Melee Action ',
  description:
    'The Survivor has one extra free Melee Combat Action. This Action may only be used for Melee Combat.',
  effect: ([gen, mov, att, sea, bon]) => [
    gen,
    mov,
    [att[0], att[1] + 1, att[2]],
    sea,
    bon
  ]
};

const ACTION_RANGED = {
  name: '+1 free Ranged Action ',
  description:
    'The Survivor has one extra, free Ranged Combat Action. This Action can only be used for Ranged Combat.',
  effect: ([gen, mov, att, sea, bon]) => [
    gen,
    mov,
    [att[0], att[1], att[2] + 1],
    sea,
    bon
  ]
};

export const ABILITIES_MALL = {
  ACTION_MELEE,
  ACTION_RANGED
};

const BLITZ = {
  name: 'Blitz',
  description:
    'Each time your Survivor kills the last Zombie of a Zone, he gets 1 free Move Action to use immediately'
};
const REAPER_COMBAT = {
  name: 'Reaper: Combat',
  description:
    'Use this Skill when assigning hits while resolving a Combat Action. One of these hits can freely kill an additional identical Zombie in the same Zone. Only a single additional Zombie can be killed per Action when using this Skill..',
  effect: ({ combat, melee, ranged }) => ({ combat: combat + 1, melee, ranged })
};
const REAPER_MELEE = {
  name: 'Reaper: Melee',
  description:
    'Use this Skill when assigning hits while resolving a Ranged Action. One of these hits can freely kill an additional identical Zombie in the same Zone. Only a single additional Zombie can be killed per Action when using this Skill.',
  effect: ({ combat, melee, ranged }) => ({ combat, melee: melee + 1, ranged })
};
const REAPER_RANGED = {
  name: 'Reaper: Ranged',
  description:
    'Use this Skill when assigning hits while resolving a Ranged Action. One of these hits can freely kill an additional identical Zombie in the same Zone. Only a single additional Zombie can be killed per Action when using this Skill.',
  effect: ({ combat, melee, ranged }) => ({ combat, melee, ranged: ranged + 1 })
};

export const ABILITIES_S2 = {
  BLITZ,
  REAPER_COMBAT,
  REAPER_MELEE,
  REAPER_RANGED
};

const HIT_N_RUN = {
  name: 'Hit & Run',
  description:
    'The Survivor can use this Skill for free, just after he resolved Melee or Ranged Combat Action resulting in at least a Zombie kill (or a rival Survivor kill). He can then resolve a free Move Action. The Survivor does not spend extra Actions to perform this free Move Action if Zombies are standing in his Zone.'
};

export const ABILITIES_S3 = {
  HIT_N_RUN
};

export const ALL_ABILITIES = {
  ...ABILITIES_S1,
  ...ABILITIES_MALL,
  ...ABILITIES_S2,
  ...ABILITIES_S3
};

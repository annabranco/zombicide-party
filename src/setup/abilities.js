export const ABILITIES_S1 = {
  ACTION: {
    name: '+1 Action',
    description: 'The Survivor has an extra Action he may use as he pleases.',
    effect: ([gen, mov, att, sea, bon]) => [gen + 1, mov, att, sea, bon]
  },
  DAMAGE_MELEE: {
    name: '+1 Damage: Melee',
    description: 'The Survivor gets a +1 Damage bonus with Melee attacks.'
  },
  DAMAGE_RANGED: {
    name: '+1 Damage: ranged',
    description: 'The Survivor gets a +1 Damage bonus with Ranged attacks.'
  },
  DICE_ROLL_COMBAT: {
    name: '+1 to dice: Combat',
    description:
      'The Survivor adds 1 to the result of each die he rolls on a Combat Action (Melee or Ranged). The maximum result is always 6.'
  },
  DICE_ROLL_MEELEE: {
    name: '+1 to dice: Melee',
    description:
      'The Survivor adds 1 to the result of each die he rolls in Melee Combat. The maximum result is always 6.'
  },
  DICE_ROLL_RANGED: {
    name: '+1 to dice: Ranged',
    description:
      'The Survivor adds 1 to the result of each die he rolls in Ranged Combat. The maximum result is always 6.'
  },
  DIE_COMBAT: {
    name: '+1 die: Combat',
    description:
      'The Survivor’s weapons roll an extra die in Combat (Melee or Ranged). Dual weapons gain a die each, for a total of +2 dice per Dual Combat Action.',
    effect: ({ combat, melee, ranged }) => ({
      combat: combat + 1,
      melee,
      ranged
    })
  },
  DIE_MELEE: {
    name: '+1 die: Melee',
    description:
      'The Survivor’s Melee weapons rolls an extra die in Combat. Dual melee weapons gain a die each, for a total of +2 dice per Dual Melee Combat Action.',
    effect: ({ combat, melee, ranged }) => ({
      combat,
      melee: melee + 1,
      ranged
    })
  },
  DIE_RANGED: {
    name: '+1 die: Ranged',
    description:
      'The Survivor’s Ranged weapons roll an extra die in Combat. Dual ranged weapons gain a die each, for a total of +2 dice per Dual Ranged Combat Action.',
    effect: ({ combat, melee, ranged }) => ({
      combat,
      melee,
      ranged: ranged + 1
    })
  },
  COMBAT_ACTION: {
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
  },
  MOVE_ACTION: {
    name: '+1 free Move Action',
    description:
      'The Survivor has one free extra Move Action. This Action may only be used as a Move Action.',
    effect: ([gen, mov, att, sea, bon]) => [gen, mov + 1, att, sea, bon]
  },
  SEARCH_ACTION: {
    name: '+1 free Search Action',
    description:
      'The Survivor has one free extra Search Action. This Action may only be used to Search and the Survivor can still only Search once per turn.',
    effect: ([gen, mov, att, sea, bon]) => [gen, mov, att, sea + 1, bon]
  },
  MAX_RANGE: {
    name: '+1 max Range',
    description:
      'The Survivor’s Ranged weapons’ maximum Range is increased by 1.'
  },
  ZONE_PER_MOVE: {
    name: '+1 Zone per Move',
    description:
      'The Survivor can move through one extra Zone each time he performs a Move Action. This Skill stacks with other effects benefitting Move Actions.'
  },
  RE_ROLL: {
    name: '1 re-roll / turn',
    description:
      'Once per turn, you can re-roll all the dice related to the resolution of an Action made by the Survivor. The new result takes the place of the previous one. This Skill stacks with the effects of Equipment that allow re-rolls.'
  },
  TWO_COCKTAILS: {
    name: '2 cocktails are better than 1',
    description:
      'The Survivor gets two Molotov cards instead of one when he creates a Molotov.'
  },
  TWO_ZONES_MOVE: {
    name: '2 Zones per Move Action',
    description:
      'When the Survivor spends one Action to Move, he can move one or two Zones instead of one.'
  },
  AMBIDEXTROUS: {
    name: 'Ambidextrous',
    description:
      'The Survivor treats all Melee and Ranged weapons as if they had the Dual symbol '
  },
  BORN_LEADER: {
    name: 'Born leader',
    description:
      'During the Survivor’s turn, he may give one free Action to another Survivor, to use as he pleases. This Action must be used during the recipient’s next turn or it is lost.'
  },
  DESTINY: {
    name: 'Destiny',
    description:
      'The Survivor can use this Skill once per turn when he reveals an Equipment card he drew. Discard that card and draw another Equipment card.'
  },
  GUNSLINGER: {
    name: 'Gunslinger',
    description:
      'The Survivor treats all Ranged weapons as if they had the Dual symbol'
  },
  HOARD: {
    name: 'Hoard',
    description: 'The Survivor can carry one extra Equipment card in reserve',
    effect: itemsInReserve => [...itemsInReserve, null]
  },
  HOLD_YOUR_NOSE: {
    name: 'Hold your nose',
    description:
      'This Skill can be used once per turn. The Survivor gets a free Search Action in the Zone if he has eliminated a Zombie (even outside a building) the very same turn. This Action may only be used to Search and the Survivor can still only Search once per turn.'
  },
  ALL_YOUVE_GOT: {
    name: "Is that all you've got?",
    description:
      'You can use this Skill any time the Survivor is about to get Wounded cards. Discard one Equipment card in your Survivor’s inventory for each Wound he’s about to receive. Negate a Wounded card per discarded Equipment card.'
  },
  LOCK_IT_DOWN: {
    name: 'Lock it down',
    description:
      'At the cost of one Action, the Survivor can close an open door. Opening it again later does not trigger a new Zombie Spawn.'
  },
  LOUD: {
    name: 'Loud',
    description:
      'Once per turn, the Survivor can make a huge amount of noise! Until this Survivor’s next turn, the Zone he used this Skill in is considered to have the highest number of Noise tokens on the entire map. If different Survivors have this Skill, only the last one who used it applies the effects.'
  },
  LUCKY: {
    name: 'Lucky',
    description:
      'The Survivor can re-roll once all the dice of each Action he takes. The new result takes the place of the previous one. This Skill stacks with the effects of other Skills (“1 re-roll per turn”, for example) and Equipment that allows re-rolls. '
  },
  MATCHING_SET: {
    name: 'Matching Set',
    description:
      'When a Survivor performs a Search Action and draws a weapon card with the Dual symbol, he can immediately take a second card of the same type from the Equipment deck. Shuffle the deck afterward.',
    effect: () => 'matchingSet'
  },
  MEDIC: {
    name: 'Medic',
    description:
      'Once per turn, the Survivor can freely remove one Wounded card from a Survivor in the same Zone. He may also heal himself'
  },
  NINJA: {
    name: 'Ninja',
    description:
      'The Survivor makes no Noise. At all. His miniature does not count as a Noise token, and his use of Equipment or weapons produces no  Noise tokens either! The Survivor may choose not to use this Skill at any time, if he wishes to be noisy.'
  },
  SLIPPERY: {
    name: 'Slippery',
    description:
      'The Survivor does not spend extra Actions when he performs a Move Action through a Zone where there are Zombies'
  },
  SNIPER: {
    name: 'Sniper',
    description:
      'The Survivor may freely choose the targets of all his Ranged Combat Actions.'
  },
  STARTS_WITH: equipment => ({
    name: `Starts with ${equipment}`,
    description:
      'The Survivor begins the game with the indicated Equipment; its card is automatically assigned to him before the beginning of the game.',
    effect: () => equipment
  }),
  SWORDMASTER: {
    name: 'Swordmaster',
    description:
      'The Survivor treats all Melee weapons as if they had the Dual symbol '
  },
  TOUGH: {
    name: 'Tough',
    description:
      'The Survivor ignores the first Attack he receives from a single Zombie every Zombies’ Phase'
  },
  TRICK_SHOT: {
    name: 'Trick shot',
    description:
      'When the Survivor is equipped with Dual Ranged weapons, he can aim at targets in different Zones with each weapon in the same Action.'
  }
};

export const ABILITIES_MALL = {
  MORE_DAMAGE_WITH: equipment => ({
    name: `+1 damage with ${equipment}`,
    description:
      'The Survivor gets a +1 Damage bonus with the specified Equipment.'
  }),
  MORE_DAMAGE_COMBAT: {
    name: '+1 Damage: Combat',
    description: 'The Survivor gets a +1 Damage bonus with Combat Actions.'
  },
  MORE_DAMAGE_RANGED: {
    name: '+1 Damage: Raged',
    description: 'The Survivor gets a +1 Damage bonus with Combat Actions.'
  },
  MORE_DAMAGE_MELEE: {
    name: '+1 Damage: Melee',
    description: 'The Survivor gets a +1 Damage bonus with Combat Actions.'
  },
  ACTION_MELEE: {
    name: '+1 free Melee Action',
    description:
      'The Survivor has one extra free Melee Combat Action. This Action may only be used for Melee Combat.',
    effect: ([gen, mov, att, sea, bon]) => [
      gen,
      mov,
      [att[0], att[1] + 1, att[2]],
      sea,
      bon
    ]
  },
  ACTION_RANGED: {
    name: '+1 free Ranged Action',
    description:
      'The Survivor has one extra, free Ranged Combat Action. This Action can only be used for Ranged Combat.',
    effect: ([gen, mov, att, sea, bon]) => [
      gen,
      mov,
      [att[0], att[1], att[2] + 1],
      sea,
      bon
    ]
  },
  BREAK_IN: {
    name: 'Break-in',
    description:
      'The Survivor doesn’t need any Equipment to open doors. He doesn’t make Noise while using this Skill. However, other prerequisites are still mandatory (such as taking a designated Objective) Moreover, the Survivor has one extra, free Door opening Action. This Action can only be used to open doors.'
  },
  CAN_START_AT: level => ({
    name: `Can start at ${level} Level`,
    description:
      'The Survivor can begin the game at the indicated Danger Level (first experience point of the indicated Danger Level). All players have to agree'
  }),
  COLLECTOR: zombieType => ({
    name: `Collector: ${zombieType}`,
    description:
      'The Survivor doubles the experience gained each time he kills a Zombie of the specified type.'
  }),
  DEATH_GRASP: {
    name: 'Death grasp',
    description:
      'Don’t discard an Equipment card when the Survivor receives a Wounded card. This Skill is ignored if there’s no space left in the Inventory to receive the Wounded card.'
  },

  LOW_PROFILE: {
    name: 'Low Profile',
    description:
      'The Survivor can’t be targeted by Survivors’ Ranged Attacks and can’t be hit by car attacks (in both case, even by rival Survivors’ Attacks). Ignore him when shooting in or driving through the Zone he stands in. Weapons that kill everything in the targeted Zone, like the Molotov, still kill him, though.'
  },
  REGENERATION: {
    name: 'Regeneration',
    description:
      'At the end of each game round, discard all Wounds the Survivor received. Regeneration doesn’t work if the Survivor has been eliminated.'
  },
  ROLL6: type => ({
    name: `Roll 6: +1 die ${type}`,
    description: `You may roll an additional die for each “6” rolled on any ${type} action. Keep on rolling additional dice as long as you keep getting “6”. Game effects that allow re-rolls (the “1 re-roll per turn” Skill or the “Plenty of ammo” Equipment card, for example) must be used before rolling any additional dice for this Skill.`
  }),
  ROTTEN: {
    name: 'Rotten',
    description:
      'At the end of his turn, if the Survivor has not taken a Combat Action, driven a car, and has not produced a Noise token, place a Rotten token next to his base. As long as he has this token, he is totally ignored by any and all types of Zombies (except Zombivors) and is not considered a Noise token. Zombies don’t attack him and will even walk past him. The Survivor loses his Rotten token if he takes any Combat Action or makes noise. Even with the Rotten token, the Survivor still has to spend extra Actions to move out of a Zone crowded with Zombies.'
  },
  SUPER_STRENGTH: {
    name: 'Super strength',
    description:
      'Consider the Damage value of Melee weapons used by the Survivor to be 3.'
  },
  TOXIC_IMMUNITY: {
    name: 'Toxic Immunity',
    description: 'The Survivor is immune to Toxic Blood Spray.'
  },
  WEBBING: {
    name: 'Webbing',
    description:
      'All equipment in the Survivor’s inventory is considered equipped in hand.'
  },
  ZOMBIE_LINK: {
    name: 'Zombie link',
    description:
      'The Survivor plays an extra turn each time an extra activation card is drawn in the Zombie pile.'
  }
};

export const ABILITIES_S2 = {
  BLITZ: {
    name: 'Blitz',
    description:
      'Each time your Survivor kills the last Zombie of a Zone, he gets 1 free Move Action to use immediately'
  },
  BLOODLUST_MELEE: {
    name: 'Bloodlust: Melee',
    description:
      'Spend one Action with the Survivor: He moves up to two Zones to a Zone containing at least one Zombie (or rival Survivor). He then gains one free Melee Action'
  },
  FRENZY_COMBAT: {
    name: 'Frenzy: Combat',
    description:
      'All weapons the Survivor carries gain +1 die per Wound the Survivor suffers. Dual weapons gain a die each, for a total of +2 dice per Wound and per Dual Combat Action.'
  },
  FRENZY_MELEE: {
    name: 'Frenzy: Melee',
    description:
      'All weapons the Survivor carries gain +1 die per Wound the Survivor suffers. Dual Melee weapons gain a die each, for a total of +2 dice per Wound and per Dual Melee Action.'
  },
  FRENZY_RANGED: {
    name: 'Frenzy: Ranged',
    description:
      'All weapons the Survivor carries gain +1 die per Wound the Survivor suffers. Dual Ranged weapons gain a die each, for a total of +2 dice per Wound and per Dual Ranged Action.'
  },
  LIFE_SAVER: {
    name: 'Life Saver',
    description:
      'The Survivor can use this Skill, for free, once during each of his Activations. Select a Zone containing at least one Zombie at Range 1 from your Survivor. Choose Survivors in the selected Zone to be dragged to your Survivor’s Zone without penalty. This is not a Move Action. A Survivor can decline the rescue and stay in the selected Zone if his controller chooses. Both Zones need to share a clear path.'
  },
  POINT_BLANK: {
    name: 'Point Blank',
    description:
      'When firing at Range 0, the Survivor freely chooses the targets of his Ranged Combat Actions and can kill any type of Zombies (including Berserker Zombies). His Ranged weapons still need to inflict enough Damage to kill his targets.'
  },
  REAPER_COMBAT: {
    name: 'Reaper: Combat',
    description:
      'Use this Skill when assigning hits while resolving a Combat Action. One of these hits can freely kill an additional identical Zombie in the same Zone. Only a single additional Zombie can be killed per Action when using this Skill..',
    effect: ({ combat, melee, ranged }) => ({
      combat: combat + 1,
      melee,
      ranged
    })
  },
  REAPER_MELEE: {
    name: 'Reaper: Melee',
    description:
      'Use this Skill when assigning hits while resolving a Ranged Action. One of these hits can freely kill an additional identical Zombie in the same Zone. Only a single additional Zombie can be killed per Action when using this Skill.',
    effect: ({ combat, melee, ranged }) => ({
      combat,
      melee: melee + 1,
      ranged
    })
  },
  REAPER_RANGED: {
    name: 'Reaper: Ranged',
    description:
      'Use this Skill when assigning hits while resolving a Ranged Action. One of these hits can freely kill an additional identical Zombie in the same Zone. Only a single additional Zombie can be killed per Action when using this Skill.',
    effect: ({ combat, melee, ranged }) => ({
      combat,
      melee,
      ranged: ranged + 1
    })
  },
  SHOVE: {
    name: 'Shove',
    description:
      'The Survivor can use this Skill, for free, once during each of his Activations. Select a Zone at Range 1 from your Survivor. All Zombies standing in your Survivor’s Zone are pushed to the selected Zone. This is not a Movement. Both Zones need to share a clear path. A Zombie can’t cross barricades (see barricades), fences, closed doors, or walls but can be shoved out of a hole.'
  },
  TAUNT: {
    name: 'Taunt',
    description:
      'The Survivor can use this Skill, for free, once during each of his Activations. Select a Zone your Survivor can see. All Zombies standing in the selected Zone immediately gain an extra Activation: They try to reach the taunting Survivor by any means available. Taunted Zombies ignore all other Survivors. They do not attack them and cross the Zone they stand in if needed to reach the taunting Survivor.'
  },
  TACTICIAN: {
    name: 'Tactician',
    description:
      'The Survivor’s turn can be resolved anytime during the Players’ Phase, before or after any other Survivor’s turn. If several teammates benefit from this Skill at the same time, the team’s players choose their activation order.'
  }
};

export const ABILITIES_S3 = {
  FREE_RELOAD: {
    name: 'Free Reload',
    description:
      'The Survivor reloads reloadable weapons (Double Barrel, Mac-10, Sawed-Off, etc.) for free.'
  },
  HIT_N_RUN: {
    name: 'Hit & Run',
    description:
      'The Survivor can use this Skill for free, just after he resolved Melee or Ranged Combat Action resulting in at least a Zombie kill (or a rival Survivor kill). He can then resolve a free Move Action. The Survivor does not spend extra Actions to perform this free Move Action if Zombies are standing in his Zone.'
  },
  SCAVENGER: {
    name: 'Scavenger',
    description:
      'The Survivor can Search in any Zone. This includes street Zones, indoor alleys, hospital Zones, helipads, tents, etc.'
  },
  SEARCH_PLUS_ONE: {
    name: 'Search: +1 card',
    description: 'Draw an extra card when Searching with the Survivor.'
  },
  SPRINT: {
    name: 'Sprint',
    description:
      'The Survivor can use this Skill once during each of his Activations. Spend one Move Action with the Survivor: He may move one, two, or three Zones instead of one. Entering a Zone containing Zombies ends the Survivor’s Move Action.'
  }
};

export const NIGHT_SHIFT = {
  CANT_BE_THAT_UNLUCKY: {
    name: "Can't be THAT unlucy",
    description:
      'Unlucky with dice results? Not anymore... Re-roll once any 1 on dice rolls.'
  },
  PEEK_OUT_THE_WINDOW: {
    name: 'Peek out the window',
    description:
      'Unlucky with dice results? Not anymore... Re-roll once any 1 on dice rolls.'
  },
  AGILITY: {
    name: 'Agility',
    description:
      'Character can dodge incoming melee attacks with 4+ on one die.'
  },
  CHARISMATIC: {
    name: 'Charismatic',
    description:
      'Civilians found by this character are always friendly and calmed down, and will never leave the group behind. Civilians following a charismatic leader will not run away, even if they get scared. Gain +1 progression point per mission.'
  },
  INFLUENCER: {
    name: 'Influencer',
    description:
      'One on a round, the character can spend one action to give a free use of one owned skill to another.  The influenced character can use once the skill as it was their own. Note that any skills with specific requirements still apply (for example, you cannot influence someone with only melee weapons to do a ranged action).'
  },
  NIGHT_VISION: {
    name: 'Night vision',
    description:
      "The character's eyes gets very easily used to darkness and so they're not affected by any penalties applied on dark environments."
  },
  PICKPOCKETING: {
    name: 'Pickpocketing',
    description: 'The character can take for free any items from other playes.'
  },
  RUN_TO_DAYLIGHT: {
    name: 'Run to daylight',
    description:
      'The character can spend one action point and run two zones through an area infested with zombies. A die is rolled for each zombie. Any 4+ knocks down a zombie, but if the character rolls three 1s on the same dice roll, that means that the zombies have blocked the character advance and he is pinned on the zombies zone. Also throw a dice for fatties and Abominations, but they cannot be knocked down.'
  },
  SHOOT_FROM_THE_HIP: {
    name: 'Shoot from the hip',
    description:
      'Any handgun can be quickly discharged without taking time to aim. It gives an additional +2 dice to roll but raises the difficult by one. With dual guns, can be used with both.'
  },
  URBAN_SURVIVOR: {
    name: 'Urban survivor',
    description:
      'The characters knows where people use to hide their stuff. Thus, on any search, he can state exactly what kind of item he is looking for (weapons/ammo, items, civilians, food). He then may discard any search card that is not of the desired type (except for Aahh cards).'
  }
};

export const ALL_ABILITIES = {
  ...ABILITIES_S1,
  ...ABILITIES_MALL,
  ...ABILITIES_S2,
  ...ABILITIES_S3,
  ...NIGHT_SHIFT
};

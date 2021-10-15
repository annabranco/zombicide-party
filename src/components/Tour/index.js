import React from 'react';
import { number } from 'prop-types';
import { InstructionsArrow, InstructionsWrapper, TourText } from './styles';
import { BOTTOM, CENTER, LEFT, RIGHT, TOP } from '../../constants';
import SupportMe from '../SupportMe';

export const STEPS = [
  {
    step: 0,
    positionX: CENTER,
    positionY: BOTTOM,
    arrow: [BOTTOM, CENTER],
    message:
      'To start the TOUR, it would be a good idea to test your sound, as the sounds are maybe the most important aspects of Zombicide Party. <br>Click on TEST SOUND below and adjust your volume.'
  },
  {
    step: 1,
    positionX: CENTER,
    positionY: CENTER,
    arrow: [BOTTOM, CENTER],
    message:
      "Do you hear an ambience sound? 🎵 <br>If you do, that's great! You're ready to go. Click on NEW GAME to start. <br><br>If you don't hear it, please check your audio settings before clicking on NEW GAME."
  },
  {
    step: 2,
    positionX: CENTER,
    positionY: CENTER,
    arrow: [BOTTOM, CENTER],
    message:
      "On this screen you can configure your game so it has the same rules that the board session you're playing. These configurations help you have the better experience as possible. <br>For this tour, rules cannot be changed. So let's just leave them this way and click below on LOOKS GREAT to go on and select your players."
  },
  {
    step: 3,
    positionX: CENTER,
    positionY: CENTER,
    arrow: [BOTTOM, CENTER],
    message:
      "Here you need to select the players. These are not the characters, but the real people playing behind. <br>Let's add you as a player. <br>Click on the ➕ symbol and write your name."
  },
  {
    step: 4,
    positionX: LEFT,
    positionY: CENTER,
    arrow: [RIGHT, CENTER],
    message:
      "You are selected as the first player (note the number above your name. This means you will beging playing. If you are playing alone, you can just click OK. <br>But for this tour let's pretend some other player is also playing with you. <br>Click on one of the pre-existent players to select it."
  },
  {
    step: 5,
    positionX: CENTER,
    positionY: BOTTOM,
    arrow: [BOTTOM, CENTER],
    message: 'Cool! Now click on 🆗 to go on and select your characters.'
  },
  {
    step: 6,
    positionX: CENTER,
    positionY: CENTER,
    message:
      'Time to select our survivors. <br>The first one selected will be assigned to the first player (you). Click on AMY.'
  },
  {
    step: 7,
    positionX: CENTER,
    positionY: CENTER,
    message:
      'Hail the Metal Goddess! <br>Now, please select DOUG for your partner. Click on him to go on.'
  },
  {
    step: 8,
    positionX: CENTER,
    positionY: CENTER,
    message:
      'Each character has been assigned for a player in order. As there are only two players, if you select more characters, they will keep on being assigned in order to the existing players. <br>Try selecting WANDA, and she will be assigned to the first player again (you).'
  },
  {
    step: 9,
    positionX: CENTER,
    positionY: BOTTOM,
    arrow: [BOTTOM, CENTER],
    message:
      "Now we're ready to rock! 🤘🏽 <br>Take the beers off the freezer and CONFIRM your selection. <br>Time to play!"
  },
  {
    step: 10,
    positionX: LEFT,
    positionY: TOP,

    message:
      'This is the main screen of the game. <br>Take a moment to get to know it. <br>On the upper part, we have the expertience (XP) bar with the colored danger levels. <br>Just below it, the number of actions you have. Note that Amy starts with a Free Move action.'
  },
  {
    step: 11,
    positionX: CENTER,
    positionY: TOP,
    arrow: [BOTTOM, CENTER],
    message:
      'In the middle you have your cards and some related buttons, such as TRADE, DROP and REORDER (each button only appears when it can be used).'
  },
  {
    step: 12,
    positionX: CENTER,
    positionY: CENTER,
    arrow: [RIGHT, CENTER],
    message:
      "On the right side, you can see a table with your character's skills. All the efects of the acquired skills are automatically applied to the character - as you can see with Amy's Free Move Action. As you progress your level, the corresponding skills are going to be automatically activated on this table."
  },
  {
    step: 13,
    positionX: LEFT,
    positionY: BOTTOM,
    arrow: [BOTTOM, LEFT],
    message:
      "On the bottom part of the screen you can see the characters icons, on the order that they are playing on this round. <br>As we're beginning a new game, we need to distribute the initial equipment. Click on any card slot to add an initial weapon to Amy."
  },
  {
    step: 14,
    positionX: CENTER,
    positionY: TOP,
    message:
      'In the item selection screen you can always choose every available items. You should use the physical Zombicide cards to draw initial equipment and then click on the selected card here. <br><br>Remember to observe initial equipment according to the game rules.'
  },
  {
    step: 15,
    positionX: CENTER,
    positionY: CENTER,
    message:
      "Let's suppose that as Amy you took a Crowbar as the initial equipment. Click on the Crowbar to select it."
  },
  {
    step: 16,
    positionX: LEFT,
    positionY: BOTTOM,
    arrow: [BOTTOM, LEFT],
    message: "Let's advance to Doug to select his initial equipment."
  },
  {
    step: 17,
    positionX: CENTER,
    positionY: TOP,
    message: 'Click on a card.'
  },
  {
    step: 18,
    positionX: CENTER,
    positionY: CENTER,
    message:
      'Supposing the second player has drawn a Fire Axe for Doug from the initial cards, please select it.'
  },
  {
    step: 19,
    positionX: LEFT,
    positionY: BOTTOM,
    message: "Let's advance to Wanda to select her initial equipment."
  },
  {
    step: 20,
    positionX: CENTER,
    positionY: TOP,
    message: 'Click on a card.'
  },
  {
    step: 21,
    positionX: CENTER,
    positionY: CENTER,
    message: 'Select the Pistol.'
  },
  {
    step: 22,
    positionX: CENTER,
    positionY: BOTTOM,
    arrow: [BOTTOM, CENTER],
    message:
      'Yeah! Everything is set and now the game begins! 🤩 <br>Click on Finish Setup to start the first round.'
  },
  {
    step: 23,
    positionX: RIGHT,
    positionY: BOTTOM,
    arrow: [BOTTOM, RIGHT],
    message:
      'The action begins! Amy uses one action to move in direction of a closed door. <br>Locate the MOVE button below 🏃🏽‍♀️ and click it.'
  },
  {
    step: 24,
    positionX: LEFT,
    positionY: TOP,
    arrow: [TOP, LEFT],
    message:
      'Cool! Amy has spent one free movement action and still has three actions left.'
  },
  {
    step: 25,
    positionX: RIGHT,
    positionY: BOTTOM,
    message:
      'Now you decide that Amy is going to break down the door in front of her so the team can enter a room. <br>Locate the OPEN DOOR 🚪 button and click it.'
  },
  {
    step: 26,
    positionX: LEFT,
    positionY: TOP,
    arrow: [TOP, LEFT],
    message:
      'Amy has spent one action point to open the door. <br>Now she has two actions left.'
  },
  {
    step: 27,
    positionX: CENTER,
    positionY: BOTTOM,
    arrow: [BOTTOM, CENTER],
    message:
      'Atention: if you open a door and you have the bad luck of getting an extra activation and a Zombie is able to attack a character, you should use this ZOMBIE BUTTON below to make the Zombie attack. <br>But for the moment as we are on blue level, we can ignore this button.'
  },
  {
    step: 28,
    positionX: RIGHT,
    positionY: BOTTOM,
    arrow: [BOTTOM, RIGHT],
    message:
      'Amy moves in to face the Zombie that just spawned. <br>Click on MOVE 🏃🏽‍♀️ again.'
  },
  {
    step: 29,
    positionX: CENTER,
    positionY: TOP,
    arrow: [BOTTOM, CENTER],
    message:
      "Let's smash some Zombies' heads! <br>Amy strikes using the crowbar. <br>Click on the Crowbar to attack with it."
  },
  {
    step: 30,
    positionX: CENTER,
    positionY: TOP,
    message:
      'Every time you attack with a weapon, you can make as many kills as the weapon allows. You should physically row the dice and see the result. If you are able to kill any Zombie, click on the Zombie head inside the card of the weapon to confirm the kill. <br>Try to do it now.'
  },
  {
    step: 31,
    positionX: LEFT,
    positionY: TOP,
    arrow: [TOP, LEFT],
    message:
      "Great! You've won 1 XP by killing the Zombie. Your XP bar on the top now displays your new experience level."
  },
  {
    step: 32,
    positionX: LEFT,
    positionY: BOTTOM,
    arrow: [BOTTOM, LEFT],
    message:
      "Amy has no more actions left and so it is Doug's turn. <br>Click on Doug's icon to change the current character and then click on MOVE button 🏃🏽‍♂️ to also get him into the cleared room."
  },
  {
    step: 33,
    positionX: CENTER,
    positionY: TOP,
    message:
      'As Doug has an equiped weapon that can open doors, he also has the button OPEN DOORS on their action bar (below). But, as the door was already opened, he decides to search. <br>Click on an empty card to search.'
  },
  {
    step: 34,
    positionX: CENTER,
    positionY: CENTER,
    message:
      'Doug has found a SUB MG - what a lucky guy! <br>Click on the SUB MG to select it.'
  },
  {
    step: 35,
    positionX: RIGHT,
    positionY: TOP,
    message:
      'As Doug starts with Matching Set, ge automatically get another fresh SUB MG. <br>Yeah, what a lucky guy!! 😎'
  },
  {
    step: 36,
    positionX: LEFT,
    positionY: CENTER,
    arrow: [BOTTOM, CENTER],
    message:
      'To be able to use the SUB MGs as dual weapons, Doug reorders his hand to move both SUB MG to his hands, placing the Fire Axe on reserve. <br>Click on REORDER and try to do it.'
  },
  {
    step: 37,
    positionX: CENTER,
    positionY: TOP,
    arrow: [BOTTOM, CENTER],
    message:
      'Awesome! With his new found guns, Doug strikes the large group of zombies on the next room. <br>Click on any of the SUB MG and enjoy the zombicide!'
  },
  {
    step: 38,
    positionX: CENTER,
    positionY: TOP,
    arrow: [BOTTOM, CENTER],
    message:
      'Who said Doug is boring?? Because of his Dual effect, Doug is able to kill up to 6 Zombies with a single attack. <br>Click on some Zombie heads displayed on both of the weapons.'
  },
  {
    step: 39,
    positionX: RIGHT,
    positionY: CENTER,
    message:
      "Let's note two things here: <br>(1) here on the right, we can see the total ammount of noise made by each character on the turn; and <br>(2) as Doug has no longer the Fire Axe equipped in hand, he can't open doors and the button OPEN DOOR isn't visible anymore."
  },
  {
    step: 40,
    positionX: RIGHT,
    positionY: BOTTOM,
    message:
      "As everything is quiet now, Doug decides to await for Wanda and skip his last action. <br>Click on END DOUG'S TURN 🚫 button to finish his turn."
  },
  {
    step: 41,
    positionX: LEFT,
    positionY: TOP,
    arrow: [TOP, LEFT],
    message:
      "Now it's Wandas turn. Note that on XP bar, we can see highlighted the character with the highest XP."
  },
  {
    step: 42,
    positionX: RIGHT,
    positionY: BOTTOM,
    message:
      'Ok! Wanda slides in quickly in direction of a visible objetive. <br>Click on MOVE 🏃🏽‍♀️ to approach it.'
  },
  {
    step: 43,
    positionX: RIGHT,
    positionY: BOTTOM,
    arrow: [BOTTOM, RIGHT],
    message:
      'Wanda takes the objective. <br>Click on the GET OBJECTIVE button ❎ below.'
  },
  {
    step: 44,
    positionX: LEFT,
    positionY: TOP,
    arrow: [TOP, LEFT],
    message: 'Great! Wanda get 5 XP for the objective.'
  },
  {
    step: 45,
    positionX: RIGHT,
    positionY: BOTTOM,
    message:
      "Note that Wanda doesn't have an OPEN DOOR button because she is not equipping a weapon that can open doors. She ends her turn. <br>Click on END TURN 🚫."
  },
  {
    step: 46,
    positionX: CENTER,
    positionY: BOTTOM,
    arrow: [BOTTOM, CENTER],
    message: 'Ahhhh! <br>TIME FOR THE ZOMBIES!'
  },
  {
    step: 47,
    positionX: CENTER,
    positionY: CENTER,
    message:
      'In this screen, we control the Zombies activations and attacks. As they cannot attack our heroes at this point, you can just use this screen to make some noise. You may click on each Zombie as they spawn on the board, just to make it more scarry! 👻'
  },
  {
    step: 48,
    positionX: CENTER,
    positionY: BOTTOM,
    arrow: [BOTTOM, CENTER],
    message:
      "As the Zombies are not so close to attack, you can just END the Zombies' turn and start Round 2. <br>You can also try some Zombies' sounds before moving on."
  },
  {
    step: 49,
    positionX: RIGHT,
    positionY: BOTTOM,
    message:
      'As the second round begins, a loud nearby explosion is heard! <br>Click on the TRIGGER AN EXPLOSION 🎇 button below.'
  },
  {
    step: 50,
    positionX: CENTER,
    positionY: CENTER,
    message:
      "This button doesn't have any real effect and simply reproduce a sound. You may use it freely when you want to bring explosion sounds to your game. If you prefer, you can disable this button when configuring your rules on the beginning of the game."
  },
  {
    step: 51,
    positionX: CENTER,
    positionY: TOP,
    arrow: [BOTTOM, CENTER],
    message:
      'The exit point of the mission is close, but it looks like the explosion attracted a huge big that is blocking the way out. Doug tries to clear a path so the group can run away. He uses all his actions to fire against them. <br>Click TWICE on your SubMGs (you need to wait a little while between each click) and confirm as much kills as you can.'
  },
  {
    step: 52,
    positionX: LEFT,
    positionY: CENTER,

    message:
      'Doug has accumulated enough experience to advance to yellow level. He automatically gains one more action (the yellow skill effect). He uses this action to give the SubMGs to Wanda, the next to play. <br>Click on TRADE to give her the guns.'
  },
  {
    step: 53,
    positionX: CENTER,
    positionY: CENTER,
    message:
      "Try to give the SubMGs to Wanda, so she has both of them in hands. She doesn't need to give anything back to Doug. <br><br>(You need to give the weapons to WANDA, not to Amy)."
  },
  {
    step: 54,
    positionX: RIGHT,
    positionY: BOTTOM,
    message: "Now click on END TURN to finish Doug's turn. 🚫"
  },
  {
    step: 55,
    positionX: LEFT,
    positionY: BOTTOM,
    arrow: [RIGHT, TOP],
    message:
      "Now it's Wanda's. There are few zombies left in front of them, and she decides to finish clearing it. <br>Click once on one of the SubMGs."
  },
  {
    step: 56,
    positionX: CENTER,
    positionY: TOP,
    message:
      'Wanda clears the path in front of the group and advances to yellow danger level. Now she handles the guns to Amy, the last to play on this round. <br>Make the TRADE.'
  },
  {
    step: 57,
    positionX: RIGHT,
    positionY: BOTTOM,
    message:
      'Wanda decided to run for her life. She uses one movement to move two zones to the the EXIT zone. <br>RUN! 🏃🏽‍♀️'
  },
  {
    step: 58,
    positionX: RIGHT,
    positionY: BOTTOM,
    arrow: [BOTTOM, CENTER],
    message:
      'She has reached the EXIT zone and can leave safely the mission. <br>Click on the EXIT button.'
  },
  {
    step: 59,
    positionX: CENTER,
    positionY: TOP,
    message:
      "Wanda is out and safe. Amy and Doug still need to reach the EXIT. It's now Amy's turn. She's very worried about some Zombies very close to them, so she fires like there were no tomorrow. <br>Use all of Amy's actions to attack."
  },
  {
    step: 60,
    positionX: CENTER,
    positionY: TOP,
    message:
      "She was very lucky and killed six of them. <br>Click on six Zombies' heads to confirm the kills."
  },
  {
    step: 61,
    positionX: RIGHT,
    positionY: BOTTOM,
    message:
      'She still has actions, but she decides to stay and face together with Doug the incoming zombies. <br>Click on END TURN.'
  },
  {
    step: 62,
    positionX: CENTER,
    positionY: CENTER,
    message: 'Time for the Zombies to be activated.'
  },
  {
    step: 63,
    positionX: CENTER,
    positionY: CENTER,
    message:
      "On their activation, a Walker and a Runner reached our heroes. It's so scarry to have them so close!"
  },
  {
    step: 64,
    positionX: CENTER,
    positionY: CENTER,
    arrow: [LEFT, CENTER],
    message:
      'Oh, no! The Walkers received an extra activation and the Walker who reached our heroes attack them. <br>Click on ATTACK SURVIVOR on the Walker selector.'
  },
  {
    step: 65,
    positionX: LEFT,
    positionY: CENTER,
    message:
      'Now you need to choose one target. <br>Remember that each damage makes the character drop an item. As Amy and Doug are both together, you may choose who gets the hit and which item is dropped. <br>Do it now.'
  },
  {
    step: 66,
    positionX: CENTER,
    positionY: CENTER,
    arrow: [BOTTOM, LEFT],
    message:
      "What a nightmare! <br>The Runners also receive an extra activation and the runner on the same zone of our heroes can attack twice. No matter which hero he attacks, he's going to kill somebody. <br>Click on INSTANT KILL."
  },
  {
    step: 67,
    positionX: CENTER,
    positionY: CENTER,
    message:
      "There's nothing to do... one of our heroes will take the blow and die... A very hard decision nobody wants to take, but you have to make it right now! <br>Choose one of the heroes to be killed and click on a valid card slot."
  },
  {
    step: 68,
    positionX: CENTER,
    positionY: CENTER,
    message:
      "After this brutal kill, the Zombies' round finish. <br>Click on END."
  },
  {
    step: 69,
    positionX: CENTER,
    positionY: TOP,
    message:
      'No time to moan or to cry. If we want to save out last hero, we need to fight to the death. <br>Click on your weapon to attack the Zombies.'
  },
  {
    step: 70,
    positionX: CENTER,
    positionY: TOP,
    message: "We've kill one.<br> Just one more to go. <br>Attack again!"
  },
  {
    step: 71,
    positionX: CENTER,
    positionY: TOP,
    message: "It's down!! <br>Now RUN!!! <br>Maybe you can reach the EXIT..."
  },
  {
    step: 72,
    positionX: CENTER,
    positionY: TOP,
    message:
      'Desperately and without even being able to stare at your partner left behind, you run away from this bloody nightmare. <br>Click on EXIT.'
  },
  {
    step: 73,
    positionX: CENTER,
    positionY: CENTER,
    message:
      'With this sour victory, this Tour is finished. <br>There are soooo many options, actions and possibilities to explore on Zombicide Party when playing the board game. <br>Little bit little you will get to know them all.'
  },
  {
    step: 74,
    positionX: CENTER,
    positionY: CENTER,
    message:
      'As soon as more expansions are added, you will be able to play with different characters, weapons and enemies.'
  },
  {
    step: 75,
    positionX: CENTER,
    positionY: CENTER,
    message:
      'Oh, one important thing to mention is that the game is automatically saved at each action. This way, you can always stop it and close it whenever you want and select CONTINUE from the main menu to continue exactly from where you left it.'
  },
  {
    step: 76,
    positionX: CENTER,
    positionY: TOP,
    message:
      'That covers all the basics. <br><br>I really hope you have a great experience with your Zombicide Party!'
  },
  {
    step: 77,
    positionX: CENTER,
    positionY: CENTER,
    component: SupportMe,
    message:
      'If you like this app and want to help it grow,<br>please consider supporting it by inviting me for a coffee. 😉',
    messageBelow: 'Many thanks!!!'
  }
];

const Tour = ({ tourMode }) => {
  const Component = STEPS[tourMode].component;
  return (
    <InstructionsWrapper
      positionX={STEPS[tourMode].positionX}
      positionY={STEPS[tourMode].positionY}
      large={!!STEPS[tourMode].component}
    >
      {STEPS[tourMode].component ? (
        <>
          <TourText
            dangerouslySetInnerHTML={{
              __html: STEPS[tourMode].message
            }}
            type="dark"
          />
          <Component />
          <TourText type="dark">{STEPS[tourMode].messageBelow}</TourText>
        </>
      ) : (
        <>
          <TourText
            dangerouslySetInnerHTML={{
              __html: STEPS[tourMode].message
            }}
            type="dark"
          />
          {STEPS[tourMode].arrow && (
            <InstructionsArrow arrow={STEPS[tourMode].arrow} />
          )}
        </>
      )}
    </InstructionsWrapper>
  );
};

Tour.propTypes = {
  tourMode: number.isRequired
};

export default Tour;

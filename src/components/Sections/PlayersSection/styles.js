import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { AttackInstructions } from '../ZombiesSection/styles';
import { Appear } from '../../../styles';
import { IN_BACKPACK } from '../../../constants';

export const Abilities = styled.p`
  label: Abilities;
  margin: 2px auto;
  font-family: 'Grandstander', cursive;
  text-transform: uppercase;
  font-weight: 700;
  font-size: 1.2rem;
  color: rgba(255, 255, 0, 0.6);
  -webkit-text-stroke: 1px black;
`;
Abilities.displayName = 'Abilities';

export const AbilitiesWrapper = styled.div`
  label: AbilitiesWrapper;
  z-index: 10;
  position: absolute;
  bottom: 50px;
  left: 50%;
  transform: translate(-50%, 0);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 14%;
  width: 90%;
`;
AbilitiesWrapper.displayName = 'AbilitiesWrapper';

export const ActionsLabelWrapper = styled.div`
  label: ActionsLabelWrapper;
  z-index: 10;
  position: absolute;
  top: 175px;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 20px;
  width: 50%;
  font-family: 'Grandstander', cursive;
  font-size: 0.9rem;
  letter-spacing: 0.4rem;
  color: rgba(255, 255, 180, 0.6);
  text-transform: uppercase;
`;
ActionsLabelWrapper.displayName = 'ActionsLabelWrapper';

export const AppButton = styled.button`
  label: AppButton;
  z-index: 3;
  top: 0;
  border: 1px solid black;
  border-radius: 5px;
  padding: 2px 10px;
  background: rgba(0, 0, 0, 0.7);
  font-family: 'Cairo', sans-serif;
  color: rgba(255, 255, 255, 0.7);
  font-weight: 700;
  font-size: 0.7rem;
  line-height: 1.5;
  cursor: pointer;

  &:hover {
    color: ${({ trade }) => (trade ? 'white' : 'yellow')};
  }

  ${({ trade }) =>
    trade &&
    css`
      background: rgba(0, 0, 0, 0.9);
    `}
`;
AppButton.displayName = 'AppButton';

export const ActionsWrapper = styled.div`
  label: ActionsWrapper;
  z-index: 4;
  position: absolute;
  top: 15%;
  right: 30px;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: flex-end;
  width: 90%;
`;
ActionsWrapper.displayName = 'ActionsWrapper';

export const AddNewChar = styled(AppButton)`
  label: AddNewChar;
  z-index: 11;
  position: absolute;
  top: -40px;
  right: 10px;
  height: 30px;
  width: 30px;
  font-size: 1.2rem;
  padding: 1px;
  /* background: ${({ damageMode }) => damageMode && 'red'};
  color: ${({ damageMode }) => damageMode && 'black'};
  box-shadow: ${({ damageMode }) => damageMode && '0 0 5px white'}; */

  &:hover {
    color: yellow;
  }
`;
AddNewChar.displayName = 'AddNewChar';

export const CharacterOverlay = styled.div`
  label: CharacterOverlay;
  z-index: 2;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: #232222;
  opacity: 0.7;
  filter: ${({ damageMode }) =>
    damageMode
      ? 'contrast(2.5) brightness(0.7)'
      : 'contrast(0.7) saturate(1.6)'};

  ${({ img, position = 'center top' }) => css`
    background-image: ${`url(${img})`};
    background-position: ${position};
    background-size: 100%;
    background-repeat: no-repeat;
  `}
`;

export const CharacterSheet = styled.div`
  label: CharacterSheet;
  z-index: 1;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 80px);
  width: 90%;
  background: black;
  /* overflow: hidden; */
`;
CharacterSheet.displayName = 'CharacterSheet';

export const CharName = styled.h1`
  label: CharName;
  z-index: 3;
  position: absolute;
  top: 0;
  right: 80px;
  margin: 10px auto 20px;
  border-radius: 50px;
  font-size: 3rem;
  color: rgba(255, 255, 255, 0.8);
  text-shadow: 0 0 4px black;
  line-height: 1.2;
  text-transform: uppercase;
`;
CharName.displayName = 'CharName';

export const CharItems = styled.div`
  label: CharItems;
  position: absolute;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 65px;
  width: 90%;

  ${({ slotType }) =>
    slotType === IN_BACKPACK &&
    css`
      margin-top: -10px;
    `}
  ${({ trade }) =>
    trade &&
    css`
      top: 80px;
    `}
`;
CharItems.displayName = 'CharItems';

export const FinishedTurnTag = styled(AttackInstructions)`
  label: FinishedTurnTag;
  background: none;
  font-size: 2rem;
  color: #cc9900;
  text-shadow: -2px -2px 2px black, -2px 0 2px black, -2px 2px 2px black,
    0 -2px 2px black, 0 0 2px black, 0 2px 2px black, 2px -2px 2px black,
    2px 0 2px black, 2px 2px 2px black;
`;
FinishedTurnTag.displayName = 'FinishedTurnTag';

export const FirstPlayerStar = styled.span`
  label: FirstPlayerStar;
  color: #cea616;
  font-size: 2.3rem;
  margin-right: 10px;
`;
FirstPlayerStar.displayName = 'FirstPlayerStar';

export const FirstPlayerToken = styled.img`
  label: FirstPlayerToken;
  margin-top: -530px;
  width: 500px;
  border-radius: 50%;
  filter: contrast(1.8) brightness(1.2) opacity(0.2);
`;
FirstPlayerToken.displayName = 'FirstPlayerToken';

export const FirstPlayerWrapper = styled.div`
  label: FirstPlayerWrapper;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  overflow: hidden;
`;
FirstPlayerWrapper.displayName = 'FirstPlayerWrapper';

export const HishestXpTag = styled.span`
  label: HishestXpTag;
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translate(-50%, 0);
  font-family: 'Cairo', sans-serif;
  text-transform: uppercase;
  font-size: 0.8rem;
  color: white;
`;
HishestXpTag.displayName = 'HishestXpTag';

export const IndicatorsWrapper = styled.div`
  label: IndicatorsWrapper;
  z-index: 10;
  position: absolute;
  top: 0;
  left: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  opacity: 0.7;

  ${({ header }) =>
    header &&
    css`
      top: -35px;
      left: 0;
      width: 100%;
      justify-content: space-around;
      padding: 0 50px 0 20px;
    `}
`;
IndicatorsWrapper.displayName = 'IndicatorsWrapper';

export const ModalSign = styled(AttackInstructions)`
  label: ModalSign;
  position: absolute;
  z-index: 2;
  top: 0;
  padding: 30% 0;
  height: 100%;
  background: ${({ noOverlay }) => (noOverlay ? 'none' : 'rgba(0, 0, 0, 0.6)')};
  /* background: rgba(0, 0, 0, 0.6); */
  font-family: Crackhouse, 'Grandstander', cursive;
  font-size: 4rem;
  text-align: right;

  ${({ noOverlay }) =>
    noOverlay &&
    css`
      bottom: 0;
      right: 50%;
      transform: translate(-50%, 0);
      width: auto;
      opacity: 0.7;
    `}

  ${({ killed }) =>
    killed &&
    css`
      width: 100%;
    `}
`;
ModalSign.displayName = 'ModalSign';

export const ModalSignText = styled.p`
  label: ModalSignText;
  position: absolute;
  top: 180px;
  right: 100px;
  width: 100%;
  opacity: 0.9;
  white-space: pre;
`;
ModalSignText.displayName = 'ModalSignText';

export const ModalSignButton = styled(AppButton)`
  label: ModalSignButton;
  z-index: 10;
  position: absolute;
  top: unset;
  bottom: 20px;
  height: 30px;
  width: 200px;
  line-height: 0.9;
  text-align: center;
  font-family: 'Cairo', sans-serif;
  font-size: 0.9rem;
  cursor: pointer;
  border: 1px solid black;
  border-radius: 5px;

  ${({ noOverlay }) =>
    noOverlay &&
    css`
      bottom: unset;
      bottom: 15px;
      left: 50%;
      transform: translate(-50%, 0);
    `}

  ${({ setupMode }) =>
    setupMode &&
    css`
      background: green;
    `}

  ${({ roundEnded }) =>
    roundEnded &&
    css`
      color: black;
      background: red;
    `}
`;
ModalSignButton.displayName = 'ModalSignButton';

export const ModalSignExitButton = styled.img`
  label: ModalSignButton;
  z-index: 10;
  position: absolute;
  bottom: 52%;
  width: 80px;
  cursor: pointer;
  box-shadow: 0 0 6px 0 white;
  animation-name: ${Appear};
  animation-duration: 10s;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
`;
ModalSignButton.displayName = 'ModalSignButton';

export const MovementIcon = styled.div`
  label: MovementIcon;
  position: relative;
  left: 0.75em;
  width: ${({ type }) => (typeof type === 'number' ? '20px' : '70px')};
  height: 14px;
  text-align: center;
  background: ${({ color }) => color};
  color: ${({ type }) => (typeof type === 'number' ? 'white' : 'black')};
  font-weight: 700;
  line-height: 1.1;
  font-size: 0.7rem;
  font-family: 'Cairo', sans-serif;

  &:not(:first-of-type) {
    margin-left: 15px;
  }

  &:after {
    content: '';
    position: absolute;
    left: 100%;
    width: 10px;
    height: 14px;
    clip-path: polygon(50% 50%, -50% -50%, 0 100%);
    background: ${({ color }) => color};
  }
  &:before {
    content: '';
    position: absolute;
    left: 1px;
    top: 0;
    width: 10px;
    height: 14px;
    clip-path: polygon(100% 0, 100% 100%, 0% 100%, 50% 50%, 0% 0%);
    transform: translateX(-100%);
    background: ${({ color }) => color};
  }
`;
MovementIcon.displayName = 'MovementIcon';

export const NextButton = styled(AppButton)`
  label: NextButton;
  z-index: 11;
  position: absolute;
  top: unset;
  bottom: 20px;
  right: 20px;
  height: 20px;
  background: ${({ damageMode }) => damageMode && 'red'};
  color: ${({ damageMode }) => damageMode && 'black'};
  box-shadow: ${({ damageMode }) => damageMode && '0 0 5px white'};

  ${({ trade }) =>
    trade &&
    css`
      bottom: 6px;
      height: 45px;
      width: 45px;
      text-align: center;
      font-size: 2rem;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.6);
      color: black;
      line-height: 0.6;
      right: 10px;
      padding: 2px 0 0 6px;

      &:hover {
        background: rgba(255, 255, 255, 0.4);
      }
    `}
`;
NextButton.displayName = 'NextButton';

export const NoiseIcon = styled.img`
  label: NoiseIcon;
  width: 45px;
`;
NoiseIcon.displayName = 'NoiseIcon';

export const NoiseWrapper = styled.div`
  label: NoiseWrapper;
  z-index: 10;
  position: absolute;
  top: calc(18% + 50px);
  right: 30px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  height: 45px;
  width: 300px;
`;
NoiseWrapper.displayName = 'NoiseWrapper';

export const PlayerTag = styled.div`
  label: PlayerTag;
  z-index: 6;
  position: absolute;
  top: 70px;
  right: 0;
  height: 20px;
  width: 30%;
  border: 1px solid black;
  border-radius: 20px 0 0 20px;
  padding: 5px 20px;
  background: ${({ color }) => color || 'black'};
  /* cursor: pointer; */
  font-family: 'Grandstander', cursive;
  text-align: center;
  font-size: 1.1rem;
  text-shadow: 0 0 2px black;
  letter-spacing: 0.6rem;
  font-weight: 900;
  line-height: 0.6;
  text-transform: uppercase;
  color: white;
  filter: brightness(0.8);
`;
PlayerTag.displayName = 'PlayerTag';

export const PreviousButton = styled(NextButton)`
  label: PreviousButton;
  left: 20px;

  ${({ trade }) =>
    trade &&
    css`
      left: 10px;
      padding-left: 0;
      padding-right: 6px;
    `}
`;
PreviousButton.displayName = 'PreviousButton';

export const SelectButton = styled(NextButton)`
  label: SelectButton;
  bottom: 10px;
  left: 50%;
  transform: translate(-50%, 0);
  border: 3px solid black;
  box-shadow: 0 3px 3px 1px rgba(0, 0, 0, 0.4), inset 0 0 2px white;
  height: 40px;
  width: 90px;
  background: rgba(139, 0, 0, 0.95);
`;
SelectButton.displayName = 'SelectButton';

export const TopActionsLabelWrapper = styled(ActionsLabelWrapper)`
  label: TopActionsLabelWrapper;
  top: 0;
  right: 0;
  align-items: flex-end;
  height: 20px;
  width: 30%;
  font-size: 0.6rem;
  letter-spacing: 0.2rem;
  text-align: right;
`;
TopActionsLabelWrapper.displayName = 'TopActionsLabelWrapper';

export const WoundedSign = styled.img`
  label: WoundedSign;
  z-index: 2;
  width: 180%;
  filter: brightness(0.35) saturate(2.1) opacity(0.8);
  margin-top: -60px;
`;
WoundedSign.displayName = 'WoundedSign';

export const WoundedWrapper = styled.div`
  label: WoundedWrapper;
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  background: rgba(139, 0, 0, 0.1);
  overflow: hidden;
`;
WoundedWrapper.displayName = 'WoundedWrapper';

export const XpIcon = styled(MovementIcon)`
  label: XpIcon;
  width: 25px;
  left: 0;
  /* color: black; */
  color: black;
  font-size: ${({ currentXp, highestXp }) =>
    (currentXp || highestXp) && '1.1rem'};
  line-height: ${({ currentXp, highestXp }) =>
    currentXp || highestXp ? '1' : '1.2'};

  background: ${({ activeColor }) => activeColor && activeColor};
  opacity: ${({ activeColor }) => activeColor && 1};
  height: ${({ currentXp, highestXp }) =>
    currentXp || highestXp ? '18px' : '14px'};
  width: ${({ currentXp, highestXp, size }) =>
    currentXp || highestXp
      ? `calc(100% / ${size} + 10px) `
      : `calc(100% / ${size} )`};

  &:not(:first-of-type) {
    margin-left: 8px;
  }

  &:after {
    content: '';
    position: absolute;
    left: 100%;
    width: 6px;
    height: ${({ currentXp, highestXp }) =>
      currentXp || highestXp ? '18px' : '14px'};
    clip-path: polygon(50% 50%, -50% -50%, 0 100%);
    background: ${({ activeColor }) => activeColor && activeColor};
  }
  &:before {
    content: '';
    position: absolute;
    /* left: 10px; */
    top: 0;
    width: 6px;
    height: ${({ currentXp, highestXp }) =>
      currentXp || highestXp ? '18px' : '14px'};
    clip-path: polygon(100% 0, 100% 100%, 0% 100%, 50% 50%, 0% 0%);
    transform: translateX(-100%);
    background: ${({ activeColor }) => activeColor && activeColor};
  }

  &:first-of-type:before {
    clip-path: none;
  }
  &:last-of-type:after {
    clip-path: none;
  }
`;
XpIcon.displayName = 'XPIcon';

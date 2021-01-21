import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { rgba } from 'emotion-rgba';
import { AttackInstructions } from '../ZombiesSection/styles';
import { Appear } from '../../../styles';
import { IN_BACKPACK, MOBILE } from '../../../constants';
import Background from '../../../assets/images/background/background.jpg';

export const Abilities = styled.p`
  label: Abilities;
  font-family: 'Grandstander', cursive;
  text-transform: uppercase;
  font-weight: 500;
  color: rgba(255, 255, 0, 0.6);
  letter-spacing: 0.05rem;
  font-size: 0.6rem;
  text-align: ${({ level }) => (level % 2 ? 'right' : 'left')};

  @media all and (min-width: 360px) {
    font-size: 0.9rem;
  }

  @media all and (min-width: 768px) {
    margin: 2px auto;
    font-weight: 700;
    font-size: 1.4rem;
    -webkit-text-stroke: 1px black;
  }
`;
Abilities.displayName = 'Abilities';

export const AbilitiesInnerSeparator = styled.div`
  label: AbilitiesInnerSeparator;
  z-index: 10;
  padding: 10px 10px;
  width: 90%;
  border-bottom: 1px solid rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  &:last-of-type {
    border: none;
  }
`;
AbilitiesInnerSeparator.displayName = 'AbilitiesInnerSeparator';

export const AbilitiesWrapper = styled.div`
  label: AbilitiesWrapper;
  z-index: 10;
  position: absolute;
  bottom: 36px;
  left: 50%;
  transform: translate(-50%, 0);
  display: grid;
  height: 44px;
  width: 100%;
  background: rgba(0, 0, 0, 0.7);
  /* background: ${({ color }) => color && `${rgba(color, 0.6)}`}; */
  padding: 2px 5px;
  align-items: center;

  grid-template-columns: ${({ number }) => {
    if (number >= 2) {
      return 'repeat(2, minmax(100px, 1fr));';
    }
    return 'repeat(1, minmax(100px, 1fr));';
  }};

  font-size: ${({ number }) => {
    if (number > 2) {
      return '0.8rem;';
    }
    if (number === 2) {
      return '1rem;';
    }
    return '1.3rem;';
  }};

  @media all and (min-width: 360px) {
    bottom: 46px;
    height: 54px;
  }

  @media all and (min-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    bottom: 0;
    height: 10%;
    width: 100%;
  }
`;
AbilitiesWrapper.displayName = 'AbilitiesWrapper';

export const AbilitiesWrapperDesktop = styled.div`
  label: AbilitiesWrapperDesktop;
  z-index: 10;
  position: absolute;
  padding: 20px 0;
  bottom: 90px;
  right: 20px;
  background: rgba(0, 0, 0, 0.15);
  border: 1px solid rgba(0, 0, 0, 0.5);
  height: 55%;
  width: 20%;
  border-radius: 10px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2),
    inset 1px 1px 5px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
`;
AbilitiesWrapperDesktop.displayName = 'AbilitiesWrapperDesktop';

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
  letter-spacing: 0.2rem;
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

  ${({ isMobile }) =>
    isMobile &&
    css`
      background: rgba(0, 0, 0, 0.9);
    `}
`;
AppButton.displayName = 'AppButton';

export const ActionsWrapper = styled.div`
  label: ActionsWrapper;
  z-index: 4;
  position: absolute;
  height: 55%;
  bottom: 100px;
  right: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-around;
  width: 90%;

  @media all and (min-width: 360px) {
    height: 60%;
  }

  @media all and (min-width: 768px) {
    bottom: unset;
    top: %;
    right: 30px;
    flex-direction: column;
    justify-content: flex-end;
    height: auto;
  }

  @media all and (min-width: 1024px) {
    z-index: 15;
    top: unset;
    bottom: 0;
    right: 30px;
    flex-direction: row;
    justify-content: flex-end;
    height: auto;
    width: auto;
  }
`;
ActionsWrapper.displayName = 'ActionsWrapper';

export const AdmButton = styled(AppButton)`
  label: AdmButton;
  z-index: 11;
  position: absolute;
  top: 50px;
  right: -5px;
  height: 30px;
  width: 30px;
  font-size: 1.2rem;
  padding: 1px;
  background: none;
  border: none;
  /* background: ${({ damageMode }) => damageMode && 'red'};
  color: ${({ damageMode }) => damageMode && 'black'};
  box-shadow: ${({ damageMode }) => damageMode && '0 0 5px white'}; */

  @media all and (min-width: 768px) {
    top: 90px;
    right: 20px;
    background: none;
    border: none;
    font-size: 1.6rem;
  }

  &:hover {
    color: yellow;
  }
`;
AdmButton.displayName = 'AdmButton';

export const ArrowSign = styled.i`
  label: ArrowSign;
  font-size: 1.8rem;
  line-height: 1;

  @media all and (min-width: 360px) {
    font-size: 2.5rem;
    line-height: 0.7;
  }
`;
ArrowSign.displayName = 'ArrowSign';

export const CardsActions = styled.div`
  label: CardsActions;
  z-index: 10;
  background: linear-gradient(
    60deg,
    rgba(0, 0, 0, 0.5),
    rgba(237, 237, 4, 0.5),
    rgba(0, 0, 0, 0.5),
    rgba(237, 237, 4, 0.5),
    rgba(0, 0, 0, 0.5),
    rgba(237, 237, 4, 0.5),
    rgba(0, 0, 0, 0.5)
  );
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.5);
  position: absolute;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  bottom: 50px;
  left: 10px;
  height: 30px;
  width: 80px;
  transform: rotate(270deg);
  transform-origin: top left;
  font-family: 'Grandstander', cursive;
  padding: 2px 10px;
  color: white;
  opacity: 1;
  -webkit-text-stroke: 1px black;
  border: 1px solid black;
  border-radius: 10px;
  font-weight: 900;
  cursor: pointer;
  font-size: 1rem;

  @media all and (min-width: 360px) {
    bottom: 80px;
    left: 10px;
    font-size: 1.2rem;
    line-height: 2;

    ${({ drop }) =>
      drop &&
      css`
        transform: rotate(90deg);
        transform-origin: top right;
        left: unset;
        right: 100px;
      `}
  }

  @media all and (min-width: 410px) {
    bottom: 100px;
  }

  @media all and (min-height: 800px) {
    bottom: 200px;
  }

  @media all and (min-width: 768px) {
    transform: none;
    bottom: 150px;
    left: 25%;

    ${({ drop }) =>
      drop &&
      css`
        left: unset;
        right: 25%;
      `}
  }

  ${({ drop }) =>
    drop &&
    css`
      transform: rotate(90deg);
      transform-origin: top right;
      left: unset;
      right: 90px;
    `}

  ${({ dropMode }) =>
    dropMode &&
    css`
      background: green;
    `}
`;
CardsActions.displayName = 'CardsActions';

export const CardsActionsText = styled.div`
  label: CardsActionsText;
  z-index: 10;
  margin-top: 4px;
  text-transform: uppercase;
`;
CardsActionsText.displayName = 'CardsActionsText';

export const CharacterOverlay = styled.div`
  label: CharacterOverlay;
  z-index: 2;
  /* position: absolute;
  top: 0;
  left: 0; */
  margin-top: 40px;
  height: ${`${window.innerHeight}px`};
  width: 100%;
  background: #4444;
  opacity: 0.7;
  filter: ${({ damageMode }) =>
    damageMode
      ? 'contrast(2.5) brightness(0.7)'
      : 'contrast(0.7) saturate(1.6)'};

  ${({ img, position = 'left top', color }) => css`
    background-image: ${color
      ? `linear-gradient(to top, ${rgba(color, 0.8)}, ${rgba(
          color,
          0.2
        )}, rgba(0,0,0,0)), url(${Background})`
      : `url(${Background})`};
    ${'' /* background-image: ${`url(${Background})`}; */}
    background-position: ${position};
    background-size: ${`${window.innerHeight}px`};
    background-repeat: no-repeat;
  `}

  @media all and (min-width: 768px) {
    position: absolute;
    margin-top: 50px;

    ${({ img, position = '20% top' }) => css`
      background-size: cover;
    `}
  }
`;

export const CharacterOverlayImage = styled.img`
  label: CharacterOverlayImage;
  width: 28%;
  margin-left: 2%;
`;

export const CharacterSheet = styled.div`
  label: CharacterSheet;
  z-index: 1;
  position: relative;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  height: ${`${window.innerHeight}px`};
  width: 100%;
  background: black;
  display: none;

  ${({ visible }) =>
    visible &&
    css`
      display: flex;
    `}
`;
CharacterSheet.displayName = 'CharacterSheet';

/* ${() =>
    window.navigator.userAgent.includes('iPhone') &&
    css`
      margin-top: 10px;
      height: ${`${window.innerHeight - 10}px`};
    `} */

export const CharName = styled.h1`
  label: CharName;
  z-index: 3;
  position: absolute;
  top: 25px;
  right: 30px;
  margin: 10px auto 20px;
  border-radius: 50px;
  font-size: 3rem;
  color: rgba(255, 255, 255, 0.8);
  text-shadow: 0 0 4px black;
  line-height: 1.2;
  text-transform: uppercase;

  @media all and (min-width: 768px) {
    top: 50px;
    right: 80px;
    font-size: 5rem;
    color: black;
    text-shadow: 0 0 1px white;
  }
`;
CharName.displayName = 'CharName';

export const CharItems = styled.div`
  label: CharItems;
  position: absolute;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  top: 180px;
  margin-top: 65px;
  margin-left: 10px;
  width: 70%;

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

  @media all and (min-width: 360px) {
    top: 38%;

    ${({ trade }) =>
      trade &&
      css`
        top: 18px;
        right: 10px;

        @media all and (min-width: 768px) {
          top: 100px;
        }
      `}
  }

  @media all and (min-width: 410px) {
    top: 50%;

    ${({ trade }) =>
      trade &&
      css`
        top: 18px;
        right: 10px;

        @media all and (min-width: 768px) {
          top: 100px;
        }
      `}
  }

  @media all and (min-width: 768px) {
    top: 20%;
    /* margin: 65px 0 0 20px; */
    width: 100%;
    margin-left: 0;

    ${({ slotType }) =>
      slotType === IN_BACKPACK &&
      css`
        margin-top: -50px;
      `}

    ${({ trade }) =>
      trade &&
      css`
        top: 100px;
        right: 10px;
      `}
  }
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

export const FirstPlayerToken = styled.img`
  label: FirstPlayerToken;
  margin-top: -280px;
  margin-left: 30px;
  width: 180px;
  border-radius: 50%;
  filter: contrast(0.8) brightness(1.5) opacity(0.1);
  transform: scaleX(-1);

  @media all and (min-width: 768px) {
    filter: contrast(1.8) brightness(1.2) opacity(0.2);
    margin-left: 0;
    margin-top: -530px;
    width: 500px;
    transform: none;
  }

  @media all and (min-width: 1200px) {
    margin: 0 -50px 0 0;
    transform: scaleX(-1);
  }
`;
FirstPlayerToken.displayName = 'FirstPlayerToken';

export const FirstPlayerWrapper = styled.div`
  label: FirstPlayerWrapper;
  position: absolute;
  top: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 100%;
  width: 100%;
  overflow: hidden;

  @media all and (min-width: 768px) {
    position: initial;
  }

  @media all and (min-width: 1200px) {
    justify-content: flex-start;
    align-items: flex-end;
  }
`;
FirstPlayerWrapper.displayName = 'FirstPlayerWrapper';

export const HighestXpTag = styled.span`
  label: HighestXpTag;
  z-index: 15;
  position: absolute;
  top: 10px;
  left: 50%;
  transform: translate(-50%, 0);
  font-family: 'Cairo', sans-serif;
  text-transform: uppercase;
  font-size: 0.5rem;
  color: black;
  font-weight: 900;
  user-select: none;

  @media all and (min-width: 768px) {
    top: 19px;
    top: 20px;
    font-size: 0.8rem;
    color: white;
  }
`;
HighestXpTag.displayName = 'HighestXpTag';

export const IndicatorsWrapper = styled.div`
  label: IndicatorsWrapper;
  z-index: 10;
  position: absolute;
  top: 26px;
  left: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  opacity: 0.7;
  padding-left: 5px;
  height: 14px;
  background: #5f5c5c;
  width: 100%;

  ${({ header }) =>
    header &&
    css`
      z-index: 11;
      top: 0;
      left: 0;
      height: 26px;
      width: 100%;

      justify-content: space-around;
      padding: 0 10px 0 10px;

      @media all and (min-width: 768px) {
        position: absolute;
        padding: 0 50px 0 20px;
      }
    `}

  @media all and (min-width: 768px) {
    height: 20px;
    position: absolute;
    top: 26px;
    background: none;

    ${({ header }) =>
      header &&
      css`
        z-index: 11;
        top: 0;
        left: 0;
        height: 26px;
        width: 100%;

        justify-content: space-around;
        padding: 0 10px 0 10px;
      `}
  }
`;
IndicatorsWrapper.displayName = 'IndicatorsWrapper';

export const LevelIndicator = styled.div`
  label: LevelIndicator;
  display: inline-block;
  margin-right: 10px;
  /* margin-left: -20px; */
  height: 15px;
  width: 15px;
  border-radius: 50%;
  border: 1px solid black;
  transform: translate(0, 2px);
  margin: ${({ level }) => (level % 2 ? '0 0 0 10px' : '0 10px 0 0')};

  background: ${({ level }) => {
    switch (level) {
      case 1:
        return '#ffff00';
      case 2:
        return '#ff6600';
      case 3:
        return '#b1002c';
      default:
        return '#4d79ff';
    }
  }};

  @media all and (min-width: 1200px) {
    margin: 0 10px 0 0;
    transform: translate(0, -2px);
  }
`;
LevelIndicator.displayName = 'LevelIndicator';

export const ModalSign = styled(AttackInstructions)`
  label: ModalSign;
  position: absolute;
  z-index: 2;
  top: 0;
  padding: 30% 0;
  height: 100%;
  background: ${({ noOverlay }) => (noOverlay ? 'none' : 'rgba(0, 0, 0, 0.6)')};
  /* background: rgba(0, 0, 0, 0.6); */

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
      @media all and (min-width: 768px) {
      }
      width: 100%;
    `}
`;
ModalSign.displayName = 'ModalSign';

export const ModalSignText = styled.p`
  label: ModalSignText;
  position: absolute;
  top: 120px;
  width: 100%;
  opacity: 0.9;
  white-space: pre;
  font-size: 3rem;
  font-family: Crackhouse, 'Grandstander', cursive;
  text-align: center;

  @media all and (min-width: 768px) {
    top: 180px;
    right: 100px;
    font-size: 4rem;
    text-align: right;
  }
`;
ModalSignText.displayName = 'ModalSignText';

export const ModalSignButton = styled(AppButton)`
  label: ModalSignButton;
  z-index: 15;
  position: absolute;
  top: unset;
  bottom: 20px;
  height: 38px;
  width: 50%;
  line-height: 0.9;
  text-align: center;
  font-family: 'Cairo', sans-serif;
  font-size: 0.9rem;
  cursor: pointer;
  border: 1px solid black;
  border-radius: 5px;
  text-transform: uppercase;

  ${({ noOverlay }) =>
    noOverlay &&
    css`
      bottom: unset;
      bottom: 0;
      left: 50%;
      transform: translate(-50%, 0);

      @media all and (min-width: 320px) {
        transform: translate(-50%, -5px);
      }
      @media all and (min-width: 768px) {
        bottom: 10px;
      }
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

    @media all and (min-width: 360px) {
    height: 40px;
  }

  @media all and (min-width: 768px) {
    bottom: 12px;
    height: 30px;
    width: 200px;
  }
`;
ModalSignButton.displayName = 'ModalSignButton';

export const ModalSignExitButton = styled.img`
  label: ModalSignExitButton;
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
ModalSignExitButton.displayName = 'ModalSignExitButton';

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

export const NavIcons = styled.img`
  label: NavIcons;
  z-index: 15;
  width: 45px;
  margin: 0 2px;
  cursor: pointer;

  ${({ played }) =>
    played &&
    css`
      filter: grayscale(1) brightness(1.3) contrast(0.6);
      width: 30px;
    `}

  ${({ currentChar }) =>
    currentChar &&
    css`
      width: 70px;
      filter: grayscale(100%) brightness(120%) sepia(90%) hue-rotate(5deg)
        saturate(500%) contrast(0.7);
    `}
`;
NavIcons.displayName = 'NavIcons';

export const NavIconsWrapper = styled.div`
  label: NavIconsWrapper;
  z-index: 15;
  position: absolute;
  bottom: 2px;
  left: 60px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
NavIconsWrapper.displayName = 'NavIconsWrapper';

export const NextButton = styled(AppButton)`
  label: NextButton;
  z-index: 11;
  position: absolute;
  top: unset;
  bottom: 0;
  right: 0;
  height: 40px;
  background: ${({ damageMode }) => damageMode && 'red'};
  color: ${({ damageMode }) => damageMode && 'black'};
  box-shadow: ${({ damageMode }) => damageMode && '0 0 5px white'};
  font-size: 0.9rem;
  outline: none;

  @media all and (min-width: 360px) {
    font-size: 1.1rem;

    ${({ trade }) =>
      trade &&
      css`
        height: 30px;
        width: 30px;
        font-size: 2rem;
        padding: 0 0 4px 5px;
      `}
  }

  @media all and (min-width: 768px) {
    bottom: 20px;
    right: 20px;
    font-size: inherit;
    height: 35px;
  }

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

  ${({ numOfChars }) =>
    numOfChars &&
    css`
      right: unset;
      left: calc(130px + ${numOfChars} * 45px);
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
  top: 20%;
  right: 95px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;

  @media all and (min-width: 768px) {
    top: 28%;
    right: 30px;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    height: auto;
    width: auto;
  }

  @media all and (min-width: 768px) {
    top: calc(18% + 50px);
    right: 30px;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    height: 45px;
    width: 300px;
  }
`;
NoiseWrapper.displayName = 'NoiseWrapper';

export const PlayerTag = styled.div`
  label: PlayerTag;
  z-index: 6;
  position: absolute;
  top: 85px;
  right: 0;
  height: 15px;
  width: 40%;
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

  @media all and (min-width: 360px) {
    top: 87px;
    height: 20px;
  }

  @media all and (min-width: 1024px) {
    top: 22px;
    right: -40px;
    height: 30px;
    width: 20%;
    font-size: 1.4rem;
    line-height: 1;
    color: ${({ color }) => color || 'rgba(255,255,255,0.8)'};
    background: rgba(0, 0, 0, 0.2);
    border: none;
    border-radius: 10px 0 0 10px;
    -webkit-text-stroke: 1px black;
  }
  filter: brightness(0.8);
`;
PlayerTag.displayName = 'PlayerTag';

export const PreviousButton = styled(NextButton)`
  label: PreviousButton;
  right: unset;
  left: 0;

  @media all and (min-width: 360px) {
    ${({ trade }) =>
      trade &&
      css`
        padding: 0 4px 0 0;
      `}
  }

  @media all and (min-width: 768px) {
    left: 20px;
  }

  ${({ trade }) =>
    trade &&
    css`
      left: 10px;
      padding-left: 0;
    `}
`;
PreviousButton.displayName = 'PreviousButton';

export const PromoWrapper = styled.div`
  label: PromoWrapper;
  display: inline-block;
  padding: 5px 2px 3px;
  border-radius: 5px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  font-family: 'Grandstander', cursive;
  text-transform: uppercase;
  color: gray;
  font-weight: 300;
  letter-spacing: 0.1rem;
  font-size: 0.9rem;

  ${({ active }) =>
    active &&
    css`
      color: white;
      font-size: 1rem;
      font-weight: 700;
      -webkit-text-stroke: 1px black;
    `}
`;
PromoWrapper.displayName = 'PromoWrapper';

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
  top: 25px;
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
  user-select: none;
  /* color: black; */
  color: black;
  font-size: ${({ currentXp, device, highestXp }) => {
    if (device === MOBILE) {
      if (currentXp) {
        return '1.1rem';
      }
      if (highestXp) {
        return '0.6rem';
      }
    } else if (currentXp || highestXp) {
      return '1.1rem';
    }
    return null;
  }};
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

  ${({ setupMode }) =>
    setupMode &&
    css`
      cursor: pointer;
    `}

  @media all and (min-width: 768px) {
  }
`;
XpIcon.displayName = 'XPIcon';

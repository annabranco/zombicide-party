import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { rgba } from 'emotion-rgba';
import { AttackInstructions } from '../ZombiesSection/styles';
import { Appear, Shadow } from '../../../styles';
import { IN_RESERVE, MOBILE } from '../../../constants';
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
    font-size: 0.7rem;
  }

  @media (min-width: 320px) and (min-height: 640px) {
    font-size: 0.7rem;
  }

  @media all and (min-width: 701px) {
    font-size: 1rem;
    padding: 0 80px;
  }

  @media all and (min-width: 1200px) {
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
  bottom: 0;
  left: 50%;
  transform: translate(-50%, 0);
  display: grid;
  height: 80px;
  width: 100%;
  background: rgba(0, 0, 0, 0.7);
  /* background: ${({ color }) => color && `${rgba(color, 0.6)}`}; */
  padding: 2px 5px 45px 5px;
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
    bottom: 0;
    height: 100px;
    align-items: flex-start;
    padding: 10px 20px 50px 20px;
  }

  @media all and (min-width: 701px) {
    bottom: 0;
    height: 12%;
    width: 100%;
  }

  @media all and (min-width: 1200px) {
    height: 9.5%;
  }

  @media (min-width: 1300px) and (min-height: 1024px) {
    height: 50px;
  }
`;
AbilitiesWrapper.displayName = 'AbilitiesWrapper';

export const AbilitiesWrapperDesktop = styled.div`
  label: AbilitiesWrapperDesktop;
  z-index: 10;
  position: absolute;
  padding: 20px 0;
  bottom: 80px;
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

  @media all and (min-width: 1400px) {
    bottom: 120px;
  }
`;
AbilitiesWrapperDesktop.displayName = 'AbilitiesWrapperDesktop';

export const ActionsLabelWrapper = styled.div`
  label: ActionsLabelWrapper;
  z-index: 16;
  position: absolute;
  bottom: 75px;
  right: 40px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  height: 20px;
  width: 100%;
  font-family: 'Grandstander', cursive;
  font-size: 0.9rem;
  letter-spacing: 0.2rem;
  color: rgba(255, 255, 180, 0.6);
  text-transform: uppercase;
`;
ActionsLabelWrapper.displayName = 'ActionsLabelWrapper';

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
    height: 58%;
    justify-content: flex-start;
  }

  @media all and (min-width: 701px) {
    bottom: unset;
    height: 50%;
    top: 24%;
    right: 30px;
    flex-direction: column;
    justify-content: space-around;
  }

  @media all and (min-width: 1200px) {
    z-index: 15;
    top: unset;
    bottom: 0;
    right: 30px;
    flex-direction: row;
    justify-content: flex-end;
    height: auto;
    width: auto;
  }

  @media all and (min-width: 1400px) {
    bottom: 15px;
  }
`;
ActionsWrapper.displayName = 'ActionsWrapper';

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

export const AdmButton = styled(AppButton)`
  label: AdmButton;
  z-index: 11;
  position: absolute;
  top: 45px;
  left: 5px;
  height: 30px;
  width: 30px;
  font-size: 1.2rem;
  padding: 1px;
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.4);
  /* background: ${({ damageMode }) => damageMode && 'red'};
  color: ${({ damageMode }) => damageMode && 'black'};
  box-shadow: ${({ damageMode }) => damageMode && '0 0 5px white'}; */

  @media all and (min-width: 701px) {
    top: 60px;
    left: 10px;
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
  color: white;
  cursor: pointer;

  &:hover {
    color: yellow;
  }

  @media all and (min-width: 360px) {
    font-size: 2.5rem;
    line-height: 0.7;
  }
`;
ArrowSign.displayName = 'ArrowSign';

export const CardsActions = styled.div`
  label: CardsActions;
  z-index: 15;
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
  bottom: 60px;
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

  @media all and (min-width: 360px) {
    bottom: 100px;
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

  @media all and (min-width: 701px) {
    transform: none;
    bottom: 230px;
    left: 20px;

    ${({ drop }) =>
      drop &&
      css`
        left: unset;
        right: 15%;
      `}
  }

  @media (min-width: 1024px) and (min-height: 701px) {
    bottom: 180px;
    left: 22%;

    ${({ drop }) =>
      drop &&
      css`
        left: unset;
        right: 15%;
      `}
  }

  @media (min-width: 1024px) and (min-height: 1300px) {
    bottom: 380px;
    left: 5%;

    ${({ drop }) =>
      drop &&
      css`
        left: unset;
        right: 15%;
      `}
  }

  @media all and (min-width: 1200px) {
    bottom: 180px;
    left: 25%;

    ${({ drop }) =>
      drop &&
      css`
        left: unset;
        right: 25%;
      `}
  }

  @media all and (min-width: 1400px) {
    bottom: 270px;
    left: 27%;

    ${({ drop }) =>
      drop &&
      css`
        left: unset;
        right: 27%;
      `}
  }

  @media (min-width: 1300px) and (min-height: 1024px) {
    bottom: 250px;
    left: 25%;

    ${({ drop }) =>
      drop &&
      css`
        left: unset;
        right: 25%;
      `}
  }
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
  margin-top: 45px;
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
    background-size: cover;
    background-repeat: no-repeat;
  `}

  @media all and (min-width: 701px) {
    position: absolute;
    margin-top: 50px;

    ${({ img, position = '20% top' }) => css`
      background-size: cover;
    `}
  }
`;
CharacterOverlay.displayName = 'CharacterOverlay';

export const CharacterOverlayImage = styled.img`
  label: CharacterOverlayImage;
  z-index: 3;
  position: absolute;
  bottom: 0;
  width: 90%;

  @media (min-width: 320px) and (min-height: 640px) {
    bottom: 10%;
    width: 90%;
  }

  @media all and (min-width: 701px) {
    bottom: 10%;
    width: 80%;
  }

  @media all and (min-width: 701px) {
    bottom: 10%;
    width: 80%;
  }

  @media (min-width: 1024px) and (min-height: 701px) {
    bottom: 10%;
    width: 45%;
  }
  @media (min-width: 1024px) and (min-height: 1300px) {
    bottom: 10%;
    width: 70%;
  }

  @media (min-width: 1130px) and (min-height: 701px) {
    bottom: 10%;
    width: 38%;
  }

  @media all and (min-width: 1200px) {
    width: 28%;
    margin-left: 2%;
  }

  @media (min-width: 1300px) and (min-height: 1024px) {
    bottom: 10%;
    width: 40%;
  }
`;
CharacterOverlayImage.displayName = 'CharacterOverlayImage';

export const CharacterOverlayImageShadow = styled(CharacterOverlayImage)`
  label: CharacterOverlayImageShadow;
  z-index: 2;
  ${Shadow}
  height: 65%;
  margin: 0 0 -75px -75px;

  @media (min-width: 320px) and (min-height: 640px) {
    height: 65%;
    margin: 0 0 -22% -23%;
  }

  @media all and (min-width: 701px) {
    height: 65%;
    margin: 0 0 -115px -110px;
  }

  @media (min-width: 1024px) and (min-height: 701px) {
    height: 50%;
    margin: 0 0 -55px -75px;
  }

  @media (min-width: 1024px) and (min-height: 1300px) {
    height: 40%;
    margin: 0 0 -55px -105px;
  }

  @media all and (min-width: 1200px) {
    height: 60%;
    margin: 0 0 -60px -35px;
  }

  @media (min-width: 1300px) and (min-height: 1024px) {
    height: 60%;
    margin: 0 0 -110px -90px;
  }

  @media all and (min-width: 1400px) {
    height: 70%;
    margin: 0 0 -100px -60px;
  }
`;
CharacterOverlayImageShadow.displayName = 'CharacterOverlayImageShadow';

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

export const CharItems = styled.div`
  label: CharItems;
  position: absolute;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  top: 35%;
  margin-top: 90px;
  margin-left: 10px;
  width: 70%;

  & > div {
    z-index: 10;
  }

  ${({ slotType }) =>
    slotType === IN_RESERVE &&
    css`
      margin-top: -20px;

      & > div {
        z-index: 9;

        &:hover {
          z-index: 11;
        }
      }
    `}

  ${({ trade }) =>
    trade &&
    css`
      top: 2px;
      right: 10px;
    `}

  @media (min-width: 320px) and (min-height: 640px) {
    top: 45%;

    ${({ trade }) =>
      trade &&
      css`
        top: 18px;
        right: 10px;
      `}
  }

  @media all and (min-width: 410px) {
    top: 50%;

    ${({ trade }) =>
      trade &&
      css`
        top: 18px;
        right: 10px;
      `}
  }

  @media all and (min-width: 701px) {
    top: 48%;
    width: 100%;
    margin-left: -50px;

    ${({ slotType }) =>
      slotType === IN_RESERVE &&
      css`
        margin-top: -50px;
      `}

    ${({ trade }) =>
      trade &&
      css`
        top: 90px;
        right: 10px;
        width: 80%;
      `}
  }

  @media (min-width: 1024px) and (min-height: 701px) {
    top: 35%;
    width: 100%;
    margin-left: 30px;

    ${({ slotType }) =>
      slotType === IN_RESERVE &&
      css`
        margin-top: -50px;
      `}

    ${({ trade }) =>
      trade &&
      css`
        top: 30px;
        right: 10px;
        width: 80%;
      `}

    ${({ numItems }) =>
      numItems > 3 &&
      css`
        justify-content: flex-end;
        margin-left: -15%;
      `}
  }

  @media all and (min-width: 1200px) {
    top: 100px;
    /* margin: 65px 0 0 20px; */
    width: 100%;
    margin-left: 0;

    ${({ slotType }) =>
      slotType === IN_RESERVE &&
      css`
        margin-top: -50px;
      `}

    ${({ trade }) =>
      trade &&
      css`
        top: 180px;
        right: 10px;
      `}

    ${({ numItems }) =>
      numItems > 3 &&
      css`
        justify-content: flex-end;
        margin-left: -21%;
      `}
  }

  @media (min-width: 1024px) and (min-height: 1300px) {
    top: 50%;
    width: 100%;
    margin-left: -50px;

    ${({ slotType }) =>
      slotType === IN_RESERVE &&
      css`
        margin-top: -150px;
      `}

    ${({ trade }) =>
      trade &&
      css`
        top: 160px;
        right: 140px;
        width: 60%;
      `}

    ${({ numItems }) =>
      numItems > 3 &&
      css`
        justify-content: center;
        margin-left: -5%;
      `}
  }

  @media all and (min-width: 1400px) {
    top: 170px;
    ${({ trade }) =>
      trade &&
      css`
        top: 250px;
        right: 10px;
      `}

    ${({ numItems }) =>
      numItems > 3 &&
      css`
        justify-content: flex-end;
        margin-right: 50px;
      `}
  }

  @media (min-width: 1300px) and (min-height: 1024px) {
    top: unset;
    bottom: 120px;
    /* margin: 65px 0 0 20px; */
    width: 100%;
    margin-left: 0;

    ${({ slotType }) =>
      slotType === IN_RESERVE &&
      css`
        margin-top: 0;
        margin-bottom: 170px;
      `}

    ${({ trade }) =>
      trade &&
      css`
        top: 180px;
        right: 10px;
      `}

    ${({ numItems }) =>
      numItems > 3 &&
      css`
        justify-content: flex-end;
        margin-left: -22%;
      `}
  }
`;
CharItems.displayName = 'CharItems';

export const CharName = styled.h1`
  label: CharName;
  z-index: 3;
  position: absolute;
  top: 30px;
  right: 50%;
  transform: translate(50%, 0);
  margin: 10px auto 20px;
  border-radius: 50px;
  font-size: 3rem;
  color: rgba(255, 255, 255, 0.8);
  text-shadow: 0 0 4px black;
  line-height: 1.2;
  text-transform: uppercase;

  @media all and (min-width: 360px) {
    top: 30px;
    right: 20px;
    transform: none;
    font-size: 4rem;
  }

  @media all and (min-width: 701px) {
    top: 50px;
    right: 40px;
    font-size: 7rem;
  }

  @media all and (min-width: 1200px) {
    top: 30px;
    right: 40px;
    font-size: 6rem;
    color: rgba(255, 255, 255, 0.7);
  }

  @media all and (min-width: 1400px) {
    font-size: 8rem;
  }
`;
CharName.displayName = 'CharName';

export const ExtraActivationButton = styled.div`
  label: ExtraActivationButton;
  z-index: 15;
  position: absolute;
  bottom: 5px;
  right: 50%;
  transform: translate(50%, 0);
  height: 60px;
  width: 60px;
  background: linear-gradient(rgba(255, 255, 255, 0.3), rgba(0, 0, 0, 0.7));
  border-radius: 50px;
  border: 3px solid crimson;
  box-shadow: 0px 0px 10px 4px #fff;
  cursor: pointer;

  @media all and (min-width: 360px) {
  }

  @media all and (min-width: 701px) {
  }

  @media all and (min-width: 1200px) {
  }

  @media all and (min-width: 1400px) {
  }
`;
ExtraActivationButton.displayName = 'ExtraActivationButton';

export const ExtraActivationImage = styled.img`
  label: ExtraActivationImage;
  width: 100%;

  @media all and (min-width: 360px) {
  }

  @media all and (min-width: 701px) {
  }

  @media all and (min-width: 1200px) {
  }

  @media all and (min-width: 1400px) {
  }
`;
ExtraActivationImage.displayName = 'ExtraActivationImage';

export const FinishedTurnTag = styled(AttackInstructions)`
  label: FinishedTurnTag;
  z-index: 15;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: none;
  font-size: 3rem;
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

  @media all and (min-width: 701px) {
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

  @media all and (min-width: 701px) {
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

  @media all and (min-width: 701px) {
    top: 20px;
    font-size: 0.7rem;
    color: white;

    ${({ xp }) =>
      xp <= 4 &&
      css`
        font-size: 0.5rem;
        top: -8px;
      `}
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
  height: 20px;
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

      @media all and (min-width: 701px) {
        position: absolute;
        padding: 0 50px 0 20px;
      }
    `}

  @media all and (min-width: 701px) {
    height: 20px;
    position: absolute;
    top: 26px;
    background: none;

    ${({ header }) =>
      header &&
      css`
        z-index: 11;
        top: 3px;
        left: 0;
        height: 26px;
        width: 100%;

        justify-content: space-around;
        padding: 0 10px 0 10px;
      `}
  }

  @media all and (min-width: 1200px) {
    background: #5f5c5c;
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

export const MainButton = styled(AppButton)`
  label: MainButton;
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
  box-shadow: 0 1px 10px 0 rgba(0, 0, 0, 0.6),
    inset 1px 1px 3px rgba(255, 255, 255, 0.5);
  color: white;

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
      @media all and (min-width: 701px) {
        bottom: 10px;
      }
    `}

  ${({ roundEnded }) =>
    roundEnded &&
    css`
      background: green;
    `}

  ${({ zombiesRound }) =>
    zombiesRound &&
    css`
      background: red;
    `}

  ${({ setupMode }) =>
    setupMode &&
    css`
      background: steelblue;
    `}

    @media all and (min-width: 360px) {
    height: 40px;
  }

  @media all and (min-width: 701px) {
    bottom: 12px;
    height: 30px;
    width: 200px;
  }
`;
MainButton.displayName = 'MainButton';

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
      @media all and (min-width: 701px) {
      }
      width: 100%;
    `}
`;
ModalSign.displayName = 'ModalSign';

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

  @media all and (min-width: 701px) {
    top: 180px;
    right: 100px;
    font-size: 4rem;
    text-align: right;
  }
`;
ModalSignText.displayName = 'ModalSignText';

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

    @media all and (min-width: 1400px) {
    width: 70px;

    ${({ played }) =>
      played &&
      css`
        width: 50px;
      `}

    ${({ currentChar }) =>
      currentChar &&
      css`
        width: 90px;
      `}
  }
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

  @media all and (min-width: 1400px) {
    bottom: 10px;
  }
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
  background: ${({ damageMode }) => (damageMode ? 'red' : 'none')};
  color: ${({ damageMode }) => damageMode && 'black'};
  box-shadow: ${({ damageMode }) => damageMode && '0 0 5px white'};
  font-size: 0.9rem;
  outline: none;
  border: 0;

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
      left: calc(100px + ${numOfChars} * 47px);
    `}


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

  @media all and (min-width: 701px) {
    bottom: 20px;
    right: 20px;
    font-size: inherit;
    height: 35px;
  }

  @media all and (min-width: 1400px) {
    bottom: 30px;

    ${({ numOfChars }) =>
      numOfChars &&
      css`
        left: calc(80px + ${numOfChars} * 74px);
      `}
  }
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
  top: 80px;
  left: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;

  @media all and (min-width: 701px) {
    top: 160px;
    left: 20px;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    height: auto;
    width: auto;
  }

  @media all and (min-width: 1200px) {
    flex-direction: row;
    top: 140px;
    left: unset;
    right: 60px;
  }

  @media all and (min-width: 1400px) {
    top: 180px;
  }
`;
NoiseWrapper.displayName = 'NoiseWrapper';

export const PlayerTag = styled.div`
  label: PlayerTag;
  z-index: 10;
  position: absolute;
  top: 60px;
  right: 0;
  height: 15px;
  width: 30%;
  padding: 5px 20px;
  font-family: 'Grandstander', cursive;
  text-align: center;
  font-size: 1.1rem;
  text-shadow: 0 0 2px black;
  letter-spacing: 0.6rem;
  font-weight: 900;
  line-height: 0.6;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.6);

  @media all and (min-width: 360px) {
    top: 110px;
    height: 20px;
  }

  @media all and (min-width: 701px) {
    top: 180px;
    right: -30px;
    height: 20px;
    font-size: 1.8rem;
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

  @media all and (min-width: 1200px) {
    top: 28px;
    height: 15px;
    line-height: 0.5;
    background: rgba(0, 0, 0, 0.1);
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

  @media all and (min-width: 701px) {
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
  top: 70px;
  left: 50px;
  align-items: flex-start;
  height: 20px;
  width: 100%;
  font-size: 0.8rem;
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

  @media all and (min-width: 1200px) {
    position: absolute;
    width: 100%;
    margin-top: -20px;
    margin-left: -200px;
  }

  @media all and (min-width: 1400px) {
    width: 100%;
    margin-left: -300px;
  }
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

  @media all and (min-width: 701px) {
  }
`;
XpIcon.displayName = 'XPIcon';

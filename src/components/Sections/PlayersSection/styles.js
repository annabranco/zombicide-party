import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { AttackInstructions } from '../ZombiesSection/styles';
import { Appear } from '../../../styles';

export const ActionButton = styled.button`
  label: ActionButton;
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
ActionButton.displayName = 'ActionButton';

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

export const AddNewChar = styled(ActionButton)`
  label: AddNewChar;
  z-index: 11;
  position: absolute;
  top: 10px;
  height: 20px;
  background: ${({ damageMode }) => damageMode && 'red'};
  color: ${({ damageMode }) => damageMode && 'black'};
  box-shadow: ${({ damageMode }) => damageMode && '0 0 5px white'};

  &:hover {
    background: rgba(255, 255, 255, 0.4);
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
  overflow: hidden;
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
    slotType === 'inBackpack' &&
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

export const ExitSign = styled.img`
  label: ExitSign;
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
ExitSign.displayName = 'ExitSign';

export const KilledSign = styled(AttackInstructions)`
  label: KilledSign;
  position: absolute;
  top: 0;
  padding: 30% 0;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
`;
KilledSign.displayName = 'KilledSign';

export const NextButton = styled(ActionButton)`
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
  bottom: 55px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 45px;
  width: 100%;
`;
NoiseWrapper.displayName = 'NoiseWrapper';

export const PlayerTag = styled.div`
  label: PlayerTag;
  z-index: 6;
  position: absolute;
  top: 70px;
  right: -10px;
  height: 20px;
  width: 32%;
  border: 1px solid black;
  border-radius: 20px;
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

export const WoundedSign = styled.img`
  z-index: 2;
  width: 160%;
  filter: brightness(0.4) saturate(2.3);
  label: WoundedSign;
  transform: translate(20px, 0);
`;
WoundedSign.displayName = 'WoundedSign';

import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { AttackInstructions } from '../ZombiesSection/styles';

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
    color: yellow;
  }
`;
ActionButton.displayName = 'ActionButton';

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
  margin: 20px auto;
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
`;
CharItems.displayName = 'CharItems';

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
`;
NextButton.displayName = 'NextButton';

export const PlayerTag = styled.div`
  label: PlayerTag;
  z-index: 6;
  position: absolute;
  top: -50px;
  left: 0;

  height: 50px;
  width: 100%;
  border: 1px solid black;
  padding: 5px 20px;
  background: ${({ color }) => color || 'black'};
  /* cursor: pointer; */
  font-family: 'Grandstander', cursive;
  text-align: center;
  font-size: 2.3rem;
  line-height: 1.1;
  text-transform: uppercase;
  color: black;
  filter: brightness(0.8);
`;
PlayerTag.displayName = 'PlayerTag';

export const PreviousButton = styled(NextButton)`
  label: PreviousButton;
  left: 20px;
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

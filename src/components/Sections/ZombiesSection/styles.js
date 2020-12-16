import styled from '@emotion/styled';
import { ActionButton } from '../../MainMenu/styles';

export const AttackInstructions = styled.p`
  label: AttackInstructions;
  z-index: 10;
  position: absolute;
  top: 30%;
  left: 0;
  height: auto;
  width: 100%;
  font-size: 3rem;
  font-weight: 900;
  line-height: 1.5;
  color: red;
  background: rgba(255, 255, 255, 0.2);
  text-shadow: 0 0 2px black;
  text-align: center;
  text-transform: uppercase;
  font-family: 'Grandstander', cursive;
`;
AttackInstructions.displayName = 'AttackInstructions';

export const CancelAttackButton = styled(ActionButton)`
  label: CancelAttackButton;
  z-index: 10;
  position: absolute;
  /* margin-top: -200px; */
  bottom: 200px;
  height: 30px;
  width: 120px;
  border-radius: 5px;
  font-size: 1.2rem;
  line-height: 0.5;
  text-transform: uppercase;
  &:hover {
    color: yellow;
  }
`;
CancelAttackButton.displayName = 'CancelAttackButton';

export const NoSelectOverlay = styled.div`
  label: NoSelectOverlay;
  position: absolute;
  left: 0;
  z-index: 10;

  height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 0.6);
  filter: brightness(0.1);
`;
NoSelectOverlay.displayName = 'NoSelectOverlay';

export const SubSectionWrapper = styled.div`
  label: SubSectionWrapper;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: calc(100vh - 80px);
  width: 90%;
  overflow: hidden;
`;
SubSectionWrapper.displayName = 'SubSectionWrapper';

export const ZombieLabel = styled.h3`
  label: ZombieLabel;
  z-index: 5;
  position: absolute;
  bottom: 30%;
  left: 50%;
  height: 40px;
  width: 100%;
  background: rgba(0, 0, 0, 0.4);
  font-size: 4rem;
  color: ${({ isActive }) => (isActive ? 'yellow' : 'white')};
  text-shadow: 0 0 3px black;
  transform: translate(-50%, 0);
  text-align: center;
  line-height: 0.7;
  text-transform: uppercase;
  transition: all ease 1s;
`;
ZombieLabel.displayName = 'ZombieLabel';

export const ZombiesTurnSign = styled(AttackInstructions)`
  label: ZombiesTurnSign;
  position: absolute;
  z-index: 2;
  top: unset;
  bottom: 50px;
  left: 50%;
  transform: translate(-50%, 0);
  background: none;
  font-family: Crackhouse, 'Grandstander', cursive;
  font-size: 5rem;
  opacity: 0.7;
`;
ZombiesTurnSign.displayName = 'ZombiesTurnSign';

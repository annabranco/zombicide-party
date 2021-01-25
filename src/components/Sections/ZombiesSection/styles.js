import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { SelectionButton } from '../../MainMenu/styles';

export const AttackBurronsWrapper = styled.div`
  label: AttackBurronsWrapper;
  z-index: 15;
  position: absolute;
  bottom: 25px;

  @media all and (min-width: 768px) {
    bottom: 40px;
    left: 50%;
    transform: translate(-50%, 0);
  }
`;
AttackBurronsWrapper.displayName = 'AttackBurronsWrapper';

export const AttackInstructions = styled.p`
  label: AttackInstructions;
  z-index: 10;
  position: absolute;
  bottom: 95px;
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

export const CancelAttackButton = styled(SelectionButton)`
  label: CancelAttackButton;
  margin: 0 20px;
  height: 30px;
  width: 120px;
  border-radius: 5px;
  font-size: 1.2rem;
  line-height: 0.5;
  text-transform: uppercase;

  background: lightgray;
  &:hover {
    color: yellow;
  }
`;
CancelAttackButton.displayName = 'CancelAttackButton';

export const ConfirmAttackButton = styled(CancelAttackButton)`
  label: CancelAttackButton;
  height: 30px;
  width: 120px;
  border-radius: 5px;
  font-size: 1.1rem;
  line-height: 0.5;
  font-weight: 700;
  text-transform: uppercase;
  font-family: 'Grandstander', cursive;

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
  flex-wrap: wrap;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: ${`${window.innerHeight - 30}px`};
  width: 100%;
  overflow: hidden;

  @media all and (min-width: 768px) {
    width: 90%;
  }
`;
SubSectionWrapper.displayName = 'SubSectionWrapper';

export const ZombieImageForMobile = styled.div`
  label: ZombieImageForMobile;
  height: ${({ rows }) => `${window.innerHeight / rows - 30}px`};
  background-image: ${({ img }) => img && `url(${img})`};
  background-repeat: no-repeat;
  cursor: pointer;
  filter: sepia(2) brightness(1.2) contrast(0.6) opacity(0.5);
  &:hover {
    filter: none;
  }

  ${({ img, name }) => {
    if (name === 'Dogz') {
      return css`
        background-position: center 50%;
        background-size: 130%;
      `;
    }
    if (name === 'Horde') {
      return css`
        background-position: center 8%;
        background-size: 112%;
      `;
    }
    if (name === 'Abomination') {
      return css`
        background-position: center 8%;
        background-size: 120%;
      `;
    }
    if (name === 'Fatty') {
      return css`
        background-position: center 15%;
        background-size: 115%;
      `;
    }
    return css`
      background-position: center 20%;
      background-size: 150%;
    `;
  }}
`;
ZombieImageForMobile.displayName = 'ZombieImageForMobile';

export const ZombieLabel = styled.h3`
  label: ZombieLabel;
  z-index: 5;
  position: absolute;
  bottom: 10px;
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

export const ZombieWrapper = styled.h3`
  label: ZombieWrapper;
  height: 100%;
`;
ZombieWrapper.displayName = 'ZombieWrapper';

export const ZombiesRoundSign = styled(AttackInstructions)`
  label: ZombiesRoundSign;
  position: absolute;
  z-index: 2;
  top: unset;
  bottom: 200px;
  left: 50%;
  transform: translate(-50%, 0);
  background: none;
  font-family: Crackhouse, 'Grandstander', cursive;
  font-size: 5rem;
  opacity: 0.7;

  @media all and (min-width: 768px) {
    bottom: 50px;
  }
`;
ZombiesRoundSign.displayName = 'ZombiesRoundSign';

export const ZombiesArea = styled.div`
  label: ZombiesArea;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 100%;
  width: 100%;
`;
ZombiesArea.displayName = 'ZombiesArea';

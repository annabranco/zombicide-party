import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { ACTIVATE, ATTACK, KILL } from '../../../constants';
import { SelectionButton } from '../../MainMenu/styles';

export const Action = styled.p`
  label: Action;
  z-index: 6;
  margin: 10px auto;
  width: 95%;
  border: 2px solid black;
  border-radius: 5px;
  padding: 5px 0;
  font-size: 1.3rem;
  font-weight: 900;
  line-height: 1.2;
  color: black;
  text-shadow: 1px 1px 4px gray;
  text-align: center;
  opacity: 1;
  text-transform: uppercase;
  font-family: 'Grandstander', cursive;
  box-shadow: 0 1px 10px 0 rgba(0, 0, 0, 0.6),
    inset 1px 1px 3px rgba(255, 255, 255, 0.5);

  ${({ action }) => {
    if (action === ACTIVATE) {
      return css`
        background: rgba(11, 196, 33, 0.9);
      `;
    }
    if (action === ATTACK) {
      return css`
        background: rgba(209, 90, 0, 0.9);
      `;
    }
    if (action === KILL) {
      return css`
        background: rgba(214, 6, 6, 0.9);
      `;
    }
    return null;
  }}

  &:hover {
    color: yellow;
    -webkit-text-stroke: 1px black;
  }
`;
Action.displayName = 'Action';

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
  margin: 0 20px 5px;
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
  justify-content: space-between;
  height: ${`${window.innerHeight - 10}px`};
  width: 100%;
  overflow: hidden;

  @media all and (min-width: 360px) {
    height: ${`${window.innerHeight - 30}px`};
  }

  @media all and (min-width: 768px) {
    width: 90%;
  }
`;
SubSectionWrapper.displayName = 'SubSectionWrapper';

export const ZombieActions = styled.div`
  label: ZombieActions;
  z-index: 6;
  position: absolute;
  display: flex;
  bottom: 35px;
  left: 0;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: auto;
  width: 100%;

  @media all and (min-width: 701px) {
    display: none;
    bottom: 25%;
  }

  @media all and (min-width: 1200px) {
    display: none;
    bottom: 15px;
  }
`;
ZombieActions.displayName = 'ZombieActions';

export const ZombieImageForMobile = styled.div`
  label: ZombieImageForMobile;
  height: ${({ rows }) => `${window.innerHeight / rows - 30}px`};
  width: 100%;
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
  top: 50%;
  left: 50%;
  height: 40px;
  width: 100%;
  background: rgba(0, 0, 0, 0.4);
  font-size: 4rem;
  color: ${({ isActive }) => (isActive ? 'yellow' : 'white')};
  text-shadow: 0 0 3px black;
  transform: translate(-50%, -50%);
  text-align: center;
  line-height: 0.7;
  text-transform: uppercase;
  transition: all ease 1s;
  color: crimson;

  ${({ inner }) =>
    inner &&
    css`
      top: unset;
      bottom: 10px;
      font-size: 1.3rem;
      line-height: 1.8;
      transform: translate(-50%, 0);
      color: white;
    `}

  @media all and (min-width: 701px) {
    top: unset;
    bottom: 20%;
    transform: translate(-50%, 0);
  }

  @media all and (min-width: 1200px) {
    bottom: 10px;
  }
`;
ZombieLabel.displayName = 'ZombieLabel';

export const ZombieWrapper = styled.h3`
  label: ZombieWrapper;
  position: relative;
  height: 100%;

  @media all and (min-width: 701px) {
    position: initial;
  }
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
    bottom: 50%;
    font-size: 7rem;
    -webkit-text-stroke: 1px rgba(0, 0, 0, 0.5);
  }

  @media all and (min-width: 1200px) {
    font-size: 7.5rem;
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

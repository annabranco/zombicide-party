import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { inactiveZombie, activeZombie } from '../../styles';
import {
  ATTACK,
  ACTIVATE,
  IN_HAND,
  ITEMS,
  KILL,
  WEAPONS,
  WOUND,
  ACTIVATIONS,
  SELECTION
} from '../../constants';

export const Action = styled.p`
  label: Action;
  z-index: 6;
  display: none;
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

  ${({ action }) => {
    if (action === ACTIVATE) {
      return css`
        background: rgba(11, 196, 33, 0.8);
      `;
    }
    if (action === ATTACK) {
      return css`
        background: rgba(209, 90, 0, 0.8);
      `;
    }
    if (action === KILL) {
      return css`
        background: rgba(214, 6, 6, 0.8);
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

export const Block = styled.div`
  label: Block;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  box-shadow: 0 0 5px 0 black;
  display: ${({ damageMode, type, wounded }) =>
    damageMode && type !== WOUND && wounded ? 'none' : 'flex'};
`;
Block.displayName = 'Block';

export const ItemIcon = styled.div`
  label: ItemIcon;
  height: 120px;
  width: 120px;
  max-height: 100%;
  max-width: 100%;
  transition: transform ease 0.5s, border ease 0.2s;
  background-image: ${({ img }) => img && `url(${img})`};
  /* background-position: center center;
  background-size: 150%; */
  background-repeat: no-repeat;
  cursor: pointer;
  transition: all ease 0.2s;

  ${({ isSelected }) =>
    isSelected &&
    css`
      filter: contrast(80%) brightness(150%);
      background-size: 180%;
      transition: all ease 0.2s;
    `}

  ${({ isMobile }) =>
    isMobile &&
    css`
      background-position: center -10px;
      border: 0;
    `}

  ${({ active, name, isMobile }) => {
    if (
      name === 'AutomaticShotgun' ||
      name === 'AssaultRifle' ||
      name === 'NightStick'
    ) {
      if (isMobile) {
        return css`
          background-size: 140%;
          background-position: center 28%;
        `;
      }
    }
    if (name === 'DoubleBarrel') {
      if (isMobile) {
        return css`
          background-size: 140%;
          background-position: center 10%;
        `;
      }
    }
    if (
      name === 'DesertEagle' ||
      name === 'TaserGun' ||
      name === 'SmokeGrenade'
    ) {
      if (isMobile) {
        return css`
          background-size: 160%;
          background-position: center 4%;
        `;
      }
    }
    if (name === 'ColtPython' || name === 'SamuraiEdge') {
      if (isMobile) {
        return css`
          background-size: 150%;
          background-position: center 10%;
        `;
      }
    }
    if (name === 'BatteringRam' || name === 'Flashbang') {
      if (isMobile) {
        return css`
          background-size: 140%;
          background-position: center 2%;
        `;
      }
    }
    if (name === 'Rifle') {
      if (isMobile) {
        return css`
          background-size: 140%;
          background-position: center 35%;
        `;
      }
      return css`
        background-size: 130%;
        background-position: center 42%;
      `;
    }
    if (name === 'SniperRifle') {
      if (isMobile) {
        return css`
          background-size: 125%;
          background-position: center top;
        `;
      }
      return css`
        background-size: 130%;
        background-position: center 42%;
      `;
    }
    if (name === 'Flashlight') {
      if (isMobile) {
        return css`
          background-size: 145%;
          background-position: center 25%;
        `;
      }
      return css`
        background-size: 165%;
      `;
    }
    if (name === 'EvilTwins' || name === 'MasShotgun' || name === 'SawedOff') {
      if (isMobile) {
        return css`
          background-size: 150%;
          background-position: center 35%;
        `;
      }
      return css`
        background-size: 165%;
        background-position: center 51%;
      `;
    }
    if (name === 'PlentyOfAmmo' || name === 'Mp5') {
      if (isMobile) {
        return css`
          background-size: 155%;
          background-position: center 15%;
        `;
      }
      return css`
        background-size: 165%;
        background-position: center 45%;
      `;
    }
    if (name === 'Scope') {
      if (isMobile) {
        return css`
          background-size: 155%;
          background-position: center 25%;
        `;
      }
      return css`
        background-size: 140%;
        background-position: center 35%;
      `;
    }
    if (name === 'PlentyOfAmmoShotgun') {
      if (isMobile) {
        return css`
          background-size: 160%;
          background-position: center 15%;
        `;
      }
      return css`
        background-size: 190%;
        background-position: center 45%;
      `;
    }
    return css`
      background-size: 150%;
      background-position: center center;
    `;
  }}

    @media all and (min-width: 768px) {
    height: 100%;
    width: 100%;
    ${({ isSelected }) =>
      isSelected &&
      css`
        border: 5px solid rgba(29, 211, 72, 0.5);
        border-radius: 20px;
        transition: all ease 0.2s;
      `}
  }
  ${({ unloaded }) =>
    unloaded &&
    css`
      filter: sepia(2) brightness(1.2) contrast(0.6) opacity(0.5);
    `}
`;
ItemIcon.displayName = 'ItemIcon';

export const PlayIcon = styled.img`
  label: PlayIcon;
  max-height: 100%;
  max-width: 100%;
  transition: transform ease 0.5s;

  @media all and (min-width: 768px) {
    max-height: 100%;
    max-width: 100%;
  }

  ${({ type, active }) => {
    if (type === WOUND) {
      return css`
        width: 100%;
        @media all and (min-width: 768px) {
          &:hover {
            transform: scale(1.01);
            transition: all ease 0.4s;
          }
        }
      `;
    }
    if (type === 'attacks') {
      return css`
        max-height: 90%;
        max-width: 90%;
        @media all and (min-width: 768px) {
          &:hover {
            transform: scale(1.15);
            transition: all ease 0.8s;
          }
        }
      `;
    }
    if (type === WEAPONS || type === ITEMS) {
      return css`
        border: 1px solid black;
        border-radius: 8px;

        @media all and (min-width: 768px) {
          &:hover {
            transform: scale(1.01);
            transition: all ease 0.4s;
          }
        }
      `;
    }
    if (active) {
      return css`
        ${activeZombie}

        @media all and (min-width: 768px) {
          transform: scale(1.05);
          transition: all ease 0.8s;
          &:hover {
            transform: scale(1.05);
            transition: all ease 0.8s;
          }
        }
      `;
    }
    return css`
      ${inactiveZombie}
      height: auto;
      transition: all ease 0.8s;

      @media all and (min-width: 768px) {
        &:hover {
          transform: scale(1.05);
          transition: all ease 0.8s;
        }
      }
    `;
  }}

  ${({ unloaded }) =>
    unloaded &&
    css`
      filter: sepia(2) brightness(1.2) contrast(0.6) opacity(0.5);
    `}
`;
PlayIcon.displayName = 'PlayIcon';

export const PlayImageButton = styled.button`
  label: PlayImageButton;
  position: relative;
  background: ${({ isActive }) => (isActive ? 'yellow' : '#232222')};
  outline: none;
  border: none;
  height: 100%;
  line-height: 0;
  width: 100%;
  padding: 0;

  &:hover {
    filter: ${({ damageMode, type }) =>
      damageMode && type !== WOUND && 'sepia(0.8) brightness(0.6)'};
    & > div > p {
      display: block;
    }

    & > i {
      display: block;
    }
  }
  transition: background ease 1.5s;

  ${({ canAttack, damageMode, setupMode, slotType, type }) => {
    switch (true) {
      case !!damageMode:
      case !!setupMode:
      case type === ACTIVATIONS:
      case slotType === SELECTION:
        return css`
          cursor: pointer;
        `;
      case !canAttack:
        return css`
          cursor: not-allowed;
        `;
      case type === WEAPONS && slotType === IN_HAND:
        return css`
          cursor: pointer;
        `;
      default:
        return css`
          cursor: initial;
        `;
    }
  }};
`;
PlayImageButton.displayName = 'PlayImageButton';

export const PlayText = styled.p`
  label: PlayText;
  height: 100%;
  width: 100%;
  font-size: 1.3rem;
  font-weight: 900;
  line-height: 1;
  color: black;
  text-shadow: 1px 1px 4px gray;
`;
PlayText.displayName = 'PlayText';

export const SelectorArea = styled.div`
  label: SelectorArea;
  position: relative;
  height: ${`${window.innerHeight}px`};
  background: #232222;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  overflow-y: ${({ zombies }) => (zombies ? 'hidden' : 'auto')};
  overflow-x: auto;
  padding: 20px 10px 30px;

  ${({ columns, zombies }) => {
    if (columns === 'big') {
      return css`
        height: calc(${`${window.innerHeight}px`} - 30px);
      `;
    }
    if (columns) {
      return css`
        display: grid;
        width: ${zombies ? '100%' : '90%'};
        grid-gap: 10px;
        grid-template-columns: repeat(${columns}, minmax(100px, 1fr));
      `;
    }
    return null;
  }}

  @media all and (min-width: 768px) {
    height: calc(${`${window.innerHeight}px`} - 80px);
  }

  @media all and (min-width: 1200px) {
    height: calc(${`${window.innerHeight}px`} - 120px);
  }

  @media all and (min-width: 1400px) {
    height: calc(${`${window.innerHeight}px`} - 130px);
  }
`;
SelectorArea.displayName = 'SelectorArea';

export const ZombieActions = styled.div`
  label: ZombieActions;
  z-index: 6;
  position: absolute;
  bottom: 5px;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: auto;
  width: 100%;
`;
ZombieActions.displayName = 'ZombieActions';

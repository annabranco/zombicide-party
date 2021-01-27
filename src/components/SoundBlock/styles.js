import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { inactiveZombie, activeZombie } from '../../styles';
import {
  IN_HAND,
  ITEMS,
  WEAPONS,
  WOUND,
  ACTIVATIONS,
  SELECTION
} from '../../constants';

export const Block = styled.div`
  label: Block;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  box-shadow: 0 0 5px 0 black;
  display: ${({ damageMode, type, wounded }) =>
    damageMode && type !== WOUND && wounded ? 'none' : 'flex'};
  height: 100%;
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

    @media all and (min-width: 701px) {
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
  transition: transform ease 0.5s, filter 2s ease-out;

  ${({ type, active }) => {
    if (type === WOUND) {
      return css`
        width: 100%;
        @media all and (min-width: 701px) {
          &:hover {
            transform: scale(1.01);
            transition: transform ease 0.4s;
          }
        }
      `;
    }
    if (type === 'attacks') {
      return css`
        max-height: 90%;
        max-width: 90%;
        @media all and (min-width: 701px) {
          &:hover {
            transform: scale(1.15);
            transition: transform ease 0.8s;
          }
        }
      `;
    }
    if (type === WEAPONS || type === ITEMS) {
      return css`
        border: 1px solid black;
        border-radius: 8px;

        @media all and (min-width: 701px) {
          &:hover {
            transform: scale(1.01);
            transition: transform ease 0.4s;
          }
        }
      `;
    }
    if (type === ACTIVATIONS && active) {
      return css`
        ${activeZombie}

        @media all and (min-width: 701px) {
          transform: scale(1.05);
          transition: transform ease 0.8s;
          &:hover {
            transform: scale(1.05);
            transition: transform ease 0.8s;
          }
        }
      `;
    }
    if (type === ACTIVATIONS && !active) {
      return css`
        ${inactiveZombie}
        height: auto;
        transition: transform ease 0.8s;

        @media all and (min-width: 701px) {
          &:hover {
            transform: scale(1.05);
            transition: transform ease 0.8s;
          }
        }
      `;
    }
    return null;
  }}

  ${({ unloaded }) =>
    unloaded &&
    css`
      filter: sepia(2) brightness(1.2) contrast(0.6) opacity(0.5);
    `}


  ${({ isSelected }) =>
    isSelected &&
    css`
      filter: brightness(70%) sepia(70%) hue-rotate(62deg) saturate(400%)
        contrast(0.9);
    `}


  ${({ active }) =>
    active &&
    css`
      filter: brightness(80%) sepia(70%) hue-rotate(13deg) saturate(400%)
        contrast(1.1);
    `}

  @media all and (min-width: 701px) {
    max-height: 100%;
    max-width: 100%;
  }

  /* ipad pro */
  @media (min-width: 1024px) and (min-height: 1300px) {
    height: 370px;
    width: 260px;

    ${({ trade }) =>
      trade &&
      css`
        height: 300px;
        width: 200px;
      `}

    ${({ type }) =>
      type === ACTIVATIONS &&
      css`
        height: 600px;
        width: 260px;
      `}
  }
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
  display: flex;
  transition: background ease 1.5s;

  &: hover > div {
    display: flex;
  }

  ${({ isText }) =>
    isText &&
    css`
      flex-direction: column;
      align-items: center;
      justify-content: center;
    `}

  &:hover {
    filter: ${({ damageMode, type }) =>
      damageMode && type !== WOUND && 'sepia(0.8) brightness(0.6)'};
    /*
    & > div {
      display: flex;
    } */

    & > i {
      display: block;
    }
  }

  ${({ canAttack, damageMode, setupMode, slotType, trade, type }) => {
    switch (true) {
      case !!damageMode:
      case !!setupMode:
      case type === ACTIVATIONS:
      case slotType === SELECTION:
      case trade:
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

  ${({ type }) =>
    type === ACTIVATIONS &&
    css`
      background: none;
    `}
`;
PlayImageButton.displayName = 'PlayImageButton';

export const PlayText = styled.p`
  label: PlayText;
  width: 60%;
  font-size: 1.3rem;
  font-weight: 900;
  line-height: 1;
  color: white;
  text-shadow: 1px 1px 4px gray;
  text-transform: uppercase;
  font-family: 'Grandstander', cursive;
  font-size: 2rem;
  text-align: center;
`;
PlayText.displayName = 'PlayText';

export const SelectorArea = styled.div`
  label: SelectorArea;
  position: relative;
  height: calc(${`${window.innerHeight}px`} - 100px);
  background: ${({ zombies }) => (zombies ? 'none' : '#232222')};
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  overflow-y: ${({ zombies }) => (zombies ? 'hidden' : 'auto')};
  overflow-x: hidden;
  padding: 0;

  ${({ columns, zombies }) => {
    if (columns === 'big') {
      return css`
        height: calc(${`${window.innerHeight}px`} - 30px);
      `;
    }
    if (columns) {
      return css`
        display: grid;
        width: 100%;
        grid-gap: 10px;
        grid-template-columns: repeat(${columns}, minmax(100px, 1fr));
      `;
    }
    return null;
  }}

  ${({ zombies }) =>
    zombies &&
    css`
      height: calc(${`${window.innerHeight}px`} - 40px);
    `};

  @media (min-width: 320px) and (min-height: 640px) {
    height: calc(${`${window.innerHeight}px`} - 105px);
    padding: 20px 0 30px;

    ${({ zombies }) =>
      zombies &&
      css`
        height: calc(${`${window.innerHeight}px`} - 40px);
      `};
  }

  @media all and (min-width: 701px) {
    height: calc(${`${window.innerHeight}px`} - 110px);
  }

  @media all and (min-width: 1200px) {
    height: calc(${`${window.innerHeight}px`} - 100px);
  }

  @media all and (min-width: 1400px) {
    height: calc(${`${window.innerHeight}px`} - 125px);
  }
`;
SelectorArea.displayName = 'SelectorArea';

import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { inactiveZombie, activeZombie } from '../../styles';
import { IN_HAND, ITEMS, WEAPONS } from '../../constants';

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
    if (action === 'activate') {
      return css`
        background: rgba(11, 196, 33, 0.8);
      `;
    }
    if (action === 'attack') {
      return css`
        background: rgba(209, 90, 0, 0.8);
      `;
    }
    if (action === 'kill') {
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
    damageMode && type !== 'wound' && wounded ? 'none' : 'flex'};
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
  background-position: center center;
  background-size: 150%;
  background-repeat: no-repeat;
  cursor: pointer;

  ${({ isSelected }) =>
    isSelected &&
    css`
      border: 5px solid rgba(29, 211, 72, 0.5);
      border-radius: 20px;
      transition: all ease 0.2s;
    `}

  ${({ active, name }) => {
    if (name === 'Rifle') {
      return css`
        background-size: 130%;
        background-position: center 42%;
      `;
    }
    if (name === 'Flashlight') {
      return css`
        background-size: 165%;
      `;
    }
    if (name === 'EvilTwins' || name === 'MasShotgun' || name === 'SawedOff') {
      return css`
        background-position: center 51%;
        background-size: 165%;
      `;
    }
    if (name === 'PlentyOfAmmo') {
      return css`
        background-position: center 45%;
        background-size: 165%;
      `;
    }
    if (name === 'Scope') {
      return css`
        background-position: center 35%;
        background-size: 140%;
      `;
    }
    if (name === 'PlentyOfAmmoShotgun') {
      return css`
        background-position: center 45%;
        background-size: 190%;
      `;
    }
    return null;
  }}
`;
ItemIcon.displayName = 'ItemIcon';

export const PlayIcon = styled.img`
  label: PlayIcon;
  max-height: 100%;
  max-width: 100%;
  transition: transform ease 0.5s;

  ${({ type, active }) => {
    if (type === 'wound') {
      return css`
        width: 100%;
        &:hover {
          transform: scale(1.01);
          transition: all ease 0.4s;
        }
      `;
    }
    if (type === 'attacks') {
      return css`
        max-height: 90%;
        max-width: 90%;
        &:hover {
          transform: scale(1.15);
          transition: all ease 0.8s;
        }
      `;
    }
    if (type === WEAPONS || type === ITEMS) {
      return css`
        border: 1px solid black;
        border-radius: 8px;

        &:hover {
          transform: scale(1.01);
          transition: all ease 0.4s;
        }
      `;
    }
    if (active) {
      return css`
        ${activeZombie}
        transform: scale(1.05);
        transition: all ease 0.8s;
        &:hover {
          transform: scale(1.05);
          transition: all ease 0.8s;
        }
      `;
    }
    return css`
      ${inactiveZombie}
      height: auto;
      transition: all ease 0.8s;
      &:hover {
        transform: scale(1.05);
        transition: all ease 0.8s;
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
      damageMode && type !== 'wound' && 'sepia(0.8) brightness(0.6)'};
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
      case type === 'activations':
      case slotType === 'selection':
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
  height: calc(100vh - 80px);
  background: #232222;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  overflow: hidden;
  padding-top: 20px;

  ${({ columns }) => {
    if (columns === 'big') {
      return css`
        height: calc(100vh - 30px);
      `;
    }
    if (columns) {
      return css`
        display: grid;
        width: 90%;
        grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
      `;
    }
    return null;
  }}
`;
SelectorArea.displayName = 'SelectorArea';

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

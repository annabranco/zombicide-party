import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { inactiveZombie, activeZombie } from '../../styles';

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
        height: calc(100vh - 70px);
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

//   height: calc(100vh - 80px);
//   width: 87%;
//   background: #232222;
//   display: grid;
//   grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
//   grid-auto-rows: minmax(80px, 200px);
//   grid-gap: 10px;
//   padding: 40px 20px;
//   overflow: hidden;
//   ${({ columns }) => {
//     if (columns === 'big') {
//       return css`
//         height: calc(100vh - 70px);
//         grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
//       `;
//     }
//     return css`
//       grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
//     `;
//   }}
// `;

export const Block = styled.div`
  label: Block;
  /* position: relative; */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* border: 1px solid gray; */
  border-radius: 5px;
`;
Block.displayName = 'Block';

export const PlayImage = styled.button`
  label: PlayImage;
  background: ${({ isActive }) => (isActive ? 'yellow' : '#232222')};
  outline: none;
  border: none;
  height: 100%;
  line-height: 0;
  width: 100%;
  padding: 0;
  cursor: pointer;
  transition: background ease 1.5s;
`;
PlayImage.displayName = 'PlayImage';

export const PlayIcon = styled.img`
  label: PlayIcon;
  max-height: 100%;
  max-width: 100%;
  transition: transform ease 0.5s;

  ${({ type, active }) => {
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
    if (type === 'weapons') {
      return css`
        border: 1px solid black;
        border-radius: 8px;
        &:hover {
          transform: scale(1.03);
          transition: all ease 0.8s;
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
`;
PlayIcon.displayName = 'PlayIcon';

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

export const ZombiesArea = styled.div`
  label: ZombiesArea;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 100%;
  width: 100%;
`;
ZombiesArea.displayName = 'ZombiesArea';

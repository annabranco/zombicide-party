import { css } from '@emotion/core';
import styled from '@emotion/styled';

export const SoundsSelectorArea = styled.div`
  width: 87%;
  background: #232222;
  display: grid;
  grid-template-columns: ${({ columns }) => `repeat(${columns}, 1fr)`};
  grid-gap: 10px;
  padding: 40px 20px;
`;

export const Block = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* border: 1px solid gray; */
  border-radius: 5px;
`;

export const PlayButton = styled.button`
  background: ${({ isActive }) => (isActive ? 'yellow' : '#232222')};
  border: 2px solid black;
  /* box-shadow: -3px 3px 2px gray; */
  outline: none;
  border: none;
  padding: 10px;
  font-size: 1.3rem;
  font-weight: 900;
  color: black;
  text-shadow: 1px 1px 4px gray;
  cursor: pointer;
  transition: background ease 1.5s;
`;

export const PlayIcon = styled.img`
  height: 100px;
  ${({ type }) => {
    if (type === 'weapons') {
      return css`
        height: 150px;
      `;
    }
    return null;
  }}
`;

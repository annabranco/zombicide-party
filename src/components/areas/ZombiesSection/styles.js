import { css } from '@emotion/core';
import styled from '@emotion/styled';

export const ZombieLabel = styled.h3`
  /* position: absolute; */
  height: 0;
  font-size: 1.2rem;
  color: lightgray;
  transform: translate(0, 20px);
`;
ZombieLabel.displayName = 'ZombieLabel';

export const SelectorWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  border: 1px solid #4c4c4c;
  border-radius: 10px;
  height: 30px;
  width: 80%;
  overflow: hidden;
  background: black;
  cursor: pointer;
`;
SelectorWrapper.displayName = 'SelectorWrapper';

export const SelectorButton = styled.div`
  position: absolute;
  border-radius: 10px;
  height: 30px;
  width: 50%;
  background: red;
  transition: all ease 5s;
  ${({ displayKills }) => {
    if (displayKills) {
      return css`
        left: 50%;
        transition: all ease 0.3s;
      `;
    }
    return css`
      left: 0;
      transition: all ease 0.3s;
    `;
  }}
`;
SelectorButton.displayName = 'SelectorButton';

export const SubSectionTitle = styled.h3`
  z-index: 2;
  width: 50%;
  line-height: 1.5;
  text-align: center;
  color: ${({ opened = true }) => (opened ? 'white' : 'gray')};
  cursor: pointer;
  filter: ${({ opened = true }) =>
    opened ? 'grayscale(0)' : 'grayscale(0.5)'};
`;

export const SubSectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: calc(100% - 70px);
  width: 90%;
  overflow: hidden;
`;

import { css } from '@emotion/core';
import styled from '@emotion/styled';

export const SelectorWrapper = styled.div`
  label: SelectorWrapper;
  z-index: 10;
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

  ${({ selectorType }) =>
    selectorType === 'itemsSelector' &&
    css`
      position: absolute;
      top: -40px;
    `}
`;
SelectorWrapper.displayName = 'SelectorWrapper';

export const SelectorButton = styled.div`
  label: SelectorButton;
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
  label: SubSectionTitle;
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
  label: SubSectionWrapper;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: calc(100% - 70px);
  width: 90%;
  overflow: hidden;
`;

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

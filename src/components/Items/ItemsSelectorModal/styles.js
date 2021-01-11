import styled from '@emotion/styled';
import { css } from '@emotion/core';

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

export const SelectorModal = styled.div`
  label: SelectorModal;
  z-index: 12;
  position: absolute;
  top: 0;
  left: 50%;
  padding-top: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  transform: translate(-50%, 0);
  height: 100%;
  width: 100%;
  background: #232222;
`;
SelectorModal.displayName = 'SelectorModal';

export const SelectorWrapper = styled.div`
  label: SelectorWrapper;
  z-index: 20;
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border: 1px solid #4c4c4c;
  border-radius: 10px;
  margin: 0 10px;
  height: 30px;
  width: calc(100% - 22px);
  overflow: hidden;
  background: black;
  cursor: pointer;

  ${({ selectorType }) =>
    selectorType === 'itemsSelector' &&
    css`
      position: absolute;
      top: 10px;
    `}

  @media all and (min-width: 768px) {
    justify-content: space-around;
    margin: 0;
    width: 80%;
  }
`;
SelectorWrapper.displayName = 'SelectorWrapper';

export const SubSectionTitle = styled.h3`
  label: SubSectionTitle;
  z-index: 2;
  width: 50%;
  line-height: 1.5;
  text-align: center;
  font-family: 'Grandstander', cursive;

  color: ${({ opened = true }) => (opened ? 'white' : 'gray')};
  cursor: pointer;
  filter: ${({ opened = true }) =>
    opened ? 'grayscale(0)' : 'grayscale(0.5)'};
`;
SubSectionTitle.displayName = 'SubSectionTitle';

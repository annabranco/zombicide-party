import styled from '@emotion/styled';

export const ActionIcon = styled.i`
  label: ActionIcon;
  height: 50px;
  width: 50px;
  background: ${({ isActive }) =>
    isActive ? 'yellow' : 'rgba(255, 255, 255, 0.8)'};
  border: 1px solid black;
  padding: 7px;
  border-radius: 15px;
  cursor: ${({ isActive }) => (isActive ? 'not-allowed' : 'pointer')};
  transition: background ease 5s opacity ease 5s;
  opacity: ${({ isActive }) => (isActive ? 0.2 : 1)};
  font-size: ${({ iconSize }) => (iconSize ? '2.5rem' : '3rem')};
  line-height: ${({ iconSize }) =>
    // eslint-disable-next-line no-nested-ternary
    iconSize === 'medium' ? '1.4' : iconSize ? '1.2' : '1'};
  text-align: center;
  &:hover {
    color: ${({ isActive }) => (isActive ? 'red' : 'yellow')};
    text-shadow: 0 0 2px black;
  }
`;
ActionIcon.displayName = 'ActionIcon';

export const CarActionIcon = styled.i`
  label: CarActionIcon;
  margin-top: 5px;
  font-size: 2rem;
  line-height: 0.3;
`;
CarActionIcon.displayName = 'CarActionIcon';

export const CarIcon = styled.i`
  label: CarIcon;
  font-size: 3rem;
  line-height: 1;
  text-align: center;
`;
CarIcon.displayName = 'CarIcon';

export const CarIconWrapper = styled.div`
  label: CarIconWrapper;
  height: 66px;
  width: 66px;
  background: ${({ isActive }) =>
    isActive ? 'yellow' : 'rgba(255, 255, 255, 0.8)'};
  border: 1px solid black;
  padding: 7px;
  border-radius: 15px;
  cursor: ${({ isActive }) => (isActive ? 'not-allowed' : 'pointer')};
  transition: all ease 5s;
  opacity: ${({ isActive }) => (isActive ? 0.2 : 1)};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  &:hover {
    & > i {
      color: ${({ isActive }) => (isActive ? 'red' : 'yellow')};
      text-shadow: 0 0 2px black;
      color: yellow;
    }
  }
`;
CarIconWrapper.displayName = 'CarIconWrapper';

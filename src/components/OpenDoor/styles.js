import styled from '@emotion/styled';

export const OpenDoorIcon = styled.img`
  label: OpenDoorIcon;
  z-index: 4;
  position: absolute;
  top: 15%;
  right: 30px;
  width: 80px;
  background: ${({ isActive }) =>
    isActive ? 'yellow' : 'rgba(255, 255, 255, 0.8)'};
  border: 1px solid black;
  padding: 5px;
  border-radius: 15px;
  cursor: ${({ isActive }) => (isActive ? 'not-allowed' : 'pointer')};
  transition: all ease 5s;
  opacity: ${({ isActive }) => (isActive ? 0.2 : 1)};
`;
OpenDoorIcon.displayName = 'OpenDoorIcon';

import styled from '@emotion/styled';
import { TITLE_FONT } from '../../../styles';

export const MovementIcon = styled.div`
  label: MovementIcon;
  position: relative;
  left: 0.75em;
  width: ${({ type }) => (typeof type === 'number' ? '20px' : '70px')};
  height: 14px;
  text-align: center;
  background: ${({ color }) => color};
  color: ${({ type }) => (typeof type === 'number' ? 'white' : 'black')};
  font-weight: 700;
  line-height: 1.3;
  letter-spacing: 0.001rem;
  font-size: 0.8rem;
  font-family: ${TITLE_FONT};
  text-transform: uppercase;

  &:not(:first-of-type) {
    margin-left: 15px;
  }

  &:after {
    content: '';
    position: absolute;
    left: 100%;
    width: 10px;
    height: 14px;
    clip-path: polygon(50% 50%, -50% -50%, 0 100%);
    background: ${({ color }) => color};
  }
  &:before {
    content: '';
    position: absolute;
    left: 1px;
    top: 0;
    width: 10px;
    height: 14px;
    clip-path: polygon(100% 0, 100% 100%, 0% 100%, 50% 50%, 0% 0%);
    transform: translateX(-100%);
    background: ${({ color }) => color};
  }
`;
MovementIcon.displayName = 'MovementIcon';

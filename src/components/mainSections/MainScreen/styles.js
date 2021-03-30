import styled from '@emotion/styled';
import { TITLE_FONT } from '../../../styles';

export const MainArea = styled.main`
  label: MainArea;
  height: ${`${window.innerHeight}px`};
  width: 100vw;
  background: black;
  display: flex;
  flex-direction: row;
  overflow: hidden;
`;
MainArea.displayName = 'MainArea';

export const RoundTag = styled.p`
  label: RoundTag;
  z-index: 14;
  position: fixed;
  bottom: 30px;
  left: 50%;
  transform: translate(-50%, 0);
  color: white;
  text-transform: uppercase;
  font-family: ${TITLE_FONT};
  font-size: 2rem;
`;
RoundTag.displayName = 'RoundTag';

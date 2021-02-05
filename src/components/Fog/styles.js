import styled from '@emotion/styled';
import { css } from '@emotion/core';

export const Fog = styled.canvas`
  label: Fog;
  z-index: 12;
  height: 800px;
  width: 100vw;
  position: absolute;
  bottom: 0;
  opacity: 0.55;
  filter: blur(10px);

  ${({ inChar }) =>
    inChar &&
    css`
      z-index: 2;
      opacity: 0.4;
      height: 250px;
    `}
`;
Fog.displayName = 'Fog';

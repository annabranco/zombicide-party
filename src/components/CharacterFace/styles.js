import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { NavIcons } from '../Sections/PlayersSection/styles';

export const CharFace = styled(NavIcons)`
  ${({ big }) =>
    big &&
    css`
      width: 130px;
    `}
  label: CharFace;
`;
CharFace.displayName = 'CharFace';

export const Wound = styled.img`
  label: Wound;
  position: absolute;
  height: 120%;
  width: 100%;
  left: 50%;
  transform: ${({ degree }) =>
    degree && `translate(-50%, 0) rotate(${degree})`};
  filter: opacity(0.75) brightness(0.5) saturate(1.4);
`;
Wound.displayName = 'Wound';

export const CharacterFaceWrapper = styled.div`
  label: CharacterFaceWrapper;
  height: auto;
  width: auto;
  overflow: hidden;
  cursor: pointer;

  ${({ big }) =>
    big &&
    css`
      margin: 0 30px;
    `}
`;
CharacterFaceWrapper.displayName = 'CharacterFaceWrapper';

export const FaceWrapper = styled.div`
  label: FaceWrapper;
  position: relative;
`;
FaceWrapper.displayName = 'FaceWrapper';

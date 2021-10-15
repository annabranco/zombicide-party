import styled from '@emotion/styled';
import { css } from '@emotion/core';

export const NotificationsArea = styled.div`
  z-index: 9999;
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;

  ${({ blockingLayer }) => {
    if (blockingLayer === 'light') {
      return css`
        background: rgba(0, 0, 0, 0.35);
      `;
    }
    if (blockingLayer) {
      return css`
        background: rgba(0, 0, 0, 0.85);
      `;
    }
    return null;
  }};

  ${({ hideInstructions }) =>
    hideInstructions &&
    css`
      z-index: 0;
      display: none;
    `}
`;
NotificationsArea.displayName = 'NotificationsArea';

export const ButtonsArea = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 150px;
  margin: 30px 0 -30px;
`;
ButtonsArea.displayName = 'ButtonsArea';

export const ModalBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2px 25px;
  border: 3px solid black;
  border-radius: 15px;
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0.99) 0%,
    rgba(255, 255, 255, 0.74) 50%,
    rgba(255, 255, 255, 0.54) 70%,
    rgba(255, 255, 255, 0.3) 85%,
    rgba(255, 255, 255, 0) 100%
  );
  box-shadow: 0 0 10px 10px black;
  height: auto;
  width: 80%;

  ${({ tour }) =>
    tour &&
    css`
      background: rgba(255, 255, 255, 0.65);
    `}

  @media all and (min-width: 1200px) {
    width: 60%;
  }
`;
ModalBody.displayName = 'ModalBody';

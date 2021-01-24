import styled from '@emotion/styled';

export const Screen = styled.div`
  label: Screen;
  z-index: 20;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background: black;
  border: 0;

  @media all and (min-height: 400px) {
    display: none;
  }
`;
Screen.displayName = 'Screen';

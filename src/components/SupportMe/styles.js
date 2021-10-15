import styled from '@emotion/styled';
import { css, keyframes } from '@emotion/core';

export const DymanicSupportMeWrapper = styled.div`
  label: DymanicSupportMeWrapper;
  z-index: 10000;
  position: fixed;
  left: 20px;
  bottom: 65px;
  border: none;
  height: 0;
  width: 320px;
  padding: 0;
  border-radius: 10px;
  background: #f9f9f9;
  overflow: hidden;
  filter: brightness(1.1) saturate(0.8) contrast(0.9);
  transition: all 0.15s linear;

  ${({ isOpen }) =>
    isOpen &&
    css`
      height: 80vh;
      transition: all 0.3s linear;
    `}
`;
DymanicSupportMeWrapper.displayName = 'DymanicSupportMeWrapper';

export const SupportMeFrame = styled.iframe`
  label: SupportMeFrame;
  border: none;
  height: 500px;
  width: 60%;
  padding: 20px;
  border-radius: 10px;
  background: #f9f9f9;
  overflow: hidden;

  ${({ mode }) =>
    mode === 'dynamic' &&
    css`
      background: none;
      height: 100%;
      width: 100%;
      padding: 0;
    `}
`;
SupportMeFrame.displayName = 'SupportMeFrame';

export const SupportMeText = styled.p`
  label: SupportMeText;
  position: fixed;
  left: 20px;
  bottom: 75px;
  color: #f9f9f9;
  white-space: pre;
  line-height: 1.5;
  font-family: 'Grandstander', cursive;
`;
SupportMeText.displayName = 'SupportMeText';

const Beat = keyframes`
  0%, 40%, 60%, 80% {
      transform: scale(1);
  }
  50%, 70% {
      transform: scale(1.1);
  }
`;

export const SupportButton = styled.div`
  label: SupportButton;
  z-index: 10000;
  position: fixed;
  left: 50%;
  transform: translate(-50%, 0);
  bottom: 70px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: 30px;
  height: 46px;
  width: 220px;
  color: white;
  font-weight: 700;
  font-family: 'Grandstander', cursive;
  background: #80858c;
  cursor: pointer;

  &:hover {
    color: yellow;

    & img {
      animation-name: ${Beat};
      animation-duration: 1s;
      animation-iteration-count: infinite;
    }
  }

  @media all and (min-width: 768px) {
    left: 20px;
    bottom: 15px;
    transform: none;
  }
`;
SupportButton.displayName = 'SupportButton';

export const SupportButtonIcon = styled.img`
  label: SupportButtonIcon;
  width: 25%;
  margin: 0 10px 0 -10px;
`;
SupportButtonIcon.displayName = 'SupportButtonIcon';

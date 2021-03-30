import styled from '@emotion/styled';
import { css } from '@emotion/core';

export const DetailsText = styled.p`
  label: DetailsText;
  font-size: 1rem;
`;
DetailsText.displayName = 'DetailsText';

export const ErrorDetailsArea = styled.div`
  label: ErrorDetailsArea;
  background: white;
  width: 60vw;
  padding: 10px 40px 15px;
  border-radius: 5px;
  margin-top: 35px;
  box-shadow: 0 0 5px 2px white;

  &::before {
    content: 'ERROR:';
    font-size: 0.7rem;
    color: gray;
  }
`;
ErrorDetailsArea.displayName = 'ErrorDetailsArea';

export const ErrorTitle = styled.h2`
  label: ErrorTitle;
  z-index: 15;
  position: absolute;
  top: 10%;
  margin-left: 0;
  width: auto;
  font-size: 5rem;
  text-align: left;
  color: crimson;
  text-transform: uppercase;
`;
ErrorTitle.displayName = 'ErrorTitle';

export const NotificationArea = styled.div`
  label: NotificationArea;
  position: absolute;
  top: 45%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 80vw;
`;
NotificationArea.displayName = 'NotificationArea';

export const NotifyButton = styled.button`
  label: NotifyButton;
  z-index: 15;
  margin-top: 40px;
  position: fixed;
  bottom: 10%;
  opacity: 0;
  border-radius: 10px;
  width: 200px;
  cursor: pointer;
  outline: none;
  min-height: 35px;

  &: hover {
    color: red;
    background: linear-gradient(to right, yellow, gold);
  }
  ${({ visible }) =>
    visible &&
    css`
      opacity: 1;
      transition: opacity 4s;
    `}
`;
NotifyButton.displayName = 'NotifyButton';

export const NotifyButtonIcon = styled.i`
  label: NotifyButtonIcon;
  display: inline;
  margin-left: 15px;
  vertical-align: middle;
  text-shadow: 0 0 1px black;
  font-size: 2rem;
`;
NotifyButtonIcon.displayName = 'NotifyButtonIcon';

export const NotifyButtonText = styled.p`
  label: NotifyButtonText;
  position: relative;
  display: inline;
  right: 0;
  font-size: 1.3rem;
  line-height: 0.2;
  color: black;
  font-family: 'Grandstander', cursive;
  text-transform: uppercase;
  vertical-align: sub;
`;
NotifyButtonText.displayName = 'NotifyButtonText';

export const SorryText = styled.p`
  label: SorryText;
  margin: 0 0 20px;
  width: 80%;
  font-size: 1.3rem;
  line-height: 1.5;
  color: white;
  text-align: center;
  font-family: 'Cairo', sans-serif;
`;
SorryText.displayName = 'SorryText';

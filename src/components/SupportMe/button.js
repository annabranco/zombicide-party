import React, { useEffect, useRef } from 'react';
import { LOCAL_STORAGE_KEY } from '../../constants';
import KofiLogo from '../../assets/images/kofi-logo.png';
import { useStateWithLabel } from '../../utils';
import SupportMe from '.';
import {
  DymanicSupportMeWrapper,
  SupportButton,
  SupportButtonIcon,
  SupportMeText
} from './styles';

const SupportMeButton = () => {
  const [isSupportFrameVisible, toggleSupportFrame] = useStateWithLabel(
    false,
    'isSupportFrameVisible'
  );
  const [
    hasEnteredSupportFrame,
    toggleHasEnteredSupportFrame
  ] = useStateWithLabel(false, 'hasEnteredSupportFrame');

  const closeTimeout = useRef();
  const displayText = localStorage.getItem(LOCAL_STORAGE_KEY);

  const onBlurButton = () => {
    closeTimeout.current = setTimeout(() => {
      toggleSupportFrame(false);
    }, 400);
  };

  useEffect(() => {
    if (hasEnteredSupportFrame) {
      clearTimeout(closeTimeout.current);
    }
  }, [hasEnteredSupportFrame]);

  useEffect(() => {
    if (!isSupportFrameVisible) {
      toggleHasEnteredSupportFrame(false);
    }
  }, [isSupportFrameVisible, toggleHasEnteredSupportFrame]);

  return (
    <>
      {displayText && (
        <SupportMeText>
          {'If you like this application,\nplease consider supporting it.'}
        </SupportMeText>
      )}
      <SupportButton
        onClick={() => toggleSupportFrame(true)}
        onMouseOut={onBlurButton}
      >
        <SupportButtonIcon src={KofiLogo} /> Support this app
      </SupportButton>
      <DymanicSupportMeWrapper
        isOpen={isSupportFrameVisible}
        onMouseOut={() => toggleSupportFrame(false)}
        onMouseOver={() => toggleHasEnteredSupportFrame(true)}
      >
        <SupportMe mode="dynamic" />
      </DymanicSupportMeWrapper>
    </>
  );
};

export default SupportMeButton;

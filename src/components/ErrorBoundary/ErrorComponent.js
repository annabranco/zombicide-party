import React, { useEffect } from 'react';
import { string } from 'prop-types';
import appInfo from '../../../package.json';
import { useStateWithLabel } from '../../utils/hooks';
import {
  DetailsText,
  ErrorDetailsArea,
  ErrorTitle,
  NotificationArea,
  NotifyButton,
  NotifyButtonIcon,
  NotifyButtonText,
  SorryText
} from './styles';
import { errorTextsPropType } from '../../interfaces/types';
import { DEFAULT_ERROR_TEXTS } from '../../constants';
import { MenuScreen } from '../MainMenu/styles';
import BG from '../../assets/images/background/background2.jpg';

const REPORT_ISSUE_PAGE = `${appInfo.bugs.url}/new`;

const ErrorComponent = ({ error, texts }) => {
  const [showNotifyButton, toggleNotifyButton] = useStateWithLabel(
    false,
    'showNotifyButton'
  );

  useEffect(() => {
    setTimeout(() => toggleNotifyButton(true), 5000);
  });

  console.log('$$$ texts', texts);

  return (
    <MenuScreen img={BG} type="main">
      <ErrorTitle>{texts.title}</ErrorTitle>
      <NotificationArea>
        <SorryText>{texts.errorLine1}</SorryText>
        <SorryText>{texts.errorLine2}</SorryText>
        <ErrorDetailsArea>
          <DetailsText>{error}</DetailsText>
        </ErrorDetailsArea>
        <NotifyButton
          visible={showNotifyButton}
          href={REPORT_ISSUE_PAGE}
          target="_Blank"
          rel="noopener noreferrer"
        >
          <NotifyButtonText>{texts.notifyMe}</NotifyButtonText>
          <NotifyButtonIcon className="fab fa-github-alt" />
        </NotifyButton>
      </NotificationArea>
    </MenuScreen>
  );
};

ErrorComponent.propTypes = {
  error: string.isRequired,
  texts: errorTextsPropType
};

ErrorComponent.defaultProps = {
  texts: DEFAULT_ERROR_TEXTS
};

export default ErrorComponent;

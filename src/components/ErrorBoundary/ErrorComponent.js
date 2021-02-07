import React, { useEffect } from 'react';
import { string } from 'prop-types';
import { useHistory } from 'react-router-dom';
import appInfo from '../../../package.json';
import { logger, useStateWithLabel } from '../../utils';
import { errorTextsPropType } from '../../interfaces/types';
import FogEffect from '../Fog';
import BG from '../../assets/images/background/background2.jpg';
import { DEFAULT_ERROR_TEXTS, ERROR, LOG_TYPE_CORE } from '../../constants';
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
import { MenuScreen } from '../MainMenu/styles';

const REPORT_ISSUE_PAGE = `${appInfo.bugs.url}/new`;

const ErrorComponent = ({ error, notifyButtonLink, texts }) => {
  const [showNotifyButton, toggleNotifyButton] = useStateWithLabel(
    false,
    'showNotifyButton'
  );
  const history = useHistory();

  const onClickButton = () => {
    if (notifyButtonLink) {
      history.push(notifyButtonLink);
    } else {
      window.location.href = REPORT_ISSUE_PAGE;
    }
  };

  useEffect(() => {
    logger(LOG_TYPE_CORE, ERROR, error);
    setTimeout(() => toggleNotifyButton(true), 3000);
  }, []);

  return (
    <MenuScreen img={BG} type="main">
      <FogEffect />
      <ErrorTitle>{texts.title}</ErrorTitle>
      <NotificationArea>
        <SorryText>{texts.errorLine1}</SorryText>
        {texts.errorLine2 && <SorryText>{texts.errorLine2}</SorryText>}
        {error && (
          <ErrorDetailsArea>
            <DetailsText>{error}</DetailsText>
          </ErrorDetailsArea>
        )}
        <NotifyButton
          onClick={onClickButton}
          rel="noopener noreferrer"
          target="_Blank"
          visible={showNotifyButton}
        >
          <NotifyButtonText>{texts.notifyMe}</NotifyButtonText>
          {!notifyButtonLink && (
            <NotifyButtonIcon className="fab fa-github-alt" />
          )}
        </NotifyButton>
      </NotificationArea>
    </MenuScreen>
  );
};

ErrorComponent.propTypes = {
  error: string.isRequired,
  notifyButtonLink: string,
  texts: errorTextsPropType
};

ErrorComponent.defaultProps = {
  notifyButtonLink: null,
  texts: DEFAULT_ERROR_TEXTS
};

export default ErrorComponent;

import React, { useEffect } from 'react';
import { string } from 'prop-types';
import { useHistory } from 'react-router-dom';
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
import FogEffect from '../Fog';

const REPORT_ISSUE_PAGE = `${appInfo.bugs.url}/new`;

const ErrorComponent = ({ error, texts, notifyButtonLink }) => {
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
    setTimeout(() => toggleNotifyButton(true), 3000);
  }, []);

  console.log('$$$ texts', texts);

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
          visible={showNotifyButton}
          onClick={onClickButton}
          target="_Blank"
          rel="noopener noreferrer"
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
  texts: errorTextsPropType,
  notifyButtonLink: string
};

ErrorComponent.defaultProps = {
  texts: DEFAULT_ERROR_TEXTS,
  notifyButtonLink: null
};

export default ErrorComponent;

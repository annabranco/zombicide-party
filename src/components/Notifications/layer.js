import React, { useContext, useEffect } from 'react';
import { bool, func, number } from 'prop-types';
import { MODAL, START_TOUR } from '../../constants';
import { AppContext } from '../../setup/context';
import { useStateWithLabel } from '../../utils';
import { ModalButton, ModalMessage, ModalTitle } from '../SetupModal/styles';
import Tour, { STEPS } from '../Tour';
import { ButtonsArea, ModalBody, NotificationsArea } from './styles';

const NotificationsLayer = ({
  changeTourModeStep,
  goToNextTourStep,
  tourMode
}) => {
  const [activeMode, setActiveMode] = useStateWithLabel(
    START_TOUR,
    'activeMode'
  );

  const [content, setContent] = useStateWithLabel(null, 'content');
  const [hideInstructions, toggleHideInstructions] = useStateWithLabel(
    false,
    'hideInstructions'
  );
  const { context, updateContext } = useContext(AppContext);
  const { notification } = context;

  const closeActiveNotification = newNotification => {
    updateContext({ ...context, notification: {} });
    setActiveMode(newNotification || null);
    setContent(null);
  };

  const onClickSecondaryButton = () => {
    content.onClickSecondary && content.onClickSecondary();
    closeActiveNotification();
  };

  const onClickPrimaryButton = () => {
    const start = content.onClickPrimary && content.onClickPrimary();
    closeActiveNotification(start);
    if (start === START_TOUR) {
      changeTourModeStep(0);
    }
  };

  const onClickScreen = () => {
    if (
      (tourMode >= 10 && tourMode < 13) ||
      tourMode === 14 ||
      tourMode === 24 ||
      tourMode === 26 ||
      tourMode === 27 ||
      tourMode === 31 ||
      tourMode === 35 ||
      tourMode === 39 ||
      tourMode === 41 ||
      tourMode === 44 ||
      tourMode === 47 ||
      tourMode === 50 ||
      tourMode === 63 ||
      tourMode === 73 ||
      tourMode === 74 ||
      tourMode === 75 ||
      tourMode === 76 ||
      tourMode === 77
    ) {
      goToNextTourStep();
    } else if (tourMode || tourMode === 0) {
      toggleHideInstructions(true);
    }
  };

  useEffect(() => {
    if (notification?.type) {
      setActiveMode(notification.type);
      setContent(notification.content);
    }
  }, [activeMode, notification, setActiveMode, setContent]);

  useEffect(() => {
    toggleHideInstructions(false);
    if ((tourMode || tourMode === 0) && activeMode !== START_TOUR) {
      setActiveMode(START_TOUR);
    }
  }, [activeMode, setActiveMode, toggleHideInstructions, tourMode]);

  return (
    <>
      {activeMode && content && (
        <NotificationsArea
          blockingLayer={activeMode === MODAL}
          onClick={content.closeWhenClickOutside && closeActiveNotification}
          type={notification.type}
        >
          <ModalBody type={notification.type}>
            <ModalTitle noBg uppercase>
              {content.title}
            </ModalTitle>
            <ModalMessage span={content.messageSpan} type="dark">
              {content.message}
            </ModalMessage>
            <ButtonsArea>
              {content.secondaryButton && (
                <ModalButton
                  type={content.secondaryButtonType || 'cancel'}
                  onClick={onClickSecondaryButton}
                >
                  {content.secondaryButton}
                </ModalButton>
              )}
              {content.primaryButton && (
                <ModalButton
                  type={content.primaryButtonType || 'confirm'}
                  onClick={onClickPrimaryButton}
                >
                  {content.primaryButton}
                </ModalButton>
              )}
            </ButtonsArea>
          </ModalBody>
        </NotificationsArea>
      )}
      {activeMode === START_TOUR && (tourMode || tourMode === 0) && (
        <NotificationsArea
          blockingLayer="light"
          hideInstructions={hideInstructions}
          onClick={onClickScreen}
        >
          <Tour tourMode={tourMode} />
        </NotificationsArea>
      )}
    </>
  );
};

NotificationsLayer.propTypes = {
  changeTourModeStep: func.isRequired,
  goToNextTourStep: func.isRequired,
  tourMode: number
};
NotificationsLayer.defaultProps = {
  tourMode: null
};

export default NotificationsLayer;

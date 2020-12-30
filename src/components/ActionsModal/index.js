import React, { useEffect } from 'react';
import { bool, func, node } from 'prop-types';
import { NO_WAY, CONFIRMATION_NEEDED, YEAH } from '../../constants';
import {
  ModalButton,
  ModalMessage,
  ModalTitle,
  ModalWindow
} from '../SetupModal/styles';
import { ButtonsArea } from '../MainMenu/styles';
import { ModalContentType } from '../../interfaces/types';
import { useStateWithLabel } from '../../utils/hooks';

const ActionsModal = ({
  message,
  children,
  toggleVisibility,
  visible,
  onConfirmModal
}) => {
  const [modalMessage, changeModalMessage] = useStateWithLabel(
    message,
    'modalMessage'
  );

  const onClickCancel = () => {
    toggleVisibility(false);
  };

  const onClickConfirm = () => {
    toggleVisibility(false);
    onConfirmModal();
  };

  useEffect(() => {
    if (!message) {
      const DEFAULT_MODAL_MESSAGE = {
        title: null,
        text: CONFIRMATION_NEEDED,
        buttons: [
          {
            text: NO_WAY,
            onClick: onClickCancel,
            type: 'cancel'
          },
          {
            text: YEAH,
            onClick: onClickConfirm,
            type: 'go-on'
          }
        ]
      };

      changeModalMessage(DEFAULT_MODAL_MESSAGE);
    }
  }, [changeModalMessage, message]);

  return (
    <ModalWindow visible={visible}>
      {modalMessage && (
        <>
          <ModalTitle uppercase>{modalMessage.title}</ModalTitle>
          <ModalMessage>{modalMessage.text}</ModalMessage>
          {children}
          <ButtonsArea>
            {modalMessage.buttons.map(button => (
              <ModalButton
                key={`modal_button_${button.type}`}
                onClick={button.onClick}
                type={button.type}
              >
                {button.text}
              </ModalButton>
            ))}
          </ButtonsArea>
        </>
      )}
    </ModalWindow>
  );
};

ActionsModal.propTypes = {
  message: ModalContentType,
  children: node,
  visible: bool.isRequired,
  toggleVisibility: func.isRequired,
  onConfirmModal: func
};

ActionsModal.defaultProps = {
  message: null,
  children: null,
  onConfirmModal: null
};

export default ActionsModal;

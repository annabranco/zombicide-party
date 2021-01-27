import React, { useEffect } from 'react';
import { bool, func, node } from 'prop-types';

import { NO_WAY, CONFIRMATION_NEEDED, YEAH } from '../../constants';
import {
  ModalButton,
  ModalMessage,
  ModalTitle,
  ModalWindow,
  ModalCharFace,
  ModalMessageWrapper
} from '../SetupModal/styles';
import { ButtonsArea } from '../MainMenu/styles';
import { ModalContentType } from '../../interfaces/types';
import { useStateWithLabel } from '../../utils/hooks';
import { ModalSelect, XpSlider } from './styles';

const ActionsModal = ({
  content,
  toggleVisibility,
  visible,
  isMobile,
  onConfirmModal
}) => {
  const [modalMessage, changeModalMessage] = useStateWithLabel(
    content,
    'modalMessage'
  );
  const [modalState, changeModalState] = useStateWithLabel(null, 'modalState');

  const onClickCancel = () => {
    toggleVisibility(false);
  };

  const onClickConfirm = args => {
    if (args.target) {
      onConfirmModal(modalState);
    } else {
      onConfirmModal(args);
    }
  };

  useEffect(() => {
    if (!content) {
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
    } else {
      changeModalMessage(content);
    }
    if (modalMessage.type === 'slider') {
      changeModalState(1);
    }
  }, [changeModalMessage, content]);

  return (
    <ModalWindow visible={visible}>
      {modalMessage && (
        <>
          <ModalTitle uppercase>{modalMessage.title}</ModalTitle>
          <ModalMessage>{modalMessage.text}</ModalMessage>
          {modalMessage.type === 'select' && (
            <ModalSelect
              onChange={event => {
                changeModalState(event.currentTarget.value);
              }}
              value={modalState}
            >
              {modalMessage.data.map(item => (
                <option key={`option${item}`} value={item}>
                  {item}
                </option>
              ))}
            </ModalSelect>
          )}
          {modalMessage.type === 'slider' && (
            <XpSlider
              value={modalState}
              aria-labelledby="discrete-slider-always"
              valueLabelDisplay="on"
              step={1}
              min={1}
              max={modalMessage.data.maxXp}
              currentXp={modalMessage.data.currentXp}
              onChange={(event, value) => {
                changeModalState(value);
              }}
            />
          )}
          {modalMessage.type === 'option' && modalMessage.data.img && (
            <>
              {modalState ? (
                <ModalMessageWrapper>
                  <ModalMessage type={modalMessage.type}>
                    {modalState}
                  </ModalMessage>
                </ModalMessageWrapper>
              ) : (
                <ModalCharFace
                  src={modalMessage.data.img}
                  alt="Character face"
                />
              )}
            </>
          )}
          <ButtonsArea>
            {modalMessage.buttons.map((button, index) => {
              const onClickButton = () => {
                switch (button.type) {
                  case 'cancel':
                    return onClickCancel;
                  case 'option':
                    return () =>
                      onClickConfirm({ level: modalMessage.data.level, index });
                  default:
                    return onClickConfirm;
                }
              };
              return (
                <ModalButton
                  key={button.text}
                  onClick={onClickButton()}
                  type={button.type}
                  onMouseOver={
                    modalMessage.type === 'option' && !isMobile
                      ? () => changeModalState(button.details)
                      : () => null
                  }
                  onMouseOut={
                    modalMessage.type === 'option' && !isMobile
                      ? () => changeModalState('')
                      : () => null
                  }
                >
                  {button.text}
                </ModalButton>
              );
            })}
          </ButtonsArea>
        </>
      )}
    </ModalWindow>
  );
};

ActionsModal.propTypes = {
  content: ModalContentType,
  visible: bool.isRequired,
  toggleVisibility: func.isRequired,
  onConfirmModal: func,
  isMobile: bool
};

ActionsModal.defaultProps = {
  content: null,
  onConfirmModal: () => null,
  isMobile: false
};

export default ActionsModal;
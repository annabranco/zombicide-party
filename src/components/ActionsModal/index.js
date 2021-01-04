import React, { useEffect } from 'react';
import { bool, func, node } from 'prop-types';

import { NO_WAY, CONFIRMATION_NEEDED, YEAH } from '../../constants';
import {
  ModalButton,
  ModalMessage,
  ModalTitle,
  ModalWindow,
  ModalCharFace
} from '../SetupModal/styles';
import { ButtonsArea } from '../MainMenu/styles';
import { ModalContentType } from '../../interfaces/types';
import { useStateWithLabel } from '../../utils/hooks';
import { ModalSelect, XpSlider } from './styles';

const ActionsModal = ({
  content,
  children,
  toggleVisibility,
  visible,
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

  const onClickConfirm = () => {
    onConfirmModal(modalState);
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
              defaultValue={modalState}
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
          {console.log(modalMessage.data)}
          {modalMessage.type === 'option' && (
            <ModalCharFace src={modalMessage.data} alt="Character face" />
          )}
          <ButtonsArea>
            <ModalButton
              onClick={onClickCancel}
              type={modalMessage.buttons[0].type}
            >
              {modalMessage.buttons[0].text}
            </ModalButton>
            <ModalButton
              onClick={onClickConfirm}
              type={modalMessage.buttons[1].type}
            >
              {modalMessage.buttons[1].text}
            </ModalButton>
          </ButtonsArea>
        </>
      )}
    </ModalWindow>
  );
};

ActionsModal.propTypes = {
  content: ModalContentType,
  children: node,
  visible: bool.isRequired,
  toggleVisibility: func.isRequired,
  onConfirmModal: func
};

ActionsModal.defaultProps = {
  content: null,
  children: null,
  onConfirmModal: () => null
};

export default ActionsModal;

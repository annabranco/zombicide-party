import styled from '@emotion/styled';

export const SelectorModal = styled.div`
  label: SelectorModal;
  z-index: 4;
  position: absolute;
  top: 0;
  left: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  transform: translate(-50%, 0);
  height: 100%;
  width: 100%;
  background: #232222;
`;
SelectorModal.displayName = 'SelectorModal';

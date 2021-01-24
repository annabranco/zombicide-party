import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { CharName } from '../Sections/PlayersSection/styles';

export const ButtonsWrapper = styled.div`
  label: ButtonsWrapper;
  margin: 15px auto;
  z-index: 10;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;

  @media all and (min-width: 1200px) {
    position: absolute;
    bottom: 30px;
    width: 50%;

    ${({ itemSelector }) =>
      itemSelector &&
      css`
        bottom: 10px;
        width: 100%;
      `}
  }
`;
ButtonsWrapper.displayName = 'ButtonsWrapper';

export const ConfirmButton = styled.button`
  label: ConfirmButton;
  margin: 0 auto;
  height: 35px;
  width: 120px;
  background: green;
  border: 1px solid black;
  border-radius: 10px;
  font-weight: 700;
  font-family: 'Grandstander', cursive;
  cursor: pointer;
  font-size: 1rem;
  outline: none;

  @media all and (min-width: 768px) {
    height: 25px;
  }
`;
ConfirmButton.displayName = 'ConfirmButton';

export const CancelButton = styled(ConfirmButton)`
  label: CancelButton;
  background: lightgray;
  margin: 10px auto;
  border-radius: 10px;

  @media all and (min-width: 768px) {
    margin: auto;
  }
`;
CancelButton.displayName = 'CancelButton';

export const CharacterId = styled.div`
  label: CharacterId;
  position: absolute;
  left: 10px;
  top: 30px;

  @media all and (min-width: 768px) {
    left: 30px;
  }
`;
CharacterId.displayName = 'CharacterId';

export const CharacterName = styled(CharName)`
  label: CharacterName;
  right: unset;
  left: 50%;
  top: 45px;
  transform: translate(-50%, 0);

  @media all and (min-width: 768px) {
    top: 75px;
    right: unset;
    font-size: 3rem;
  }

  @media all and (min-width: 1200px) {
    top: 70px;
    -webkit-text-stroke: 1px black;
  }
`;
CharacterName.displayName = 'CharacterName';

export const CharacterTrading = styled.div`
  label: CharacterTrading;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-end;
  margin: 10px auto;
  height: 100%;
  width: 100%;
  background: #232222;
  border: 3px solid rgba(255, 255, 255, 0.1);

  &:nth-child(2) {
    background: rgba(0, 163, 21, 0.15);
  }

  @media all and (min-width: 768px) {
  }
`;
CharacterTrading.displayName = 'CharacterTrading';

export const CurrentCharacterTag = styled.p`
  label: CurrentCharacterTag;
  position: absolute;
  bottom: 10px;
  left: 20px;
  font-weight: 700;
  font-family: 'Grandstander', cursive;
  font-size: 1.3rem;
  color: rgba(255, 255, 255, 0.7);
`;
CurrentCharacterTag.displayName = 'CurrentCharacterTag';

export const CurrentPartnerTag = styled(CurrentCharacterTag)`
  label: CurrentPartnerTag;
  bottom: 5px;
  left: 50%;
  transform: translate(-50%, 0);
  width: 80%;
  text-align: center;
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.5);

  @media all and (min-width: 768px) {
    bottom: 20px;
    font-size: 1.5rem;
  }
  @media all and (min-width: 1200px) {
  }
`;
CurrentPartnerTag.displayName = 'CurrentPartnerTag';

export const Face = styled.img`
  label: Face;
  width: 80px;

  @media all and (min-width: 768px) {
    width: 100px;
  }
`;
Face.displayName = 'Face';

export const NavButtonsWrapper = styled.div`
  label: NavButtonsWrapper;
  position: absolute;
  bottom: -20px;
  left: 0;
  width: 100%;
  padding: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  @media all and (min-width: 768px) {
    bottom: 0px;
  }
`;
NavButtonsWrapper.displayName = 'NavButtonsWrapper';

export const PlayerName = styled.p`
  label: PlayerName;
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0);
  top: 110px;
  width: 50px;
  font-weight: 500;
  font-family: 'Grandstander', cursive;
  font-size: 1.3rem;
  color: ${({ color }) => color};

  @media all and (min-width: 768px) {
    top: 150px;
    width: 60px;

    font-size: 1.6rem;
  }

  @media all and (min-width: 1200px) {
    top: 50px;
    left: 450px;
    font-size: 3rem;
    opacity: 0.6;
    transform: none;
  }

  @media all and (min-width: 1400px) {
    top: 50px;
    left: 600px;
    font-size: 3rem;
    opacity: 0.6;
    transform: none;
  }
`;
PlayerName.displayName = 'PlayerName';

export const TradeWrapper = styled.div`
  label: TradeWrapper;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-end;
  height: 100%;
  width: 100%;

  @media all and (min-width: 1024px) {
    flex-direction: row;
  }
`;
TradeWrapper.displayName = 'TradeWrapper';

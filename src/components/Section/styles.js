import styled from '@emotion/styled';

export const SoundArea = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: ${({ opened }) => (opened ? 'auto' : '50px')};
  width: 90%;
  overflow: hidden;
`;

export const TitleBar = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 50px;
  width: 90%;
  border: 1px solid white;
  border-radius: 5px;
  background: #730000;
  padding: 5px 50px;
  color: white;
`;

export const Title = styled.h2`
  font-size: 2rem;
  font-weight: 900;
  color: white;
  text-shadow: 2px 2px 10px white;
`;

export const OpenButton = styled.button`
  outline: none;
  border: 2px solid black;
  border-radius: 50%;
  box-shadow: 0 0 5px black;
  font-size: 1rem;
  font-weight: 900;
  color: white;
  cursor: pointer;

  &:hover {
    transform: translate(0, 1px);
    box-shadow: inset 0 2px 5px 1px rgba(black, 0.4);
  }
`;

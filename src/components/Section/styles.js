import styled from '@emotion/styled';

export const SectionWrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 100vh;
  width: 90%;
  overflow: hidden;
`;

export const TitleBar = styled.div`
  height: 50px;
  width: 90%;
  border: 1px solid white;
  border-radius: 5px;
  background: #730000;
  padding: 5px 50px;
  text-align: center;
  color: white;
`;

export const Title = styled.h2`
  font-size: 2rem;
  font-weight: 900;
  line-height: 1.4;
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

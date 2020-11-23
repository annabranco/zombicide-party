import styled from '@emotion/styled';

export const SectionWrapper = styled.section`
  label: SectionWrapper;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 100vh;
  width: 90%;
  overflow: hidden;
`;

export const TitleBar = styled.div`
  label: TitleBar;
  height: 50px;
  width: 90%;
  border: 1px solid black;
  background: #730000;
  padding: 5px 50px;
  text-align: center;
  color: white;
`;

export const Title = styled.h2`
  label: Title;
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 1.4;
  color: black;
  font-family: 'Cairo', sans-serif;
  text-shadow: 0 0 2px white;
  text-transform: uppercase;
`;

export const OpenButton = styled.button`
  label: OpenButton;
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

import React from 'react';
import { string, func, node, bool } from 'prop-types';
import { OpenButton, SoundArea, TitleBar, Title } from './styles';

const Section = ({ name, state, action, children }) => (
  <SoundArea opened={state}>
    <TitleBar>
      <Title> {name}</Title>
      <OpenButton onClick={action}>{state ? '🔺' : '🔻'}</OpenButton>
    </TitleBar>
    {children}
  </SoundArea>
);

Section.propTypes = {
  action: func.isRequired,
  children: node.isRequired,
  name: string.isRequired,
  state: bool.isRequired
};

export default Section;

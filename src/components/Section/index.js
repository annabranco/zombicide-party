import React from 'react';
import { string, node } from 'prop-types';
import { SectionWrapper, TitleBar, Title } from './styles';

const Section = ({ name, children }) => (
  <SectionWrapper>
    <TitleBar>
      <Title> {name}</Title>
    </TitleBar>
    {children}
  </SectionWrapper>
);

Section.propTypes = {
  children: node.isRequired,
  name: string.isRequired
};

export default Section;

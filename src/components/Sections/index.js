import React from 'react';
import { node, string } from 'prop-types';
import { SectionWrapper, Title, TitleBar } from './styles';

const Section = ({ name, children }) => (
  <SectionWrapper>
    <TitleBar>{/* <Title> {name}</Title> */}</TitleBar>
    {children}
  </SectionWrapper>
);

Section.propTypes = {
  children: node.isRequired,
  name: string.isRequired
};

export default Section;

import React from 'react';
import { Section, Div, H1, ForkAndKnife } from './styles';

const Loading = () => (
  <Section>
    <Div>
      <ForkAndKnife style={ { fontSize: '90px' } } />
      <H1>Loading...</H1>
    </Div>
  </Section>
);

export default Loading;

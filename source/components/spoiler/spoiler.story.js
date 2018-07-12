import React from 'react';
import { storiesOf } from '@storybook/react';
import { Spoiler } from './';

storiesOf('Spoiler', module).add('default', () => (
  <Spoiler title="How is HireMatch using blockchain technology?">
    The use of blockchain technology is reflected in our platform by two major
    elements: Job Posters (Companies and Recruiters) and Agents (Those who
    match, verify and submit talent). Blockchain technology, specifically the
    Smart Contract ensures that agreements between job posters and agents issued
    on our platform are unique, secure, automatic and transparent.
  </Spoiler>
));

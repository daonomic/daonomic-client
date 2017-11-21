import React from 'react';
import { storiesOf } from '@storybook/react';
import Heading from './';

storiesOf('Heading', module)
  .add('large', () => (
    <Heading tagName="h1" size={Heading.sizes.large}>
      Large heading
    </Heading>
  ))
  .add('normal', () => (
    <Heading tagName="h2" size={Heading.sizes.normal}>
      Normal heading
    </Heading>
  ));

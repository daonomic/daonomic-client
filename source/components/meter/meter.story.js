import React from 'react';
import { storiesOf } from '@storybook/react';
import Meter from './';

storiesOf('Meter', module)
  .add('default', () => (
    <Meter value={0.6} />
  ));

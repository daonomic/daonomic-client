import React from 'react';
import { storiesOf } from '@storybook/react';
import { Burger } from './';

storiesOf('Burger', module)
  .add('default', () => <Burger />)
  .add('active', () => <Burger isActive />);

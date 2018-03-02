import React from 'react';
import { storiesOf } from '@storybook/react';
import Navigation from './';

storiesOf('Navigation', module).add('default', () => (
  <Navigation>
    <Navigation.Item href="#buy">Buy tokens</Navigation.Item>

    <Navigation.Item isActive href="#history">
      Transaction History
    </Navigation.Item>

    <Navigation.Item href="#white-paper">White Paper</Navigation.Item>

    <Navigation.Item href="#investors">For Investors</Navigation.Item>
  </Navigation>
));

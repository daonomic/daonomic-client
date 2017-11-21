import React from 'react';
import { storiesOf } from '@storybook/react';
import TwoColumnsLayout from './';

storiesOf('TwoColumnsLayout', module)
  .add('default', () => (
    <TwoColumnsLayout>
      <TwoColumnsLayout.Left>
        left
      </TwoColumnsLayout.Left>

      <TwoColumnsLayout.Right>
        right
      </TwoColumnsLayout.Right>
    </TwoColumnsLayout>
  ));

import React from 'react';
import { storiesOf } from '@storybook/react';
import Badge from './';

storiesOf('Badge', module)
  .add('default', () => (
    <Badge>
      Badge
    </Badge>
  ));

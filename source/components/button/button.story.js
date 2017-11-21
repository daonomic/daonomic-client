import React from 'react';
import { storiesOf } from '@storybook/react';
import Button from './';

storiesOf('Button', module)
  .add('default', () => (
    <Button>
      Button
    </Button>
  ))
  .add('small size', () => (
    <Button size={Button.sizes.small}>
      Button
    </Button>
  ))
  .add('disabled', () => (
    <Button disabled>
      Disabled button
    </Button>
  ));

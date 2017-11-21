import React from 'react';
import { storiesOf } from '@storybook/react';
import SignIn from './signin';

storiesOf('SignIn', module)
  .add('default', () => (
    <SignIn />
  ));

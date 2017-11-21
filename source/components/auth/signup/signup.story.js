import React from 'react';
import { storiesOf } from '@storybook/react';
import SignUp from './signup';

storiesOf('SignUp', module)
  .add('default', () => (
    <SignUp />
  ));

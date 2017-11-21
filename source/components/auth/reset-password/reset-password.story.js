import React from 'react';
import { storiesOf } from '@storybook/react';
import ResetPassword from './reset-password';

storiesOf('ResetPassword', module)
  .add('default', () => (
    <ResetPassword onSubmit={() => {}} />
  ));

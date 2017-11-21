import React from 'react';
import { storiesOf } from '@storybook/react';
import CreateNewPassword from './create-new-password';

storiesOf('CreateNewPassword', module)
  .add('default', () => (
    <CreateNewPassword onSubmit={() => {}} />
  ));

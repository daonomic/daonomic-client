import React from 'react';
import { storiesOf } from '@storybook/react';
import CreateNewPassword from './';

storiesOf('CreateNewPassword', module).add('default', () => (
  <CreateNewPassword onSubmit={() => {}} />
));

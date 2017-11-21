import React from 'react';
import { storiesOf } from '@storybook/react';
import Input from './';

storiesOf('Input', module)
  .add('default', () => (
    <Input.Uncontrolled label="E-mail" />
  ))
  .add('with error', () => (
    <Input.Uncontrolled
      label="E-mail"
      value="dev@0v1se.com."
      error="Incorrect e-mail"
    />
  ));

import React from 'react';
import { storiesOf } from '@storybook/react';
import Select from './';

storiesOf('Select', module)
  .add('default', () => (
    <Select>
      <option value="bitcoin">
        Bitcoin
      </option>

      <option value="ethereum">
        Ethereum
      </option>
    </Select>
  ));

import React from 'react';
import { storiesOf } from '@storybook/react';
import Panel from './';

storiesOf('Panel', module)
  .add('default', () => (
    <Panel>
      Panel content
      <Panel.Separator />
      Panel content
    </Panel>
  ))
  .add('large padding', () => (
    <Panel paddingSize={Panel.paddingSizes.large}>
      Panel content
      <Panel.Separator />
      Panel content
    </Panel>
  ));
